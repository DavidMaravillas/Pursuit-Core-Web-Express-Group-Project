const profileImage = require('express').Router({mergeParams: true})
const db = require('../../../db/index');
module.exports = profileImage

profileImage.get("/:id", async (req, res) => {
    try {
        let profileImgDB = await db.one("SELECT * FROM profile_pictures RIGHT JOIN pictures ON profile_pictures.user_img  = pictures.id WHERE user_profile = $1", [req.params.id]);

            res.json({
                status: "success",
                message: "got profile img",
                body: profileImgDB
            });
    } catch(err) {
        // if(!err.recieved){

            res.status(404).json({
                status: "failure",
                message: "no profile image found",
                body: "https://p7.hiclipart.com/preview/442/477/305/computer-icons-user-profile-avatar-profile.jpg"
            })
        // }
    };
});
