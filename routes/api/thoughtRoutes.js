const router = require("express").Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtControl");

// get and post thoughts
router.route("/").get(getThought).post(createThought);

// get one/single tought, put to update and delete tought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//  post for new reations
router.route("/:thoughtId/reactions").post(createReaction);

// delete reaction by id
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
