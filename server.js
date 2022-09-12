const exp = require('express')
const app = exp()
const path = require('path')

const PORT = process.env.PORT||5000;

app.use(exp.static(path.join(__dirname + '/build')))

app.listen(PORT,()=>{console.log(PORT)})