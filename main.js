const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const displaySolution = document.querySelector('#solution')
const squares = 81 // There will be 81 squares in the puzzle since it is a 9x9 grid 
let submitToApi = []

for (let i = 0; i < squares; i++) { // Creating the grid for my puzzle from scratch
    // Creating an input element 
   const inputElement = document.createElement('input')
   inputElement.setAttribute('type', 'number') // This will ONLY allow 'numbers' as an input
   inputElement.setAttribute('min', 1) // minimum number allowed is 1
   inputElement.setAttribute('max', 9) // maximum number allowed is 9
   if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53) 
    ) { // math code to color my grids' odd-section light-grey to separate each 3x3 box 
             inputElement.classList.add('odd-section') 
    }


   puzzleBoard.appendChild(inputElement) // appended the 'input' into my puzzleBoard
}

const getValues = () => { // Creating a function to get all the values from the input so we can send off to be solved (get them all and change them into an array)
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) { // if an input value exists or if the input value is true 
            submitToApi.push(input.value) // push in that value (in this case, that number from 1-9)
        } else { // if input value doesn't exist or if the input is false
            submitToApi.push('.') // push in the dot which symbolizes an empty square
        }
    })
    console.log(submitToApi)
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) { // if puzzle is solvable and there is a solution;   
        inputs.forEach((input, i) => { // for each input value, go into the solution, & loop over it
            input.value = solution[i] // getting the first item of the string & then assigning to the input value
        })
        displaySolution.innerHTML = 'This is the answer to your puzzle!'
    }  else {
        displaySolution.innerHTML = 'Sorry; This puzzle is not solvable!'
    }
}
// Creating a function where I will be calling my API
const solve = () => { 
    getValues()
    const data = {numbers: submitToApi.join('')}
    console.log('data', data);

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data) // passing through our data with the body
    }) .then(response => response.json()) 
       .then(data =>  {
        console.log(data);
        populateValues(data.solvable, data.solution);
        submitToApi = [] // clears the submission to API
    })
       .catch((error) => {
        console.error ('Error:', error);
    })

}

solveButton.addEventListener('click', solve) // will unravel the remaining numbers revealing the answer to the puzzle after clicking the button


