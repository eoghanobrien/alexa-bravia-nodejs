"use strict";

module.exports = function() {
  let self = this;
  let application = self.event.request.intent.slots.application.value;
  let error = `Unable to open ${application} your TV. The error message was `;
  let message = "";

  try {
    self.context.bravia.getApplications(applications => {
      let apps = applications.filter(app => {
        return (app.title.toLowerCase() === application.toLowerCase());
      });

      if (apps.length > 0) {
        let app = apps.pop();
        self.context.bravia.openApplication(app, body => {
          message = `Opening ${application}`;
          self.emit(self.context.appEmit, message, self.context.appName, message);
        });
      }
    });
  } catch (err) {
    message = error + err;
    self.emit(":tellWithCard", message, self.context.appName, message);
  }
};
