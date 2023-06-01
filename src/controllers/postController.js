const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = new Post({
      title,
      content,
      author: userId,
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const createComment = async (req, res) => {
    try {
      const { content, postId, parentId } = req.body;
      const userId = req.user.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      let parentComment = null;
  
      if (parentId) {
        parentComment = await Comment.findById(parentId);
  
        if (!parentComment) {
          return res.status(404).json({ error: 'Parent comment not found' });
        }
      }
  
      const comment = new Comment({
        content,
        author: userId,
        parent: parentComment ? parentComment._id : null,
      });
  
      const savedComment = await comment.save();
  
      if (parentComment) {
        parentComment.children.push(savedComment);
        await parentComment.save();
      } else {
        post.comments.push(savedComment);
        await post.save();
      }
  
      res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  };
  
  const voteComment = async (req, res) => {
    try {
      const { commentId, vote } = req.body;
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      if (vote === 'upvote') {
        comment.voteCount += 1;
      } else if (vote === 'downvote') {
        comment.voteCount -= 1;
      } else {
        return res.status(400).json({ error: 'Invalid vote value' });
      }
  
      await comment.save();
  
      res.json({ message: 'Vote recorded successfully' });
    } catch (error) {
      console.error('Error voting on comment:', error);
      res.status(500).json({ error: 'Failed to vote on comment' });
    }
  };
  
  const getSortedComments = async (req, res) => {
    try {
      const { postId } = req.params;
  
      const sortedComments = await Comment.getSortedComments(postId);
  
      res.json({ comments: sortedComments });
    } catch (error) {
      console.error('Error getting sorted comments:', error);
      res.status(500).json({ error: 'Failed to get sorted comments' });
    }
  };

module.exports = {
  createPost,createComment,
  voteComment,getSortedComments
};
