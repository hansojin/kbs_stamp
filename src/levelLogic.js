const q30 = [[2, 2, 2, 12, 12]];
const q50 = [[1, 2, 2, 10, 10], [1, 1, 1, 10, 12]];
const q100 = [[1, 2, 2, 10, 10], [1, 1, 1, 10, 12], [0, 0, 0, 12, 13], [0, 0, 0, 10, 15]];
let globalRound;

function generateLevelInputs(rounds, questionList) {
  const container = document.getElementById("roundsContainer");
  container.innerHTML = "";
  const levels=5;

  for (let round = 1; round <= rounds; round++) {
    
    const roundDiv = document.createElement("div");
    roundDiv.innerHTML = `<br><span>라운드 ${round}</span><br>`;
    const currentRoundValues = questionList[round - 1];

    for (let level = 1; level <= levels; level++) {
      // <label for="Lv1">Lv1</label>
      const label = document.createElement("label");
      label.setAttribute("for", `Round${round}_Lv${level}`);
      label.textContent = `Lv${level}`;

      // <input id="Lv1" value="2" onkeyup="calculateTotal()" /><br />
      const input = document.createElement("input");
      input.setAttribute("id", `Round${round}_Lv${level}`);
      input.setAttribute("value", currentRoundValues[level - 1]);
      input.setAttribute("onkeyup", `calculateTotal(${round})`);

      roundDiv.appendChild(label);
      roundDiv.appendChild(input);
      roundDiv.appendChild(document.createElement("br"));
    }

    container.appendChild(roundDiv);

    const totalDisplay = document.createElement("div");
    totalDisplay.setAttribute("id", `Round${round}Total`);
    container.appendChild(totalDisplay);
    calculateTotal(round);
  }

}

function calculateTotal(rounds) {
  const levels = 5;
  for (let round = 1; round <= rounds; round++) {
    let roundTotal = 0;
    for (let level = 1; level <= levels; level++) {
      const inputValue = parseFloat(document.getElementById(`Round${round}_Lv${level}`).value) || 0;
      roundTotal += inputValue;
    }
    document.getElementById(`Round${rounds}Total`).textContent = `총 ${roundTotal}문제`;
  }
}


function changeQuestionVersion() {
  const questionVersion = document.getElementById("questionVersion");
  const selectedOption = questionVersion.options[questionVersion.selectedIndex];
  let questionList;

  switch (selectedOption.value) {
    case "30":
      questionList = q30;
      globalRound =1;
      break;
    case "50":
      questionList = q50;
      globalRound=2;
      break;
    case "100":
      questionList = q100;
      globalRound=4;
      break;
    default:
      questionList = q30; 
      globalRound=1;
      break;
  }

  generateLevelInputs(questionList.length,questionList);
  calculateTotal(globalRound);

}

changeQuestionVersion();