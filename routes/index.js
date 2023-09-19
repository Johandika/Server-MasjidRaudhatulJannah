const diklatRouter = require("./diklat");
const divisiRouter = require("./divisi");
const hariRouter = require("./hari");
const jadwalRouter = require("./jadwal");
const kajianRutinRouter = require("./kajianrutin");
const kategoriKajianRouter = require("./kategorikajian");
const kegiatanRouter = require("./kegiatan");
const kelasTahsinAnakRouter = require("./kelastahsinanak");
const kelasTahsinDewasaDewasa = require("./kelastahsindewasa");
const linkKajianRouter = require("./linkkajian");
const pengajartahsinRouter = require("./pengajartahsin");
const pesertaTahsinAnakRouter = require("./pesertatahsinanak");
const pesertaTahsinDewasaRouter = require("./pesertatahsindewasa");
const rekeningRouter = require("./rekening");
const tablighAkbarRouter = require("./tablighakbar");
const userRouter = require("./user");
const ustadzRouter = require("./ustadz");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/pengajarTahsin", pengajartahsinRouter);
router.use("/pesertaTahsinDewasa", pesertaTahsinDewasaRouter);
router.use("/pesertaTahsinAnak", pesertaTahsinAnakRouter);
router.use("/kelasTahsinAnak", kelasTahsinAnakRouter);
router.use("/kelasTahsinDewasa", kelasTahsinDewasaDewasa);
router.use("/hari", hariRouter);
router.use("/jadwal", jadwalRouter);
router.use("/ustadz", ustadzRouter);
router.use("/linkKajian", linkKajianRouter);
router.use("/kajianRutin", kajianRutinRouter);
router.use("/tablighAkbar", tablighAkbarRouter);
router.use("/kategoriKajian", kategoriKajianRouter);
router.use("/diklat", diklatRouter);
router.use("/kegiatan", kegiatanRouter);
router.use("/divisi", divisiRouter);
router.use("/rekening", rekeningRouter);

module.exports = router;
