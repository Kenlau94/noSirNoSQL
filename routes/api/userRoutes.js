const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  //   checkFriendRemoved,
} = require("../../controllers/userController");

//get, post all users
router.route("/").get(getUsers).post(createUser);

// get,update,delete by id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//no new frineds
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// Export the router
module.exports = router;
