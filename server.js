const express = require("express");
const fetch = require("node-fetch");

const app = express();

const TARGET_URL = "https://psychic-trout-v6q7x7xw9g37gx-8006.app.github.dev/";
const FALLBACK_URL = "https://win4web.dpdns.org/index2.html";

app.get("/", async (req, res) => {
  try {
    // Send HEAD request with timeout to TARGET_URL
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(TARGET_URL, { method: "HEAD", signal: controller.signal });

    clearTimeout(timeout);

    if (response.ok) {
      return res.redirect(TARGET_URL);  // if live, go there
    } else {
      return res.redirect(FALLBACK_URL); // if not 2xx, go fallback
    }
  } catch (err) {
    return res.redirect(FALLBACK_URL);  // on error, go fallback
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
