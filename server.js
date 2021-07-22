const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { handleError, ErrorHandler } = require("./utils/errorHandler");
const profiles = require("./_routes/api/profiles");
const posts = require("./_routes/api/posts");
const auth = require("./_routes/api/auth");

var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// DB config
const db = process.env.MONGO_URI;
// Connect to mongo db
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);
app.use("/api/auth", auth);

// error handler middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});
// server static assests in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
