module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: './tsconfig.json', // Needed to start parsing the project
  },
  ignorePatterns: ['.eslintrc.js'], // Ignore this file because @typescript-eslint/parser matches JS files
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:import/recommended', // This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
    'plugin:import/typescript', // This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/explicit-module-boundary-types': 'error', // Explicit types for function return values and arguments makes it clear to any calling code what is the module boundary's input and output.
    '@typescript-eslint/ban-ts-comment': 'off', // Using directive comments to suppress TypeScript Compiler Errors reduces the effectiveness of TypeScript overall. Always add comments explaining the exceptions when they must be used.
    '@typescript-eslint/no-use-before-define': 'off', // Allow using variables before they defined to get a cleaner file structure with styled components at the bottom
  },
}
