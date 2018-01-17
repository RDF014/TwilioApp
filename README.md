# Twilio Trivia

This is an app that brings endless amounts of trivia to your phone via text. 

## Getting Started
You must have a Twilio account and a Twilio phone number with sms capabilities.

### Installing Dependencies
In your root directory run, `npm install`.  
Install [ngrok](https://ngrok.com/download) and ensure you have the ngrok command on your system path.

### How To Run
1. In your root directory run, `npm start`.
2. In a separate terminal, run `ngrok http 1337`.
  * On your terminal you should see two Forwarding titles under tunnel status.
  * Copy the link with https. Should look like `https://abcdef74.ngrok.io`.
3. Using the copied ngork link above, configure this as a webook for your phone number in the console.
  * Select your phone number, change "A MESSAGE COMES IN" to "Webhook" .
  * Add the external URL to your service
  * add `/sms` to the end of the URL and ensure it is an `HTTP POST` request

If you have trouble setting up ngrok and webhooks, please refer to [Twilio's quick start guide](https://www.twilio.com/docs/quickstart/node/programmable-sms#get-a-twilio-phone-number).

### How To Use
To retrive a trivia question, text `start` to your Twilio phone number.  
To answer the question, text the number of the desired answer.
