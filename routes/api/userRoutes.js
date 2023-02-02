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

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// direct to /api/user/:userId/friends/friendId
router.route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;