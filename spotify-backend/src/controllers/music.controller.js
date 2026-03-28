const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service")
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {
    const { title } = req.body;

    const musicFile = req.files?.music?.[0]; // music at index 0 and counter at index 1
    const coverFile = req.files?.cover?.[0];

    if (!musicFile) {
        return res.status(400).json({ message: "Music file is required" });
    }

    const musicUpload = await uploadFile(musicFile.buffer.toString('base64'));

    let coverUpload = null;
    if (coverFile) {
        coverUpload = await uploadFile(coverFile.buffer.toString('base64'));
    }

    const music = await musicModel.create({
        uri: musicUpload.url,
        title,
        artist: req.user.id,
        coverUri: coverUpload ? coverUpload.url : undefined,
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
            coverUri: music.coverUri,
        }
    })

}

async function createAlbum(req, res) {

    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })

    res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })



}

async function getAllMusics(req, res) {
    const musics = await musicModel
        .find()
        .limit(50)
        .populate("artist", "username email photoUri role")

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics,
    })

}

async function incrementPlayCount(req, res) {
    const musicId = req.params.musicId;

    const music = await musicModel
        .findByIdAndUpdate(
            musicId,
            { $inc: { playCount: 1 } },
            { new: true }
        )
        .populate("artist", "username email photoUri role");

    if (!music) {
        return res.status(404).json({ message: "Music not found" });
    }

    return res.status(200).json({
        message: "Play count updated",
        music,
    })
}

async function getAllAlbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums,
    })

}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album,
    })

}


module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById, incrementPlayCount }