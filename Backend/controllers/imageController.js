const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Use current date/time to ensure unique filenames
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage }).single('image'); // 'image' is the name of the field in the form

// Controller function to handle image upload
const uploadImage = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({ error: 'An unknown error occurred' });
    }

    // File uploaded successfully
    return res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
  });
};

module.exports = { uploadImage };
