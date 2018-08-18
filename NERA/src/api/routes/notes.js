const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const NoteController = require('../controllers/noteController');

router.get('/', NoteController.notes_get_all);
router.get('/:noteID', NoteController.notes_get_note);
router.post('/', NoteController.notes_create_note);
router.delete('/:noteID', NoteController.notes_delete_note);
router.put('/:noteID', NoteController.notes_update_note);

module.exports = router;