var config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
};

var countrySelect = document.querySelector(".country"),
    stateSelect = document.querySelector(".state"),
    citySelect = document.querySelector(".city");

function loadCountries() {
    let apiEndPoint = config.cUrl;

    fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then((Response) => Response.json())
        .then((data) => {
            data.forEach((country) => {
                const option = document.createElement("option");
                option.value = country.iso2;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error loading countries:", error));

    stateSelect.disabled = true;
    citySelect.disabled = true;
}

function loadStates() {
    stateSelect.disabled = false;
    citySelect.disabled = true;

    const selectedCountryCode = countrySelect.value;

    stateSelect.innerHTML = '<option value="">Select State</option>'; // Clear existing options

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, {
        headers: { "X-CSCAPI-KEY": config.ckey },
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((state) => {
                const option = document.createElement("option");
                option.value = state.iso2;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        });
}

function loadCities() {
    citySelect.disabled = false;

    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;

    citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing options

    fetch(
        `${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
        { headers: { "X-CSCAPI-KEY": config.ckey } }
    )
        .then((response) => response.json())
        .then((data) => {
            data.forEach((city) => {
                const option = document.createElement("option");
                option.value = city.iso2;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
        });
}

// Initial load of countries
window.onload = loadCountries;

// Event listeners for changes in the country and state selections
countrySelect.addEventListener("change", loadStates);
stateSelect.addEventListener("change", loadCities);
