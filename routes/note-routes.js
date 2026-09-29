const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note-controller");
const verifyAuthentication = require("../middleware/verifyAuthentication");

// You could use this line to apply a middleware to every defined route in your router if you wanted
router.use(verifyAuthentication);
router.get("/", noteController.getNotes);
router.post("/", noteController.createNotes);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;