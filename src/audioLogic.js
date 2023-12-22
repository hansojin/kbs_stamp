let randOrder; // 문제 순서 list
let currentIdx = 0;
let currentRound=1;
let currentFile = null;
var l = [];
var p = [];

function playOp(op) {
    const audio = new Audio("src/audio/op/" + op + ".mp3");

    return new Promise((resolve) => {
        audio.addEventListener("ended", () => {
            resolve();
        });
        audio.play();
    });
}

function btnStart(){
    var btn = document.getElementById("button");
    btn.innerHTML = "게임 진행 중";
    btn.disabled = true;
    gameStart(currentRound,globalRound);
    
}
async function gameStart(currentRound,globalRound) {
    console.log("check:" + currentRound);
    var total = 0;
    if (currentRound<=globalRound){
        for (var lv = 1; lv <= 5; lv++) {
            total+=parseInt(document.getElementById(`Round${currentRound}_Lv${lv}`).value, 10);
        }
        console.log(total)   
    }
    if (currentRound>1)
        printResult(currentRound-1);
    l=[];
    p=[];
    randOrder=[]; 
    currentIdx = 0;

    orderShuffle(total);

    if (currentRound==1){
        await playOp('1start');
        // await playOp('testOp');
        await playRound(currentRound);
    }
    if (globalRound>1 && currentRound==2){
        await playOp('1to2');
        // await playOp('testOp');
        await playRound(currentRound);
    }
    if (globalRound>2&&currentRound==3){
        await playOp('2to3');
        // await playOp('testOp');
        await playRound(currentRound);
    }
    if (globalRound>2&&currentRound==4){
        await playOp('3to4');
        // await playOp('testOp');
        await playRound(currentRound);
    }
    if (currentRound==globalRound+1){
        await playOp('endOp');
        gameEnd()
    }
}

async function playRound(currentRound) {
    var levels = {};

    for (var i = 1; i <= 5; i++) {
        levels[`Lv${i}Value`] = parseInt(document.getElementById(`Round${currentRound}_Lv${i}`).value, 10);
    }

    await levelOne(levels.Lv1Value, 0.5, 1.0);
    await levelOne(levels.Lv2Value, 0.2, 1.2);
    await levelTwo(levels.Lv3Value, 0.1, 1.5,false);
    await levelTwo(levels.Lv4Value, 0.05, 1.8,false);
    await levelTwo(levels.Lv5Value, 0, 2.0,true);
        
}

function sortArr(arr) {
    arr.sort(function (a, b) {
        return a - b;
    });
}

function printResult(round){
    sortArr(l);
    sortArr(p);
    document.getElementById(
        "gameResult"
    ).innerHTML +=`<br><span>라운드 ${round}</span><br>`;
    const lResult = `<span>지역</span><br> ${l.join(", ")}`;
    const pResult = `<span>비례</span><br> ${p.join(", ")}`;
    document.getElementById(
        "gameResult"
    ).innerHTML += `${lResult}<br><br>${pResult}<br>`;
}

async function gameEnd() {
    var btn = document.getElementById("button");
    btn.innerHTML = "RESET";
    btn.disabled = false;

    btn.onclick = function () {
        location.reload();
    };
}

function orderShuffle(total) {
    var numbers = Array.from({ length: 50 }, (_, i) => i + 1);
    for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
    }
    randOrder = numbers.slice(0, total);
    console.log(randOrder);
}

function playAudio(src, playbackRate = 1.0) {
    const fileExtension = src.includes(".") ? "" : ".mp3";
    const audio = new Audio("src/audio/" + src + fileExtension);
    return new Promise((resolve) => {
        audio.playbackRate = playbackRate;
        audio.addEventListener("ended", () => {
            resolve();
        });
        audio.play();
    });
}

async function levelOne(lv, delay, playbackRate) {
    for (var i = 0; i < lv; i++) {
        var paddedNumber = randOrder[currentIdx].toString().padStart(2, "0");
        if (randOrder[currentIdx] <= 20) {
            currentFile = "l_" + paddedNumber;
            l.push(randOrder[currentIdx]);
        } else {
            currentFile = "p_" + paddedNumber;
            p.push(randOrder[currentIdx] - 20);
        }
        console.log(currentFile);
        await playAudio(currentFile, playbackRate);
        await new Promise((resolve) => setTimeout(resolve, delay));
        currentIdx++;
    }
}

async function levelTwo(lv, delay, playbackRate,lastFlag) {
    for (var i = 0; i < lv; i++) {
        var curListName = `list${randOrder[currentIdx]}`;
        var currentList = lists[curListName];
        var randomValue = Math.floor(Math.random() * 7);
        if (randomValue === 0) {
            var randomIndex = Math.floor(Math.random() * currentList.length);
            var currentFile = currentList[randomIndex];
        } else {
            var paddedNumber = randOrder[currentIdx].toString().padStart(2, '0');
            if (randOrder[currentIdx] <= 20) {
                currentFile = 'l_' + paddedNumber;
            } else {
                currentFile = 'p_' + paddedNumber;
            }
        }
        if (randOrder[currentIdx] <= 20) {
            l.push(randOrder[currentIdx]);
        } else {
            p.push(randOrder[currentIdx] - 20);
        }

        console.log(currentFile);
        await playAudio(currentFile, playbackRate);
        await new Promise((resolve) => setTimeout(resolve, delay));
        currentIdx++;
    }
    if(lastFlag){
        currentRound++;
        gameStart(currentRound,globalRound);
    }
    
}


