import app from "./app.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `listening on ${process.env.NODE_ENV || "development"} mode, port ${PORT}`
  )
);
