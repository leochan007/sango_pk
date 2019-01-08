pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract HeroFactory is Ownable {

  using SafeMath for uint256;

  event NewHero(uint heroId, string name, uint dna);

  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 1 minutes;

  struct Hero {
    string name;
    string ipfsUrl;

    uint8 force;
    uint8 leadership;
    uint8 intelligence;

    string nick;
    uint dna;
    uint level;
    uint32 readyTime;
    uint winCount;
    uint lossCount;
  }

  function HeroFactory() public {
      createHero("demoBoss1", 0);
      createHero("demoBoss2", 1);
      createHero("demoBoss3", 2);
      createHero("demoBoss4", 3);
      createHero("demoBoss5", 4);
  }

  Hero[] public heroes;

  mapping (uint => address) public heroToOwner;
  mapping (address => uint) ownerHeroCount;

  function _createHero(string _nick, uint8 _type, uint _dna) internal {
    
    Hero memory hero = Hero("", "", 0, 0, 0, "", 0, 0, 0, 0, 0);

    if (_type == 1) {
        hero.name = "张飞";
        hero.ipfsUrl = "QmdN1eWKyg7po5QfNWRRzYYiQZ6kReALHJQrkqN2JzjopF";
        hero.force = 99;
        hero.leadership = 75;
        hero.intelligence = 30;
    } else if (_type == 2) {
        hero.name = "赵云";
        hero.ipfsUrl = "QmP36sSnENmtryZeaLFFBJYtEtMLsKbayGuau59GTAqDax";
        hero.force = 97;
        hero.leadership = 85;
        hero.intelligence = 80;
    } else if (_type == 3) {
        hero.name = "马超";
        hero.ipfsUrl = "QmaUZLzwCdNgtTk3aU3gUMSWrx3RtYidtAbwPv3qPnBbep";
        hero.force = 96;
        hero.leadership = 80;
        hero.intelligence = 50;
    } else if (_type == 4) {
        hero.name = "黄忠";
        hero.ipfsUrl = "QmVKd79m5DBYuAwKHEbJP4u5Qr4TJYCH7dW5i9DnidPHVS";
        hero.force = 89;
        hero.leadership = 95;
        hero.intelligence = 60;
    } else {
        hero.name = "关羽";
        hero.ipfsUrl = "QmVroVzwV9a4y7dBBfMWyxd6yZzam3o3SnXLcuXAh59z6d";
        hero.force = 98;
        hero.leadership = 85;
        hero.intelligence = 40;
    }

    hero.nick = _nick;
    hero.dna = _dna;
    hero.readyTime = uint32(now + cooldownTime);

    uint id = heroes.push(hero) - 1;
    heroToOwner[id] = msg.sender;
    ownerHeroCount[msg.sender] = ownerHeroCount[msg.sender].add(1);
    NewHero(id, hero.nick, _dna);
  }

  function _generateRandomDna(string _str) private view returns (uint) {
    uint rand = uint(keccak256(_str));
    return rand % dnaModulus;
  }

  function createHero(string nick, uint8 _type) public {

    uint randDna = _generateRandomDna(nick);
    randDna = randDna - randDna % 100;
    _createHero(nick, _type, randDna);

  }

}
