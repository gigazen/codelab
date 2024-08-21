// Using Promise for AJAX call to get data from 3rd party API, response sequence in the order of request sequence is guaranteed
"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// *****************************************
// Pass .neighbour class as argument for special styling only to the neighbouring countries. If not passed then by default empty string will be used and no special styling will be applied to main country
function renderCountry(data, className = "") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1e6
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${Object.values(
          data.languages
        )}</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
    </article>
  `;

  // Inserting the above HTML code inside a div container having .countries class
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

// fetch() method returns a Promise which is handled by then() method. response.json() returns a Promise which is handled by another then() method
function getCountryData(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]));
}

getCountryData("India");
