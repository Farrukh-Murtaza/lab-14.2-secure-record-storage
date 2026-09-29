const Note = require("../models/note-model");


async function getNotes(req, res) {
    try {
        const notes = await Note.find({
            user: req.user._id
        }).populate("user", "-password");

        res.status(200).json({
            notes
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

// CREATE NOTE
async function createNotes(req, res) {
    try {
        const newNote = await Note.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user._id
        });

        res.status(201).json({
            message: "Note created successfully.",
            note: newNote
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}


async function updateNote (req, res){
   try {
     const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this note."
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Note updated successfully.",
            note: updatedNote
        });
   } catch (error) {
     console.error(error);

        res.status(400).json({
            message: error.message
        });
    
   }
}



async function deleteNote (req, res){
   try {
     const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this note."
            });
        }

       await Note.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Note deleted successfully."
        });

   } catch (error) {
     console.error(error);

        res.status(400).json({
            message: error.message
        });
    
   }
}


module.exports = {
    getNotes,
    createNotes,
    updateNote,
    deleteNote
}