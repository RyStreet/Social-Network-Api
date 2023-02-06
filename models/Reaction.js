const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            required: true
        },
        reactionBody:{
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date().now,
            get: (createdAt) => moment(createdAt).format('MMMM DD YYYY [at] hh mm a'),
            //implement getter for timestamp
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const Reaction = model('reaction', reactionSchema)
module.exports = Reaction