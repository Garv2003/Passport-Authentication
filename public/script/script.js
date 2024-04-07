const axios = require("axios");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("title");
  const image = formData.get("image");
  const price = formData.get("price");
  const response = await axios.post("http://localhost:3000/create", {
    title,
    image,
    price,
  });
  console.log(response);
  form.reset();
});
