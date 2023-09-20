const diklatRouter = require("./diklat");
const divisiRouter = require("./divisi");
const jadwalRouter = require("./jadwal");
const kajianRouter = require("./kajian");
const kategoriKajianRouter = require("./kategorikajian");
const kegiatanRouter = require("./kegiatan");
const kelasTahsinAnakRouter = require("./kelastahsinanak");
const kelasTahsinDewasaDewasa = require("./kelastahsindewasa");
const pengajartahsinRouter = require("./pengajartahsin");
const pesertaTahsinAnakRouter = require("./pesertatahsinanak");
const pesertaTahsinDewasaRouter = require("./pesertatahsindewasa");
const rekeningRouter = require("./rekening");
const userRouter = require("./user");
const ustadzRouter = require("./ustadz");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/pengajarTahsin", pengajartahsinRouter);
router.use("/pesertaTahsinDewasa", pesertaTahsinDewasaRouter);
router.use("/pesertaTahsinAnak", pesertaTahsinAnakRouter);
router.use("/kelasTahsinAnak", kelasTahsinAnakRouter);
router.use("/kelasTahsinDewasa", kelasTahsinDewasaDewasa);
router.use("/jadwal", jadwalRouter);
router.use("/ustadz", ustadzRouter);
router.use("/kategoriKajian", kategoriKajianRouter);
router.use("/kajian", kajianRouter);
router.use("/diklat", diklatRouter);
router.use("/kegiatan", kegiatanRouter);
router.use("/divisi", divisiRouter);
router.use("/rekening", rekeningRouter);

module.exports = router;
