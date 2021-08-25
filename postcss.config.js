const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-extend"),
    require("postcss-nested"),
    require("postcss-preset-env")({ stage: 1 }),
    isProduction && require("cssnano")({ preset: "advanced" }),
  ],
};
