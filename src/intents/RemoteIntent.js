"use strict";

module.exports = function() {
  let self = this;
  let button = self.event.request.intent.slots.button.value.toLowerCase();
  let error = `Unable to change input to ${button}. The error message was `;
  let message = "";
  let codes = {
    "input":          "AAAAAQAAAAEAAAAlAw==",
    "sync menu":      "AAAAAgAAABoAAABYAw==",
    "display":        "AAAAAQAAAAEAAAA6Aw==",
    "home":           "AAAAAQAAAAEAAABgAw==",
    "exit":           "AAAAAQAAAAEAAABjAw==",
    "back":           "AAAAAgAAAJcAAAAjAw==",
    "up":             "AAAAAQAAAAEAAAB0Aw==",
    "down":           "AAAAAQAAAAEAAAB1Aw==",
    "left":           "AAAAAQAAAAEAAAA0Aw==",
    "right":          "AAAAAQAAAAEAAAAzAw==",
    "ok":             "AAAAAgAAAJcAAABKAw==",
    "okay":             "AAAAAgAAAJcAAABKAw==",
    "confirm":        "AAAAAQAAAAEAAABlAw==",
    "enter":          "AAAAAQAAAAEAAAALAw==",
    "select":         "AAAAAgAAAJcAAABKAw==",
    "audio":          "AAAAAQAAAAEAAAAXAw==",
    "help":           "AAAAAgAAAMQAAABNAw==",
    "guide":          "AAAAAQAAAAEAAAAOAw==",
    "tv":             "AAAAAQAAAAEAAAAkAw==",
    "action menu":    "AAAAAgAAAMQAAABLAw==",
    "jump":           "AAAAAQAAAAEAAAA7Aw==",
    "subtitles":      "AAAAAgAAAJcAAAAoAw==",
    "closed caption": "AAAAAgAAAKQAAAAQAw==",
    "wide":           "AAAAAgAAAKQAAAA9Aw==",
    "play":           "AAAAAgAAAJcAAAAaAw==",
    "pause":          "AAAAAgAAAJcAAAAZAw==",
    "stop":           "AAAAAgAAAJcAAAAYAw==",
    "fast forward":   "AAAAAgAAAJcAAAAcAw==",
    "forward":        "AAAAAgAAAJcAAAAcAw==",
    "rewind":         "AAAAAgAAAJcAAAAbAw==",
    "previous":       "AAAAAgAAAJcAAAA8Aw==",
    "next":           "AAAAAgAAAJcAAAA9Aw==",
    "yellow":         "AAAAAgAAAJcAAAAnAw==",
    "blue":           "AAAAAgAAAJcAAAAkAw==",
    "red":            "AAAAAgAAAJcAAAAlAw==",
    "green":          "AAAAAgAAAJcAAAAmAw==",
  };

  try {
    self.context.bravia.sendCommand(codes[button], (response) => {
      message = `Pressing ${button}`;
      self.emit(self.context.appEmit, message, self.context.appName, message);
    });
  } catch (err) {
    message = error + err;
    self.emit(self.context.appEmit, message, self.context.appName, message);
  }
};
