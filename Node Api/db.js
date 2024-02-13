const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "gaurav@sql",
  host: "localhost",
  port: 5432,
  database: "foodkhajana",
});

module.exports = pool;
