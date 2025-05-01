const Poll = require('../models/Poll');

exports.createPoll = async (req, res, next) => {
  try {
    const { eventID, question, options } = req.body;
    const poll = new Poll({ eventID, question, options });
    await poll.save();
    res.status(201).json({ message: 'Poll created', poll });
  } catch (error) {
    next(error);
  }
};

exports.votePoll = async (req, res, next) => {
  try {
    const { pollId, optionIndex } = req.body;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.json({ message: 'Vote recorded', poll });
  } catch (error) {
    next(error);
  }
};
