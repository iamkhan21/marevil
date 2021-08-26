# Marevil [![Netlify Status](https://api.netlify.com/api/v1/badges/03dba363-c11b-4b83-ba55-dd12c77d7c89/deploy-status)](https://app.netlify.com/sites/marevil/deploys)

### Used technologies

- [Create React App](https://create-react-app.dev "Create React App") as a base of application
- [Userbase](https://userbase.com "Userbase") for user management
- [TypeScript](https://www.typescriptlang.org "TypeScript") to enhance development process
- [Jest](https://jestjs.io "Jest") with [Testing Library](https://testing-library.com "Testing Library") for testing
- [PostCSS](https://postcss.org "PostCSS") for styling
- Icons made by [Freepik](https://www.freepik.com "Freepik") from [www.flaticon.com](https://www.flaticon.com "Flaticon")

### Instructions

Inside the newly created project, you can run some built-in commands:

- `npm start` or `yarn start`  
  Runs the app in development mode.<br>
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
  The page will automatically reload if you make changes to the code.<br>
  You will see the build errors and lint warnings in the console.

- `npm test` or `yarn test`  
  Runs the test watcher in an interactive mode.<br>
  By default, runs tests related to files changed since the last commit.  
  [Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

- `npm run build` or `yarn build`  
  Builds the app for production to the `build` folder.<br>
  It correctly bundles React in production mode and optimizes the build for the best performance.
  The build is minified and the filenames include the hashes.  
  Your app is ready to be deployed.

### Potential issues

You might face with some issues with PostCSS purifying plugins in reason that CRA (Create React App) don't update PostCSS dependency, they promised that it will be fixed in 5th version of react-scripts (now it is in alpha).
