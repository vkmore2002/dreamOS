const Dream = require('../models/Dream');

exports.getAllDreams = async (req, res) => {
  try {
    const dreams = await Dream.find({ userId: req.user._id }).sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: dreams.length,
      data: { dreams }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getDream = async (req, res) => {
  try {
    const dream = await Dream.findOne({ _id: req.params.id, userId: req.user._id });

    if (!dream) {
      return res.status(404).json({ status: 'fail', message: 'No dream found with that ID' });
    }

    res.status(200).json({
      status: 'success',
      data: { dream }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createDream = async (req, res) => {
  try {
    // Attach current user ID to the dream
    const dreamData = { ...req.body, userId: req.user._id };
    const newDream = await Dream.create(dreamData);

    res.status(201).json({
      status: 'success',
      data: { dream: newDream }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateDream = async (req, res) => {
  try {
    const dream = await Dream.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!dream) {
      return res.status(404).json({ status: 'fail', message: 'No dream found with that ID' });
    }

    res.status(200).json({
      status: 'success',
      data: { dream }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteDream = async (req, res) => {
  try {
    const dream = await Dream.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!dream) {
      return res.status(404).json({ status: 'fail', message: 'No dream found with that ID' });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
