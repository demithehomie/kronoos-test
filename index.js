const csvController = require('./src/controllers/csvController.js');

csvController.processCsvData()
    .then(processedData => {
        console.log(processedData);
    })
    .catch(error => {
        console.error("Erro ao processar os dados:", error);
    });
