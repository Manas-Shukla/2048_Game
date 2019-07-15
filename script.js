/*
    Code for 2048 game 
    Implementation is done considering MVC model
*/

// Model
var gameController = (function (){

    // object to store the state variables 
    var data = {
        gridSize : 0,
        grid : [],
        score : 0,
        bestScore : 0,
        prevGrid : [],
        prevScore : 0
    };

    var getRandomPos = (grid) => {
        var emptyPos = [];
        grid.forEach((c,i)=>{
            c.forEach((d,j)=>{
                if(d===0)emptyPos.push([i,j]);
            })
        });
        return emptyPos.length!==0 && emptyPos[Math.floor(Math.random()*emptyPos.length)];
    };
    var CloneGrid = (grid) => {
        var gridClone = [];
        for(let i=0;i<grid.length;i++){
            gridClone.push(grid[i].slice());
        }
        return gridClone;
    }

    var isEqual = (grid1,grid2) => {
        for(let i=0;i<grid1.length;i++){
            for(let j=0;j<grid1[i].length;j++){
                if(grid1[i][j]!==grid2[i][j])return false;
            }
        }
        return true;
    };
    // return an object with required methods
    return {
        
        init : (n) => {
            /*
            initialise score and grid with two random cells 
            */

           /* code here */
           if(n<=0)return false;

           data.gridSize=n;
           data.grid = new Array(n);
           for(let i=0;i<n;i++){
               data.grid[i] = new Array();
               for(let j=0;j<n;j++){
                   data.grid[i].push(0);
               }
           }
           
           const pos1 = getRandomPos(data.grid);
           data.grid[pos1[0]][pos1[1]]=2;
           const pos2 = getRandomPos(data.grid);
           data.grid[pos2[0]][pos2[1]]=2;

           data.score = 0;
           data.bestScore = 0;
           data.prevGrid = [];
           data.prevScore = 0;
        },

        getGrid : () => {
            return data.grid;
        },

        getScore : () => {
            return data.score;
        },

        getBestScore : () => {
            return data.bestScore;
        },

        undoMove : () => {
            /* set the grid equal previous Grid 
                and prevGrid = NULL;
                also update the score,
                // undo must be disabled after this
                
            */
           data.grid = data.prevGrid;
           data.prevGrid = [];
           data.score = date.prevScore;
           data.prevScore = 0;

        },

        playMove : (move) => {
            /* here move is
                0 = left,1 = right,2 = up,3 = down

                operations to perform
                #1.update the grid according to moves
                #2.get the trantions cells 
                #3.update score and return transition cells.

            */

            /* code here */
            let cnt = 0;
            const gridSize = data.gridSize;
            const tmpGrid = CloneGrid(data.grid);
            if(move===0){
                
                for(let i=0;i<gridSize;i++){
                    let nonEmptyCell=[];
                    // get non empty cells
                    for(let j=0;j<gridSize;j++){
                        if(data.grid[i][j]!==0)
                            nonEmptyCell.push(data.grid[i][j]);
                    }
                    // slide them to left
                    
                    for(let j=0;j<nonEmptyCell.length-1;j++){
                        if(nonEmptyCell[j]===0)continue;
                        if(nonEmptyCell[j]===nonEmptyCell[j+1]){
                            nonEmptyCell[j] *= 2;
                            nonEmptyCell[j+1] = 0;
                            cnt += nonEmptyCell[j];
                        }
                    }
                    
                    //set the final grid;
                    let ptr1 =0,ptr2=0;//ptr to grid[i] and nonEmptyCell
                    while(ptr1<gridSize){
                        if(ptr2===nonEmptyCell.length){
                            data.grid[i][ptr1++] = 0;
                        }
                        else if(nonEmptyCell[ptr2]!==0){
                            data.grid[i][ptr1++] = nonEmptyCell[ptr2++];
                        }
                        else ptr2++;
                    }
                }
            }
            else if(move===1){
                for(let i=0;i<gridSize;i++){
                    let nonEmptyCell=[];
                    // get non empty cells
                    for(let j=gridSize-1;j>=0;j--){
                        if(data.grid[i][j]!==0)
                            nonEmptyCell.push(data.grid[i][j]);
                    }
                    // slide them to right
                    
                    for(let j=0;j<nonEmptyCell.length-1;j++){
                        if(nonEmptyCell[j]===0)continue;
                        if(nonEmptyCell[j]===nonEmptyCell[j+1]){
                            nonEmptyCell[j] *= 2;
                            nonEmptyCell[j+1] = 0;
                            cnt += nonEmptyCell[j];
                        }
                    }
                    
                    //set the final grid;
                    let ptr1 =gridSize-1,ptr2=0;//ptr to grid[i] and nonEmptyCell
                    while(ptr1>=0){
                        if(ptr2===nonEmptyCell.length){
                            data.grid[i][ptr1--] = 0;
                        }
                        else if(nonEmptyCell[ptr2]!==0){
                            data.grid[i][ptr1--] = nonEmptyCell[ptr2++];
                        }
                        else ptr2++;
                    }
                }
            }
            else if(move===2){
                for(let i=0;i<gridSize;i++){
                    let nonEmptyCell=[];
                    // get non empty cells
                    for(let j=0;j<gridSize;j++){
                        if(data.grid[j][i]!==0)
                            nonEmptyCell.push(data.grid[j][i]);
                    }
                    // slide them to up
                    
                    for(let j=0;j<nonEmptyCell.length-1;j++){
                        if(nonEmptyCell[j]===0)continue;
                        if(nonEmptyCell[j]===nonEmptyCell[j+1]){
                            nonEmptyCell[j] *= 2;
                            nonEmptyCell[j+1] = 0;
                            cnt += nonEmptyCell[j];
                        }
                    }
                    
                    //set the final grid;
                    let ptr1 =0,ptr2=0;//ptr to grid[i] and nonEmptyCell
                    while(ptr1<gridSize){
                        if(ptr2===nonEmptyCell.length){
                            data.grid[ptr1++][i] = 0;
                        }
                        else if(nonEmptyCell[ptr2]!==0){
                            data.grid[ptr1++][i] = nonEmptyCell[ptr2++];
                        }
                        else ptr2++;
                    }
                }
            }
            else{
                for(let i=0;i<gridSize;i++){
                    let nonEmptyCell=[];
                    // get non empty cells
                    for(let j=gridSize-1;j>=0;j--){
                        if(data.grid[j][i]!==0)
                            nonEmptyCell.push(data.grid[j][i]);
                    }
                    // slide them to down
                    
                    for(let j=0;j<nonEmptyCell.length-1;j++){
                        if(nonEmptyCell[j]===0)continue;
                        if(nonEmptyCell[j]===nonEmptyCell[j+1]){
                            nonEmptyCell[j] *= 2;
                            nonEmptyCell[j+1] = 0;
                            cnt += nonEmptyCell[j];
                        }
                    }
                    
                    //set the final grid;
                    let ptr1 =gridSize-1,ptr2=0;//ptr to grid[i] and nonEmptyCell
                    while(ptr1>=0){
                        if(ptr2===nonEmptyCell.length){
                            data.grid[ptr1--][i] = 0;
                        }
                        else if(nonEmptyCell[ptr2]!==0){
                            data.grid[ptr1--][i] = nonEmptyCell[ptr2++];
                        }
                        else ptr2++;
                    }
                }
            }
            // skipping step2 for now
            prevGrid = tmpGrid;
            prevScore = data.score;
            data.score += cnt;
            // generate a new pos 
            const pos = getRandomPos(data.grid);
            const flag = isEqual(data.grid,tmpGrid);
            if(!flag && pos!==false)data.grid[pos[0]][pos[1]]=[2,4][Math.floor(Math.random()*2)];

        },
        
        checkStatus : () => {
            // return winning(1) or loosing(-1) or none(0) status
            let filled=true,win=false;
            const win_var = 2048;
            data.grid.forEach((c,i)=>{
                c.forEach((d,j)=>{
                    if(d!==0)filled=false;
                    if(d===win_var)win = true;
                })
            });
            
            if(win)return 1;
            else if(filled) return -1;
            else return 0;
        }

    };

})();

