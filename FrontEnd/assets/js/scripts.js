fetch("http://localhost:5678/api/works")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    loadDataWorks(data);
  });

function loadDataWorks(dataWorks) {
  for (let i = 0; i < dataWorks.length; i++) {
    const gallery = document.querySelector(".gallery");
    const figureElm = document.createElement("figure");
    const imgElm = document.createElement("img");
    imgElm.src = dataWorks[i].imageUrl;
    const figcaptionElm = document.createElement("figcaption");
    figcaptionElm.innerText = dataWorks[i].title;

    gallery.appendChild(figureElm);
    figureElm.appendChild(imgElm);
    figureElm.appendChild(figcaptionElm);
  }
}

fetch("http://localhost:5678/api/categories")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
