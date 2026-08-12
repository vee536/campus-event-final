const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: true
    },

    resourcePerson: {
        type: String,
        required: true
    },

    maxParticipants: {
        type: Number,
        required: true,
        min: 1
    },

    registrationStatus: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    eventDate: {
        type: Date,
        required: true
    },

    eventType: {
        type: String,
        required: true
    },

    venue: {
        type: String,
        required: true
    },

    facilities: {
        type: [String],
        default: []
    },

    website: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    poster: {
        type: String,
        default: ""
    }

});

module.exports =
    mongoose.model("Event", eventSchema);