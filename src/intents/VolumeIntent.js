"use strict";

module.exports = function() {
  let self = this;
  let volume = self.event.request.intent.slots.volume.value;
  let error = `Unable to change the volume on your TV. The error message was `;
  let message = "";

  try {
    self.context.bravia.setVolume(volume, response => {
      message = `Changed volume to ${volume}`;
      self.emit(self.context.appEmit, message, self.context.appName, message);
    });
  } catch (err) {
    message = error + err;
    self.emit(":tellWithCard", message, self.context.appName, message);
  }
};
