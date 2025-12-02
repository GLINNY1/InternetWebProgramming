const locationData = {
  "California": {
    "Los Angeles County": {
      "Los Angeles": ["Hollywood", "Koreatown", "Brentwood"],
      "Santa Monica": ["Ocean Park", "Pico District", "Mid-City"],
      "Long Beach": ["Belmont Shore", "Bixby Knolls", "Naples Island"]
    },

    "Orange County": {
      "Anaheim": ["Anaheim Hills", "Platinum Triangle", "West Anaheim"],
      "Irvine": ["Woodbridge", "Northwood", "University Park"],
      "Huntington Beach": ["Downtown HB", "Sunset Beach", "Goldenwest"]
    },

    "San Diego County": {
      "San Diego": ["La Jolla", "Pacific Beach", "Gaslamp Quarter"],
      "Chula Vista": ["Eastlake", "Otay Ranch", "Sunbow"],
      "Carlsbad": ["La Costa", "Olde Carlsbad", "Bressi Ranch"]
    }
  },

  "New York": {
    "New York County (Manhattan)": {
      "New York City": ["Harlem", "Upper East Side", "Chelsea"]
    },

    "Kings County (Brooklyn)": {
      "Brooklyn": ["Williamsburg", "DUMBO", "Park Slope"]
    },

    "Queens County": {
      "Queens": ["Astoria", "Flushing", "Jamaica"]
    },

    "Bronx County": {
      "Bronx": ["Riverdale", "Fordham", "Morris Park"]
    }
  },

  "Texas": {
    "Harris County": {
      "Houston": ["Midtown", "River Oaks", "The Heights"],
      "Pasadena": ["Village Grove", "Baywood Oaks", "Parkview South"],
      "Baytown": ["Goose Creek", "Craigmont", "Ponderosa"]
    },

    "Dallas County": {
      "Dallas": ["Deep Ellum", "Oak Lawn", "Bishop Arts District"],
      "Irving": ["Las Colinas", "Valley Ranch", "Irving Heights"],
      "Garland": ["Firewheel", "Ember Glen", "Springpark"]
    },

    "Tarrant County": {
      "Fort Worth": ["Sundance Square", "Arlington Heights", "Fairmount"],
      "Arlington": ["Downtown", "Viridian", "Lake Arlington"],
      "Grapevine": ["Historic Downtown", "Silver Lake", "Glade Crossing"]
    }
  }
};

window.onload = function() {
  const stateSelect = document.getElementById("stateSelect");
  const countySelect = document.getElementById("countySelect");
  const citySelect = document.getElementById("citySelect");
  const villageSelect = document.getElementById("villageSelect");

  const states = Object.keys(locationData);
  states.forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  // disable lower dropdowns initially
  countySelect.disabled = true;
  citySelect.disabled = true;
  villageSelect.disabled = true;
};

// STATE → COUNTY
function updateCounties() {
  const stateSelect = document.getElementById("stateSelect");
  const countySelect = document.getElementById("countySelect");
  const citySelect = document.getElementById("citySelect");
  const villageSelect = document.getElementById("villageSelect");
  const resultDiv = document.getElementById("result");

  const selectedState = stateSelect.value;

  // reset all below
  countySelect.innerHTML = '<option value="">-- Select a County --</option>';
  citySelect.innerHTML = '<option value="">-- Select a City --</option>';
  villageSelect.innerHTML = '<option value="">-- Select an Area --</option>';
  countySelect.disabled = true;
  citySelect.disabled = true;
  villageSelect.disabled = true;
  resultDiv.textContent = "";

  if (selectedState && locationData[selectedState]) {
    const counties = Object.keys(locationData[selectedState]);
    counties.forEach(county => {
      const option = document.createElement("option");
      option.value = county;
      option.textContent = county;
      countySelect.appendChild(option);
    });
    countySelect.disabled = false;
  }
}

// COUNTY → CITY
function updateCities() {
  const stateSelect = document.getElementById("stateSelect");
  const countySelect = document.getElementById("countySelect");
  const citySelect = document.getElementById("citySelect");
  const villageSelect = document.getElementById("villageSelect");
  const resultDiv = document.getElementById("result");

  const selectedState = stateSelect.value;
  const selectedCounty = countySelect.value;

  // reset below
  citySelect.innerHTML = '<option value="">-- Select a City --</option>';
  villageSelect.innerHTML = '<option value="">-- Select an Area --</option>';
  citySelect.disabled = true;
  villageSelect.disabled = true;
  resultDiv.textContent = "";

  if (selectedState && selectedCounty && locationData[selectedState][selectedCounty]) {
    const cities = Object.keys(locationData[selectedState][selectedCounty]);
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
    citySelect.disabled = false;
  }
}

// CITY → AREA (villageSelect)
function updateVillages() {
  const stateSelect = document.getElementById("stateSelect");
  const countySelect = document.getElementById("countySelect");
  const citySelect = document.getElementById("citySelect");
  const villageSelect = document.getElementById("villageSelect");
  const resultDiv = document.getElementById("result");

  const selectedState = stateSelect.value;
  const selectedCounty = countySelect.value;
  const selectedCity = citySelect.value;

  villageSelect.innerHTML = '<option value="">-- Select an Area --</option>';
  villageSelect.disabled = true;
  resultDiv.textContent = "";

  if (
    selectedState &&
    selectedCounty &&
    selectedCity &&
    locationData[selectedState][selectedCounty][selectedCity]
  ) {
    const areas = locationData[selectedState][selectedCounty][selectedCity];
    areas.forEach(area => {
      const option = document.createElement("option");
      option.value = area;
      option.textContent = area;
      villageSelect.appendChild(option);
    });
    villageSelect.disabled = false;

    villageSelect.onchange = function() {
      if (villageSelect.value) {
        resultDiv.textContent = `${villageSelect.value}, ${selectedCity}, ${selectedCounty}, ${selectedState}`;
        resultDiv.style.color = "#10b981";
      }
    };
  }
}
