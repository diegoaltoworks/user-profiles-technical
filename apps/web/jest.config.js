module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    "^~/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^~/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^~/components/(.*)$": "<rootDir>/src/components/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
