pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value >= 0.01 ether);
        
        players.push(msg.sender);
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    function pickWinner() public restricted {
        uint winner = random() % players.length;
        
        players[winner].transfer(address(this).balance);
        
        players = new address[](0);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}