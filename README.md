# webRTC Demo

This project is a simple demonstration of peer-to-peer video and audio communication using WebRTC technology. It allows two users to connect, exchange media streams, and view each other's video/audio directly in the browser without any server for signaling (manual SDP exchange for educational purposes).

## Features

- Real-time video and audio streaming between two peers
- Manual SDP offer/answer exchange for signaling
- Simple, clean UI for testing WebRTC connections

## How It Works

1. The app uses WebRTC APIs to capture your webcam and microphone.
2. You manually exchange SDP (Session Description Protocol) messages between two browser windows/tabs/devices to establish a peer-to-peer connection.
3. Once connected, you can see your own video and the remote user's video.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Webcam and microphone

### Usage Instructions

1. **first go to the hosted url**
  - https://abalosaimi.github.io/webRTC/ 

2. **allow the browser to access your cam and microphone**

3. **Create and Exchange Offer/Answer**
   - On the first user, click **Create Offer**. Copy the SDP Offer from the textarea.
   - Paste the Offer into the "SDP Offer" field on the second user and click **Create Answer**.
   - Copy the SDP Answer from the second user and paste it into the "SDP Answer" field on the first user, then click **Add Answer**.
   - After this, both users should see each other's video streams.

## File Structure

- `index.html` — Main HTML file with UI elements
- `script.js` — JavaScript logic for WebRTC connection and UI interaction
- `style.css` — Basic styling for the app
- `README.md` — Project documentation

## Notes

- This demo uses manual SDP exchange for simplicity and educational purposes of experncing WebRTC in action. In production, signaling is usually handled by a server.
- Only works for two peers at the recent time, you can fork the porject and add more in the HTML as you would like to.
- No TURN server is configured, so NAT traversal may not work in all network conditions.
