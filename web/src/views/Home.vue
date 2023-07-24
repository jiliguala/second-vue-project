<template>
    <div class="container">
        <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item :key="1">
                <img :src="require('@/assets/images/1.jpg')" alt="">
            </el-carousel-item>
            <el-carousel-item :key="2">
                <img :src="require('@/assets/images/2.jpg')" alt="">
            </el-carousel-item>
            <el-carousel-item :key="3">
                <img :src="require('@/assets/images/3.jpg')" alt="">
            </el-carousel-item>
            <el-carousel-item :key="4">
                <img :src="require('@/assets/images/4.jpg')" alt="">
            </el-carousel-item>
        </el-carousel>
        <div class="center">互联网+时代</div>
    </div>
</template>
<style lang="scss" scoped >
.container {
    position: relative;
}
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: #333;
    text-align: center;
}
.el-carousel img {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>