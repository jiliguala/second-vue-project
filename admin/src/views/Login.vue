<template>
  <div>
    <vue-particles id="tsparticles" :particlesInit="particlesInit" :options="options" />
    <div class="loginform">
      <h3>企业门户网站管理系统</h3>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="120px"
        class="demo-ruleForm">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { loadFull } from "tsparticles"
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

// 表单绑定的响应式对象
const loginForm = reactive({
  username: '',
  password: ''
});

// 表单的引用对象
const loginFormRef = ref();

// 校验规则
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
});
const router = useRouter();
const store = useStore();
// 表单提交函数
const submitForm = () => {
  // 校验表单 手动触发
  // 拿到表单内容 提交后台
  // 设置token
  loginFormRef.value.validate((valid) => { //valid返回true和false
    if (valid) {
      axios.post('/adminapi/user/login', loginForm).then((res) => {
        if (res.data.actionType === 'ok') {
          store.commit('changeUserInfo', res.data.data);
          store.commit('changeGetRouter', false); // 切换用户登录后再次改为第一次进入 便于重新获得用户权限
          router.push('/index');
        } else {
          ElMessage.error('用户名密码错误');
        }
      });
    }
  });
}

// 配置particles
const options = {
  background: {
    color: {
      value: '#2d3a4b'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 },
    }
  },
  detectRetina: true
}
// 显示粒子效果
const particlesInit = async (engine) => {
  await loadFull(engine)
}
</script>
<!-- scoped指定样式局部作用域 -->
<style lang="scss" scoped>
.loginform {
  position: fixed;
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba($color: #000, $alpha: 0.5);
  color: white;
  padding: 20px;

  h3 {
    font-size: 30px;
    line-height: 60px;
    margin-bottom: 20px;
  }
}

//scoped局部作用域下 可用深度作用选择器::v-deep 不造成污染
::v-deep .el-form-item__label {
  color: white;

}
</style>