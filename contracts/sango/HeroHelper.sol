pragma solidity ^0.4.18;

import "./HeroFactory.sol";

contract HeroHelper is HeroFactory {

  uint levelUpFee = 0.001 ether;

  modifier aboveLevel(uint _level, uint heroId) {
    require(heroes[heroId].level >= _level);
    _;
  }

  modifier onlyOwnerOf(uint heroId) {
    require(msg.sender == heroToOwner[heroId]);
    _;
  }

  function withdraw() external onlyOwner {
    owner.transfer((address(this)).balance);
  }

  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  function levelUp(uint heroId) external payable {
    require(msg.value == levelUpFee);
    heroes[heroId].level++;
  }

  function changeName(uint heroId, string _newName) external aboveLevel(2, heroId) onlyOwnerOf(heroId) {
    heroes[heroId].name = _newName;
  }

  function getHeroesByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerHeroCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < heroes.length; i++) {
      if (heroToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function getHeroNameById(uint id) external view returns(string) {
    Hero memory hero = heroes[id];
    return hero.name;
  }

  function getHeroLvlById(uint id) external view returns(uint) {
    Hero memory hero = heroes[id];
    return hero.level;
  }

  function getHeroIPFSURLById(uint id) external view returns(string) {
    Hero memory hero = heroes[id];
    return hero.ipfsUrl;
  }

  function getHeroForceById(uint id) external view returns(uint8) {
    Hero memory hero = heroes[id];
    return hero.force;
  }

  function getHeroLeadershipById(uint id) external view returns(uint8) {
    Hero memory hero = heroes[id];
    return hero.leadership;
  }

  function getHeroIntelligenceById(uint id) external view returns(uint8) {
    Hero memory hero = heroes[id];
    return hero.intelligence;
  }

}
