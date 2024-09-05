import { Schema } from "mongoose";

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  bookingDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "waitlisted"],
    default: "confirmed",
  },
});

export default Booking = mongoose.model("Booking", bookingSchema);
