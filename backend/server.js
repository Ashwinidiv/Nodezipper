const express = require("express");
const notes = require("./data/notes.js");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const noteRoutes = require("./routes/noteRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares.js");
const path = require("path");
const { fileURLToPath } = require("url");

// resolving dirname
// const __filename1 = fileURLToPath(import.meta.url);
// const __dirname1 = path.dirname(__filename1);
// const __dirname1 = path.resolve();
// console.log(__dirname1);

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// use the client app
// app.use(express.static(path.join(__dirname1, "/client/dist")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname1, "/client/dist/index.html"))
// );
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
