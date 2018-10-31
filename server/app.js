
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const PORT = 3000

let vacations = []

app.use(express.static('css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('vacations','./vacations')
app.set('view engine','mustache')
app.get('/',function(req,res){
  res.render('index',{ greeting : "Welcome to your Vacation Selector!"})
})
app.post("/add_vacation",function(req,res){
  let location = req.body.location
  let imageURL = req.body.imageURL
  let vacationStart = req.body.vacationStart
  let vacationEnd = req.body.vacationEnd
  vacations.push({location : location , imageURL : imageURL , vacationStart : vacationStart, vacationEnd : vacationEnd })
  // redirect will invoke the /tasks route
  res.redirect("/vacations")
})
app.get("/add_vacation",function(req,res){
  res.render("add_vacation")
})
app.get('/vacations',(req,res) => {
  res.render('vacations',{ vacationList : vacations })
})

app.listen(PORT,function(){
  console.log("Server is running...")
})
