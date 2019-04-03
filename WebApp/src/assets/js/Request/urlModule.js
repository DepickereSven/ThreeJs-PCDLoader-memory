/**
 * Created by svend on 08/03/2019.
 */


module.exports = (function () {
    
    const IP_LABO = "localhost";
    const PORT = "9561";
    const BASE_URL = "http://" + IP_LABO + ":" + PORT + "/api/v1/";
    const DATA_URL = "data/";
    const C_DATA_URL = BASE_URL + DATA_URL;

    const url = {
        PCD: C_DATA_URL + "pcd"
    };

    return {
        url
    }

})();