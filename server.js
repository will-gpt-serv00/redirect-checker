const express = require("express");
const fetch = require("node-fetch");

const app = express();

const TARGET_URL = "https://psychic-trout-v6q7xw9g37gx-8006.app.github.dev/";
const FALLBACK_URL = "https://win4web.dpdns.org/index2.html";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(TARGET_URL, { method: "HEAD", timeout: 4000 });
    if (response.ok) {
      return res.redirect(TARGET_URL);
    }
    res.redirect(FALLBACK_URL);
  } catch (err) {
    res.redirect(FALLBACK_URL);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
