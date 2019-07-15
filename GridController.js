// GridController Class
class GridController{

    constructor(){
        // create an empty grid 
        this.gridSize = 0;
        this.grid = [];
        this.transitionHistory = [];
        this.gridHistory = [];
        this.nextMoves = [];
    }

    init(n){
        this.gridSize = n;
        
        if(n<=0)return false;

        this.grid = new Array(n);
        let id = 1;
        for(let i=0;i<n;i++){
            this.grid[i] = new Array();
            for(let j=0;j<n;j++){
                this.grid[i].push(new Cell(id++,0,i,j));
            }
        }
        
        const pos1 = this.getRandomPos();
        const val1 = this.getRandomVal();
        this.grid[pos1[0]][pos1[1]].pval=val1;
        this.grid[pos1[0]][pos1[1]].nval=val1;

        const pos2 = this.getRandomPos();
        const val2 = this.getRandomVal();
        this.grid[pos2[0]][pos2[1]].pval=val2;
        this.grid[pos2[0]][pos2[1]].nval=val2;

        this.gridHistory.push(this.cloneGrid());
        this.transitionHistory=[];
        this.nextMoves = [];
        
        for(let i=0;i<3;i++)this.nextMoves.push(this.getRandomVal());
        //console.log('g',this.nextMoves);
    }
    getRandomVal(){
        return [2,4][Math.floor(Math.random()*2)];
    }
    getGrid(){
        return this.grid;
    }
    getNumericGrid(){
        let gr = new Array(this.gridSize);
        for(let i=0;i<this.gridSize;i++){   
            gr[i] = new Array();
            for(let j=0;j<this.gridSize;j++){
                gr[i].push(this.grid[i][j].pval);
            }
        }
        return gr;
    }
    getDim(){
        return this.gridSize;
    }

    setGrid(grid1){
        this.grid = grid1;
        this.gridSize = grid1.length;
    }

    getRandomPos(){
        // takes nstate into account
        var emptyPos = [];
        this.grid.forEach((c,i)=>{
            c.forEach((d,j)=>{
                if(d.nval===0)emptyPos.push([i,j]);
            })
        });
        return emptyPos.length!==0 && emptyPos[Math.floor(Math.random()*emptyPos.length)];
    }

    getNextThreeMoves(){
        return this.nextMoves.slice(0,3);
    }

    cloneGrid(){
        var gridClone = new Array(this.gridSize);

        for(let i=0;i<this.grid.length;i++){
            gridClone[i] = new Array(this.gridSize);
            for(let j=0;j<this.gridSize;j++){
                gridClone[i][j] = this.grid[i][j];
            }
            
        }
        return gridClone;
    }

