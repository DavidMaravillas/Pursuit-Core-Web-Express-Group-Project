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

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER,
    profile_image INTEGER FOREIGN KEY REFERENCES pictures(id),
    about_statement TEXT
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    album_name TEXT,
    album_owner INTEGER FOREIGN KEY REFERENCES users(id)
);

CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    picture IMAGE,
    album INTEGER FOREIGN KEY REFERENCES albums(id),
    poster_id INTEGER FOREIGN KEY REFERENCES users(id)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    poster_id INTEGER FOREIGN KEY REFERENCES users(id),
    body TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE img_likes (
    id SERIAL PRIMARY KEY,
    img_id INTEGER FOREIGN KEY REFERENCES pictures(id),
    liker_id INTEGER FOREIGN KEY REFERENCES users(id)
);

CREATE TABLE posts_likes (
    id SERIAL PRIMARY KEY,
    author_id INTEGER FOREIGN KEY REFERENCES posts(id),
    liker_id INTEGER FOREIGN KEY REFERENCES users(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    author_id INTEGER FOREIGN KEY REFERENCES users(id),
    body TEXT,
    post_id INTEGER FOREIGN KEY REFERENCES posts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

