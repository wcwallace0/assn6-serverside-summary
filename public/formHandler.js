let queryButton = document.getElementById('query-button');

queryButton.addEventListener('click', function() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', responseReceivedHandler);
    xhr.responseType = 'json';

    // Get user inputs
    

    let queryString = 'Name=' + encodeURIComponent('John Marshall'); // [attribute]=[value]&[attribute]=...
    xhr.open('GET', '/query?' + queryString);
    xhr.send();
});

function responseReceivedHandler() {
    if(this.status == 200) {
        console.log(this.response);
    } else {
        console.log('DB lookup encountered error: ' + this.response);
    }
}