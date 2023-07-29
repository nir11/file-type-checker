module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  plugins: ["jest"],
  ignorePatterns: [".eslintrc.js", "jest.config.js", "dist/", ".yarn/"],
  overrides: [
    {
      files: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
