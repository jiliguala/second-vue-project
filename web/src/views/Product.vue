<template>
    <div>
        <el-carousel v-if="loopList.length" height="calc(100vh - 60px)" direction="vertical" :autoplay="false">
            <el-carousel-item v-for="item in loopList" :key="item._id">
                <img :src="`http://localhost:3000${item.cover}`">
            </el-carousel-item>
        </el-carousel>
        <el-empty v-else description="暂无产品" :image-size="50" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const loopList = ref([]);

onMounted(async () => {
    const res = await axios.get('/webapi/product/list');
    loopList.value = res.data.data;
});

</script>

<style lang="scss" scoped>
.el-carousel__item img {
    width: 100%;
}
</style>