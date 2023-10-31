document.addEventListener("DOMContentLoaded", loadNavBar);

function loadNavBar() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    });
}

async function fetchProductImages(term) {
  const apiKey = "18f1caae9a7c4db1afc206edef04571b";
  const searchTerm = term;

  const endpoint = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(
    searchTerm
  )}`;
  const headers = { "Ocp-Apim-Subscription-Key": apiKey };

  let images = [];

  await fetch(endpoint, {
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la llamada");
      }
    })
    .then((data) => {
      images = data.value;
    })
    .catch((error) => {
      // Maneja los errores aquí
      console.error("Error al realizar la solicitud:", error);
    });

  return images.slice(0, 5);
}
