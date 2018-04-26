const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const src = fs.readFileSync(inboxPath, 'utf8');

// Export the compiled contract
module.exports = solc.compile(src, 1).contracts[':Inbox'];
