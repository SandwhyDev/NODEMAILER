const express = require('express');
const siswa = require('./routes/siswa_route');
require("dotenv").config()


const app = express()
const {PORT} = process.env

app.use(express.json())

//routes
app.use("/api", siswa)

//listener
app.listen(PORT,()=>{
    console.log(`
    ==================================
     L I S T E N E D T O P O R T ${PORT}
    ==================================
    `);
})