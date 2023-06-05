/***********************************  LOGIN ******************************************/

const logForm = document.querySelector("form");

logForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  /* creation d'un objet pour recuperer le mail et le mdp*/
  const logUser = {
    email: e.target.querySelector("#email").value,
    password: e.target.querySelector("#password").value,
  };
  /* fetch la route USERS de l'API */
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logUser),
  });

  /* si la condition est vrai alors redirige vers page d'accueil sinon affiche un message d'erreur */
  if (response.ok) {
    const data = await response.json();
    // console.log(data);
    window.sessionStorage.setItem("token", data.token);
    window.location.href = "../index.html";
  } else {
    const logError = document.querySelector(".error");
    logError.textContent = "Les informations sont incorrects";
    logError.classList.add("error");
  }
});
