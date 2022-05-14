const express = require("express");
const Post = require("./models/Event");
const router = express.Router();

module.exports = router;

// Get all posts
router.get("/todos", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/todos", async (req, res) => {
  const post = new Post({
    id: req.body.id,
    label: req.body.label,
    status: req.body.status,
    position: req.body.position,
  });
  await post.save();
  res.send(post);
});

router.get("/todos/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.patch("/todos/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.id) {
      post.id = req.body.id;
    }

    if (req.body.label) {
      post.label = req.body.label;
    }
    if (req.body.status !== undefined) {
      post.status = req.body.status;
    }
    if (req.body.position) {
      post.position = req.body.position;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const x = await Post.db.collections.todos.stats({
      // scale: 1024,
      indexDetails: true,
      indexDetailsKey: {
        borough: 1,
        cuisine: 1,
      },
    });
    res.send(x);
  } catch {
    res.status(404);
    res.send({ error: "collection doesnt exist" });
  }
});
