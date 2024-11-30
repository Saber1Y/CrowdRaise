// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract Campaign is Ownable(msg.sender) {
    string public title;
    uint public startDate;
    uint public endDate;
    uint public goal;
    bool public isCanceled;
    uint public totalEthContributed;
    address public creator;
    mapping(address => uint256) public contributions;
    mapping(address => bool) public contributed;
    address[] public contributors;

    modifier hasStarted() {
        if (block.timestamp < startDate) revert CampaignNotStarted();
        _;
    }
    modifier hasNotEnded() {
        if (block.timestamp >= endDate) revert CampaignEnded();
        _;
    }
    modifier hasEnded() {
        if (block.timestamp < endDate) revert CampaignNotEnded();
        _;
    }
    modifier goalNotReached() {
        if (totalEthContributed >= goal) revert CampaignGoalReached();
        _;
    }
    modifier goalReached() {
        if (totalEthContributed < goal) revert CampaignGoalNotReached();
        _;
    }
    modifier isNotCanceled() {
        if (isCanceled) {
            revert CampaignIsCanceled();
        }
        _;
    }
    modifier isContributor() {
        if (!contributed[msg.sender]) revert OnlyContributor();
        _;
    }

    error AmountLessThanZero();

    error CampaignNotStarted();
    error CampaignEnded();
    error CampaignNotEnded();
    error CampaignGoalReached();
    error CampaignGoalNotReached();
    error CampaignGoalExceeded();
    error CampaignIsCanceled();
    error OnlyContributor();

    event ContributionMade(address indexed contributor, uint256 amount);
    event CampaignCanceled();
    event Refund(address customer, uint amount);
    event FundsWithdrawn(address owner, uint256 amount);

    constructor(
        string memory _title,
        uint _startDate,
        uint _endDate,
        uint _goal,
        address _creator
    ) {
        title = _title;
        startDate = _startDate;
        endDate = _endDate;
        goal = _goal;
        creator = msg.sender;
        isCanceled = false;
        totalEthContributed = 0;
        creator = _creator;
    }

    // Refund contributors
    function _refund(address _contributor, uint _amount) internal {
        uint256 contributedAmount_ = contributions[_contributor];
        if (contributedAmount_ > 0) {
            contributions[_contributor] = 0; // Prevent re-entrancy
            (bool success, ) = payable(_contributor).call{
                value: contributedAmount_
            }("");
            require(success, "Transfer failed");
            emit Refund(_contributor, _amount);
        }
    }

    // Contribute to this Campaign by sending ETH
    function contribute()
        public
        payable
        hasStarted
        hasNotEnded
        isNotCanceled
        goalNotReached
    {
        address customer_ = msg.sender;
        uint amount_ = msg.value;
        if (amount_ <= 0) revert AmountLessThanZero();
        if (totalEthContributed + amount_ > goal) revert CampaignGoalExceeded();
        if (!contributed[customer_]) {
            contributed[customer_] = true;
            contributors.push(customer_);
        }

        contributions[customer_] += amount_;
        totalEthContributed += amount_;
        emit ContributionMade(customer_, amount_);
    }

    // Cancel the campaign
    function cancelCampaign()
        public
        isNotCanceled
        goalNotReached
        hasNotEnded
        onlyOwner
    {
        for (uint i = 0; i < contributors.length; i++) {
            address contributor_ = contributors[i];
            uint amount_ = contributions[contributor_];
            _refund(contributor_, amount_);
        }
        isCanceled = true;
        emit CampaignCanceled();
    }

    // Withdraw funds if has ended and goal is reached.
    function withdraw() public isNotCanceled hasEnded goalReached onlyOwner {
        uint256 amount_ = payable(address(this)).balance;
        (bool success, ) = payable(creator).call{value: amount_}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(creator, amount_);
    }

    // Refund contributors if the campaign fails or is canceled
    function refund(
        address _contributor
    ) public hasEnded goalNotReached onlyOwner {
        uint amount_ = contributions[_contributor];
        if (_contributor == creator) {
            for (uint i = 0; i < contributors.length; i++) {
                address contributor_ = contributors[i];
                _refund(contributor_, contributions[contributor_]);
            }
        } else if (contributed[_contributor] && amount_ > 0) {
            _refund(_contributor, amount_);
        }
    }

    function isActive() external view returns (bool) {
        return (block.timestamp > endDate && !isCanceled);
    }

    // Get the contribution amount for a given user
    function getContribution(
        address _contributor
    ) public view returns (uint256) {
        return contributions[_contributor];
    }
}
