import express from "express";
import mysql from "mysql2/promise"; // Import mysql2/promise for async/await support
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8800;
const saltRounds = 10;

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.json("you are connected to the backend");
});

app.get("/users", async (req, res) => {
  const usersQuery = "SELECT * FROM blackjack.users";
  try {
    const [users] = await db.query(usersQuery);
    const userData = users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
    }));
    console.log("users data:", userData);
    res.json(userData);
  } catch (error) {
    console.error("trouble getting users:", error);
    res.status(500).json({ error: "failed to fetch users" });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const loginPassword = req.body.password;
  const [rows] = await db.query(
    "SELECT * FROM blackjack.users WHERE email = ?",
    [email]
  );
  try {
    if (rows.length > 0) {
      const user = rows[0];
      const storedHashedPassword = user.password;
      try {
        const result = await bcrypt.compare(
          loginPassword,
          storedHashedPassword
        );
        if (result) {
          const token = jwt.sign({ id: user.id }, "jwtkey");
          const { id, email } = user;
          res.cookie("access_token", token, {
            httpOnly: true,
          });
          res
            .status(200)
            .json({ id, email, token, message: "user has logged in" });
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      } catch (bcryptError) {
        console.error("Error comparing passwords:", bcryptError);
        res.status(500).send("Error logging in");
      }
    } else {
      res.status(404).json({ error: "User no found" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Error logging in");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const [rows] = await db.query(
      "SELECT * FROM blackjack.users WHERE email = ?",
      email
    );
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ error: "email already exists. Try logging in" });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const [result] = await db.query(
      "INSERT INTO blackjack.users (email, password) VALUES (?,?)",
      [email, hash]
    );
    res
      .status(200)
      .json({ message: "user created successfully", userId: result.insertId });
    console.log(result);
  } catch (error) {
    console.error("Trouble registering", error);
    res.status(500).json({ error: "failed to register user" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
