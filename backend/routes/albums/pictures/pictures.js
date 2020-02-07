const pictures = require('express').Router({mergeParams: true})
const db = require('../../../db/index');
module.exports = pictures

pictures.get("/:album_id", async (req,res)=>{
    try {
        let picturesDB =  await db.any("SELECT * FROM pictures WHERE album = $1 ", [req.params.album_id]);
        res.json({
            status: "success",
            message: "got all pictures from album",
            body: picturesDB
        });
    } catch(error) {
        console.log(error);
    };
})

pictures.post("/:album_id", async (req, res) => {

    try {
        let picturesDB = await db.any("INSERT INTO pictures (picture, album, poster_id) VALUES ($1, $2, $3) RETURNING *", [req.body.picture, Number(req.params.album_id),Number(req.body.poster_id)]);
        res.json({
            status: "success",
            message: "posted new pictures",
            body: picturesDB
        });
    } catch(error) {
        console.log(error);
    };
});

pictures.delete("/:pic_id", async (req, res) => {

    try {
        let picturesDB = await db.none("DELETE FROM pictures WHERE id = $1", [req.params.pic_id]);
        res.json({
            status: "success",
            message: "Deleted picture",
            body: picturesDB
        });
    } catch(error) {
        console.log(error);
    };
});