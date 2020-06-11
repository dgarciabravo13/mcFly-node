const express = require("express");
const UserModel = require("../models/User");
const NoteModel = require("../models/Note");
const router = express.Router();
const passport = require("passport");

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      return res.json({ status: 500, message: "Autentication Error" });
    }
    if (!user) {
      return res.json({ status: 401, message: failureDetails.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Session Error" });
      }
      return res.json(req.user);
    });
  })(req, res, next);
});

// Get notes favourites

router.get("/favourite", async (req,res,next) => {
  try{
    console.log(req.user)
    const id = req.user.id;
    const user = await UserModel.findById(id).populate("notesFavourites");
    return res.json(user.notesFavourites)
  }catch (error){
    return res.status(500).json({message:"User not found"});
  }

})

//Logout
router.get("/logout", (req, res, next) => {
  if (req.user) {
    req.logout();
    return res.status(200).json({ message: "Log out" });
  } else {
    return res
      .status(401)
      .json({ message: "You have to be logged in to logout" });
  }
});

//Add note to favourites into the user
router.put("/addfavourite/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userid = req.user.id;
    const user = await UserModel.findOneAndUpdate(
      { _id: userid },
      { $addToSet: { notesFavourites:id } },
      {
        new: true,
      }
    ).populate("notesFavourites");
    return res.json({ status: "Added fovourite note to user", user });
  } catch (error) {
    return res.status(401).json({ status: "Note not found" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userid = req.user.id;
    const user = await UserModel.findOneAndUpdate(
      { _id: userid },
      { $pull: { notesFavourites:id } },
      {
        new: true,
      }
    )
    return res.json({ status: "Note favourite has been deleted"});
  } catch (error) {
    return res.status(401).json({ status: "Note not found" });
  }
});


module.exports = router;
