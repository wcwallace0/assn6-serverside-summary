let queryButton = document.getElementById('query-button');

// Get user inputs
let country = document.getElementById('country');
let rank = document.getElementById('rank');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

queryButton.addEventListener('click', function() {
    if(country.value || rank.value) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', responseReceivedHandler);
        xhr.responseType = 'json';

        let queryString = '';
        if(country.value) {
            queryString = 'country=' + encodeURIComponent(capitalize(country.value));
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

        // create an HTML element in the .entry class with the info from backend
        const queries = document.getElementById('queries');
        const entry = document.createElement('div');
        entry.setAttribute('class', 'entry');

        const query = document.createElement('p');
        let queryText = 'Query: { ';
        if(country.value) {
            queryText += 'Country Name: ' + country.value;
            if(rank.value) {
                queryText += ', ';
            }
        }
        if(rank.value) {
            queryText += 'Rank: ' + rank.value;
        }
        queryText += ' }'
        query.textContent = queryText;
        entry.appendChild(query);

        if(this.response == null) {
            const info = document.createElement('p');
            info.textContent = 'No country was found with this data.';
            entry.appendChild(info);
        } else {
            const country = document.createElement('p');
            const rank = document.createElement('p');
            const population = document.createElement('p');
            const area = document.createElement('p');

            country.textContent = "Country: " + this.response.country;
            rank.textContent = "Rank: " + this.response.rank;
            population.textContent = "Population: " + this.response.pop2023;
            area.textContent = "Area (sq. km): " + this.response.area;

            entry.appendChild(country);
            entry.appendChild(rank);
            entry.appendChild(population);
            entry.appendChild(area);
        }

        queries.prepend(entry);
    } else {
        console.log('DB lookup encountered error: ' + this.response);
    }
}