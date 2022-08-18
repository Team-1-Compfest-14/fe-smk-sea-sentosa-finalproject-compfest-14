/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-light": "#ffa439",
        "orange-dark": "#ff4f03",
        blue: "#3278ff",
        "blue-dark": "#0044cc",
        green: "#23eb8b",
        yellow: "#ffc306",
        purple: "#db74ff"
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
        display: ["Syne", "sans-serif"]
      },
      backgroundImage: {
        "divider-pattern": "url('./assets/divider_segment.svg')"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
