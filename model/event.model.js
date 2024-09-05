import mongoose, { Schema, Document } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, default: 50 },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    waitlist: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bookingStatus: { type: String, enum: ["open", "closed"], default: "open" },
    cancellationPolicy: {
      type: String,
      default: "No cancellations allowed after 24 hours prior to event",
    },
    isCancelled: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
