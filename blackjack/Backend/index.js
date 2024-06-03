import express from "express";
import mysql from "mysql2/promise";
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
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "User not Authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    if (decoded) {
      req.user = decoded;
      req.authenticated = true;
      return next();
    } else {
      return res.status(401).json({ error: "Invalid token payload" });
    }
  } catch (error) {
    console.log("Error verifying token:", error);
    res.status(401).json({ error: error.message });
  }
};

app.get("/valid-token", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});

app.get("/leaderboard", async (req, res) => {
  const highestScore =
    "SELECT id, email, highest_balance FROM blackjack.users ORDER BY highest_balance DESC LIMIT 10";
  try {
    const [users] = await db.query(highestScore);
    const userData = users.map((user) => ({
      id: user.id,
      email: user.email,
      highest_balance: user.highest_balance,
    }));
    res.json(userData);
  } catch (error) {
    console.error("Couldn't get high scores", error);
    res.status(500).json({ error: "failed to fetch users highest balance" });
  }
});

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
    res.json(userData);
  } catch (error) {
    console.error("trouble getting users:", error);
    res.status(500).json({ error: "failed to fetch users" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const loginPassword = req.body.password;
    const [rows] = await db.query(
      "SELECT * FROM blackjack.users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const storedHashedPassword = user.password;
      const result = await bcrypt.compare(loginPassword, storedHashedPassword);

      if (result) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWTKEY
        );
        console.log("User ID:", user.id);
        console.log("EMAIL:", user.email);
        console.log("Generated token:", token);
        const { id, email, player_balance, highest_balance } = user;
        res.cookie("access_token", token, {
          maxAge: 60 * 60 * 24,
          httpOnly: true,
        });
        res.status(200).json({
          id,
          email,
          player_balance,
          highest_balance,
          token,
          message: "user has logged in",
        });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Error logging in");
  }
});

app.post("/playerbalance", async (req, res) => {
  const email = req.body.email;
  const newPlayerBalance = req.body.newPlayerBalance;

  try {
    console.log("Email:", email);
    console.log("New Player Balance:", newPlayerBalance);
    // Check if the user exists
    const [rows] = await db.query(
      "SELECT * FROM blackjack.users WHERE email = ?",
      email
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the player balance
    await db.query(
      "UPDATE blackjack.users SET player_balance = ? WHERE email = ?",
      [newPlayerBalance, email]
    );

    //Retrieve the current highest balance
    const [userData] = rows;
    const currentHighestBalance = userData.highest_balance;
    let newHighestBalance = currentHighestBalance;

    if (newPlayerBalance > currentHighestBalance) {
      newHighestBalance = newPlayerBalance;
    }
    await db.query(
      "UPDATE blackjack.users SET player_balance =?, highest_balance =? WHERE email = ?",
      [newPlayerBalance, newHighestBalance, email]
    );

    // Return success message
    res.status(200).json({ message: "Player balance updated successfully" });
  } catch (error) {
    console.error("Error updating player balance:", error);
    res.status(500).json({ error: "Failed to update player balance" });
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
  } catch (error) {
    console.error("Trouble registering", error);
    res.status(500).json({ error: "failed to register user" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
