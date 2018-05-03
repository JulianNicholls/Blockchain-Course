const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildFolder = path.resolve(__dirname, 'build');
fs.removeSync(buildFolder);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const src = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(src, 1).contracts;

fs.ensureDirSync(buildFolder);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildFolder, `${contract.replace(':', '')}.json`),
    output[contract]
  );
}
