# Void Call

A multiplayer voice/video room app.

## GitHub layout

Upload these files like this:

public/index.html
server.js
package.json
README.md

GitHub Pages alone cannot run the signaling server. Deploy this repository
as a Node web service (for example on Render).

Build command: npm install
Start command: npm start

The service serves the website and PeerJS signaling endpoint together.
