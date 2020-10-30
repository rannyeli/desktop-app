import axios from 'axios';
import web3 from 'web3';

const etherscanInstance = axios.create({
    baseURL: "https://api.etherscan.io/api",
});

const API_KEY = 'IHIAEPT5A1PY29KW2HHPEZVJPH7TBX1PU1'

export const isAddressValid = (address) => {
    return web3.utils.isAddress(address.toLowerCase());
}

export const fetchTransactions = (address) => {
    return etherscanInstance.get('', {
            params: {
                module: 'account',
                action:'txlist',
                address,
                startblock: 0,
                endblock: 99999999,
                sort: 'asc',
                apikey: API_KEY
            }
        })
}