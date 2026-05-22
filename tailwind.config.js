/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0D257B", // Add your custom color
        lightGray: "#0D257B1A",
        lightBg: "#F6F9FF",
        customBlack: "#323232",
        lightYellow: "#DFBD72",
        lightPink: "#F0F0F7",
        customBorder: "#D2D2D2",
        textGray: "#6D6D6D",
      },
      screens: {
        // '10xl': '1500px',
      },
      width: {
        800: "830px !important",
      },
    },
    fontSize: {
      h1: ["55px !important", "61px !important"],
      h2: ["32px !important", "38px !important"],
      h3: ["22px !important", "28px !important"],
      h4: ["20px !important", "26px !important"],
      h5: ["28px !important", "34px !important"],
      h6: ["24px !important", "30px !important"],
      p1: ["16px !important", "22px !important"],
      p2: ["14px !important", "20px !important"],
      p3: ["12px !important", "18px !important"],
      p4: ["10px !important", "16px !important"],
      sm: ["14px !important", "20px !important"],
      base: ["16px !important", "24px !important"],
      lg: ["18px !important", "28px !important"],
      xl: ["20px !important", "28px !important"],
      "2xl": ["24px !important", "32px !important"],
      "3xl": ["30px !important", "36px !important"],
      "4xl": ["36px !important", "40px !important"],
      "5xl": ["48px !important", "56px !important"],
      "6xl": ["60px !important", "68px !important"],
      "7xl": ["70px !important", "78px !important"],
    },

    left: {
      "50p": "50%",
      "100p": "100%",
      "vh-center": "50vh",
      "vw-center": "50vw",
    },
  },
  plugins: [],
};