// View
var UIController = (function(){
    
    // this object contains all the neccessary DOM strings(ids,tags...)
    var DOMstrings = {
        newGame : 'newGame',
        undo : 'undo',
        score : 'score',
        bestScore : 'bestscore',
        mainGrid : 'grid'
    };

    // mappings of value to their color
    var colorMap = new Map() ;
    // initialise map here;
    colorMap.set(0,'#FFFFFF');
    colorMap.set(2,'#808080');
    colorMap.set(4,'#000080');
    colorMap.set(8,'#00FF00');
    colorMap.set(16,'#FF00FF');
    colorMap.set(32,'#FFFF00');
    colorMap.set(64,'#FFA500');
    colorMap.set(128,'#FF0000');
    colorMap.set(256,'#808000');
    colorMap.set(512,'#00FFFF');
    colorMap.set(1024,'#800080');
    colorMap.set(2048,'#000000');

    // return an object with required methods
    return {
        
        updateScore : (s) => {
            /* code here */
            document.getElementById(DOMstrings.score).innerHTML = s;
        },
        
        updateBestScore : (bs) => {
            /* code here */
            document.getElementById(DOMstrings.bestScore).innerHTML = bs;
        },

        setGrid : (grid) => {
            /* code here */
            let html = '<div class="btn-group-vertical">';
            for(let i=0;i<grid.length;i++){
                html += '<div class="btn-group">';
                for(let j=0;j<grid[i].length;j++){
                    //<button type="button" class="btn btn-primary">Apple</button>
                    const col = colorMap.get(grid[i][j]);
                    let val = grid[i][j].toString();
                    val = ' '.repeat(4-val.length)+val;
                    html += `<button type="button" class="btn btn-primary"
                            style="background-color:${col}">${val}</button>`
                }
                html += '</div>'
            }
            html += '</div>';
            document.getElementById(DOMstrings.mainGrid).innerHTML = html;
        },  

        moveCells : (arr_of_cells) => {
            /* code here */
        },

        notifyWin : (msg) => {
            /* code here */
            alert(msg);
        },

        notifyLose : (msg) => {
            /* code here */
            alert(msg);
        },
        getDOMstrings : () => {
            return DOMstrings;
        }
    };


})();

