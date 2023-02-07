const { Schema, model } = require('mongoose');
// const Reaction = require("./Reaction")
//pass in date formatter
const moment = require("moment")

const reactionSchema = new Schema(
    {
        // reactionId:{
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId(),
        //     required: true
        // },
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
           
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

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
        reactions: [reactionSchema]
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