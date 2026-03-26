const bcrypt = require("bcrypt");
const db = require("../db");

/* ================= PAGES ================= */

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.registerPage = (req, res) => {
  res.render("register");
};

/* ================= REGISTER ================= */

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hash], (err) => {
      if (err) {
        console.log(err);
        return res.send("User already exists");
      }
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    res.send("Registration error");
  }
};

/* ================= LOGIN ================= */

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.send("Error");

    if (result.length === 0) {
      return res.send("User not found");
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.send("Login successful 🎉");
    } else {
      res.send("Wrong password");
    }
  });
};