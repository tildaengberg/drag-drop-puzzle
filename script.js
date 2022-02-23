document.addEventListener('DOMContentLoaded', () => {


  var cardArray = [
    { img: "images/card-01.png" }, { img: "images/card-02.png" },
    { img: "images/card-03.png" }, { img: "images/card-04.png" },
    { img: "images/card-05.png" }, { img: "images/card-06.png" },
    { img: "images/card-07.png" }, { img: "images/card-08.png" },
    { img: "images/card-09.png" }, { img: "images/card-10.png" },
    { img: "images/card-11.png" }, { img: "images/card-12.png" },
    { img: "images/card-blank.png" }, { img: "images/card-blank.png" },
    { img: "images/card-blank.png" }, { img: "images/card-blank.png" },
    { img: "images/card-blank.png" }, { img: "images/card-blank.png" },
    { img: "images/card-blank.png" }, { img: "images/card-blank.png" },
    { img: "images/card-blank.png" }, { img: "images/card-blank.png" },
    { img: "images/card-blank.png" }, { img: "images/card-blank.png" }
  ];


  const facitBoard = cardArray.slice(0, 12);
  const rackContainer = document.querySelector('.rackContainer');
  const boardContainer = document.querySelector('.boardContainer');
  const movesDisplay = document.querySelector('#moves');
  const tempArray = cardArray;

  var draggedID;
  var dropID;
  var seconds = 0;
  var indexMove = 0;


  // Randomize board
  function mixUp(arr) {

    let tempIndex = arr.length / 2, randIndex;

    while (tempIndex > 0) {
      randIndex = Math.floor(Math.random() * tempIndex);
      tempIndex--;
      [arr[tempIndex], arr[randIndex]] = [arr[randIndex], arr[tempIndex]];
    }
    return arr;
  }


  // Set up game board
  function setBoard() {

    for (let i = 0; i < cardArray.length; i++) {
      card = document.createElement('img');
      card.setAttribute('src', cardArray[i].img.toString());
      card.setAttribute('data-id', i);

      if (i < 12) {
        rackContainer.appendChild(card);
      }
      else {
        boardContainer.appendChild(card);
      }
    }
    addEventListeners();
  }


  // Check if puzzle is solved
  function matchCheck() {

    var currentBoard = cardArray.slice(12, 24);

    if (JSON.stringify(currentBoard) == JSON.stringify(facitBoard)) {
      if (confirm('🎉 Congratulations! Click on OK to try again!\n\n Moves: ' + indexMove + '\n\n Time: ' + seconds)) {
        window.location.reload();
      }
    }
  }


  // Ticking seconds
  function clock() {
    seconds += 1;
    document.getElementById('time').innerText = seconds + " seconds";
  }


  // Listner for every move of pices
  function addEventListeners() {

    const dragListItems = document.querySelectorAll('img');

    dragListItems.forEach(item => {

      // Drag start
      item.addEventListener('dragstart', function dragStart(event) {
        event.target.style.opacity = "0";
        draggedID = this.getAttribute('data-id');
      });

      // Drag end
      item.addEventListener('dragend', function dragend(event) {
        event.target.style.opacity = "";
      });

      // Drag over
      item.addEventListener('dragover', function dragOver(event) {
        event.preventDefault();
      });

      // Drag enter
      item.addEventListener('dragenter', function dragEnter(event) {
        if (event.target == item) {
          event.target.style.opacity = "0";
        }
      });

      // Drag leave
      item.addEventListener('dragleave', function dragOver(event) {
        if (event.target == item) {
          event.target.style.opacity = "";
        }
      });

      // Drop
      item.addEventListener('drop', function drop(event) {
        event.preventDefault();

        if (event.target == item) {
          dropID = this.getAttribute('data-id');

          dragListItems[dropID].setAttribute('src', cardArray[draggedID].img);
          dragListItems[draggedID].setAttribute('src', cardArray[dropID].img);

          [cardArray[draggedID], cardArray[dropID]] = [cardArray[dropID], cardArray[draggedID]];

          indexMove++;
          movesDisplay.textContent = indexMove;
          event.target.style.opacity = "";

          matchCheck();
        }
      });
    });
  }


  // Restart and reload game
  function restartGame() {
    window.location.reload();
  }


  mixUp(tempArray);
  document.getElementById('restart').addEventListener('click', restartGame);
  setBoard();
  setInterval(clock, 1000);

});
