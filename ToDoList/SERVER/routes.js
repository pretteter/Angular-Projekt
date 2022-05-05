const express = require("express");
const Post = require("./models/Event"); // new
const router = express.Router();

// Get all posts
router.get("/todos", async (req, res) => {
  const posts = await Post.find();
  // res.set("Access-Control-Allow-Origin", "*");
  res.send(JSON.parse(JSON.stringify(posts)));
  console.log("server get all");
  console.log(res);
});

module.exports = router;

router.post("/todos", async (req, res) => {
  const post = new Post({
    id: req.body.id,
    label: req.body.label,
    status: req.body.status,
    position: req.body.position,
  });
  await post.save();
  // res.set("Access-Control-Allow-Origin", "*");
  res.send(post);
});

router.get("/todos/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    // res.set("Access-Control-Allow-Origin", "*");
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
    if (req.body.status) {
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
    // res.set("Access-Control-Allow-Origin", "*");
    res.status(204).send();
  } catch {
    res.status(404);
    // res.set("Access-Control-Allow-Origin", "*");
    res.send({ error: "Post doesn't exist!" });
  }
});
