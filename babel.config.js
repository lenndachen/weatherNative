// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   // presets: ["react-native", "module:react-native-dotenv"],
// };

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv']
  };
}