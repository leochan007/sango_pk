import contract from 'truffle-contract';
import SangoPKSystem from '@contracts/SangoPKSystem.json';
import web3 from "@/utils/web3"
import config from "@/config/config"

const SangoPK = {
  contract: null,
  instance: null,
  owner: null,

  init: () => {
    let self = this;

    return new Promise((resolve, reject) => {
      self.contract = contract({
        abi: SangoPKSystem.abi,
        //address: self.contract_addr, // optional
        // many more
      });
      
      self.contract.setProvider(web3.currentProvider);
      //self.contract.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
      
      self.contract.at(config.contract_addr).then(instance => {
        self.instance = instance;
        instance.owner.call().then(owner => {
          self.owner = owner;
          resolve(self.owner)
        });
      }).catch(error => {
        console.log("init error:", error);
        reject(error);
      });
      
    });
  },

  createHero: (nick, _type) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.createHero(nick, _type)
        .then(response => {resolve(response)})
        .catch(error => {reject(error)});
    });
  },

  getHeroesByOwner: (addr) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.getHeroesByOwner(addr)
        .then(ids => {
          resolve(ids);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  getHeroNameById: (id) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.getHeroNameById(id)
        .then(name => {
          //console.log(name);
          resolve(name);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  getHeroLvlById: (id) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.getHeroLvlById(id)
        .then(level => {
          //console.log(level);
          resolve(level.toNumber());
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  getHeroForceById: (id) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.getHeroForceById(id)
        .then(force => {
          //console.log(force);
          resolve(force.toNumber());
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  getHeroLeadershipById: (id) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.getHeroLeadershipById(id)
        .then(leadership => {
          //console.log(leadership);
          resolve(leadership.toNumber());
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  getHeroIntelligenceById: (id) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.getHeroIntelligenceById(id)
        .then(intelligence => {
          //console.log(intelligence);
          resolve(intelligence.toNumber());
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  getHeroIPFSURLById: (id) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self.instance.getHeroIPFSURLById(id)
        .then(ipfsUrl => {
          //console.log(ipfsUrl);
          resolve(ipfsUrl);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
};

export default SangoPK;
