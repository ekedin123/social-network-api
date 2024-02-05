const router = require("express").Router();

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControl");

// get all users and post users
router.route("/").get(getUser).post(createUser);

// get single user, put/update users, delete user by id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// friend of user by id, post add friend, and delete friend by id
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
