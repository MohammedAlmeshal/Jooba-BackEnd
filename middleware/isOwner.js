const Post = require("../models/Post");

function isPostOwner(req, res, next) {
  Post.findById(req.params.id)
    .then((post) => {
      if (!(post.questionTo.toString() === req.user.id))
        return res.status(404).json({ msg: "Permission denied" });

      next();
    })
    .catch((err) => res.status(400).json({ msg: err }));
}
module.exports = isPostOwner;
