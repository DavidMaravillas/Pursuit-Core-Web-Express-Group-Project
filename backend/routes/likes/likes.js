const likesRouter = require("express").Router();
const db = require("../../db/index.js");

likesRouter.post("/", (req, res) => {
  res.json(req.body);
});

// - **Likes**
//   - GET `/likes/posts/:post_id` - Get all likes for a single post.
//   - POST `/likes/posts/:post_id` - Add single like.
//   - DELETE `/likes/:post_id/:liker_id` - Delete single like.

likesRouter.get("/posts/:post_id", async (req, res) => {
  try {
    let allLikesById = await db.any(
      "SELECT * FROM posts_likes WHERE post_id = $1",
      [req.params.post_id]
    );
    res.json({
      status: "success",
      message: "got all likes",
      body: allLikesById
    });
  } catch (error) {
    console.log(error);
  }
});

likesRouter.post("/posts/:post_id", async (req, res) => {
  try {
    let newLike = await db.any(
      "INSERT INTO posts_likes (post_id, liker_id) VALUES ($1, $2) RETURNING *",
      [req.params.post_id, req.body.liker_id]
    );
  } catch (error) {
    next(error);
  }
  res.json(req.body);
});

likesRouter.delete("/:post_id/:liker_id", (req, res) => {
  try {
    db.none("DELETE FROM posts_likes WHERE post_id = $1 AND liker_id = $2", [
      req.params.post_id,
      req.params.liker_id
    ]);
    res.json({
      status: "success",
      message: "deleted a single like",
      body: {
        deleted_id: req.params.post_id
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = likesRouter;
