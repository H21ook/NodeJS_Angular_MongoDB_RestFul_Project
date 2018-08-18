const mongoose = require('mongoose');
const Note = require('../models/note');

exports.notes_create_note = (req, res, next) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description
    });
    note.save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);

        // JSON Data
        // res.status(201).json({
        //     message: 'Created note successfully',
        //     createdNote: {
        //         title: result.title,
        //         description: result.description,
        //         _id: result._id,
        //         request: {
        //             type: 'GET',
        //             url: 'http://localhost:3000/note/' + result._id
        //         }
        //     }
        // });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.notes_get_all = (req, res, next) => {
    Note.find()
        .select("title description")
        .exec().then(docs => {
            //JSON data
            // const responce = {
            //     count: docs.length,
            //     notes: docs.map(doc => {
            //         return {
            //             title: doc.title,
            //             description: doc.desc,
            //             _id: doc._id,
            //             request: {
            //                 type: 'GET',
            //                 url: 'http://localhost:3000/notes/' + doc._id
            //             }
            //         };
            //     })
            // };
            if (docs.length >= 0) res.status(200).json(docs);
            else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.notes_get_note = (req, res, next) => {
    const id = req.params.noteID;
    Note.findById(id)
        .select("title description")
        .exec().then(doc => {
            if (doc) {
                res.status(200).json(doc);

                // JSON Data
                // res.status(200).json({
                //     note: doc,
                //     request: {
                //         type: 'GET',
                //         url: 'http://localhost:3000/notes/' + id
                //     }
                // });
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.notes_delete_note = (req, res, next) => {
    const id = req.params.noteID;
    Note.remove({
        _id: id
    }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);

        // JSON Data
        // res.status(200).json({
        //     message: 'Note deleted',
        //     request: {
        //         type: 'POST',
        //         url: 'http://localhost:3000/notes/' + id,
        //         body: {
        //             title: "String",
        //             description: "String"
        //         }
        //     }
        // });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.notes_update_note = (req, res, next) => {
    const id = req.params.noteID;
    var fields = [];
    var updateOps = {};

    if(req.body.title)
        fields.push("title");
    if(req.body.description)
        fields.push("description");

    for (const field of fields) {
        switch(field) {
            case "title":
                updateOps["title"] = req.body.title;
                break;
            case 'description':
                updateOps["description"] =req.body.description;
                break;
        }
    }
    
    Note.update({
            _id: id
        }, {
            $set: updateOps
        }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);

            //JSON data
            // res.status(200).json({
            //     message: 'Note updated',
            //     request: {
            //         type: 'GET',
            //         url: 'http://localhost:3000/note/' + id
            //     }
            // });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}