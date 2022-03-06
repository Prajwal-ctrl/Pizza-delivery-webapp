const express = require ('express') ;
const app = express() ;  
const ejs = require ('ejs') ;
const path = require ('path')
const expressLayout = require ('express-ejs-layouts')
//either listen on build port or 3000 port 
const PORT = process.env.PORT || 3300



// rendering home.html/ejs page to the / i.e home page
app.get('/' , function(req , res){
    res.render ('home')
})

app.use (expressLayout)
app.set ('views' , path.join(__dirname , '/resources/views'))
app.set ('view engine' , 'ejs')

//creating live server on port 3300
app.listen (PORT, () =>{
    console.log (`listen on port ${PORT}`)
})