//Controller
var controller  = (function(gameCtrl,UICtrl){
    
    // grid size;
    const size = 4;
    const DOMstrings = UICtrl.getDOMstrings();

    // define all the event listeners here 
        
    var newGameListener = () => {
        initialise(size);
    };

    var undoListener = () => {
        /* code here */
    };
    var playGAME = (move)=>{
        /* operations to be performed
            #1.playMove(move) to update model 
            #2.setGrid of UI to update view
            #3.update score and checkStatus 
            #4.if win or loose then notify
            #5.else wait for event again
         */
        gameCtrl.playMove(move);
        UICtrl.setGrid(gameCtrl.getGrid());
        UICtrl.updateScore(gameCtrl.getScore());
        UICtrl.updateBestScore(gameCtrl.getBestScore());

        const status = gameController.checkStatus();
        if(status===1){
            // won
            UICtrl.notifyWin('YOU WON!');
        }
        else if(status===-1){
            //lost
            UICtrl.notifyLose('YOU LOST :P');
        }
        
        
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

    var initialise = (n) => {
            /* n here is the size of grid 
                operations to be performed 
                #1.initialise model
                #2.update the view 
                #3.install the eventListeners
            */
           gameCtrl.init(n);
           UICtrl.setGrid(gameCtrl.getGrid());
           UICtrl.updateScore(0);
           UICtrl.updateBestScore(0);
           setUpEventListeners();
    };

    // return an object with required methods
    return {
        init : ()=> {
            initialise(size);
        }
    };


})(gameController,UIController);


//call the controller to trigger the game
//controller.init();
var x= 1;
export default x;
