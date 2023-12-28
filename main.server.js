const express = require("express");
const next = require("next");
console.log(process.env.DOCUMENTIA_ENV);
const dev = process.env.DOCUMENTIA_ENV !== "PROD";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.N_PORT || 3001; // Use the specified port or default to 3000

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server started on PORT : ${port}`);
  });
});
