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

// Récupération du token pour le mode admin
const tokenGet = window.localStorage.getItem("token");

// fonction qui permet la creation de la gallery modal
function loadDataModal(works) {
  const modalGallery = document.querySelector(".modal_gallery");
  modalGallery.innerText = "";
  for (let i = 0; i < works.length; i++) {
    const modalFigureElm = document.createElement("figure");
    const modalImgElm = document.createElement("img");
    modalImgElm.src = works[i].imageUrl;
    modalImgElm.alt = works[i].title;
    const modalCaptionElm = document.createElement("figcaption");
    modalCaptionElm.innerText = "éditer";
    const modalDeleteElm = document.createElement("button");
    modalDeleteElm.className = "btn_delete";
    const modalLogoDeleteElm = document.createElement("i");
    modalLogoDeleteElm.className = "far fa-trash-alt";
    modalGallery.appendChild(modalFigureElm);
    modalFigureElm.appendChild(modalImgElm);
    modalFigureElm.appendChild(modalCaptionElm);
    modalFigureElm.appendChild(modalDeleteElm);
    modalDeleteElm.appendChild(modalLogoDeleteElm);
  }
}

// condition pour etre en mode admin
if (tokenGet !== null) {
  const login = document.querySelector(".login");
  login.innerText = "logout";
  login.addEventListener("click", function (e) {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location.replace("./index.html");
  });

  const adminBanner = document.querySelector(".admin_banner");
  adminBanner.style.display = null;
  adminBanner.removeAttribute("aria-hidden");

  const editImg = document.querySelector(".introduction_edit-img");
  editImg.style.display = null;
  editImg.removeAttribute("aria-hidden");
  const editArticle = document.querySelector(".introduction_edit-article");
  editArticle.style.display = null;
  editArticle.removeAttribute("aria-hidden");
  const editGallery = document.querySelector(".portfolio_edit-gallery");
  editGallery.style.display = null;
  editGallery.removeAttribute("aria-hidden");

  // open modal 1
  editGallery.addEventListener("click", function (e) {
    e.preventDefault();
    const modalTarget = document.querySelector("#modal_1");
    modalTarget.style.display = null;
  });

  loadDataModal(works);

  // open modal 2
  const modalAddPhoto = document.querySelector(".modal_add-photo");
  modalAddPhoto.addEventListener("click", function (e) {
    e.preventDefault();
    const modal1 = document.querySelector("#modal_1");
    modal1.style.display = "none";
    const modal2 = document.querySelector("#modal_2");
    modal2.style.display = null;
  });

  // retourne modal 1
  const modalReturnBtn = document.querySelector(".modal_return-btn");
  modalReturnBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const modal1 = document.querySelector("#modal_1");
    modal1.style.display = null;
    const modal2 = document.querySelector("#modal_2");
    modal2.style.display = "none";
    modalFormPhoto.value = "";
  });

  // close modal
  document.querySelector("#modal_1").addEventListener("click", function (e) {
    const modal1 = document.querySelector("#modal_1");
    if (
      !e.target.closest("#modal_wrapper-1") ||
      e.target.closest("#modal_close-btn-1")
    ) {
      modal1.style.display = "none";
    }
  });
  document.querySelector("#modal_2").addEventListener("click", function (e) {
    const modal2 = document.querySelector("#modal_2");
    if (
      !e.target.closest("#modal_wrapper-2") ||
      e.target.closest("#modal_close-btn-2")
    ) {
      modal2.style.display = "none";
      modalFormPhoto.value = "";
      const modalPreview = document.querySelector(".modal_preview");
      modalPreview.setAttribute("style", "display: none");
      modalTitleForm.value = "";
    }
  });
}
