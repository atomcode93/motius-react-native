# Motius Community App

The Community App enables talents, employees and customers to engage with Motius.

# Setup

- Set up [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) or [npm](https://github.com/npm/npm).
- Follow the [guidelines on the React Native site](https://facebook.github.io/react-native/docs/getting-started.html) to set up your environment appropriately.
- Install the app dependencies with `yarn|npm install`.
- In your console, execute `react-native run-(ios|android)`, or open XCode, select your device and press the Run button.
- If your packager does not start automatically, execute `(npm|yarn) start`.

# Structure of the project

The code is divided according to its role (user interface, logic, assets) in different folders:

```
├── README.md
├── __tests__ # Tests
├── android # Native android project
├── app.json # Name of the app
├── index.android.js # Javascript entry point for Android
├── index.ios.js # Javascript entry point for iOS
├── ios # Native iOS project
├── js # JS Code
│   ├── App.js # Platform-independent entry point. Sets up the redux instance.
│   ├── Routes.js # Declares the different navigators used in the App. 
│   ├── assets # Contains images, constants and other assets
│   ├── logic # Logic of the app: contains a folder for each redux action-reducer pair and other functionality
│   └── ui # Contains the UI files (React classes)
│       └── screens # Each file describes a screen, optionally binding it to Redux
│           └── index.js # Imports all screens and exports them as a unique module, so that imports like `import {Home} from ui/screens/` are possible.
├── node_modules # Third-party packages
├── package.json # Description of the project and list of third-party packages
├── setup.sh # Set up script. Do not use, as the project is already configured.
└── yarn.lock # Yarn lock file.
```

# Preparation of release

## Android

- If you don't have a keystore, generate one:
    ```bash
    keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
    ```
- Rename the `android/local.properties.dist` into `android/local.properties` and fill in the proper values.
- Execute `cd android; ./gradlew assembleRelease`. The APK file will be generated in `android/app/build/outputs/apk/app-release.apk`
