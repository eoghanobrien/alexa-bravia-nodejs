"use strict";

module.exports = function() {
  let speech = "Welcome to your Sony Bravia TV";
  let cardContent = "This skill allows your to control your TV using Alexa voice commands.";

  this.emit(this.context.appEmit, speech, this.context.appName, cardContent);
};
