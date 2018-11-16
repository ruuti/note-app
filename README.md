Notes app is a sample web-based note taking application. Live demo: [https://notes-bce89.firebaseapp.com/](https://notes-bce89.firebaseapp.com/)

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

Run project locally by executing: `yarn start`

## Build production

`npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

Deploy application to Firebase by running: `firebase deploy`.

## Components used:

- [React](https://github.com/facebook/react)
- [Firebase](https://firebase.google.com/)
- [Fuse.js](https://github.com/krisk/fuse)
- [Draft.js](https://github.com/facebook/draft-js)
- [Moment.js](https://github.com/moment/moment/)
- [Icons8](https://icons8.com/)
- [Bootsrap](https://github.com/twbs/bootstrap)
- [React Redux](https://github.com/reduxjs/react-redux)
- [Redux](https://github.com/reduxjs/redux)