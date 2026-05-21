const express = require('express');
const dreamController = require('../controllers/dreamController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);

router
  .route('/')
  .get(dreamController.getAllDreams)
  .post(dreamController.createDream);

router
  .route('/:id')
  .get(dreamController.getDream)
  .patch(dreamController.updateDream)
  .delete(dreamController.deleteDream);

module.exports = router;
