const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const config = require('./../config/env');

const Files = require('./../model/File');
const verifyJwt = require('./../utils/verifyJwt');

module.exports = (app) => {
    mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    Grid.mongo = mongoose.mongo;
    let gfs;

    mongoose.connection.on('connected', () => {
        console.log("mongoose connected!")
    })

    const connection = mongoose.connection;
    connection.once('open', () => {
        gfs = Grid(connection.db);

        app.post('/api/file/upload', verifyJwt, (req, res) => {
            let {
                file
            } = req.files;
            let writeStream = gfs.createWriteStream({
                filename: `${file.name}`,
                mode: 'w',
                content_type: file.mimetype
            });
            writeStream.on('close', function (uploadedFile) {
                Files.create({
                        doc_id: uploadedFile._id,
                        length: uploadedFile.length,
                        name: uploadedFile.filename,
                        type: uploadedFile.contentType
                    })
                    .then(file => res.json({
                        success: true,
                        message: "File saved successfully"
                    }))
                    .catch(err => {
                        res.status(500).json({
                            message: `[*] Error while uploading new files, with error: ${err}`
                        })
                    })
            });
            writeStream.write(file.data);
            writeStream.end();
        });

        app.get('/api/file/download', verifyJwt,
        
        (req, res) => {

            gfs.exist({
                filename: req.query.filename
            }, (err, file) => {
                if (err || !file) {
                    res.status(404).json({
                        success: false,
                        message: 'File Not Found'
                    });
                    return
                }

                const readstream = gfs.createReadStream({
                    filename: req.query.filename
                });

                readstream.pipe(res);
            });

        });


        app.delete('/api/file/delete', verifyJwt, (req, res) => {

            gfs.exist({
                filename: req.query.filename
            }, (err, file) => {
                if (err || !file) {
                    return res.status(404).json({
                        success: false,
                        message: 'File Not Found'
                    });
                }

                gfs.remove({
                    filename: req.query.filename
                }, (err) => {
                    if (err) res.status(500).json({
                        success: false,
                        message: err
                    });

                    res.json({
                        success: true,
                        message: 'File Deleted'
                    });
                });
            });
        });

    })
}