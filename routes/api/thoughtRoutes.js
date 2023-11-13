const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");
//sets the routes for thouts
router.route("/").get(getThoughts).post(createThought);

//sets routes for thoughts
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//sets routes for reaction
router.route("/:thoughtId/reactions").post(addReaction);

//sets route for -reaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
// Export the router
module.exports = router;
