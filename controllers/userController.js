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
    
}