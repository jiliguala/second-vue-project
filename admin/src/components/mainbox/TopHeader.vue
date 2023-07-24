<template>
  <el-header>
    <div class="left">
      <el-icon :size="28" @click="handleCollapse">
        <Menu />
      </el-icon>
      <span style="margin-left: 10px;">企业门户管理系统</span>
    </div>
    <div class="right">
      <span>欢迎您 {{store.state.userInfo.username}} 回来</span>
      <el-dropdown style="margin-left: 20px;">
        <span class="el-dropdown-link">
          <el-icon :size="28" style="color: white;"><User /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { useStore } from 'vuex'
import { Menu, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const store = useStore();
const route = useRouter();
const handleCollapse = () => {
  store.commit('changeCollapse');
}
const handleCenter = () => {
  route.push('/center');
}
const handleLoginOut = () => {
  localStorage.removeItem('token'); // 删除token
  store.commit('clearUserInfo'); // 清空用户信息
  route.push('/login');
}
</script>
<style lang="scss" scoped>
  .el-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #2d3a4b;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left, .right {
    display: flex;
  }
  .left {
    i {
      margin: auto;
      cursor: pointer;
    }
  }
  .right {
    .el-dropdown {
      margin: auto;
    }
  }
</style>