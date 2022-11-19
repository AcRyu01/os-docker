import express from "express";
import cors from "cors";
import axios from "axios";

import thai_provinces from "./thai_provinces.json" assert { type: "json" };

const app = express();
const port = 8080;
const appKey = "";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:80",
  "http://localhost:443",
];
const options = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Bangkok";
  const weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appKey;
  try {
    const { data, status } = await axios.get(weatherApi, {
      headers: {
        Accept: "application/json",
      },
    });
    // 👇️ response status
    console.log("response status is: ", status);
    return res.status(200).send(data);
  } catch (error) {
    console.log("not found");
    return res.status(404).send("City not found.");
  }
});

app.get("/api/THprovince", (req, res) => {
  return res.status(200).json(thai_provinces);
});

app.listen(port, () => console.log(`server running on port ${port}`));
