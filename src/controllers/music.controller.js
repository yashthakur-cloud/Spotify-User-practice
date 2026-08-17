const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.services");

async function makeMusic(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Forbidden, only artist can add music",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const { uri, title, artist } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: decoded.id,
  });

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function makeAlbum(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Forbidden, only artist can add album",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      error,
    });
  }

  const { title, musicsIds } = req.body;
  const album = await albumModel.create({
    title,
    artist: decoded.id,
    musics: musicsIds,
  });
  res.status(201).json({
    message: "Album created successfully",
    album,
  });
}

async function getAllMusics(req, res) {
    const musics = await musicModel.find().populate("artist", "musics");
    res.status(200).json({
        message: "Musics retrieved successfully",
        musics
    });
}

module.exports = {
  makeMusic,
  makeAlbum,
  getAllMusics
};
