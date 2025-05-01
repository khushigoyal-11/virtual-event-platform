const Chat = require('../models/Chat');

exports.saveChatMessage = async (req, res, next) => {
  try {
    const { eventID, message } = req.body;
    const chat = new Chat({
      eventID,
      senderID: req.user.id,
      message
    });
    await chat.save();
    res.status(201).json({ message: 'Chat message saved', chat });
  } catch (error) {
    next(error);
  }
};

exports.getChatMessages = async (req, res, next) => {
  try {
    const { eventID } = req.params;
    const chats = await Chat.find({ eventID });
    res.json(chats);
  } catch (error) {
    next(error);
  }
};
