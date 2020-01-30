const comments = require("express").Router();
const db = require('');

comments.get("/", async (res,req)=>{
    try{
        let allComments = await db.any("SELECT* FROM pets")
        res.status(200).json({
            allComments,
            stats:"success",
            message: "all comments"
        })
    }catch(err){
        console.log(err)
    }

})



module.exports = comments;