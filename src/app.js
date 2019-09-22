let express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const path = require('path')
const bodyParser = require('body-parser')
// const db = client.db
const {
    MongoClient,
    ObjectID
} = require('mongodb')



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
app.get("/users", async (req,res) =>{
  try {
    const users = await User.find({})
let userList =JSON.stringify(users)
console.log(userList)
    res.send(users)

  } catch (error) {
   res.status(500).send(error) 
  }

})
//request handlers!!
//THESE ARE HOW YOU CREATE READ UPDATE AND DELETE DATA
app.post('/users', (req,res) => {
  
  try {
    const user = new User(req.body)
    user.save((err, user) =>{
      if(err) return res.send(err.message)
      return res.status(200).send(user)
    })
  } catch (error) {
    res.status(400).send(error)
  }
});

// catch 404 and forward to error handler
app.listen(port, () => {
  console.log('server running on port: ' + port)
})
// error handler



