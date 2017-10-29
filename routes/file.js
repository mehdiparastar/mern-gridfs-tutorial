const router = require('express').Router();
const multer  = require('multer');
const { mongo, connection } = require('mongoose');
const Grid = require('gridfs-stream');
Grid.mongo = mongo;
var gfs = Grid(connection.db);

// set up connection to db for file storage
const storage = require('multer-gridfs-storage')({
   db: connection.db
});
// sets file input to single file
const singleUpload = multer({ storage: storage }).single('file');


router.get('/file/:filename', (req, res) => {
   gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
      if(!files || files.length === 0){
         return res.status(404).json({
            message: "Could not find file"
         });
      }

      var readstream = gfs.createReadStream({
         filename: files[0].filename
      })
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
   });
});

router.post('/file', singleUpload, (req, res) => {
   if (req.file) {
      return res.json({
         success: true,
         file: req.file
      });
   }
    res.send({ success: false });
});

module.exports = router;
