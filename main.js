const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const displaySolution = document.querySelector('#solution')
const squares = 81 
let submitToApi = []

for (let i = 0; i < squares; i++) {
   const inputElement = document.createElement('input')
   inputElement.setAttribute('type', 'number')
   inputElement.setAttribute('min', 1)
   inputElement.setAttribute('max', 9)
   if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53) 
   ) {
    inputElement.classList.add('odd-section')
   }


   puzzleBoard.appendChild(inputElement)
}

const getValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submitToApi.push(input.value)
        } else {
            submitToApi.push('.') // the dot symbolizes an empty square
        }
    })
    console.log(submitToApi);
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        displaySolution.innerHTML = 'This is the answer'
    }  else {
        displaySolution.innerHTML = 'This is not solvable'
    }
}

const solve = () => {
    getValues()
    const data = {numbers: submitToApi.join('')}
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }) .then(response => response.json()) 
       .then(data => {
        console.log(data)
        populateValues(data.solvable, data.solution)
        submitToApi = []
    })
       .catch((error) => {
        console.error('Error:', error);
    })
}



solveButton.addEventListener('click', solve)


