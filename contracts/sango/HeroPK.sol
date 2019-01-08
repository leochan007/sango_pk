pragma solidity ^0.4.18;

import "./HeroHelper.sol";
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract HeroPK is HeroHelper {

  using SafeMath for uint256;

  uint randNonce = 0;
  uint attackVictoryProbability = 70;

  event PKEvent(bool iWin);

  function randMod(uint _modulus) internal returns(uint) {
    randNonce = randNonce.add(1);
    return uint(keccak256(now, msg.sender, randNonce)) % _modulus;
  }

  function pk(uint heroId, uint _targetId) external onlyOwnerOf(heroId) {
    Hero storage myHero = heroes[heroId];
    Hero storage enemyHero = heroes[_targetId];
    uint rand = randMod(100);
    if (rand <= attackVictoryProbability) {
        myHero.winCount = myHero.winCount.add(1);
        enemyHero.lossCount = enemyHero.lossCount.add(1);
        if (myHero.winCount % 10 == 1 && myHero.level < 10) {
            myHero.level = myHero.level.add(1);
        }
        PKEvent(true);
    } else {
        myHero.lossCount = myHero.lossCount.add(1);
        enemyHero.winCount = enemyHero.winCount.add(1);
        if (enemyHero.winCount % 10 == 1 && enemyHero.level < 20) {
            enemyHero.level = enemyHero.level.add(1);
        }
        PKEvent(false);
    }
  }
}
