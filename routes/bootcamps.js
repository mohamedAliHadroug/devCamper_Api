const express = require("express");
const {protect, authorize}=require('../middleware/auth')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps");
const advancedResults = require('../middleware/advancedResults')
const Bootcamp = require('../models/Bootcamp')

// Includes other resource routers
const courseRouter = require('./courses')

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route("/").get(advancedResults(Bootcamp, 'courses'),getBootcamps).post(protect, authorize('publisher', 'admin'), createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router.route("/:id/photo").put(protect, bootcampPhotoUpload)
module.exports = router;
