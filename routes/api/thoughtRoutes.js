const router = require('express').Router();

const{
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
        
}= require("../../controllers/thoughtController");

// directs to /api/thoughts
router.route("/")
    .get(getThoughts);

// directs to /api/thoughts/:id
router.route("/:thoughtId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// directs to /api/thoughts/:userId
router.route("/:userId")
    .post(createThought)

// directs to /api/thoughts/:thoughtId/reactions   
router.route("/:thoughtId/reactions")
    .post(addReaction)

// directs to /api/thoughts/:thoughtId/reactions/reactionId 
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction)

module.exports = router;