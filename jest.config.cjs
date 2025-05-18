module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@assets/(.*)$": "<rootDir>/src/assets/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
