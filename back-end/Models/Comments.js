const connection = require('../database/index.js');

const getCommentsByPostId = (postId, callback) => {
      const query = 'SELECT * FROM comments WHERE postId=?';
      connection.query(query, [postId], (err, result) => {
            if (err) {
                  callback(err, null);
            } else {
                  callback(null, result);
            }
      });
};

const addComment = (commentData, callback) => {
      const { postId, user, text } = commentData;
      const query = 'INSERT INTO comments SET ?';
      connection.query(query, commentData, (err, result) => {
            if (err) {
                  callback(err, null);
            } else {
                  callback(null, result);
            }
      });
};

module.exports = {
      getCommentsByPostId,
      addComment,
};
