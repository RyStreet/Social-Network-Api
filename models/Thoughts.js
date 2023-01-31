const { Schema, model } = require('mongoose');

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
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
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