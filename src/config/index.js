if (process.env.NODE_ENV === "production") {
  module.exports = require("./production");
} else if (process.env.NODE_ENV === "staging") {
  module.exports = require("./staging");
} else {
  module.exports = require("./dev");
}