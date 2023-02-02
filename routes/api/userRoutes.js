const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/userController");

// directs to /api/users/
router.route('/')
    .get(getUsers)
    .post(createUser);

// directs to /api/users/:userId
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// direct to /api/users/:userId/friends/friendId
router.route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;