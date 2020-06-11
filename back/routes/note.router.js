const express = require("express");
const UserModel = require("../models/User");
const NoteModel = require("../models/Note");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");



// GET All Notes
router.get("/", async (req, res, next) => {
  try {
    const notes = await NoteModel.find();
    return res.json(notes);
  } catch (error) {
    return res.status(401).json({ status: "Notes not found" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await NoteModel.findById(id);
    return res.json(note);
  } catch (error) {
    return res.status(401).json({ status: "Note for id not found" });
  }
});

router.post("/create",isLoggedIn(), async (req, res, next) => {
  try{
    const {text} = req.body;
    const newNote = await NoteModel.create({text})
    return res.json({status:"New Note Created",newNote});
  }catch(error){    
    return res.status(500).json({status:"Error in creating the note"})
  }
})

module.exports = router;