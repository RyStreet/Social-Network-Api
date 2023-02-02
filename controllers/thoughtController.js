const {Thought, User} = require('../models');
const { getUsers } = require('./userController');

module.exports = {

    //get all thoughts
    getThoughts(req,res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    //get one thought by id
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'No thought with that ID'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err));
    },

    createThought(req,res) {
        Thought.create(req.body)
            .then(({_id}) => {
                return User.findOneAndUpdate({_id: req.params.userId}, {$push: {thoughts: _id}}, {new:true})
            })
            .then((thought)=>{
                !thought
                ? res.status(404).json({message: 'No thought with that ID'})
                : res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
        },
    

    updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
            ) 
            .then((thought) =>
                !thought
                    ?res.status(404).json({message: "No thought found with that ID"})
                    : res.json(thought)
                 )
                 .catch((err) => res.status(500).json(err))
    },

    deleteThought(req,res){
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
            ?res.status(404).json({message: "No Thought found by this ID"})
            : res.json(thought))
        .then(() => res.json({message: "Thought deleted"}))
        .catch((err) => res.status(500).json(err))
    },

    addReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true, runValidators: true}
        )
        .populate({path: 'reactions', select: ("-__v")})
        .select('-__v')
        .then((thought) => {
            !thought
                ? res.status(404).json({message: "No Thought with that ID"})
                : res.json(thought)
        })
        .catch((err) => res.status(400).json(err))
    },

    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true, runValidators: true}
        )
        .then((thought) => {
            !thought
            ? res.status(404).json({message: "No Thought with that ID"})
            : res.json(thought)
        })
        .catch((err) => res.status(500).json(err))
    }
}
