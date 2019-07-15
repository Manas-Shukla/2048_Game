//Class Cell
class Cell{
    constructor(id,val,x,y){
        /* set id and pstate and nstate */
        this.id = id;
        this.pval = val;
        this.nval = val;
        this.px = x;
        this.py = y;
        this.nx = x;
        this.ny = y;
    }

    init(val,x,y){
        this.pval = val;
        this.px = x;
        this.py = y;
        this.nx = x;
        this.ny = y;
    }

    getId(){
        return this.id;
    }

    setPstate(val,px,py){
        this.pval = val;
        this.px = px;
        this.py = py;
        
    }
    setNstate(val,x,y){
        this.nval = val;
        this.nx = x;
        this.ny = y;
    }

    makeTransition(){
        var transition = {};
        transition.id = this.id;
        transition.pval = this.pval;
        transition.nval = this.nval;
        transition.px = this.px;
        transition.nx = this.nx;
        transition.py = this.py;
        transition.ny = this.ny;
        
        this.pval = this.nval;
        this.px = this.nx;
        this.py = this.ny;

        return transition;
    }

    cloneCell(){
        var clone = new Cell(this.id,this.pval,this.px,this.py);
        clone.nx = this.nx;
        clone.ny = this.ny; 
        return clone;
    }

    
}
