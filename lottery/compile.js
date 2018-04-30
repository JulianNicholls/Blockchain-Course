const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const src = fs.readFileSync(lotteryPath, 'utf8');

// Export the compiled contract
module.exports = solc.compile(src, 1).contracts[':Lottery'];
