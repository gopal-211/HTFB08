const express = require('express')
const cors = require("cors")
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello , This is the back end of our application HFB08')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})