import Thought from '../models/Thought.js';
import User from '../models/User.js';

// Get all thoughts
export const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req, res) => {
  try {
    const thought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });

    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json('Thought successfully created!');
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
