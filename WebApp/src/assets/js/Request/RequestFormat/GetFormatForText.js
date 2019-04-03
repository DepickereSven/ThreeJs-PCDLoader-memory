/**
 Created by svend on 08/03/2019.
 **/

module.exports = (function () {

    let fetchRequestForGettingData = function (fetchData) {
        return fetch(fetchData.getSpecifiedElement ? fetchData.Url + fetchData.specifiedElement : fetchData.Url)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return {error: true, msg: '', data: response};
                }
            }).then(text => {
                return {error: false, msg: 'ok', data: text};
            }).catch(function (error) {
                console.log('Request failed ', error);
                return {error: true, msg: '', data: error};
            })
    };

    return {
        fetchRequestForGettingData
    }

})();