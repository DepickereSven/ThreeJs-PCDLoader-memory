/**
 * Created by svend on 3/27/2019.
 */

var moment = require('moment');

import * as Three from "./Libs/three"
import * as PCDLoader from "./Libs/PCDLoader"
import * as TrackballControls from "./Libs/TrackballControls"
// import WebGL from "./Libs/WebGL"
import statsmin from "./Libs/stats.min"

export default (function () {

    let stats;
    let camera, controls, scene, renderer;
    let PCDData;

    function init(container) {
        scene = new Three.Scene();
        scene.background = new Three.Color(0x000000);
        camera = new Three.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.01, 40);
        camera.position.x = 0.4;
        camera.position.z = -2;
        camera.up.set(0, 0, 1);
        controls = new Three.TrackballControls(camera);
        controls.rotateSpeed = 2.0;
        // controls.zoomSpeed = 0.3;
        controls.panSpeed = 0.2;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.minDistance = 0.003;
        controls.maxDistance = 0.3 * 100;
        scene.add(camera);
        renderer = new Three.WebGLRenderer({ preserveDrawingBuffer: true, antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        var loader = new Three.PCDLoader();
        loader.load('PCD1.pcd', function (points) {
            points.name = "liveFeed";
            points.scale.multiplyScalar(0.001);
            points.geometry.center();
            points.material.size = 0.0004673193949358964;
            points.rotation.z = Math.PI / 2;
            scene.add(points);
            var center = points.geometry.boundingSphere.center;
            controls.target.set(center.x, center.y, center.z);
            controls.update();
        });
        container.appendChild(renderer.domElement);
        stats = new statsmin();
        container.appendChild(stats.dom);
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('keypress', keyboard);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
    }

    function keyboard(ev) {
        var points = scene.getObjectByName('liveFeed');
        switch (ev.key || String.fromCharCode(ev.keyCode || ev.charCode)) {
            case '+':
                points.material.size *= 1.2;
                points.material.needsUpdate = true;
                break;
            case '-':
                points.material.size /= 1.2;
                points.material.needsUpdate = true;
                break;
            case 'c':
                points.material.color.setHex(Math.random() * 0xffffff);
                points.material.needsUpdate = true;
                break;
        }
    }

    async function updateFigure(liveFeed) {
        PCDData = liveFeed;
        let PerrinePCD = scene.getObjectByName('liveFeed');
        let loader = new Three.PCDLoader();
        let enc = new TextEncoder();
        // TODO Change to the right data input to load directly
        let data = enc.encode(PCDData);
        let mesh = loader.parse(data, 'liveFeed');
        PerrinePCD.geometry = mesh.geometry;
        PerrinePCD.geometry.center();
        PerrinePCD.geometry.dispose();
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        stats.update();
    }
    
    async function exportSomething(document, window, exportOption) {
        let MIMEType = findExportOption(exportOption);
        const timeStamp = moment().format('MM-D-YYYY--hh:mm:ss');
        let fileName = `Image-${timeStamp}.${exportOption.toLowerCase()}`;
        let blob;
        let url;
        if (exportOption !== "PCD"){
            blob = await renderer.domElement.toDataURL( MIMEType );
        } else {
            blob = window.URL.createObjectURL(new Blob([PCDData],  {type: "application/octet-stream"}));
        }
        
        let a = document.createElement("a");
        a.style = "display: none";
        a.href = blob;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    function findExportOption(exportOption) {
        if (exportOption !== "PCD"){
            return `image/${exportOption.toLowerCase()}`
        } else {
            return 'application/octet-stream'
        }
    }


    return {
        init,
        animate,
        updateFigure,
        keyboard,
        exportSomething
    }

})();



