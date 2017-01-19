"use strict";

module.exports = function() {
  let self = this;
  let error = `Unable to mute your TV. The error message was `;
  let message = "";

  try {
    self.context.bravia.sendCommand("AAAAAQAAAAEAAAAUAw==", response => {
      message = `Toggling mute.`;
      self.emit(self.context.appEmit, message, self.context.appName, message);
    });
  } catch (err) {
    message = error + err;
    self.emit(":tellWithCard", message, self.context.appName, message);
  }
};
