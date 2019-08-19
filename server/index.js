const express = require('express')

const app = express()

app.use(express.json())
app.use(require('cors')())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})