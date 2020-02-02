const users = require("express").Router();
const db = require("../../db/index.js");

users.get("/", async (req, res) => {
  try {
    let usersDB = await db.any("SELECT * FROM users");
    res.json({
      status: "success",
      message: "got all users",
      body: usersDB
    });
  } catch (error) {
    console.log(error);
  }
});

users.get("/:id", async (req, res) => {
  try {
    let usersDB = await db.one("SELECT * FROM users WHERE id = $1 ", [
      req.params.id
    ]);
    res.json({
      status: "success",
      message: "got specific user information",
      body: usersDB
    });
  } catch (error) {
    console.log(error);
  }
});

users.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let usersDB = await db.any(
      "INSERT INTO users (first_name, last_name, age, about_statement) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        req.body.first_name,
        req.body.last_name,
        Number(req.body.age),
        req.body.about_statement
      ]
    );
    res.json({
      status: "success",
      message: "created new user",
      body: {
        name: req.body.first_name + req.body.last_name,
        age: req.body.age,
        about_statement: req.body.about_statement
      }
    });
  } catch (error) {
    console.log(error);
  }
});

users.delete("/:id", (req, res) => {
  try {
    db.none("DELETE FROM users WHERE id = " + req.params.id, [req.params.id]);
    res.json({
      status: "success",
      message: "deleted a single user",
      body: {
        deleted_id: req.params.id
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = users;
