const mongoose = require("ts-mongoose");
const url = 'mongodb+srv://admin:N6VRzntriNi3n8ip@cluster0.lvs9kpr.mongodb.net/barber';
mongoose.connect(url);

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username : {
        type:String,
        required : true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    shopname: {
        type: String,
        required: true
    },

    shopcity: {
        type: String,
        required: true
    },

    shopaddress: {
        type: String
    },

    homeservice: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const barberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    ownername: {
        type: String,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    rate: {
        type: Number,
        required: true,
    },

    rating: {
        type: Number,
    },

    history: {
        type: String,
    },

    available: {
        type: Boolean,
        default: true,
    }
});

const clientSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
    bookings: [{
        date: {
            type: Date,
            required: true
        },
        barber: {
            type: String,
            required: true
        }
    }],
    city :{
        type : String,
        required : true,
    }
});


const owner = mongoose.model("owner", ownerSchema);
const barber = mongoose.model("barber", barberSchema);
const client = mongoose.model("client", clientSchema);

module.exports = { owner, barber, client };


