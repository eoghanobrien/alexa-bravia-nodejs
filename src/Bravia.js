"use strict";

const request = require("request");

class Bravia
{
  constructor(config) {
    this.config = config;
  }

  setPowerStatus(state, callback) {
    this.api({
      path: "/sony/system",
      json: {
        "id": 3,
        "method": "setPowerStatus",
        "version": "1.0",
        "params": [
          {"status": state}
        ]
      }
    }, (body) => {
      callback(state);
    });
  }

  getPowerStatus(callback) {
    this.api({
      path: "/sony/system",
      json: {
        "id": 20,
        "method": "getPowerStatus",
        "version": "1.0",
        "params": []
      }
    }, (body) => {
      if (body.result[0].status === "standby") {
        callback("off");
      } else {
        callback("on");
      }
    });
  }

  setVolume(volume, callback) {
    this.api({
      path: "/sony/audio",
      json: {
        "id": 2,
        "version": "1.0",
        "method": "setAudioVolume",
        "params": [
          { "target": "speaker", "volume": "" + volume }
        ]
      }
    }, body => {
      callback(body);
    });
  }

  getCommands(callback) {
    this.api({
      path: "/sony/system",
      json: {
        "id": 20,
        "method": "getRemoteControllerInfo",
        "version": "1.0",
        "params": []
      }
    }, body => {
      if (body.result !== undefined && Object.keys(body.result).length === 2) {
        let commands = {};
        let list = body.result[1].map((item) => {
          var i = {};
          i[item.name] = item.value;
          return i;
        });

        for (var i in list) {
          if (list.hasOwnProperty(i)) {
            for (var key in list[i]) {
              if (list[i].hasOwnProperty(key)) {
                commands[key] = list[i][key];
              }
            }
          }
        }

        if (callback !== undefined) {
          callback(commands);
        }
      } else {
        throw new Error("Unexpected response body.");
      }
    });
  }

  sendCommand(code, callback) {
    callback = callback || function(){};
    request.post({
      url: this.getEndpoint() + "/sony/ircc",
      headers: {
        "X-Auth-PSK": this.config.psk,
        "Content-Type": "text/xml; charset=UTF-8",
        "SOAPACTION": `"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"`
      },
      body: `<?xml version="1.0"?>
        <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <s:Body>
            <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
              <IRCCCode>${code}</IRCCCode>
            </u:X_SendIRCC>
          </s:Body>
        </s:Envelope>`,
    }, function(error, response, body) {
      if (error) {
        throw new Error(error);
      } else {
        callback(response);
      }
    });
  }

  getApplications(callback) {
    this.api({
      path: "/sony/appControl",
      json: {
        "id": 3,
        "method": "getApplicationList",
        "version": "1.0",
        "params": []
      }
    }, function(body) {
      callback(body.result[0]);
    });
  }

  openApplication(app, callback) {
    callback = callback || function(){};
    this.api({
      path: "/sony/appControl",
      json: {
        "id": 3,
        "method": "setActiveApp",
        "version": "1.0",
        "params": [
          { uri: app.uri, "data": app.title }
        ]
      }
    }, function(body) {
      callback(body);
    });
  }

  api(options, callback) {
    callback = callback || function(){};
    request.post({
      url: this.getEndpoint() + options.path,
      headers: {
        "X-Auth-PSK": this.config.psk,
        "Content-Type": "application/json"
      },
      json: options.json,
    }, function(error, response, body) {
      if (error) {
        throw new Error(error);
      } else {
        callback(body, response, null);
      }
    });
  }

  getEndpoint() {
    return "http://" + this.config.ip + ":" + this.config.port;
  }
}

module.exports = Bravia;
