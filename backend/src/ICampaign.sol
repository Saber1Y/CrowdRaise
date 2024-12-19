// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface ICampaign {
    function title() external view returns (string memory);

    function startDate() external view returns (uint);

    function endDate() external view returns (uint);

    function goal() external view returns (uint);

    function isCanceled() external view returns (bool);

    function totalEthContributed() external view returns (uint);

    function creator() external view returns (address);

    function contributions(
        address _contributor
    ) external view returns (uint256);

    function contributed(address _contributor) external view returns (bool);

    function contributors(uint _index) external view returns (address);

    function contribute(address _customer) external payable;

    function cancelCampaign() external;

    function withdraw() external;

    function refund(address _contributor) external;

    function isActive() external view returns (bool);

    function getContribution(
        address _contributor
    ) external view returns (uint256);

    event ContributionMade(address indexed contributor, uint256 amount);
    event CampaignCanceled();
    event Refund(address customer, uint amount);
    event FundsWithdrawn(address owner, uint256 amount);
}
