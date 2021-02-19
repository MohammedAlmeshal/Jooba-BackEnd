const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

// bodyParser middleware "now built in"
app.use(express.json());
// DB config
const db = config.get("mongoURI");

// Connect to mongo db
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/auth", auth);

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
