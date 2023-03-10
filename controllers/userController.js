const { User, Thought } = require('../models');

module.exports = {

    //get all Users
    getUsers(req,res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: "friends", select: '-__v'})
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => {
            console.error({message: err});
            res.status(500).json(err)
        })
           
        
    },

    //get one User
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: "friends", select: '-__v'})
        .select('-__v')
        .then((user) => {
            !user
                ? res.status(404).json({message: 'No user with that ID'})
                : res.json(user)
        })
        .catch((err)=> {
            console.error({message: err});
            return res.status(500).json(err)
        })
    },

    //create new User
    createUser(req, res){
        User.create(req.body)
        .then((user)=> res.json(user))
        .catch((err)=> {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //update existing user
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No User with this ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //delete user and user's thoughts by id
    deleteUser(req,res){
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
            ? res.status(404).json({message: "No user with that ID"})
            : Thought.deleteMany({ _id: {$in: user.thought}})
        )
        .then(() => res.json({message: 'User and Thoughts deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    //Enter add friend and remove friend routes
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$addToSet :{friends: req.params.friendId}}, 
            {new: true, runValidators: true}
            )
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then((user) => {
            !user
                ? res.status(404).json({message: "No user with that ID"})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true, runValidators: true}
            )
            .populate({path: 'friends', select: ('-__v')})
            .select('-__v')
            .then((user) => {
                !user
                    ? res.status(404).json({message: "No user with that ID"})
                    : res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    }
}