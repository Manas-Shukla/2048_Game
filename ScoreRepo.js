//class Score Repo
class ScoreRepo{
    /* code here */
    constructor(bestscore){
        this.bestscore = bestscore;
    }
    
    getBestScore(){
        return localStorage.getItem(this.bestscore);
    }
    setBestScore(bs){
        var curr = localStorage.getItem(this.bestscore);
        if(curr===undefined){
            localStorage.setItem(this.bestscore,curr);
        }
        else{
            localStorage.setItem(this.bestscore,Math.max(curr,bs));
        }
        
        
    }
}
