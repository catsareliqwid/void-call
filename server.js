const express = require("express");
const http = require("http");
const path = require("path");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = http.createServer(app);
const PORT = Number(process.env.PORT || 10000);

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "public")));

const peerServer = ExpressPeerServer(server, {
  debug: process.env.NODE_ENV === "production" ? 0 : 2
});

app.use("/peerjs", peerServer);

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "void-call"
  });
});

app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/peerjs") || req.path === "/health") {
    return next();
  }

  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Void Call listening on port ${PORT}`);
});
