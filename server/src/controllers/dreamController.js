const Dream = require('../models/Dream');
const { catchAsync, AppError } = require('../middleware/errorMiddleware');

exports.getAllDreams = catchAsync(async (req, res, next) => {
  const dreams = await Dream.find({ userId: req.user._id }).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: dreams.length,
    data: { dreams }
  });
});

exports.getDream = catchAsync(async (req, res, next) => {
  const dream = await Dream.findOne({ _id: req.params.id, userId: req.user._id });

  if (!dream) {
    return next(new AppError('No dream found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { dream }
  });
});

exports.createDream = catchAsync(async (req, res, next) => {
  const dreamData = { ...req.body, userId: req.user._id };
  const newDream = await Dream.create(dreamData);

  res.status(201).json({
    status: 'success',
    data: { dream: newDream }
  });
});

exports.updateDream = catchAsync(async (req, res, next) => {
  const dream = await Dream.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!dream) {
    return next(new AppError('No dream found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { dream }
  });
});

exports.deleteDream = catchAsync(async (req, res, next) => {
  const dream = await Dream.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  if (!dream) {
    return next(new AppError('No dream found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
