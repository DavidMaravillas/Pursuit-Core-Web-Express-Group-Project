const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
// const usersRouter = require("./routes/users/users.js");
// const postsRouter = require("./routes/posts/posts.js");
// const likesRouter = require("./routes/likes/likes.js");
const commentsRouter = require("./routes/comments/comments.js");
// const albumsRouter = require("./routes/albums/albums.js");
// const picturesRouter = require("./routes/albums/pictures/pictures.js");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use("/users", usersRouter);
// app.use("/posts", postsRouter);
// app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);
// app.use("/albums", albumsRouter);
// app.use("/pictures", picturesRouter);

app.listen(port,()=> console.log("Server running on port ", port));

