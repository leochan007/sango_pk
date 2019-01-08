<template>
  <div class="hello" :style="note">
    <div class="internal">
      <el-container>
        <el-header>
          <h1>{{ title }}</h1>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <h2>我方武将</h2>
            <h2>武将名:<a :href="`http://ipfs.io/ipfs/${hash1}`">{{ name1 }}</a></h2>
            <h2>等级: {{ level1 }}</h2>
            <h2>武力: {{ force1 }}</h2>
            <h2>统御力: {{ leadership1 }}</h2>
            <h2>智力: {{ intelligence1 }}</h2>
          </el-aside>
          <el-main>
      <div class="main_panel">
        <el-button @click.native="createHero">创建武将</el-button>
        <el-dropdown  @command="handleCommand">
          <el-button type="primary">选择敌人<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu split-button slot="dropdown">
    <el-dropdown-item command="1">关羽</el-dropdown-item>
    <el-dropdown-item command="2">张飞</el-dropdown-item>
    <el-dropdown-item command="3">赵云</el-dropdown-item>
    <el-dropdown-item command="4">马超</el-dropdown-item>
    <el-dropdown-item command="5">黄忠</el-dropdown-item>
  </el-dropdown-menu>

          <!--el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in items" v-text="item" command="item" :key="item">
              武将
            </el-dropdown-item>
          </el-dropdown-menu-->
        </el-dropdown>

        <el-button>开始单挑</el-button>
      </div>
      <div class="m_panel2">
        <el-button>武将排行榜</el-button>
        <el-button>交易市场</el-button></div>
          <h2>合约所有者: {{ owner }}</h2>
          <!--UserInfo ref="userInfo" /-->
          <UserInfo />
        </el-main>
          <el-aside width="200px">
            <h2>敌方武将</h2>
            <h2>武将名:<a :href="`http://ipfs.io/ipfs/${hash2}`">{{ name2 }}</a></h2>
            <h2>等级: {{ level2 }}</h2>
            <h2>武力: {{ force2 }}</h2>
            <h2>统御力: {{ leadership2 }}</h2>
            <h2>智力: {{ intelligence2 }}</h2>
          </el-aside>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import SangoPK from '@/contracts/sangopk'
import web3 from "@/utils/web3"
import UserInfo from '@/components/UserInfo.vue'

export default {
  name: 'PKMain',
  components: {
    UserInfo,
  },
  data () {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/bg.jpeg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      title: 'PK三国之大乱斗',
      items: [],
      owner: null,
      name1: "",
      level1: 0,
      force1: 0,
      leadership1: 0,
      intelligence1: 0,
      hash1: "",
      name2: "",
      level2: 0,
      force2: 0,
      leadership2: 0,
      intelligence2: 0,
      hash2: ""
    }
  },
  beforeCreate () {
    SangoPK.init().then(owner => {
      this.owner = owner
      SangoPK.getHeroesByOwner(web3.eth.defaultAccount).then(ids => {
        if (ids.length>0)
        {
          var currId = ids[0].toNumber();
        SangoPK.getHeroNameById(currId).then(name => {
          this.name = name;
        });
        SangoPK.getHeroLvlById(currId).then(lvl => {
          this.level = lvl;
        });
        SangoPK.getHeroForceById(currId).then(force => {
          this.force = force;
        });
        SangoPK.getHeroLeadershipById(currId).then(leadership => {
          this.leadership = leadership;
        });
        SangoPK.getHeroIntelligenceById(currId).then(intelligence => {
          this.intelligence = intelligence;
        });
        SangoPK.getHeroIPFSURLById(currId).then(hash => {
          this.hash = hash
        });

        }
      }).catch(error => console.log(error))

      SangoPK.getHeroesByOwner(owner).then(ids => {
        var temp = [];
        for (var i=0;i<ids.length;i++)
        {
          temp[i] = ids[i].toNumber();
        }
        self.item = temp
      }).catch(error => console.log(error))
    })
  },
  methods: {
    createHero() {
      //console.log('input:', this.$refs.userName.value)
      SangoPK.createHero(this.$refs.userName.value, 0).then(response => {console.log('finish create', response)})
    },
    handleCommand(command) {
        var iv = Number(command) - 1;
        SangoPK.getHeroNameById(iv).then(name => {
          this.name2 = name;
        });
        SangoPK.getHeroLvlById(iv).then(lvl => {
          this.level2 = lvl;
        });
        SangoPK.getHeroForceById(iv).then(force => {
          this.force2 = force;
        });
        SangoPK.getHeroLeadershipById(iv).then(leadership => {
          this.leadership2 = leadership;
        });
        SangoPK.getHeroIntelligenceById(iv).then(intelligence => {
          this.intelligence2 = intelligence;
        });
        SangoPK.getHeroIPFSURLById(iv).then(hash => {
          this.hash2 = hash
        });
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height:100%;
  width: 100%;
  position:fixed; 
} 
.internal {
  margin-top:5%;
  height:100%;
  width: 100%;
  position:fixed; 
} 
.main_panel {
  margin-top: 25%;
} 
.m_panel2 {
  margin-top: 1%;
} 
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
h1 {
  text-align: center;
  font-size: 500%;
  color: rgb(248, 245, 244);
  font-weight: xlarge;
}
h2 {
  text-align: center;
  font-size: 150%;
  color: rgb(236, 234, 233);
  font-weight: xlarge;
}
h3 {
  text-align: center;
  font-size: 100%;
  color: rgb(236, 234, 233);
  font-weight: xlarge;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
