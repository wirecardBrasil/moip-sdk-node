'use strict';

module.exports = {
    installmentCount: 1,
    escrow: {
        description: "Teste escrow"
    },
    fundingInstrument: {
        method: 'CREDIT_CARD',
        creditCard: {
            hash: 'HhL0kbhfid+jwgj5l6Kt9EPdetDxQN8s7uKUHDYxDC/XoULjzik44rSda3EcWuOcL17Eb8JjWc1JI7gsuwg9P0rJv1mJQx+d3Dv1puQYz1iRjEWWhnB1bw0gTvnnC/05KbWN5M8oTiugmhVK02Rt2gpbcTtpS7VWyacfgesBJFavYYMljYg8p2YGHXkXrMuQiOCeemKLk420d0OTMBba27jDVVJ663HZDrObnjFXJH/4B5irkj+HO5genV+V4PYoLcOESG4nrI3oFAsMGsLLcdJo0NNvkEmJpn0e9GzureKKFYisYU+BEd9EMr/odS0VMvOYRV65HbPTspIkjl2+3Q==',
            holder: {
                fullname: 'Jose Santos',
                birthdate: '1980-01-02',
                taxDocument: {
                    type: 'CPF',
                    number: '12345679891'
                },
                phone: {
                    countryCode: '55',
                    areaCode: '11',
                    number: '25112511'
                }
            }
        }
    }
};