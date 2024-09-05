import Event from "../model/event.model.js"; 
import User from "../model/user.model.js"


// Create an event
export const createEvent = async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    location,
    capacity,
    tags,
    cancellationPolicy,
  } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      createdBy: req.user.id, // Assuming req.user contains authenticated user info
      startDate,
      endDate,
      location,
      capacity,
      tags,
      cancellationPolicy,
    });

    await newEvent.save();
    return res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get all events (with optional filters)
export const getEvents = async (req, res) => {
  const { tags, location, dateRange } = req.query;
  try {
    const filters = {};
    if (tags) filters.tags = { $in: tags };
    if (location) filters.location = location;
    if (dateRange)
      filters.startDate = { $gte: dateRange.start, $lte: dateRange.end };

    const events = await Event.find(filters).populate(
      "createdBy",
      "name email"
    );
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const {
    title,
    description,
    startDate,
    endDate,
    location,
    capacity,
    tags,
    cancellationPolicy,
  } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this event" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;
    event.location = location || event.location;
    event.capacity = capacity || event.capacity;
    event.tags = tags || event.tags;
    event.cancellationPolicy = cancellationPolicy || event.cancellationPolicy;

    await event.save();
    return res
      .status(200)
      .json({ message: "Event updated successfully", event });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.remove();
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
