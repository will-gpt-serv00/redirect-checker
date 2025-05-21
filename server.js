const express = require("express");
const fetch = require("node-fetch");

const app = express();

const TARGET_URL = "https://psychic-trout-v6q7r5x7xw9g37gx-8006.app.github.dev/";
const FALLBACK_URL = "https://win4web.dpdns.org/index2.html";

app.get("/", async (req, res) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(TARGET_URL, { method: "HEAD", signal: controller.signal });
    clearTimeout(timeout);

    if (response.ok) {
      return res.redirect(TARGET_URL);
    }
    return res.redirect(FALLBACK_URL);
  } catch (err) {
    return res.redirect(FALLBACK_URL);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
