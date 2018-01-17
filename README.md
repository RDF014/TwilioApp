# Twilio Trivia

This is an app that brings endless amounts of trivia to your phone via text. 

## Getting Started
You must have a Twilio account and a Twilio phone number with sms capabilities.

### Installing Dependencies
In your root directory run, `npm install`.  
Install [ngrok](https://ngrok.com/download) and ensure you have the ngrok command on your system path.

### How To Run
In your root directory run, `npm start`.<  
In a separate terminal, run `ngrok http 1337`  
* On your terminal you should see two Forwarding titles under tunnel status.
* Copy the link with https. Should look like `https://abcdef74.ngrok.io`
Using the copied ngork link above, configure this as a webook for your phone number in the console.
* Select your phone number, change "A MESSAGE COMES IN" to "Webhook"
* Add the external URL to your service
* add `/sms` to the end of the URL and ensure it is an `HTTP POST` request.

### How To Use
To retrive a trivia question, text `start` to your Twilio phone number  
To answer the question, text the number of the desired answer.

