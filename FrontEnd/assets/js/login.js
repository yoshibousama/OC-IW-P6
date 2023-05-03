const logForm = document.querySelector("form");

logForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const logUser = {
    email: e.target.querySelector("#email").value,
    password: e.target.querySelector("#password").value,
  };
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logUser),
  });
  console.log(response);

  if (response.ok) {
    window.location.href = "../index.html";
    const data = await response.json();
    const token = data.token;
    const tokenData = JSON.stringify(token);
    window.sessionStorage.setItem("token", tokenData);
  } else {
    const logError = document.querySelector(".error");
    logError.textContent = "Les informations sont incorrects";
    logError.classList.add("error");
  }
});
