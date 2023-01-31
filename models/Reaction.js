const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: true
        },
        reactionBody:{
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date().now,
            //implement getter for timestamp
        }
    }
)

const Reaction = model('reaction', reactionSchema)
module.exports = Reaction