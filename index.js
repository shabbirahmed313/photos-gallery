const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");
const inputffield = document.getElementById("input");

async function fetchImage() {
  let inputvalue = Number(inputffield.value);
  if (inputvalue > 10 || inputvalue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 1 and 10";
    return;
  }
  let imgs = "";
  try {
    const randomPage = Math.floor(Math.random() * 10);
    const apiKey = "B8S3zB8gCPVCvzpAhCRdfXg_aki8PZM_q5pAyzDUvlc";
    btnEl.style.display = "none";
    errorMessageEl.style.display = "none";
    galleryEl.style.display = "block";
    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=${inputvalue}&page=${randomPage}&client_id=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    result.forEach((pic) => {
      imgs += `<img src="${pic.urls.small}" alt="image"/>`;
    });
    galleryEl.innerHTML = imgs;
  } catch (error) {
    console.error(error);
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "An error happened, try again later";
    galleryEl.style.display = "none";
  } finally {
    btnEl.style.display = "block";
  }
}

btnEl.addEventListener("click", fetchImage);
