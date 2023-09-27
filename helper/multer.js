const multer = require("multer");
const fs = require("fs");

const upload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(`upload/${file.fieldname}/`, { recursive: true });
      if (file.fieldname === "photoUser") {
        cb(null, `./upload/photoUser/`);
      }
      if (file.fieldname === "poster_kajian") {
        cb(null, `./upload/poster_kajian/`);
      }
      if (file.fieldname === "poster_diklat") {
        cb(null, `./upload/poster_diklat/`);
      }
      if (file.fieldname === "file_bukti_pembayaran") {
        cb(null, `./upload/file_bukti_pembayaran/`);
      }
    },
    filename: function (req, file, cb) {
      const tanggal = new Date().getTime().toString();
      cb(null, `${tanggal}${file.originalname}`);
    },
  });

  const uploadImg = multer({ storage: storage });

  return uploadImg;
};

module.exports = upload;
