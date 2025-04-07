let queryButton = document.getElementById('query-button');

queryButton.addEventListener('click', function() {
    // Get user inputs
    let country = document.getElementById('country');
    let rank = document.getElementById('rank');

    if(country.value || rank.value) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', responseReceivedHandler);
        xhr.responseType = 'json';

        let queryString = '';
        if(country.value) {
            queryString = 'country=' + encodeURIComponent(country.value);
            if(rank.value) { queryString += '&' }
        }
        if(rank.value) {
            queryString += 'rank=' + encodeURIComponent(rank.value);
        }

        console.log(queryString);
        xhr.open('GET', '/query?' + queryString);
        xhr.send();
    }
});

function responseReceivedHandler() {
    if(this.status == 200) {
        console.log(this.response);
    } else {
        console.log('DB lookup encountered error: ' + this.response);
    }
}