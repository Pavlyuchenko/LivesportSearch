// jest.config.cjs
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
        // Handle module aliases - make sure the patterns match your tsconfig paths
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@assets/(.*)$": "<rootDir>/src/assets/$1",
        // CSS & SVG mocks
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(svg)$": "<rootDir>/__mocks__/svgMock.js",
        "\\.(jpg|jpeg|png|gif|webp)$": "<rootDir>/__mocks__/fileMock.js",
        // Mock Vite environment variables
        "import\\.meta\\.env": "<rootDir>/__mocks__/importMetaEnv.js",
    },
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "./tsconfig.json",
            },
        ],
    },
    // These patterns ensure that node_modules is ignored but .mjs files are processed
    transformIgnorePatterns: ["/node_modules/(?!.*\\.mjs$)"],
};
