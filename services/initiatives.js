const fs = require('fs');

class InitiativesService {
  async folderExistsFn(path) {
    return new Promise((resolve, reject) => {
      try {
        fs.exists(path, (exists) => {
          resolve(exists);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  async createFolderFn(path, folderName) {
    return new Promise((resolve, reject) => {
      try {
        fs.mkdir(path, function (err) {
          if (err) return console.log(err);
          resolve(console.log(`New folder ${folderName} was created`));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async createFileFn(path, folderName, fileName, JSONFileContent) {
    return new Promise((resolve, reject) => {
      try {
        let json = JSON.stringify(JSONFileContent);
        fs.writeFile(path + `/${fileName}`, json, function (err) {
          if (err) return console.log(err);
          resolve(
            console.log(`${fileName} file created at ${folderName} folder`)
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = InitiativesService;
