<template>
    <el-page-header content="首页" icon="" title="企业门户管理系统"></el-page-header>
    <el-card class="box-card">
        <el-row>
            <el-col :span="4">
                <el-avatar :size="100" :src="avatarUrl" />
            </el-col>
            <el-col :span="20">
                <h3>欢迎 {{ store.state.userInfo.username }} 回来， {{ welcomTxt }}</h3>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公司产品</span>
                <el-carousel v-if="loopData.length" :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in loopData" :key="item._id">
                        <div :style="{
                            backgroundImage: `url(http://localhost:3000${item.cover})`,
                            backgroundSize: 'cover'
                        }">
                            <h3 text="2xl" justify="center">{{ item.title }}</h3>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </template>
    </el-card>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';

const store = useStore();
const avatarUrl = computed(() => store.state.userInfo.avatar ? `http://localhost:3000${store.state.userInfo.avatar}` : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`);
const welcomTxt = computed(() => new Date().getHours() < 12 ? `每天要开心哟` : `您可能累了，喝杯咖啡提提神吧`);

// 获取列表数据
const loopData = ref([]);
const getData = async () => {
    const res = await axios.get('/adminapi/product/list');
    loopData.value = res.data.data;
}

// 页面加载就初始化 产品列表
onMounted(() => {
    getData();
});

</script>

<style scoped>
.box-card {
    margin-bottom: 50px;
}

.el-col h3 {
    line-height: 100px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>