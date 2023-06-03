const potionsCard = document.getElementsByClassName("potions")[0];
const fade = document.querySelector("#fade");
const closeModal = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector(".modal-body");
const modalBodyInfo = document.querySelector(".modal-body-info")
const ingredientsInfo = document.querySelector(".ingredients-info")
const modalBtn = document.querySelector(".cart-button")

let idCount;

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[fade, closeModal].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});

function fetchingLocalJson() {
  fetch("potions.json")
    .then((response) => response.json())
    .then((response) => {
      const potionsArr = Object.values(response.potions);
      potionsArr.map((potion) => {
        const potionDiv = document.createElement("div");
        const potNameAndPrice = document.createElement("div");

        const potTitle = document.createElement("p");
        const potImage = document.createElement("img");
        const potPrice = document.createElement("p");

        potImage.setAttribute("src", potion.image);
        potTitle.textContent = `${potion.name} -`;
        potPrice.textContent = `$${potion.price}`;

        potNameAndPrice.classList.add("potNameAndPrice");
        potPrice.classList.add("price");

        potNameAndPrice.appendChild(potTitle);
        potNameAndPrice.appendChild(potPrice);

        potionDiv.appendChild(potImage);
        potionDiv.appendChild(potNameAndPrice);
        potionsCard.appendChild(potionDiv);

        potionDiv.classList.add("potion-div");

        let potionImageModalClone
        let titleName = document.createElement("h2")
        let ingredients = document.createElement("ul")

        const onOpenModal = () => {
          console.clear()
          modalBodyInfo.appendChild(modalBtn)
          if (potionDiv.click) {
            potionDiv.classList.add("potion-div-modal");
            const potionModal = document.querySelector(".potion-div-modal");
            for (const child of potionModal.children) {
              child.classList.add("potion-div-modal-child");
            }
          }
          const potionImageModal = document.querySelector(".potion-div-modal-child")
          potionImageModalClone = potionImageModal.cloneNode()
         
          
          titleName.textContent = `${potion.name}`
          ingredients.innerHTML = `${potion.ingredients.map(i => 
            `<li>${i}</li>`
            ).join("")
          }`
          
          ingredientsInfo.appendChild(ingredients)
          modalBody.appendChild(potionImageModalClone)
          modalBodyInfo.appendChild(titleName)
          modalBodyInfo.appendChild(ingredientsInfo)
        };

        const onCloseModal = () => {
          console.clear()
          modalBody.removeChild(potionImageModalClone)
          modalBodyInfo.removeChild(modalBtn)
          modalBodyInfo.removeChild(titleName)
          ingredientsInfo.removeChild(ingredients)
          modalBodyInfo.removeChild(ingredientsInfo)
          const potionModal = document.querySelector(".potion-div-modal");
          for (const child of potionModal.children) {
            child.classList.remove("potion-div-modal-child");
          }
          potionDiv.classList.remove("potion-div-modal");
        };

        potionDiv.addEventListener("click", toggleModal);
        potionDiv.addEventListener("click", onOpenModal);
        fade.addEventListener("click", onCloseModal);
        closeModal.addEventListener("click", onCloseModal);
      });
    });
}

fetchingLocalJson();