

// fetch("https://restcountries.com/v3.1/all")
//   .then(response => response.json())
//   .then(data => {
//     const container = document.getElementById("countriesContainer");

//     data.forEach(country => {
//       const card = document.createElement("div");
//       card.className = "country-card";

//       card.innerHTML = `
//         <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
//         <h2>${country.name.common}</h2>
//         <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
//         <p><strong>Region:</strong> ${country.region}</p>
//         <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
//         <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
//       `;

//       container.appendChild(card);
//     });
//   })
//   .catch(error => console.error("Error loading countries:", error));
function searchCountry() {
  const countryName = document.getElementById("searchInput").value.trim();

  if (countryName === "") {
    alert("Please enter a country name");
    return;
  }

  const url = `https://restcountries.com/v3.1/name/${countryName}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      const country = data[0];

      const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

      const currency = country.currencies
        ? Object.values(country.currencies)[0].name
        : "N/A";

      document.getElementById("countryInfo").innerHTML = `
        <div class="country-card">
          <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
          <h2>${country.name.common}</h2>
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> ${languages}</p>
          <p><strong>Currency:</strong> ${currency}</p>
        </div>
      `;
    })
    .catch(error => {
      document.getElementById("countryInfo").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
