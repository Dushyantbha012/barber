import mongoose, { Document, Schema } from 'mongoose';

const url = 'mongodb+srv://admin:N6VRzntriNi3n8ip@cluster0.lvs9kpr.mongodb.net/barber';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
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
    username: {
        type: String,
        required: true,
        unique: true,
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
    },
    bookings: [{
        date: {
            type: Date,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        barber : {
            type : String,
            required : true
        },
        completed: {
            type: Boolean,
            default: false,
        }
    }],
    barbers : [{
        barberName : {
            type : String,
            required : true
        },
        
    }],
});
interface BarberDocument extends Document {
    name: string;
    ownername: string;
    username: string;
    password: string;
    rate: number;
    rating?: number;
    history?: string;
    available: boolean;
    timeSlots: { timeRange: string; isAvailable: boolean }[];
    bookings: { date: Date; client: string; completed: boolean }[];
}

const barberSchema = new Schema<BarberDocument>({
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
        default : 0,
    },
    rated: {
        type : Number,
        default : 0
    },
    history: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    timeSlots: {
        type: [{
            timeRange: {
                type: String,
                required: true
            },
            isAvailable: {
                type: Boolean,
                default: true
            }
        }],
        default: generateDefaultTimeSlots()
    },
    bookings: [{
        date: {
            type: Date,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        }
    }],
});

// Generate default time slots from 9am to 8pm
function generateDefaultTimeSlots() {
    const timeSlots = [];
    const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
    for (let i = 0; i < hours.length - 1; i++) {
        const timeRange = hours[i] + '-' + hours[i + 1];
        timeSlots.push({ timeRange, isAvailable: true });
    }
    return timeSlots;
}


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
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        }
    }],
    city: {
        type: String,
        required: true,
    },
    ratings: [{
        barberUsername: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        }
    }]
});


export const owner = mongoose.model("owner", ownerSchema);
export const barber = mongoose.model("barber", barberSchema);
export const client = mongoose.model("client", clientSchema);