    isEqual(grid){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                if(grid[i][j].pval!==this.grid[i][j].nval)return false;
            }
        }
        return true;
    }

    playMove(move){
        /* here move is
            0 = left,1 = right,2 = up,3 = down
    
            operations to perform
            #1.update the grid according to moves
            #2.get the trantions cells 
            #3.return incremented score.
    
        */
    
        /* code here */
        let incrementedScore =0;
        var  playMoveHelper = (decFlag,cordFlag)=>{
            /* decFlag cordFlag are for decreasing loop and matrix transformation*/
            let cnt = 0;
            const gridSize = this.gridSize;
            const prevGrid = this.cloneGrid();
            if(cordFlag)this.swapRowandCol();
            for(let i=0;i<gridSize;i++){
                
                // get non empty cells and empty cell
                
                let nonEmptyCell=[];
                let emptyCell = [];
                for(let j=0;j<gridSize;j++){
                    
                    let j1 = j;
                    if(decFlag)j1 = gridSize-1-j;

                    if(this.grid[i][j1].pval!==0)
                        nonEmptyCell.push(this.grid[i][j1]);
                    else 
                        emptyCell.push(this.grid[i][j1]);
                }
                // slide nonEmpty to left
        
                for(let j=0;j<nonEmptyCell.length-1;j++){
                    if(nonEmptyCell[j].nval===0)continue;
                    if(nonEmptyCell[j].pval===nonEmptyCell[j+1].pval){
                        nonEmptyCell[j].nval *= 2;
                        nonEmptyCell[j+1].nval = 0;
                        cnt += nonEmptyCell[j].nval;
                    }
                }
                /* steps
                    #1.push nonempty cells of nonEmptyCell[] to grid[i]
                    #2.push empty cells of nonEmptyCell[] to grid[i]
                    #3.push empty cells of EmptyCell[] to grid[i]
                */

                
                this.grid[i] = [];
                for(let i1=0;i1<nonEmptyCell.length;i1++){
                    //#1
                    if(nonEmptyCell[i1].nval!==0){
                        if(cordFlag){
                            if(decFlag){
                                nonEmptyCell[i1].ny = i;
                                nonEmptyCell[i1].nx = gridSize-this.grid[i].length-1;
                            }
                            else{
                                nonEmptyCell[i1].ny = i;
                                nonEmptyCell[i1].nx = this.grid[i].length;
                            }
                        }
                        else{
                            if(decFlag){
                                nonEmptyCell[i1].nx = i;
                                nonEmptyCell[i1].ny = gridSize-this.grid[i].length-1;
                            }
                            else{
                                nonEmptyCell[i1].nx = i;
                                nonEmptyCell[i1].ny = this.grid[i].length;
                            }
                        }
                        if(decFlag)this.grid[i].unshift(nonEmptyCell[i1]);
                        else this.grid[i].push(nonEmptyCell[i1]);
                    }
                }
                    
                for(let i1=0;i1<nonEmptyCell.length;i1++){
                    //#2
                    if(nonEmptyCell[i1].nval===0){
                        if(cordFlag){
                            if(decFlag){
                                nonEmptyCell[i1].ny = i;
                                nonEmptyCell[i1].nx = gridSize-this.grid[i].length-1;
                            }
                            else{
                                nonEmptyCell[i1].ny = i;
                                nonEmptyCell[i1].nx = this.grid[i].length;
                            }
                        }
                        else{
                            if(decFlag){
                                nonEmptyCell[i1].nx = i;
                                nonEmptyCell[i1].ny = gridSize-this.grid[i].length-1;
                            }
                            else{
                                nonEmptyCell[i1].nx = i;
                                nonEmptyCell[i1].ny = this.grid[i].length;
                            }
                        }
                        if(decFlag)this.grid[i].unshift(nonEmptyCell[i1]);
                        else this.grid[i].push(nonEmptyCell[i1]);
                    }
                }

                for(let i1=0;i1<emptyCell.length;i1++){
                    //#3
                        
                        if(cordFlag){
                            if(decFlag){
                                emptyCell[i1].ny = i;
                                emptyCell[i1].nx = gridSize-this.grid[i].length-1;
                            }
                            else{
                                emptyCell[i1].ny = i;
                                emptyCell[i1].nx = this.grid[i].length;
                            }
                        }
                        else{
                            if(decFlag){
                                emptyCell[i1].nx = i;
                                emptyCell[i1].ny = gridSize-this.grid[i].length-1;
                            }
                            else{
                                emptyCell[i1].nx = i;
                                emptyCell[i1].ny = this.grid[i].length;
                            }
                        }
                        if(decFlag)this.grid[i].unshift(emptyCell[i1]);
                        else this.grid[i].push(emptyCell[i1]);
                    
                }
                
            }
            if(cordFlag)this.swapRowandCol();
            return cnt;   
        }
        
        if(move===0){
            incrementedScore = playMoveHelper(false,false);
        }
        else if(move===1){
            incrementedScore = playMoveHelper(true,false);
        }
        else if(move===2){
            incrementedScore = playMoveHelper(false,true);
        }
        else{
            incrementedScore = playMoveHelper(true,true);
        }
        // skipping step2 for now
        
        const pos = this.getRandomPos();
        
        if(pos!==false){

            this.grid[pos[0]][pos[1]].nval=this.nextMoves.shift();
        }
        this.nextMoves.push(this.getRandomVal());
        return incrementedScore;
    
    }

    swapRowandCol(){
        let newGrid = new Array(this.gridSize);
        for(let i=0;i<this.gridSize;i++){
            newGrid[i] = new Array(this.gridSize);
            for(let j=0;j<this.gridSize;j++){
                newGrid[i][j] = this.grid[j][i];
            }
        }
        this.grid = newGrid;
    }
    
    makeTransition(){
        let transitions = [];
        for(let i=0;i<this.gridSize;i++){
            for(let j=0;j<this.gridSize;j++){
                transitions.push(this.grid[i][j].makeTransition());
            }
        }
        this.gridHistory.push(this.cloneGrid());
        this.transitionHistory.push(transitions);
        return transitions;
    }

    undoMove(){
        if(this.gridHistory.length<1 || this.transitionHistory.length<1)return [];
        let undo_arr = [];
        
        undo_arr = this.transitionHistory.pop();
        for(let i=0;i<undo_arr.length;i++){
            this.grid[undo_arr[i].nx][undo_arr[i].ny].setNstate(undo_arr[i].pval,
                                                                undo_arr[i].px,
                                                                undo_arr[i].py
                                                                );
            this.grid[undo_arr[i].nx][undo_arr[i].ny].makeTransition();
            [undo_arr[i].pval,undo_arr[i].nval]=[undo_arr[i].nval,undo_arr[i].pval];
            [undo_arr[i].px,undo_arr[i].nx]=[undo_arr[i].nx,undo_arr[i].px];
            [undo_arr[i].py,undo_arr[i].ny]=[undo_arr[i].ny,undo_arr[i].py];
        }
        this.grid = this.gridHistory.pop();
        return undo_arr;
    }

    checkStatus(){
        // return winning(1) or loosing(-1) or none(0) status

        
        let empty=false,win=false,adSame=false;
        const win_var = 2048;
        for(let i=0;i<this.gridSize;i++){
            for(let j=0;j<this.gridSize;j++){
                if(this.grid[i][j].pval===0)empty = true;
                else if(this.grid[i][j].pval===win_var)win = true;
            }
        }
        
        
        for(let i=0;i<this.gridSize;i++){
            for(let j=0;j<this.gridSize-1;j++){
                if(this.grid[i][j].pval===this.grid[i][j+1].pval)adSame = true;
                
            }
        }
        for(let j=0;j<this.gridSize;j++){
            for(let i=0;i<this.gridSize-1;i++){
                if(this.grid[i][j].pval===this.grid[i+1][j].pval)adSame = true;
                
            }
        }
        
        if(win)return 1;
        else if(empty) return 0;
        else if(adSame)return 0;
        else return -1;
    }
}