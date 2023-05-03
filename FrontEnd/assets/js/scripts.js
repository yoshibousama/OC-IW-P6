/***********************************  WORKS ******************************************/

/* recuperer les données WORKS de l'API */
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

/* Fonction qui permet la creation de la gallery dynamiquement*/
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

/* recuperer les données CATEGORIES de l'API */
fetch("http://localhost:5678/api/categories")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    loadDataCategorie(data);
  });

/* fonction qui permet la creation des boutons dynamiquement*/
function loadDataCategorie(dataCategorie) {
  const filterContainer = document.createElement("div");
  const portfolioContainer = document.querySelector("#portfolio");
  portfolioContainer
    .querySelector("h2")
    .insertAdjacentElement("afterend", filterContainer);

  const btnAll = document.createElement("button");
  btnAll.classList.add("btn_filter-all");
  btnAll.textContent = "Tous";
  filterContainer.appendChild(btnAll);
  filterContainer.classList.add("filter_container");
  btnAll.addEventListener("click", function () {
    loadDataWorks(works);
  });

  /* boucle for pour eviter de repeter du code*/
  for (let i = 0; i < dataCategorie.length; i++) {
    const btnId = document.createElement("button");
    btnId.classList.add("btn_filter");
    btnId.textContent = dataCategorie[i].name;
    filterContainer.appendChild(btnId);
    btnId.addEventListener("click", function () {
      btnAll.classList.remove("btn_filter-all");
      btnAll.classList.add("btn_filter");
      const btnIdFilter = works.filter(function (dataFilter) {
        return dataFilter.category.id === dataCategorie[i].id;
      });
      loadDataWorks(btnIdFilter);
    });
  }
}
