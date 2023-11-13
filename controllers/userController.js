const { User, Thought } = require("../models");

module.exports = {
  //get👇
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select("-__v");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get 👇
  getSingleUser: async (req, res) => {
    try {
      // Populates var array
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No User found with id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //creat👇
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);

      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //updates👇
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //-user👇
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "No user with this id." });
      }

      //bonus, more work but sure why not 🙃
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      await User.deleteOne({ _id: userId });

      res.status(200).json({ message: "User deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //+frind👇
  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //-frined👇
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
