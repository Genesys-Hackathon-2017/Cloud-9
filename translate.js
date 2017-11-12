// Example used: https://github.com/watson-developer-cloud/node-sdk#language-translator
var prompt = require('prompt-sync')();
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translator = new LanguageTranslatorV2({
  username: '8a3ee913-28ad-4b67-995f-aadd6be4fd32',
  password: 'U1fcDWd1zhWi',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

/*
    Which language would you like to translate to? Pass it in as an argument
*/

var userMsg = prompt('Enter a message to translate: ');
testFunction(userMsg);

function testFunction(input) {
    language_translator.translate({
      text: input, source : 'en', target: 'fr' },
      function (err, result) {
        if (err)
          console.log('error:', err);
      else
          console.log(result.translations[0].translation);
  });
}

// How to feed data into the "text" field for the Translator Service?
// language_translator.translate({
//   text: 'Hello', source : 'en', target: 'fr' },
//   function (err, translation) {
//     if (err)
//       console.log('error:', err);
//   else
//       console.log(JSON.stringify(translation, null, 2));
// });

// //Display all of the available languages to translate to
// language_translator.identify({
//   text: 'The language translator service takes text input and identifies the language used.' },
//   function (err, language) {
//     if (err)
//       console.log('error:', err);
//   else
//       console.log(JSON.stringify(language, null, 2));
// });
