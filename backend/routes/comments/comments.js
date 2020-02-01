const comments = require("express").Router();
const db = require('../../db/index');
const commentsPostsRouter = require("./posts/commentsPosts.js")

comments.use("/posts", commentsPostsRouter)

comments.get("/allComments", async (req,res)=>{
    try{
        let allComments = await db.any("SELECT * FROM comments")
        res.status(200).json({
            allComments,
            stats:"success",
            message: "all comments"
        })
    }catch(err){
        console.log(err)
    }

})

comments.patch("/:comment_id",async (req,res)=>{
    console.log([req.body.commentBody])

    let commentID = Number(req.params["comment_id"])
    let comment = req.body["commentBody"]

    try{
        let commentPost = await db.any("UPDATE comments set body = $1 WHERE id = $2", [comment,commentID])
        console.log(commentPost)
        res.status(200).json({
            comment,
            stats:"success",
            message: "posted a comment to post"
        })
    }catch(err){
        console.log(err)
    }
})

comments.patch("/:comment_id",async (req,res)=>{

    let commentID = Number(req.params["comment_id"])
    let comment = req.body["commentBody"]

    try{
        let commentPost = await db.none("UPDATE comments set body = $1 WHERE id = $2", [comment,commentID])
        res.status(200).json({
            comment,
            stats:"success",
            message: "posted a comment to post"
        })
    }catch(err){
        console.log(err)
    }
})

comments.delete("/:comment_id",async (req,res)=>{

    let commentID = Number(req.params["comment_id"])

    try{
        let commentPost = await db.any("DELETE FROM comments WHERE id = $1", [commentID])
        console.log(commentPost)
        res.status(200).json({
            commentID,
            stats:"success",
            message: "posted a comment to post"
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = comments;