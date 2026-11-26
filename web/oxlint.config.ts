import { defineConfig } from "oxlint";

export default defineConfig({
  env: {
    browser: true,
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["typescript", "import", "promise", "unicorn", "oxc"],
});
