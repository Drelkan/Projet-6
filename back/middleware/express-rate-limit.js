const rateLimit = require("express-rate-limit");

import ratelimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
