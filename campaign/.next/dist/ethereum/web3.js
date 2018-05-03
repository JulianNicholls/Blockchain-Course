'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var provider = void 0;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Running in browser
  provider = window.web3.currentProvider;
} else {
  // Running in Next / Node, or user is not running Metamask
  provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/DpFnlYt9rqqxCDHY6dmr');
}

exports.default = new _web2.default(provider);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsInByb3ZpZGVyIiwid2luZG93Iiwid2ViMyIsImN1cnJlbnRQcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQOzs7Ozs7QUFFQSxJQUFJLGdCQUFKOztBQUVBLElBQUksT0FBTyxBQUFQLFdBQWtCLEFBQWxCLGVBQWlDLE9BQU8sT0FBTyxBQUFkLFNBQXVCLEFBQTVELGFBQXlFLEFBQ3ZFO0FBQ0E7YUFBVyxPQUFPLEFBQVAsS0FBWSxBQUF2QixBQUNEO0FBSEQsT0FHTyxBQUNMO0FBQ0E7YUFBVyxJQUFJLGNBQUssQUFBTCxVQUFlLEFBQW5CLGFBQ1QsQUFEUyxBQUFYLEFBR0Q7QUFFRDs7a0JBQWUsQUFBSSxBQUFKLGtCQUFTLEFBQVQsQUFBZiIsImZpbGUiOiJ3ZWIzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qdWxpYW4vc291cmNlcy9ibG9ja2NoYWluLWNvdXJzZS9jYW1wYWlnbiJ9