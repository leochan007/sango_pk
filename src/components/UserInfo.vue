<template>
    <div class="userInfo">
        <h3>当前用户: {{current_user}}</h3>
        <el-input :name="'userName'" v-model="input" placeholder="请输入内容"></el-input>
    </div>
</template>

<script>
import web3 from "@/utils/web3"

export default {
  name: 'UserInfo',
  prop : [ 'input' ],
  data () {
    return {
        current_user: web3.eth.defaultAccount
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
  font-size: 100%;
  color: rgb(236, 234, 233);
  font-weight: xlarge;
}
</style>
