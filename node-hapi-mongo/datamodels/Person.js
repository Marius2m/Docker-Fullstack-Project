const mongoose = require("./../node_modules/mongoose");
const Schema = mongoose.Schema;

const PersonShema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        age: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = Person = mongoose.model('Person', PersonShema);