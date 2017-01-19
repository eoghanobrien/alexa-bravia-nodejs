"use strict";

module.exports = function() {
  let self = this;
  let input = self.event.request.intent.slots.input.value.toLowerCase();
  let number = self.event.request.intent.slots.number.value;
  let error = `Unable to change input to ${input}. The error message was `;
  let message = "";
  let codes = {
    "hdmi 1":           "AAAAAgAAABoAAABaAw==",
    "hdmi one":         "AAAAAgAAABoAAABaAw==",
    "hdmi 2":           "AAAAAgAAABoAAABbAw==",
    "hdmi two":         "AAAAAgAAABoAAABbAw==",
    "hdmi 3":           "AAAAAgAAABoAAABcAw==",
    "hdmi three":       "AAAAAgAAABoAAABcAw==",
    "hdmi 4":           "AAAAAgAAABoAAABdAw==",
    "hdmi four":        "AAAAAgAAABoAAABdAw==",
    "video 1":          "AAAAAQAAAAEAAABAAw==",
    "video 2":          "AAAAAQAAAAEAAABBAw==",
    "cable":            "AAAAAQAAAAEAAAAqAw==",
    "antenna":          "AAAAAQAAAAEAAAAqAw==",
    "directTV":         "AAAAAQAAAAEAAAAlAw==",
    "direct tv":        "AAAAAQAAAAEAAAAlAw==",
    "direct tv ready":  "AAAAAQAAAAEAAAAlAw=="
  };

  try {
    if (input) {
      self.context.bravia.sendCommand(codes[input], response => {
        message = `Changing input to ${input}`;
        self.emit(self.context.appEmit, message, self.context.appName, message);
      });
    } else if (number) {
      self.context.bravia.sendCommand(codes["HDMI " + number], response => {
        message = `Changing input to HDMI ${number}`;
        self.emit(self.context.appEmit, message, self.context.appName, message);
      });
    }
  } catch (err) {
    message = error + err;
    self.emit(":tellWithCard", message, self.context.appName, message);
  }
};
