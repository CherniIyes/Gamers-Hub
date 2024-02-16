const Comments = require('../Models/Comments.js');

const getCommentsByPostId = (req, res) => {
      const postId = req.query.postId;
      Comments.getCommentsByPostId(postId, (err, result) => {
            if (err) {
                  res.status(500).send(err);
            } else {
                  res.status(200).json(result);
            }
      });
};

const addComment = (req, res) => {
      Comments.addComment(req.body, (err, result) => {
            if (err) {
                  res.status(500).send(err);
            } else {
                  res.status(200).json(result);
            }
      });
};

module.exports = {
      getCommentsByPostId,
      addComment,
};
