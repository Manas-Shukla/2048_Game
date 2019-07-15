/*
    Code for 2048 game 
    Implementation is done considering MVC model
*/
//new GameController(new GridController(),new Score(),new Clock(),new UIController(),new ScoreRepo());
//Main Game Controller Class

class GameController{

    constructor(gridController,score,clock,uIController,scoreRepo){
        this.GridController = gridController;
        this.Score = score;
        this.Clock = clock;
        this.UIController = uIController;
        this.ScoreRepo = scoreRepo;
    }

    init(n){
        /* operations to be performed
        #1.initialise all the objects
        #2. install event listeners
        */

       const DOMstrings = this.UIController.getDOMstrings();

       // define all the event listeners here 
       var thisObj = this;
       var newGameListener = () => {

            var bs = thisObj.Score.getScore();
            
            thisObj.ScoreRepo.setBestScore(bs);
        
           thisObj.init(n);
       };
   
       var undoListener = () => {
           /* code here */
           let undoTransitions = thisObj.GridController.undoMove();
           //console.log(undoTransitions);
           thisObj.UIController.makeTransition(undoTransitions,thisObj.GridController.getDim());
           thisObj.UIController.updateScore(thisObj.Score.undoScore());
       };

       var playGAME = (move)=>{
           /* operations to be performed
               #1.playMove(move) to update model 
               #2.setGrid of UI to update view
               #3.update score and checkStatus 
               #4.if win or loose then notify
               #5.else wait for event again
            */
           const cnt = thisObj.GridController.playMove(move);
           let transtions = thisObj.GridController.makeTransition();
           thisObj.UIController.makeTransition(transtions,thisObj.GridController.getDim());
           thisObj.Score.setScore(thisObj.Score.getScore()+cnt);
           thisObj.UIController.updateScore(thisObj.Score.getScore());
           thisObj.UIController.updateNextThreeMoves(thisObj.GridController.getNextThreeMoves());
   
           const status = thisObj.GridController.checkStatus();
           
           if(status===1){
               // won
               
               setTimeout(thisObj.UIController.notifyWin,2000,"You Won!");
           }
           else if(status===-1){
               //lost
               
               setTimeout(thisObj.UIController.notifyLose,2000,"You Lose!");
           }
            var bs = thisObj.Score.getScore();
            
            thisObj.ScoreRepo.setBestScore(bs);
           
           
       };
       var updateTimer = ()=>{
            
            thisObj.Clock.setTime(thisObj.Clock.getTime()+1);
            thisObj.UIController.updateTimer(thisObj.Clock.getTime());
       };
       var setUpEventListeners = () => {
           document.getElementById(DOMstrings.newGame).addEventListener('click',newGameListener);
           document.getElementById(DOMstrings.undo).addEventListener('click',undoListener);
           
           
           document.onkeydown = (event) => {
               if (event.keyCode === 37 || event.which === 37) {
                   //left
                   playGAME(0);
               }
               else if(event.keyCode === 39 || event.which === 39) {
                   //right
                   playGAME(1);
               }
               else if(event.keyCode === 38 || event.which === 38) {
                   //up
                   playGAME(2);
               }
               else if(event.keyCode === 40 || event.which === 40) {
                   //down
                   playGAME(3);
               }
           };

       };
   
       
        /* n here is the size of grid 
            operations to be performed 
            #1.initialise model
            #2.update the view 
            #3.install the eventListeners
        */
        thisObj.GridController.init(n);
        thisObj.UIController.setGrid(thisObj.GridController.getGrid());
        thisObj.UIController.updateScore(0);
        //console.log(thisObj.GridController.getNextThreeMoves());
        thisObj.UIController.updateNextThreeMoves(thisObj.GridController.getNextThreeMoves());
        thisObj.Clock.setTime(0);
        
        thisObj.Score.setScore(0);
        var bs = thisObj.ScoreRepo.getBestScore();
        if(!bs)bs = 0;
        thisObj.UIController.updateBestScore(bs);
        //start timer
        setInterval(updateTimer,1000);
       //activate event listner
        setUpEventListeners();



    }
}





function loadgame(){
    const uname = prompt("Enter your name to continue ")
    const size= 6;
    const boardSize = 500;
    const jump = 1;
    const fontSize = boardSize/size;
    document.getElementById('grid').style.width=boardSize+'px';
    document.getElementById('grid').style.height=boardSize+'px';
    document.getElementById('enjoy').innerText = "User:"+uname;
    
    new GameController(
        new GridController(),
        new Score(),
        new Clock(0),
        new UIController(boardSize,jump),
        new ScoreRepo('bestscore')
        ).init(size);
    
}




