const dateUtils = require('../utils/dateUtils.js');

module.exports.validateAndConvertData = function(data) {
    data.forEach(item => {
        item.vlTotal = this.formatToBrl(item.vlTotal);
        item.dtContrato = dateUtils.convertToDate(item.dtContrato);
        item.dtVctPre = dateUtils.convertToDate(item.dtVctPre);
        item.isValidCpfCnpj = (item.nrCpfCnpj.length === 11) ? this.validateCpf(item.nrCpfCnpj) : this.validateCnpj(item.nrCpfCnpj);
    });
    return data;
};

module.exports.formatToBrl = function(value) {
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(value));
    return formattedValue;
};


module.exports.validateCpf = function(cpf) {
    if (cpf.length !== 11 || cpf === cpf[0] * 11) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;

    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;

    return remainder === parseInt(cpf[10]);
};

module.exports.validateCnpj = function(cnpj) {
    if (cnpj.length !== 14 || cnpj === cnpj[0] * 14) return false;

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const calculateDigit = (digits, weights) => {
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            sum += parseInt(digits[i]) * weights[i];
        }
        let remainder = sum % 11;
        if (remainder < 2) return 0;
        return 11 - remainder;
    };

    const firstDigit = calculateDigit(cnpj.slice(0, 12), weights1);
    const secondDigit = calculateDigit(cnpj.slice(0, 13), weights2);

    return firstDigit === parseInt(cnpj[12]) && secondDigit === parseInt(cnpj[13]);
};

module.exports.processData = function(data) {
    data.forEach(item => {
        item.vlTotal = this.formatToBrl(item.vlTotal);
        item.dtContrato = dateUtils.convertToDate(item.dtContrato);
        item.dtVctPre = dateUtils.convertToDate(item.dtVctPre);
        item.isValidCpfCnpj = (item.nrCpfCnpj.length === 11) ? this.validateCpf(item.nrCpfCnpj) : this.validateCnpj(item.nrCpfCnpj);
    });
    return data;
};
