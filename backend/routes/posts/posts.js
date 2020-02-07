const posts = require("express").Router();
const db = require('../../db/index.js');


posts.get("/", async (req, res) => {
    try {
        let postsDB = await db.any("SELECT * FROM posts");
        res.json({
            status: "success",
            message: "got all posts",
            body: postsDB
        });
    } catch(error) {
        console.log(error);
    };
});

posts.get("/:id", async (req, res) => {
    try {
        let postsDB =  await db.one("SELECT * FROM posts WHERE id = $1 ", [req.params.id]);
        res.json({
            status: "success",
            message: "got specific post information",
            body: postsDB
        });
    } catch(error) {
        console.log(error);
    };
});

posts.post("/", async (req, res) => {
    console.log(req.body)
    try {
        let postsDB = await db.any("INSERT INTO posts (author_id, body) VALUES ($1, $2) RETURNING *", [req.body.author_id, req.body.body]);
        res.json({
            status: "success",
            message: "created new post",
            body: {
                author_id: req.body.author_id,
                body: req.body.body
            }
        });
    } catch(error) {
        console.log(error);
    };
})

posts.patch("/:id", async (req, res) => {

    try {
        let postsDB =  await db.none("UPDATE posts SET body = $1 WHERE id = $2", [req.body["body"], req.params.id]);
        res.json({
            status: "success",
            message: "updated specific post information",
            body: req.body["body"]
        });
    } catch(error) {
        console.log(error);
    };
});

posts.delete("/:id", (req, res) => {
    try {
        db.none("DELETE FROM posts WHERE id = " + req.params.id, [req.params.id]);
        res.json({
            status: "success",
            message: "deleted a single post",
            body: {
                deleted_id: req.params.id
            }
        });
    } catch(error) {
        console.log(error);
    };
});

module.exports = posts;