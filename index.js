/** @format */

function register(e) {
  e.preventDefault();

  let formdata = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    username: document.getElementById("username").value,
    mobile: document.getElementById("mobile").value,
    description: document.getElementById("description").value,
  };
  formdata = JSON.stringify(formdata);

  fetch("https://masai-api-mocker.herokuapp.com/auth/register", {
    method: "POST",
    body: formdata,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function login(e) {
  e.preventDefault();
  let formdata = {
    username: document.getElementById("lUsername").value,
    password: document.getElementById("lPassword").value,
  };
  let body = JSON.stringify(formdata);

  fetch("https://masai-api-mocker.herokuapp.com/auth/login", {
    method: "POST",
    body: body,

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      let u = formdata.username;
      let t = res.token;
      getmyProfile(u, t);
      if (u && t) {
        window.location.href = "homepage.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getmyProfile(username, token) {
  fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
