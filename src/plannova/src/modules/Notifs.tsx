//inspiration from https://blog.bitsrc.io/how-to-use-desktop-notifications-with-react-122536954dc2

import React, { Component } from "react";

//DesktopNotification function is used to send notifications in the desktop
class DesktopNotification extends Component {
    //showNotification function
    //input: string, string
    //output: desktop notification
    static showNotification(title: string, message: string) {
    //checks if notification worked in the desktop - if not it prints to the console that notifs weren't allowed in this window
        if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
        } 
    //if notifications are supported in the browser then we request permission to have notifications in the desktop
        else {
      Notification.requestPermission().then(permission => {
        //if we are granted permission then output the notification to the browser
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  }

  render() {
    return null;
  }
}

export default DesktopNotification;
