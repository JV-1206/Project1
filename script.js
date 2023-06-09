
let timerInterval
Swal.fire({
  title: "Let's start playing!",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})


const boardCards = document.querySelector(".board");
const colors = ["blue", "red", "yellow", "orange"];
const colorsShuffle = [...colors, ...colors];
const cards = colorsShuffle.length;


let revealedCount = 0;
let currentCard = null;
let lastMove = false;

function createCard(color) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.setAttribute("data-color",color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (
            lastMove
            || revealed === "true"
            || element === currentCard
        ) {
            return;
        }

        element.style.background = color;

        if (!currentCard) { 
            currentCard = element;

            return;

        }
        const matchingCard= currentCard.getAttribute("data-color");

        if (matchingCard === color) {
            currentCard.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");


            currentCard = null;
            lastMove = false;
            revealedCount += 2;


            if (revealedCount === cards) {
                Swal.fire("You Won!");
            }
            return;
        }
        

        lastMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            currentCard.style.background = null;
            lastMove = false;
            currentCard = null;

        }, 1100);
    });



    return element;
}


for (let i = 0; i < cards; i++) {
    const randomIndex = Math.floor(Math.random() * colorsShuffle.length);
    const color = colorsShuffle[randomIndex];
    const card = createCard(color);

    colorsShuffle.splice(randomIndex, 1);
    boardCards.appendChild(card);

    
}

const restartGame = document.querySelector('.restart-btn')
restartGame.addEventListener('click', function(){
Swal.fire({
    title: 'Are you really sure you want to restart?',
    showCancelButton: true,
    confirmButtonText: "Yessss, I'm really sure",
    denyButtonText: `Don't save`,
  }).then((result) => {
   
    if (result.isConfirmed) {
        window.location.reload();
        return false;
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

    
  });








