Notes app is a sample web-based note taking application.

## Running locally

In the project directory, you can run either:

`npm install` or `yarn install`

Application uses Firebase Realtime database and to run and deploy application you need to create following files:

`./src/config/dev.js`
`./src/config/staging.js`
`./src/config/production.js`

with each containing Firebase configurations:

```
export const FirebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
```

Create and get Firebase configurations by following instructions here: [
Installation & Setup in JavaScript](https://firebase.google.com/docs/database/web/start)

## Build production

`npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

Deploy application to Firebase by running: `firebase deploy`.