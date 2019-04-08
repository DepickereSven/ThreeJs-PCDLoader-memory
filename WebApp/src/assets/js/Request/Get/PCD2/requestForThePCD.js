/**
 Created by svend on 08/03/2019.
 **/

const getRequest = require('../../RequestFormat/GetFormatForText');
const urlModule = require('../../urlModule');
const errorMessages = require('../../errorMessages');

export default (function () {

    const toGetTheDetails = async function () {
        const response = (await getRequest.fetchRequestForGettingData({
            Url: urlModule.url.PCD2,
            getSpecifiedElement: false
        }));
        if (response.error) {
            response.msg = errorMessages.messages.PCD;
        }
        return response;
    };

    return {
        toGetTheDetails
    }

})();