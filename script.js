//your code here
 const images = [
    { class: 'img1', url: 'https://picsum.photos/id/237/200/300' },
    { class: 'img2', url: 'https://picsum.photos/seed/picsum/200/300' },
    { class: 'img3', url: 'https://picsum.photos/200/300?grayscale' },
    { class: 'img4', url: 'https://picsum.photos/200/300/' },
    { class: 'img5', url: 'https://picsum.photos/200/300.jpg' },
  ];

  const container = document.getElementById("image-container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const para = document.getElementById("para");
  const message = document.getElementById("h");

  let selectedImages = [];

  function shuffleAndRenderImages() {
    container.innerHTML = "";
    para.textContent = "";
    message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    selectedImages = [];

    // Step 1: Pick 5 unique images
    const baseImages = [...images];
    const chosen = baseImages.sort(() => 0.5 - Math.random()).slice(0, 5);

    // Step 2: Randomly duplicate one
    const duplicate = chosen[Math.floor(Math.random() * chosen.length)];
    const finalImages = [...chosen, duplicate];

    // Step 3: Shuffle final images
    finalImages.sort(() => 0.5 - Math.random());

    // Step 4: Render images
    finalImages.forEach((img, index) => {
      const image = document.createElement("img");
      image.src = img.url;
      image.dataset.class = img.class;
      image.dataset.index = index;
	  image.classList.add(img.class);	
      image.style.cursor = "pointer";

      image.addEventListener("click", () => handleClick(image));
      container.appendChild(image);
    });
  }

  function handleClick(image) {
    if (selectedImages.length === 2) return;

    const index = image.dataset.index;
    const alreadySelected = selectedImages.find(img => img.dataset.index === index);
    if (alreadySelected) return;

    image.classList.add("selected");
    selectedImages.push(image);

    if (selectedImages.length > 0) {
      resetBtn.style.display = "inline-block";
    }

    if (selectedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }

  resetBtn.addEventListener("click", () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    para.textContent = "";
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
    message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  });

  verifyBtn.addEventListener("click", () => {
    const [img1, img2] = selectedImages;
    verifyBtn.style.display = "none";
    if (img1.dataset.class === img2.dataset.class) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  shuffleAndRenderImages();