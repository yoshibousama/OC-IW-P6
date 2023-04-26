/***********************************  WORKS ******************************************/

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

// fetch("http://localhost:5678/api/works")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     loadDataWorks(data);
//   });

function loadDataWorks(dataWorks) {
  document.querySelector(".gallery").innerHTML = "";
  for (let i = 0; i < dataWorks.length; i++) {
    const gallery = document.querySelector(".gallery");
    const figureElm = document.createElement("figure");
    const imgElm = document.createElement("img");
    imgElm.src = dataWorks[i].imageUrl;
    imgElm.setAttribute("alt", "photo de " + dataWorks[i].title);
    const figcaptionElm = document.createElement("figcaption");
    figcaptionElm.innerText = dataWorks[i].title;

    gallery.appendChild(figureElm);
    figureElm.appendChild(imgElm);
    figureElm.appendChild(figcaptionElm);
  }
}
loadDataWorks(works);

/***********************************  CATEGORIES ******************************************/

fetch("http://localhost:5678/api/categories")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    loadDataCategorie(data);
  });

function loadDataCategorie(dataCategorie) {
  const filterContainer = document.createElement("div");
  const portfolioContainer = document.querySelector("#portfolio");
  portfolioContainer
    .querySelector("h2")
    .insertAdjacentElement("afterend", filterContainer);

  const btnAll = document.createElement("button");
  btnAll.classList.add("btn_filter", "btn_filter-all");
  btnAll.textContent = "Tous";
  filterContainer.appendChild(btnAll);
  filterContainer.classList.add("filter_container");
  btnAll.addEventListener("click", function () {
    loadDataWorks(works);
  });

  const btnId0 = document.createElement("button");
  btnId0.classList.add("btn_filter");
  btnId0.textContent = dataCategorie[0].name;
  filterContainer.appendChild(btnId0);
  btnId0.addEventListener("click", function () {
    const btnId0Filter = works.filter(function (dataFilter) {
      return dataFilter.category.name === "Objets";
    });
    loadDataWorks(btnId0Filter);
  });

  const btnId1 = document.createElement("button");
  btnId1.classList.add("btn_filter");
  btnId1.textContent = dataCategorie[1].name;
  filterContainer.appendChild(btnId1);
  btnId1.addEventListener("click", function () {
    const btnId1Filter = works.filter(function (dataFilter) {
      return dataFilter.category.name === "Appartements";
    });
    loadDataWorks(btnId1Filter);
  });

  const btnId2 = document.createElement("button");
  btnId2.classList.add("btn_filter");
  btnId2.textContent = dataCategorie[2].name;
  filterContainer.appendChild(btnId2);
  btnId2.addEventListener("click", function () {
    const btnId2Filter = works.filter(function (dataFilter) {
      return dataFilter.category.name === "Hotels & restaurants";
    });
    loadDataWorks(btnId2Filter);
  });
}
