const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  musics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Music",
      required: true,
    },
  ],
});
const albumModel = mongoose.model("Album", albumSchema);

module.exports = albumModel;