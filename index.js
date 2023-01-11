const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const index = express()
index.use(cors())
index.use(express.json())

index.post('/solve', (req,res) => {
   console.log(req)
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
}


axios.request(options).then((response) => {
	console.log(response.data)
    res.json(response.data)
})
  .catch((error) => {
	console.error(error);
});
})

index.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))