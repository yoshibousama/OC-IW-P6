/***********************************  WORKS ******************************************/

/* fetch la route WORKS de l'API */
let works = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);

/* Fonction qui permet la creation de la gallery dynamiquement*/
function loadDataWorks(works) {
  document.querySelector(".gallery").innerHTML = "";
  for (let i = 0; i < works.length; i++) {
    const gallery = document.querySelector(".gallery");
    const figureElm = document.createElement("figure");
    const imgElm = document.createElement("img");
    imgElm.src = works[i].imageUrl;
    imgElm.setAttribute("alt", "photo de " + works[i].title);
    const figcaptionElm = document.createElement("figcaption");
    figcaptionElm.innerText = works[i].title;

    gallery.appendChild(figureElm);
    figureElm.appendChild(imgElm);
    figureElm.appendChild(figcaptionElm);
  }
}
loadDataWorks(works);

/***********************************  CATEGORIES ******************************************/

/* fetch la route CATEGORIES de l'API */
let categories = await fetch("http://localhost:5678/api/categories").then(
  (categories) => categories.json()
);
loadDataCategorie(categories);

/* fonction qui permet la creation des boutons dynamiquement*/
function loadDataCategorie(categories) {
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
  // enlevé les filtre en mode admin
  if (window.sessionStorage.getItem("token") !== null) {
    filterContainer.remove();
    const portfolioEdit = document.querySelector(".portfolio_edit");
    portfolioEdit.style.marginBlock = "139px 90px";
  }
  /* boucle for pour eviter de repeter du code*/
  for (let i = 0; i < categories.length; i++) {
    const btnId = document.createElement("button");
    btnId.classList.add("btn_filter");
    btnId.textContent = categories[i].name;
    filterContainer.appendChild(btnId);
    btnId.addEventListener("click", function () {
      btnAll.classList.remove("btn_filter-all");
      btnAll.classList.add("btn_filter");
      const btnIdFilter = works.filter(function (dataFilter) {
        return dataFilter.category.id === categories[i].id;
      });
      loadDataWorks(btnIdFilter);
    });
  }
}

/***********************************  ADMIN ******************************************/

// condition pour etre en mode admin
if (window.sessionStorage.getItem("token") !== null) {
  const login = document.querySelector(".login");
  login.innerText = "logout";
  login.addEventListener("click", function (e) {
    e.preventDefault();
    window.sessionStorage.removeItem("token");
    window.location.replace("./index.html");
  });

  // visuel de la page d'accueil en mode admin
  // la bannière top
  const adminBanner = document.querySelector(".admin_banner");
  adminBanner.style.display = null;
  // les boutons modifier
  const editImg = document.querySelector(".introduction_edit-img");
  editImg.style.display = null;
  const editArticle = document.querySelector(".introduction_edit-article");
  editArticle.style.display = null;
  const editGallery = document.querySelector(".portfolio_edit-gallery");
  editGallery.style.display = null;

  // fonction qui permet la creation de la gallery modal
  function loadDataModal(works) {
    const modalGallery = document.querySelector(".modal_gallery");
    modalGallery.innerText = "";
    for (let i = 0; i < works.length; i++) {
      const modalWorks = works[i];
      const modalFigureElm = document.createElement("figure");
      const modalImgElm = document.createElement("img");
      modalImgElm.src = modalWorks.imageUrl;
      modalImgElm.alt = modalWorks.title;
      const modalCaptionElm = document.createElement("figcaption");
      modalCaptionElm.innerText = "éditer";
      const modalDeleteElm = document.createElement("button");
      modalDeleteElm.className = "btn_delete";
      modalDeleteElm.id = `delete_${modalWorks.id}`;
      const modalLogoDeleteElm = document.createElement("i");
      modalLogoDeleteElm.className = "far fa-trash-alt";
      modalGallery.appendChild(modalFigureElm);
      modalFigureElm.appendChild(modalImgElm);
      modalFigureElm.appendChild(modalCaptionElm);
      modalFigureElm.appendChild(modalDeleteElm);
      modalDeleteElm.appendChild(modalLogoDeleteElm);

      // const modalFigureMove = document.querySelector(".modal_gallery figure");
      // modalFigureMove = modalWorks.id(1);
      // console.log(modalFigureMove);
      // const modalMoveElm = document.createElement("button");
      // modalMoveElm.className = "btn_move";
      // const modalLogoMoveElm = document.createElement("i");
      // modalLogoMoveElm.className = "fas fa-arrows-alt";
      // modalFigureMove.append(modalMoveElm);
      // modalMoveElm.append(modalLogoMoveElm);
    }
  }

  // open modal 1
  editGallery.addEventListener("click", function (e) {
    e.preventDefault();
    const modal1 = document.querySelector("#modal_1");
    modal1.style.display = null;
  });
  loadDataModal(works);
  deleteProject();

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
  });

  // preview photo dans la modal 2
  const modalFormPhoto = document.querySelector("#modal_formPhoto");
  modalFormPhoto.addEventListener("change", function (e) {
    console.log(e);
    if (e.target.files[0].size > 4000000) {
      return;
    }
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    document.querySelector(".modal_preview-photo").src = url;
    const modalPreview = document.querySelector(".modal_preview");
    modalPreview.style.display = null;
  });

  // Bouton add photo

  document
    .querySelector(".modal_form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      // Récupérer les données des inputs pour la création du nouvel élément
      const modalInputImg = document.getElementById("modal_formPhoto").files[0];
      const modalInputTitle = document.getElementById("modal_titleForm").value;
      const modalInputCategorie = document.getElementById(
        "modal_categorieForm"
      ).value;

      // Création du formData à envoyer
      const formData = new FormData();
      formData.append("image", modalInputImg);
      formData.append("title", modalInputTitle);
      formData.append("category", modalInputCategorie);

      let response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + window.sessionStorage.getItem("token"),
        },
        body: formData,
      });
      console.log(response);
      const modalPreview = document.querySelector(".modal_preview");
      modalPreview.setAttribute("style", "display: none");
      const modalPreviewPhoto = document.querySelector(".modal_preview-photo");
      modalPreviewPhoto.src = "";
      const modal2 = document.querySelector("#modal_2");
      modal2.style.display = "none";
      const gallery = document.querySelector(".gallery");
      gallery.innerText = "";
      const modalGallery = document.querySelector(".modal_gallery");
      modalGallery.innerText = "";

      loadDataWorks(works);
      loadDataModal(works);
      deleteProject();
    });

  // Supprimer une photo
  function deleteProject() {
    const deleteProject = document.getElementsByClassName("btn_delete");
    for (let i = 0; i < deleteProject.length; i++) {
      deleteProject[i].addEventListener("click", async function (e) {
        e.preventDefault();
        const id = deleteProject[i].id.split("_")[1];
        await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        });
        const gallery = document.querySelector(".gallery");
        gallery.innerText = "";
        loadDataModal(works);
        loadDataWorks(works);
      });
    }
  }

  // Supprimer la gallery
  function deleteGallery() {
    for (let i = 0; i < works.length; i++) {
      const id = works[i].id;
      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("token"),
          Accept: "application/json",
        },
      });
      const gallery = document.querySelector(".gallery");
      gallery.innerText = "";
      const modalGallery = document.querySelector(".modal_gallery");
      modalGallery.innerText = "";
      loadDataModal(works);
      loadDataWorks(works);
    }
  }
  document
    .querySelector(".modal_delete-gallery")
    .addEventListener("click", deleteGallery);

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
      const modalPreview = document.querySelector(".modal_preview");
      modalPreview.setAttribute("style", "display: none");
    }
  });
}
