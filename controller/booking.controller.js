import Event from "../model/event.model.js"; 
import User from "../model/user.model.js"

// Book an event
export async function bookEvent(req, res) {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(req.user.id);

    if (!event || !user) {
      return res.status(404).json({ message: "Event or User not found" });
    }

    // Check if the user has already booked the event
    if (event.attendees.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    // If capacity is not full, book the event
    if (event.attendees.length < event.capacity) {
      event.attendees.push(req.user.id);
      user.bookedEvents.push(eventId);
      await event.save();
      await user.save();
      return res.status(200).json({ message: "Event booked successfully" });
    } else {
      // If event is full, add user to waitlist
      event.waitlist.push(req.user.id);
      await event.save();
      return res
        .status(200)
        .json({ message: "You have been added to the waitlist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

// Cancel booking
export async function cancelBooking(req, res) {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(req.user.id);

    if (!event || !user) {
      return res.status(404).json({ message: "Event or User not found" });
    }

    // Remove user from the attendees list
    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== req.user.id
    );
    user.bookedEvents = user.bookedEvents.filter(
      (event) => event.toString() !== eventId
    );

    // If there are users in the waitlist, move the next user from waitlist to attendees
    if (event.waitlist.length > 0) {
      const nextUser = event.waitlist.shift(); // Get the next user in the waitlist
      event.attendees.push(nextUser); // Add next user to attendees
      await User.findByIdAndUpdate(nextUser, {
        $push: { bookedEvents: eventId },
      }); // Update the user's booked events
    }

    await event.save();
    await user.save();
    return res.status(200).json({ message: "Booking cancelled" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
