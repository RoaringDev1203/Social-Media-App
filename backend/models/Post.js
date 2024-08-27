const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            content: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
