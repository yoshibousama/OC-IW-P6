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
    imgElm.dataset.title = dataWorks[i].title;
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

const btnAll = document.querySelector(".btn_filter-all");
const btnId1 = document.querySelector(".btn_filter-id1");
const btnId2 = document.querySelector(".btn_filter-id2");
const btnId3 = document.querySelector(".btn_filter-id3");

function galleryReset() {
  document.querySelector(".gallery").innerHTML = "";
}

// Filtre pour catégorie objet
// const boutonAll = document.querySelector(".btn-all");

btnAll.addEventListener("click", function () {
  galleryReset();
});
