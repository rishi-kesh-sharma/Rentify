const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;
const { notfound, errorHandler } = require("./middleware/error.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");
const contactRoutes = require("./routes/contact.js");
const { authenticate } = require("./middleware/auth.js");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
// auth routes
app.use("/api/auth", authRoutes);
// user routes
// app.use("/api/user", authenticate, userRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);

app.use(notfound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("The server is connected");
});

app.listen( PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});



