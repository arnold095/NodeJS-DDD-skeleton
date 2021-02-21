module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],
    globals: {
        "ts-jest": {
            "tsconfig": "tsconfig.json",
            "diagnostics": true
        }
    },
    moduleFileExtensions: [
        "ts", "js"
    ],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
    testEnvironment: "node",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    testMatch: [
        "**/tests/**/*.test.ts?(x)"
    ]
};
