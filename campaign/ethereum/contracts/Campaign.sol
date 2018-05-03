pragma solidity ^0.4.17;

// Contract to deploy campaigns
contract CampaignFactory {
    address[] public deployedCampaings;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaings.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaings;
    }
}

// Contract for Kickstarter-style campaigns
contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributors;
    uint public contributorsCount;
    Request[] public requests;

    modifier restricted {
        require(msg.sender == manager);
        _;        
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        
        contributors[msg.sender] = true;
        ++contributorsCount;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory req = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        // Alternative syntax: it's positional, so has potential problems.
        // req = Request(description, value, recipient, false, 0);
        
        requests.push(req);
    }
    
    function approveRequest(uint index) public {
        Request storage thisReq = requests[index];
        
        require(contributors[msg.sender]);
        require(!thisReq.approvals[msg.sender]);
        
        thisReq.approvals[msg.sender] = true;
        ++thisReq.approvalCount;
    }
    
    function finaliseRequest(uint index) public restricted {
        Request storage thisReq = requests[index];

        require(!thisReq.complete);      
        require(thisReq.approvalCount * 2 >= contributorsCount);
        
        thisReq.recipient.transfer(thisReq.value);
        thisReq.complete = true;
    }
}