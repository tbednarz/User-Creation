const express = require("express");
const router = new express.Router();
const User = require("../models/user");

//create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/users", auth, async (req, res) => {
  res.send(req.user);
});
// router.get("/users", (req, res) => {
//   try {
//     const users = User.find({});
//     let userList = JSON.stringify(users);
//     console.log(userList);
//     res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
