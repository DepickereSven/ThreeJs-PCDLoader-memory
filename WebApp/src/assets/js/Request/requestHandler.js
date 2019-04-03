/**
 * Created by svend on 08/03/2019.
 */

import PCD from "./Get/PCD/requestForThePCD"

export default (function () {

    const requests = {
        PCD: PCD.toGetTheDetails
    };

    return {
        requests
    }

})();