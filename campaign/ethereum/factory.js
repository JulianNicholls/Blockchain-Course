import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const address = '0x6a79b947702e43A465b2fc49AC867Df8c7A95Baa';
const factory = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  address
);

export default factory;
