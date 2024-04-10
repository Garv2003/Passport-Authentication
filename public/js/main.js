const loginBtn = document.getElementById("loginBtn");
const signbtn = document.getElementById("signBtn");

const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmPassword");
const name = document.getElementById("name");
const email = document.getElementById("email");

function showToast(message) {
  Toastify({
    text: message,
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

if (window.location.pathname === "/login") {
  showToast("Welcome to the website");
}

loginBtn?.addEventListener("click", async (e) => {
  e.preventDefault();

  console.log("clicked login button");

  if (!username.value || !password.value) {
    showToast("Please fill all the fields");
    return;
  }

  if (username.value.length < 4) {
    showToast("Username must be at least 4 characters long");
    return;
  }

  if (password.value.length < 4) {
    showToast("Password must be at least 4 characters long");
    return;
  }

  try {
    const response = await axios.post("/login", {
      username: username.value,
      password: password.value,
    });

    if (response.data.status === "success") {
      showToast("Logged in successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return;
    }

    if (response.data.status === "error") {
      showToast("Invalid username or password");
      return;
    }

    showToast("Username or password is incorrect please try again");
  } catch (error) {
    showToast("Invalid username or password");
  }
});

signbtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    if (
      !name.value ||
      !email.value ||
      !username.value ||
      !password.value ||
      !confirmpassword.value
    ) {
      showToast("Please fill all the fields");
      return;
    }

    if (username.value.length < 4) {
      showToast("Username must be at least 4 characters long");
      return;
    }

    if (password.value !== confirmpassword.value) {
      showToast("Password does not match");
      return;
    }

    const response = await axios.post("/signin", {
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value,
    });

    if (response.data.success) {
      showToast("User created successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      showToast(response.data.message);
    }
  } catch (error) {
    showToast(error.response.data.message);
  }
});
