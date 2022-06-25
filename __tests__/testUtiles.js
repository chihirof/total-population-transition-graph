module.exports = {
  mockConsoleMethod:
    (realConsoleMethod, ignoredMessages) =>
    (message, ...args) => {
      const isContain = ignoredMessages.some((ignoredMessage) =>
        message.toString().includes(ignoredMessage)
      );
      if (!isContain) {
        realConsoleMethod(message, ...args);
      }
    },
};
