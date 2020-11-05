const functions = require('firebase-functions');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.onFileChange = functions.storage.object().onFinalize((event) => {
  console.log(event);

  return;

 });
