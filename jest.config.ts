import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config = {
  preset: "ts-jest",
  testEnvironment: "node", // ← important !
  // testEnvironment: "jsdom",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

export default config;
