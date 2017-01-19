"use strict";

const codes = {
  "on": "AAAAAQAAAAEAAAAuAw==",
  "off": "AAAAAQAAAAEAAAAvAw=="
};

module.exports = function() {
  let self = this;
  let power = self.event.request.intent.slots.power.value.toLowerCase();
  let error = `Unable to power ${power} your TV. The error message was `;
  let mode = power === "on" ? true : false;
  let message = "";

  try {
    self.context.bravia.getPowerStatus(status => {
      if (power !== status) {
        try {
          self.context.bravia.setPowerStatus(mode, state => {
            message = `Powering ${power} your TV...`;
            self.emit(self.context.appEmit, message, self.context.appName, message);
          });
        } catch (err) {
          message = error + err;
          self.emit(":tellWithCard", message, self.context.appName, message);
        }
      } else {
        message = `Your TV is already ${power}.`;
        self.emit(self.context.appEmit, message, self.context.appName, message);
      }
    });
  } catch (err) {
    message = error + err;
    self.emit(":tellWithCard", message, self.context.appName, message);
  }
};
