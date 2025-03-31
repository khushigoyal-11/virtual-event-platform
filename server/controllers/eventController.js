const Event = require('../models/Event');

exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, agenda } = req.body;
    const event = new Event({
      title,
      description,
      date,
      time,
      agenda,
      organizerID: req.user.id
    });
    await event.save();
    res.status(201).json({ message: 'Event created', event });
  } catch (error) {
    next(error);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
};
