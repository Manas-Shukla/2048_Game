//class UI
class UIController{
    constructor(boardSize,jump){
        this.DOMstrings = {
            newGame : 'newGame',
            undo : 'undo',
            score : 'score',
            bestScore : 'bestscore',
            mainGrid : 'grid',
            timer : 'timer',
            m1:'m1',
            m2:'m2',
            m3:'m3'


        };
        this.boardSize = boardSize;
        this.jump = jump;
        var colorMap = new Map() ;
    // initialise map here;
        colorMap.set(0,"#FFFFFF");
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
        this.colorMap = colorMap;
        //this.DOMstrings = DOMstrings;
        //this.colorMap = colorMap;
        
    }
    updateScore(s){
        /* code here */
        document.getElementById(this.DOMstrings.score).innerHTML = s;
    }
    
    updateBestScore(bs){
        /* code here */
        document.getElementById(this.DOMstrings.bestScore).innerHTML = bs;
    }
    
    updateNextThreeMoves(moves){
        document.getElementById(this.DOMstrings.m1).innerHTML = moves[0];
        document.getElementById(this.DOMstrings.m2).innerHTML = moves[1];
        document.getElementById(this.DOMstrings.m3).innerHTML = moves[2];
    }
    setGrid(grid){
        /* code here */
        
        let docGrid = document.getElementById(this.DOMstrings.mainGrid);
        docGrid.innerHTML="";
        
        const n = grid.length;
        const boardSize = parseInt(docGrid.style.height);
        const step = boardSize/n;
        
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                
                var cell = document.createElement('div');
                cell.id = String(grid[i][j].getId());
                cell.innerHTML = `<div class="cellText">${grid[i][j].pval}</div>`;
                cell.style.position = "absolute";
                cell.style.top = grid[i][j].px*step + 'px';
                cell.style.left = grid[i][j].py*step + 'px';;
                cell.style.width = step + "px";
                cell.style.height = step + "px";
                cell.style.backgroundColor = this.colorMap.get(grid[i][j].pval);
                cell.style.border="2px solid green"
                cell.style.textAlign="center";
                docGrid.appendChild(cell);    
            }
        }
    } 

    updateTimer(t){
        let h = Math.floor(t/3600);
        let m = Math.floor((t-h*3600)/60);
        let s = Math.floor(t-m*60-h*3600);
        if(h<10)h = '0'+h;
        if(m<10)m = '0'+m;
        if(s<10)s = '0'+s;
        document.getElementById(this.DOMstrings.timer).innerHTML = h+':'+m+':'+s;
    }
    getStep(){
        
    }
    makeTransition(transtions,gridSize){
        /* code here */
        const step = parseInt(this.boardSize/gridSize);
        const jump = this.jump;
        transtions.forEach((tr,i)=>{
            let cellDoc = document.getElementById(String(tr.id));
            let t = {};
            t.id = tr.id;
            t.pval = tr.pval;
            t.nval = tr.nval;
            t.px = tr.px*step;
            t.nx = tr.nx*step;
            t.py = tr.py*step;
            t.ny = tr.ny*step;

            var thisObj = this;

            /* create a promise */
            new Promise((resolve,reject)=>{
                
                let aid = setInterval(animateCell,1,t);
            
                function animateCell(t){
                    if(t.px===t.nx && t.py===t.ny){
                        clearInterval(aid);
                        t.pval = t.nval;
                        resolve(t);
                        
                    }
                    else{
                        if(t.px<t.nx){
                            t.px+=jump;
                            if(t.px>t.nx)t.px = t.nx;
                            
                        }
                        else if(t.px>t.nx){
                            t.px-=jump;
                            if(t.px<t.nx)t.px = t.nx;
                        }
                        if(t.py < t.ny){
                            t.py+=jump;
                            if(t.py>t.ny)t.px = t.ny;
                            
                        }
                        else if(t.py>t.ny){
                            t.py-=jump;
                            if(t.py<t.ny)t.py = t.ny;
                        }
                        cellDoc.style.top = t.px + 'px';
                        cellDoc.style.left = t.py + 'px';
                        
                    }
                }
    
            })
            .then((t)=>{
                    cellDoc.innerHTML = `<div class="cellText">${t.pval}</div>`;
                    cellDoc.style.backgroundColor = thisObj.colorMap.get(t.pval);
            });

            
        });

    }

    
    notifyWin (msg){
        /* code here */
        window.alert(msg);
        window.location.reload();
    }

    notifyLose(msg){
        /* code here */
        window.alert(msg);
        window.location.reload();
    }
    getDOMstrings(){
        return this.DOMstrings;
    }


}