const multer = require("multer");
const path = require("path");

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (file.fieldname === "avatar") {
      cb(null, "uploads/avatars/");
    } 
    
    else if (file.fieldname === "resume") {
      cb(null, "uploads/resumes/");
    } 
    
    else {
      cb(null, "uploads/");
    }

  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  }
});


// FILE FILTER
const fileFilter = (req, file, cb) => {

  if (file.fieldname === "avatar") {

    const allowedTypes = /jpg|jpeg|png|avif|webp/;

    const ext = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed (jpg, jpeg, png, avif, webp)"));
    }

  }

  else if (file.fieldname === "resume") {

    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF resume allowed"));
    }

  }

  else {
    cb(new Error("Invalid file type"));
  }

};


// MULTER CONFIG
const upload = multer({

  storage: storage,

  fileFilter: fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }

});

module.exports = upload;