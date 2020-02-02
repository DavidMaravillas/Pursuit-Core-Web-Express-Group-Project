const pgp = require("pg-promise")({});

const db = pgp('postgress://localhost:5432/ruff_draft')

module.exports = db;