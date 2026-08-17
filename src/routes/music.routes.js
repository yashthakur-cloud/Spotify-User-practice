const express= require("express")
const { makeMusic } = require("../controllers/music.controller");
const { makeAlbum } = require("../controllers/music.controller");
const { authArtist } = require("../middlewares/auth.middleware");
const { authUser } = require("../middlewares/auth.middleware");
const { getAllMusics } = require("../controllers/music.controller");
const musicModel = require("../models/music.model");

const multer= require("multer");

const upload= multer({
    storage: multer.memoryStorage(),
});
const router = express.Router();

router.post("/upload", authArtist, upload.single("music"), makeMusic);
router.post("/album", authArtist, makeAlbum);
router.get("/", authUser, getAllMusics);

module.exports = router;