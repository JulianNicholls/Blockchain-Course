'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var address = '0x045FEBAA2e29cFE938701075e9b2B64a745FeCdf';
var factory = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), address);

exports.default = factory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsImNhbXBhaWduRmFjdG9yeSIsImFkZHJlc3MiLCJmYWN0b3J5IiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU8sQUFBUCxBQUFpQixBQUFqQjs7OztBQUNBLEFBQU8sQUFBUCxBQUE0QixBQUE1Qjs7Ozs7O0FBRUEsSUFBTSxVQUFVLEFBQWhCO0FBQ0EsSUFBTSxVQUFVLElBQUksY0FBSyxBQUFMLElBQVMsQUFBYixTQUNkLEtBQUssQUFBTCxNQUFXLDBCQUFnQixBQUEzQixBQURjLFlBRWQsQUFGYyxBQUFoQixBQUtBOztrQkFBZSxBQUFmIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2p1bGlhbi9zb3VyY2VzL2Jsb2NrY2hhaW4tY291cnNlL2NhbXBhaWduIn0=