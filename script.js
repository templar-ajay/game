"use strict";
let table = document.getElementsByTagName("table")[0]
let yl = 15
// let renderTime = 100
let isGameOver = false;
let totalPoints = 0;
let pointsDisplay = document.getElementById("points")
let highScoreDisplay = document.getElementById("highScore")
highScoreDisplay.innerHTML = `Highest Score: ${localStorage.getItem(highScore)? localStorage.getItem(highScore): totalPoints}`
let displacement = 1;
let allObjects = [[152,1],[153,1],[152,2],[153,2],[152,3],[153,3],[152,4],[153,4]]
let pinkudi = [[30,1],[31,1],[30,2],[31,2]]

let point1 = [3,4]
function render(){
    if(!isGameOver){
    let pattern = ""
    for (let i=0;i<yl;i++){
        pattern += `<tr>`
        for(let k = 0;k<155;k++){
                    pattern += `<td>${k==0||i==0||k==154 || renderObj(allObjects,i,k)||renderRaven(pinkudi,i,k)?"*":"&nbsp;&nbsp;"}</td>`
                    }
        pattern +="</tr>"
    }
    table.innerHTML = pattern
    frameMove()
    collide()
    countPoints()
}
}
render()
function renderObj(allObjects,i,k){
    let returnBool = false
    allObjects.forEach(point => {
        if((point[0]==k)&&((yl-point[1])==i)){
            returnBool = true
        }
    });
    return returnBool;
}

function frameMove(){
    allObjects.forEach((point,index) => {
        point[0]--
        // console.log(point[0])
        // to delete the points outside the frame
        if(point[0]<0){
            allObjects.splice(index,1)
        }
    });
    
}

function renderRaven(pinkudi,i,k){
    let returnBool = false
    pinkudi.forEach(point=>{
        if((point[0]==k)&&((yl-point[1]==i))){
            returnBool = true
        }
    })
    return returnBool
}

function collide(){
    for (let i = 0; i < pinkudi.length; i++) {
        for (let k = 0; k < allObjects.length; k++) {
            if ((pinkudi[i][0] == allObjects[k][0])&&(pinkudi[i][1] == allObjects[k][1])) {
                gameOver()
            }   
        }
    }
    pinkudi.forEach(point => {
        if(point[1]>=yl){
            gameOver()
        }
    });
}
function gameOver(){
    if(localStorage.getItem(highScore)){
        if(localStorage.getItem(highScore)>totalPoints){

        }else localStorage.setItem(highScore, totalPoints)
    }else localStorage.setItem(highScore, totalPoints)

    clearInterval(despacito);
            // console.log("Game Over")
            alert("Game Over")
            isGameOver = true
}
function pushObject(){
    const object1 = [[152,1],[153,1],[152,2],[153,2],[152,3],[153,3],[152,4],[153,4]]
    const object2 = [[152,1],[153,1],[154,1],[152,2],[153,2],[154,2],[152,3],[153,3],[154,3],[152,4],[153,4],[154,4]]
    const object3 = [[152,1],[153,1],[152,2],[153,2],[152,3],[153,3],[152,4],[153,4],[152,5],[153,5],[152,6],[153,6]]
    let randomNumber  = Math.ceil(Math.random()*3)
    let objectToBePushed = []
    if(randomNumber==1){
        objectToBePushed = object1
    }else if(randomNumber ==2){
        objectToBePushed = object2
    }else objectToBePushed = object3

    objectToBePushed.forEach(point => {
        allObjects.push(point)
    });
    pushObjects()
}

function pushObjects(){
    let pushInterval = 1000*Math.ceil(Math.random()*3)
    // console.log("pushInterval" , pushInterval)
    if(!isGameOver){
        setTimeout(pushObject , pushInterval)
    }
}
document.addEventListener('keydown',(e)=>{
    // console.log(e)
    if(e.key == "ArrowUp" ){
        movePinkudi("ArrowUp")
    }else if(e.key == "ArrowDown"){
        movePinkudi("ArrowDown")
    }
})

// let pinkudi = [[30,1],[31,1],[30,2],[31,2]]
function movePinkudi(e){
    if(e=="ArrowUp"){
        pinkudi.forEach(point => {
           point[1] = point[1] + displacement;
        });
    }else if(e == "ArrowDown"){
        if(pinkudi[0][1]>1){
            pinkudi.forEach(point=>{
                point[1]=point[1]-displacement
            })
        }
    }
}

function countPoints(){
        if(pinkudi[0][1]==1){
            totalPoints++
            pointsDisplay.innerHTML = `Your Points : ${totalPoints}`
        }  
}

setTimeout(pushObject, 3000)
const despacito = setInterval(render,1)