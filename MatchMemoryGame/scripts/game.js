"use strict";

/* 
    Author: Maitland Andrus
    Date: 4/20/23

*/    

//Create a base array
var baseArray = [

    {
        name:'Soldier76',
        img: 'images/Soldier-76.png'
    },
    {
        name:'Reaper',
        img: 'images/Reaper.png'
    },
    {
        name:'Pharah',
        img: 'images/Pharah.png'
    },
    {
        name:'McCree',
        img: 'images/McCree.png'
    },
    {
        name:'Genji',
        img: 'images/Genji.png'
    },
    {
        name:'DVa',
        img: 'images/DVa.png'
    },

    {
        name:'Bastion',
        img: 'images/Bastion.png'
    },
    {
        name:'Ana',
        img: 'images/Ana.png'
    } 
];


//Set Global Variables
var guessCounter = 0;
var title = document.createTextNode('Guess Count:');



//On load perform all the following:
    //Shuffle array
    //Get the value from the input
    //Set the style
window.addEventListener('load', function(){
    shuffle(baseArray);
    var start = document.getElementById("startButton");
    start.addEventListener("click", getValue);
    styleRule();

});


//set the value. If its something greater than 8 set it to 8
function getValue(){
    var pairNum = document.querySelector('input').value;
    if(pairNum > 8){
        pairNum = 8;
    }

    //Hide the game menu
    var removeMenu = document.getElementById('game');
    removeMenu.style.display = 'none';
    createGameBoard(pairNum);
}//end of getValue

//Create the boardgame 
function createGameBoard(pairNum){
    var cardTable = document.createElement('table');
    var symbolArray1 = baseArray.slice(0, pairNum);
    var symbolArray2 = baseArray.slice(0, pairNum);
    var finalDeck = symbolArray1.concat(symbolArray2);
    shuffle(finalDeck);
    setGuesses();

    //create the cardTable
    var cardTableRow = document.createElement('th');
    document.body.appendChild(cardTable);
    
    for(var k = 0; k < pairNum * 2; k++){
        var cardTableRow = document.createElement('th');
        cardTable.appendChild(cardTableRow);
      setAttributes(k, cardTableRow, finalDeck);
    } 
}//end of createGameBoard

function setAttributes(k, cardTableRow, finalDeck) {
  var card = document.createElement('img');

  card.setAttribute('class','cardBack');
  card.setAttribute(`card-key-`+k, k);

    card.addEventListener('click', function() {
        flip(card, finalDeck, k);
   });


  cardTableRow.appendChild(card);
}//end of setAttributes


function flip(card, finalDeck, id){

    //the .matches function looks for any remaining cards that have the class "cardBack"
    //if they do, then we can select it
   if(card.matches('.cardBack')){
    card.setAttribute('class', 'cardSelected');
    card.setAttribute('src', finalDeck[id].img);
   }
    
 

    var matchTest = document.querySelectorAll('img.cardSelected');

    if(matchTest.length === 2 && matchTest[0].src === matchTest[1].src ){
        for(var i = 0; i<matchTest.length; i++){
            matchTest[i].setAttribute('class', 'cardMatched');
         
      
        }

        console.log('Match!');

        guessCounter ++;
        document.getElementById('score').textContent = 'Guess Count: ' + guessCounter;
    } 

    
    setTimeout(function(){

    if(matchTest.length === 2 && matchTest[0].src != matchTest[1].src && matchTest[0] != matchTest[1].src){
       
        matchFail(matchTest);
    }
}, 600);

    //Use querySelected all to check all cards that have a cardBack
    //if we find that there are no cards with the cardBack attribute
    //hide the card table
    //display a win message
    var cardsCompleted = document.body.querySelectorAll('img.cardBack');
    if(cardsCompleted.length === 0){
        var cardTable = document.querySelector('table');
        cardTable.style.display = 'none';
        console.log('you Win!');
        var head2 = document.createElement('h2');
        var winningHeading = document.createElement('p');
        var winMessage = document.createTextNode('You Win!');
        winningHeading.appendChild(winMessage);
        head2.appendChild(winningHeading);
        document.body.appendChild(head2);

    }
}//end of flip



//if a card fails, we call this function
function matchFail(matchTest){
  
        console.log('no Match!');
        //set the class back to cardBack and change the image to a purple image(the actual card back, this hides the image on top
        if(matchTest[1].hasAttribute('.cardMatched')===false){

        matchTest[0].setAttribute('class','cardBack');
        matchTest[1].setAttribute('class','cardBack'); 
        matchTest[0].setAttribute('src','images/background.jpg' );
        matchTest[1].setAttribute('src','images/background.jpg' );
        guessCounter++;
    //display the guess count
    document.getElementById('score').textContent = 'Guess Count: ' + guessCounter;
}


}//end of matchFail


/*
    This function is to help with the clutter of createBoard
    Here we make a div and a p and set the p attribute to id 
    score. This allows us to update it in other functions.
    Then we append it into other functions
*/
function setGuesses(){
    var title = document.createTextNode('Guess Count:');
    var div1 = document.createElement('div');
    var guessCountDisplay = document.createElement('p');
    guessCountDisplay.setAttribute('id','score');
    guessCountDisplay.appendChild(title);
    div1.appendChild(guessCountDisplay);
    document.body.appendChild(div1);
  
}//end of setGuesses

//sort the array
function shuffle(baseArray){
    baseArray.sort(() => Math.random() - 0.5);
}//end of shuffle


//This function controls all the styling
function styleRule(){
var styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  //add style rules to the embedded style sheet
  document.styleSheets[document.styleSheets.length-1].
  insertRule(
     "table, th { \ \
       text-align: center;\
       display: inline-block;\
       border-radius: 10px;\
}", 0);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   "img { \ \
     height: 120px;\
     width: 90px; \
}", 1);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   ".cardBack { \ \
     background-color: purple;\
     border-radius: 8px;\
}", 2);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   ".cardBack > img { \ \
     display: none;\
}", 3);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   ".cardSelected { \ \
     background-color: white;\
}", 4);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   ".cardMatched { \ \
     background-color: white;\
     display: block\
}", 5);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   "body { \ \
    margin-left: 15%;\
}", 6);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   "h1, p, div{ \ \
    font-family: Arial, sans-serif;\
}", 7);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   "h1, p{ \ \
    margin-left: 10%\
}", 8);

document.styleSheets[document.styleSheets.length-1].
insertRule(
   "div > button { \ \
    background-color: white;\
    border-radius: 10px;\
}", 9);


} //end of style rules


