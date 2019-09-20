let express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const path = require('path')
const bodyParser = require('body-parser')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) //allows to parse incoming json to an object
app.use(bodyParser())

const publicDir = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index"), {

  }
})

//request handlers!!
//THESE ARE HOW YOU CREATE READ UPDATE AND DELETE DATA
app.post('/users', (req,res) => {
 const user = new User(req.body)
  user.save((err, user) =>{
    if(err) return res.send("invalid inputs")
    return res.send("User Created")
  })
});

// catch 404 and forward to error handler
app.listen(port, () => {
  console.log('server running on port: ' + port)
})
// error handler



