DROP DATABASE IF EXISTS ruff_draft;
CREATE DATABASE ruff_draft;

\c ruff_draft;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS img_likes;
DROP TABLE IF EXISTS posts_likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS profile_pictures;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER,
    about_statement TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users (id) ON DELETE CASCADE,
    body TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    album_name TEXT,
    album_owner INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    picture TEXT,
    album INT REFERENCES albums(id) ON DELETE CASCADE,
    poster_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE img_likes (
    id SERIAL PRIMARY KEY,
    img_id INT REFERENCES pictures (id) ON DELETE CASCADE,
    liker_id INT REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts_likes (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    liker_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(id) ON DELETE CASCADE,
    body TEXT,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profile_pictures (
    id SERIAL PRIMARY KEY,
    user_img INT REFERENCES pictures(id) ON DELETE CASCADE,
    user_profile INT REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (first_name, last_name,age,about_statement)
        VALUES ('david','marin',21,'hi'),
                ('maria','liza',13,'bye'),
                ('samantha','Jimenez',19,'yolo'),
                ('corey','Ladovsky',81,'catsrule'),
                ('john','x',41,'catsrule');

INSERT INTO posts (author_id,body)
    VALUES (1,'Lorem ipsum dolor sit amet.'),
            (2,'marzipan fruitcake lemon drops'),
            (2,' donut topping tiramisu'),
            (3, 'Tiramisu cake lollipop I love'),
            (3, 'Chocolate cake jelly-o pastry '),
            (3, 'Jelly cotton candy toffee'),
            (4, 'beans lemon drops'),
            (4, 'claw croissant muffin'),
            (5, 'cupcake marshmallow ');


INSERT INTO posts_likes (post_id,liker_id)
    VALUES (1,2),
        (1,3),
        (1,1),
        (2,4),
        (4,3),
        (3,1);

INSERT INTO albums (album_name,album_owner)
    VALUES ('profile img',1),
        ('profile imgs',2),
        ('profile imgs',3),
        ('profile imgs',4),
        ('profile imgs',5);

INSERT INTO pictures (picture,album,poster_id)
    VALUES ('backend/db/images/userImage.jpg',1,1),
        ('backend/db/images/userImage.jpg',2,2),
        ('backend/db/images/userImage.jpg',3,3),
        ('backend/db/images/userImage.jpg',4,4),
        ('backend/db/images/userImage.jpg',5,5);

INSERT into profile_pictures (user_img,user_profile)
    VALUES (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5);