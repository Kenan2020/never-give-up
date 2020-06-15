const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cookieSession = require("cookie-session");
const passport = require("passport");
const config = require("config");
const keys = require("./config/default.json");

require("./models/Userg");
require("./services/passport");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//Cookiessession
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/comment", require("./routes/api/comment"));

require("./routes/api/authRoutes")(app);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
