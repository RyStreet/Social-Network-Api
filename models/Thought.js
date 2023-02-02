const { Schema, model } = require('mongoose');
const Reaction = require("./Reaction")
//pass in date formatter

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

const Thought = model('thought', thoughtSchema);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length
});



module.exports = Thought;