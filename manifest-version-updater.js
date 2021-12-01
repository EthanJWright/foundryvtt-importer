const stringifyPackage = require('stringify-package');

const githubRepository = 'https://github.com/EthanJWright/foundryvtt-importer';

module.exports.readVersion = function (contents) {
  return JSON.parse(contents).version;
};

module.exports.writeVersion = function (contents, version) {
  const json = JSON.parse(contents);
  json.version = version;
  json.download = `${githubRepository}/releases/download/v${version}/module.zip`;
  return stringifyPackage(json, 4);
};
