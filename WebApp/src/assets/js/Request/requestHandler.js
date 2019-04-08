/**
 * Created by svend on 08/03/2019.
 */

import PCD from "./Get/PCD/requestForThePCD"
import PCD2 from "./Get/PCD2/requestForThePCD"

export default (function () {

    const requests = {
        PCD: PCD.toGetTheDetails,
        PCD2: PCD2.toGetTheDetails
    };

    return {
        requests
    }

})();