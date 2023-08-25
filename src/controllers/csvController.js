// csvController.js
const fs = require('fs');
const csv = require('csv-parser');
const csvService = require('../services/csvService.js'); /////

module.exports.processCsvData = function() {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream('data.csv')
          .pipe(csv())
          .on('data', (row) => {
              data.push(row);
          })
          .on('end', () => {
              const processedData = csvService.validateAndConvertData(data);
              resolve(processedData);
          })
          .on('error', (error) => {
              reject(error);
          });
    });
};


