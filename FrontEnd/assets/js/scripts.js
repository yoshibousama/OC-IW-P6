/***********************************  WORKS ******************************************/

/* fetch la route WORKS de l'API */
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

/* fetch la route CATEGORIES de l'API */
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
    .querySelector(".portfolio_edit")
    .insertAdjacentElement("afterend", filterContainer);

  const btnAll = document.createElement("button");
  btnAll.classList.add("btn_filter-all");
  btnAll.textContent = "Tous";
  filterContainer.appendChild(btnAll);
  filterContainer.classList.add("filter_container");
  btnAll.addEventListener("click", function () {
    loadDataWorks(works);
  });
  if (tokenGet !== null) {
    filterContainer.remove();
    const portfolioEdit = document.querySelector(".portfolio_edit");
    portfolioEdit.style.marginBlock = "139px 90px";
  }
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

/***********************************  ADMIN ******************************************/

// Récupération du token et variables des éléments pour le mode admin
const tokenGet = window.localStorage.getItem("token");
let log = document.querySelector(".login");
let modal = null;
let adminBanner = null;
let modificationBtn = null;

// Fonction pour logout
function logOut(e) {
  localStorage.clear();
}

// si la condition est vrai alors remplace login par logout, rend visible la bar admin et les liens "modifier"
if (tokenGet !== null) {
  log.innerHTML = " ";
  log.innerHTML = "logout";
  log.addEventListener("click", logOut);

  const adminBanner = document.querySelector(".admin_banner");
  adminBanner.style.display = null;
  adminBanner.removeAttribute("aria-hidden");

  const editImg = document.querySelector(".introduction_edit-img");
  editImg.style.display = null;
  editImg.removeAttribute("aria-hidden");
  const editGallery = document.querySelector(".portfolio_edit-gallery");
  editGallery.style.display = null;
  editGallery.removeAttribute("aria-hidden");
} else if (tokenGet == null) {
  log.innerHTML = "login";
}
