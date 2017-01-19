"use strict";

const Alexa = require("alexa-sdk");
const Bravia = require("./Bravia");

// ---------------------------------------------------------------------------

let handlers = {

  /**
   * Alexa, open|start|launch TV
   */
  "LaunchRequest": require("./intents/LaunchRequest"),

  /**
   * Alexa, tell|ask TV to power on|off
   * Alexa, tell|ask TV to turn on|off
   */
  "PowerIntent": require("./intents/PowerIntent"),

  /**
   * Alexa, tell|ask TV to set volume to {number}
   * Alexa, tell|ask TV to change volume to {number}
   */
  "VolumeIntent": require("./intents/VolumeIntent"),

  /**
   * Alexa, ask|tell TV [to] mute
   * Alexa, ask|tell TV [to] turn off volume
   * Alexa, ask|tell TV [to] turn off sound
   */
  "MuteIntent": require("./intents/MuteIntent"),

  /**
   * Alexa, ask|tell TV to open {application}
   */
  "ApplicationIntent": require("./intents/ApplicationIntent"),

  /**
   * Alexa, ask|tell TV to change input to {input}
    * Alexa, ask|tell TV to change input to HDMI {number}
   */
  "InputIntent": require("./intents/InputIntent"),

  /**
   * Alexa, ask|tell TV to hit {button}
   * Alexa, ask|tell TV to press {button}
   */
  "RemoteIntent": require("./intents/RemoteIntent")
};

// ---------------------------------------------------------------------------

exports.handler = function(event, context) {
  context.appName = process.env.APP_NAME || "Sony Bravia TV";
  context.appEmit = process.env.APP_EMIT || ":tellWithCard";
  context.bravia = new Bravia({
    "ip": process.env.TV_IP || "192.168.1.69",
    "port": process.env.TV_PORT || "80",
    "psk": process.env.TV_PSK || "0000"
  });

  let alexa = Alexa.handler(event, context);
  alexa.appId = process.env.APP_ID || undefined;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
