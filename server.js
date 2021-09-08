const express = require('express')
const path = require('path')

const app = express()

app.use("/css", express.static(path.join(__dirname, '/style.css')))

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
  
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '/script.js'))
  });

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })