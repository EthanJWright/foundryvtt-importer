const manifest = {
    filename: "src/module.json",
    updater: require("./manifest-version-updater"),
};

const package = {
    filename: "package.json",
    type: "json",
};

const packageLock = {
    filename: "package-lock.json",
    type: "json",
};

module.exports = {
    bumpFiles: [package, packageLock, manifest],
};
