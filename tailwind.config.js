const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  content: ["./src/**/*.{html,ts,css,scss}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
