let selectCountries = document.querySelector('[name=countryId]');

const apiCall = (endpoint, callback) => {
	fetch(endpoint)
		.then(response => response.json())
		.then(data => callback(data))
		.catch(error => {
			throw new Error(error)
		})
}

const setCountries = function (countries) {
	if (countries.length > 0) {
		countries.forEach((oneCountry, i) => {
            selectCountries.innerHTML += `<option value="${i}">${oneCountry.name}</option>`;
            i++;
		});
	} else {
		alert('Se nos cayeron los países :(');
	}
}

apiCall('https://restcountries.eu/rest/v2/all', setCountries);