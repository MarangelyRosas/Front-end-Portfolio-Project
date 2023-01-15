// Defining my back-end
const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const index = express()
index.use(cors())
index.use(express.json())

// Creating a new root & it's a 'POST' request 
index.post('/solve', (req,res) => { //Express syntax... // if we make a 'POST' request to the url solve (if we visit localhost.8000/solve),
    const options = { 
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY         
  },
  data: {
    puzzle: req.body.numbers
  }
};
// This is now my backend that's going to handle my request and also keep my API Key safe 

axios.request(options).then((response) => {
	  console.log(response.data)
    res.json(response.data)
  }).catch((error) => {
      console.error(error);
	
  })
})

index.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))