/**
 * Created by svend on 3/28/2019.
 */

import Three from "./ThreeJs/Init"


export default  (function () {

    let counter = 1;

    async function initThree(container) {
        await Three.init(container);
        await Three.animate();
    }

    async function updateThree(_self) {
        while (_self.update) {
            let newPCD = await _self.request();
            console.log(counter++);
            if (newPCD.error){
                _self.snack.status = true;
                _self.snack.text = newPCD.msg;
                _self.snack.color = 'error'
            } else {
                await Three.updateFigure(newPCD.data);
                // _self.update = false;
            }
        }
    }

    return {
        initThree,
        updateThree,
        exportSomething: Three.exportSomething,
        keyboard: Three.keyboard

    }

})();