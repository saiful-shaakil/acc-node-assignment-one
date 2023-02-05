const express = require("express");
const router = express.Router();
const usersDB = require("../db/users.json");
// To get all the user;
router.get("/all", (req, res) => {
  res.send(usersDB);
});

// to get a random user using id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = usersDB.find((user) => user.id == id);
  res.send(result);
});

// to delete a user
router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const remainUsers = usersDB.filter((user) => user.id != id);
  res.send("The user is deleted.");
});

// to insert a new user
router.post("/save", (req, res, next) => {
  const userDetails = req.body;
  const { name, photoUrl, address, contact, gender } = userDetails;
  if (!name || !photoUrl || !address || !contact || !gender) {
    return res.send(
      "Please, fill the form properly. To insert user details in the db, you have to provide name, photoUrl, address, contact, gender property."
    );
  }
  const lastUser = usersDB.reverse()[0];
  const newInsertedUserId = lastUser.id + 1;
  const newUser = {
    id: newInsertedUserId,
    name: name,
    gender: gender,
    contact: contact,
    address: address,
    photoUrl: photoUrl,
  };
  usersDB.push(newUser);
  res.send("The user is saved.");
});

// to update update
// router.patch("/update", async (req, res) => {
//   const userDetails = req.body;
//   const { id, name, photoUrl, address, contact, gender } = userDetails;
//   if (!id) {
//     return res.send("The id is required.");
//   }
//   const otherUsers = usersDB.filter((user) => user.id != id);
//   res.send(`The user ${id} is updated.`);
// });

module.exports = router;
