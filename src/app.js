let express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const path = require('path')
const bodyParser = require('body-parser')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const publicDir = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index"), {

  }
})
app.get("/users", (req,res) =>{
  try {
    const users =  User.find({users})
    console.log(users)
  } catch (error) {
    res.status(500).send(e)
  }
})
//request handlers!!
//THESE ARE HOW YOU CREATE READ UPDATE AND DELETE DATA
app.post('/users', (req,res) => {
 const user = new User(req.body)
  user.save((err, user) =>{
    if(err) return res.send("invalid inputs")
    return res.status(200).send(user)
  })
});

// catch 404 and forward to error handler
app.listen(port, () => {
  console.log('server running on port: ' + port)
})
// error handler



