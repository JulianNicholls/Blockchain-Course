import web3 from './web3';
import campaignFactory from './build/Campaign.json';

const address = '0x045FEBAA2e29cFE938701075e9b2B64a745FeCdf';
const factory = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  address
);

export default factory;
