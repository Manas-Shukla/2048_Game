//class Score
class Score{
    constructor(score,bestScore){
        this.score = score;
        this.bestScore = bestScore;
        this.scoreHistory = [];
    }
    init(s,bs){
        this.score = s;
        this.bestScore = bs;
        this.scoreHistory = [s];
    }
    getScore(){
        return this.score;
    }
    setScore(s){
        this.score = s;
        this.scoreHistory.push(s);
    }
    undoScore(){
        this.scoreHistory.pop();
        if(this.scoreHistory.length>0){
            
            return this.scoreHistory[this.scoreHistory.length-1];
        }
        else return 0;
    }
    getBestScore(){
        return this.bestScore;
    }
    setBestScore(s){
        this.bestScore = s;
    }
}
