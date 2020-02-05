const commentsPosts = require('express').Router({mergeParams: true})
const db = require('../../../db/index');
module.exports = commentsPosts

commentsPosts.get("/:post_id",async (req,res)=>{
    console.log([req.params["post_id"]])

    postID = Number(req.params["post_id"])

    try{
        let postComments = await db.any("SELECT * FROM comments Where id = $1 ", [postID])
        res.status(200).json({
            postComments,
            stats:"success",
            message: "got post comments by id"
        })
    }catch(err){
        console.log(err)
    }

})

commentsPosts.post("/:post_id/:commenter_id",async (req,res)=>{

    let postID = Number(req.params["post_id"])
    let authorID = Number(req.params["commenter_id"])
    let comment = req.body.commentBody

    try{
        let commentPost = await db.any("INSERT INTO comments (author_id,body,post_id) VALUES ($1,$2,$3)", [authorID,comment,postID])
        res.status(200).json({
            commentPost,
            stats:"success",
            message: "posted a comment to post"
        })
    }catch(err){
        console.log(err)
    }

})


module.exports = commentsPosts;