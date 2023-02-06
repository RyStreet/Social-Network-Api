const { Schema, model } = require('mongoose');
const Reaction = require("./Reaction")
//pass in date formatter
const moment = require("moment")

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date().now,
            get: (createdAt) => moment(createdAt).format('MMMM DD YYYY [at] hh mm a')
            
        },
        username: {
            type: String,
            required: true,
        },
        reactions: ["reaction"]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    },
);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;