const userPosts = require('express').Router({mergeParams: true})
const db = require('../../../db/index');
module.exports = userPosts

userPosts.get("/:id", async (req, res) => {
    try {
        let postsDB = await db.any("SELECT * FROM posts WHERE author_id = $1", [req.params.id]);
        res.json({
            status: "success",
            message: "got all posts by specific user",
            body: postsDB
        });
    } catch(error) {
        console.log(error);
    };
});


