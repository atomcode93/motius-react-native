module.exports = {
  "rules": {
    "quotes": [
      1,
      "single"
    ],
    "no-console": [1],
    "no-warning-comments":[1],
    "linebreak-style": [
      2,
      "unix"
    ],
    "semi": [
      2,
      "always"
    ],
    "no-unused-vars":[
      0
    ],
    "comma-dangle": [
      1,
      "only-multiline"
    ],
    "indent": ["error", 2],
    "no-undef": ["error"],
    "react/jsx-indent": [1, 2],
    "react/jsx-indent-props": [1, 2],
    "eol-last": [1, "unix"],
    "no-unreachable": ["error"],
    "flowtype/define-flow-type": 1,
    "flowtype/use-flow-type": 1,
    "no-trailing-spaces": ["error"],
    "react-native/no-unused-styles": 1,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 1,
    "react-native/no-color-literals": 1,
  },
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "ecmaFeatures": {
    "experimentalObjectRestSpread": true,
    "modules": true,
    "jsx": true,
  },
  "object-curly-spacing": ["error", "always"],
  "plugins": [
    "eslint-plugin-react",
    "react",
    "flowtype",
    "react-native",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals":{
    "__DEV__": true
  }
};
