const albums = require("express").Router();
const db = require('../../db/index.js');
const picturesRouter = require("./pictures/pictures")

albums.use("/pictures", picturesRouter)

albums.get("/:owner_id", async (req, res) => {
    try {
        let albumsDB =  await db.any("SELECT * FROM albums WHERE album_owner = $1 ", [req.params.owner_id]);
        res.json({
            status: "success",
            message: "got all albums from user",
            body: albumsDB
        });
    } catch(error) {
        console.log(error);
    };
});

albums.post("/:owner_id", async (req, res) => {
    try {
        let albumsDB = await db.any("INSERT INTO albums (album_name, album_owner) VALUES ($1, $2) RETURNING *", [req.body.album_name, Number(req.params.owner_id)]);
        res.json({
            status: "success",
            message: "created new album",
            body: albumsDB
        });
    } catch(error) {
        console.log(error);
    };
});

module.exports = albums;