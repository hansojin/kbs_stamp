let randOrder; // 문제 순서 list
let currentIdx = 0;
let currentFile = null;
let l = [];
let p = [];

function playOp(op) {
    const audio = new Audio("src/op/" + op + ".mp3");

    return new Promise((resolve) => {
        audio.addEventListener("ended", () => {
            resolve();
        });
        audio.play();
    });
}

async function gameStart() {
    var btn = document.getElementById("button");
    btn.innerHTML = "게임 진행 중";
    btn.disabled = true;

    var questionVersion = document.getElementById("questionVersion").value;
    var total = calculateTotal();
    orderShuffle(total);

    // await playOp('startOp');
    await playOp('testOp');

    for (let round = 1; round <= questionVersion / 25; round++) {
        await playRound(round);
    }
}

async function playRound(round) {
    await playLevel(levels.Lv1Value, 0.5, 1.0, round);
    await playLevel(levels.Lv2Value, 0.2, 1.2, round);
    await playLevel(levels.Lv3Value, 0.1, 1.5, round);
    await playLevel(levels.Lv4Value, 0.05, 1.8, round);
    await playLevel(levels.Lv5Value, 0, 2.0, round);
    if (round !== totalRounds) {
        await playOp("endOp");
    }
}

function sortArr(arr) {
    arr.sort(function (a, b) {
        return a - b;
    });
}

async function gameEnd() {
    sortArr(l);
    sortArr(p);
    const lResult = `<span>지역</span><br> ${l.join(", ")}`;
    const pResult = `<span>비례</span><br> ${p.join(", ")}`;
    document.getElementById(
        "gameResult"
    ).innerHTML = `<span><< 결과 >></span><br>${lResult}<br><br>${pResult}`;

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

function setDelay(start, end) {
    const delay =
        Math.floor(Math.random() * (end - start) * 1000) + start * 1000;
    return delay;
}

function playAudio(src, playbackRate = 1.0) {
    const fileExtension = src.includes(".") ? "" : ".mp3";
    const audio = new Audio("src/" + src + fileExtension);
    return new Promise((resolve) => {
        audio.playbackRate = playbackRate;
        audio.addEventListener("ended", () => {
            resolve();
        });
        audio.play();
    });
}

async function playLevel(lv, delay, playbackRate, round) {
    for (var i = 0; i < lv; i++) {
        var paddedNumber = randOrder[currentIdx].toString().padStart(2, "0");
        var curListName = `list${randOrder[currentIdx]}`;
        var currentList = lists[curListName];
        var randomValue = Math.floor(Math.random() * 7);
        var currentFile;

        if (randomValue === 0) {
            var randomIndex = Math.floor(Math.random() * currentList.length);
            currentFile = currentList[randomIndex];
        } else {
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

    document.getElementById("total").innerHTML = `<br>라운드 ${round} 총 합: ${lv}문제`;
}

// 나머지 함수들은 그대로 사용
