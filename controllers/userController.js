const { User, Thought } = require('../models');

module.exports = {

    //get all Users
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) => {
            !user
                ? res.status(404).json({message: 'No user with that ID'})
                : res.json(user)
        })
    },

    createUser(req, res){
        User.create(req.body)
        .then((user)=> res.json(user))
        .catch((err)=> {
            console.log(err);
            return res.status(500).json(err);
        });
    },

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
            .catch((err) => res.status(500).json(err))
    }
}