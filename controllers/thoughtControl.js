const { User, Thought } = require("../models");
//each async function is semantic as to what it does
module.exports = {
  async getThought(req, res) {
    try {
      const thought = await Thought.find({});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "Invalid ID" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body).then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      });
      if (!thought) {
        res.status(404).json({ message: "Invalid ID" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, New: true }
      );
      if (!thought) {
        res.status(404).json({ message: "Invalid ID" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: "Invalid ID" });
        return;
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "Thought has been deleted, user not found" });
        return;
      }
      res.json({ message: "Thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "Invalid ID" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "Invalid ID" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
