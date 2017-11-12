# Hackathon chat helper

This Chrome extension will help you get chat messages out of Chrome.  I hacked it together in 15 minutes so it might not work exactly for your use case.  YMMV.

To install this in chrome, first run git clone locally then in chrome go to ```chrome://extensions/``` and select ```Load unpacked extension``` in that dialog, select the plugin folder.

In background.js there is a timer that runs ever second and finds an active chat. Line 29 will give you a conversation object with each member and participant.

Edit this as you need.  
