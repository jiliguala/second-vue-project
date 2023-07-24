<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <h2>{{ currentNews.title }}</h2>
            <div class="time">
                {{ whichTime(currentNews.editTime) }}
            </div>
            <el-divider>
                <el-icon>
                    <StarFilled />
                </el-icon>
            </el-divider>
            <!-- 有跨站脚本攻击的风险 -->
            <div v-html="currentNews.content" class="html-content"></div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16px; font-weight: bold;">最近新闻</span>
                    </div>
                </template>
                <!-- 返回最后编辑的4条新闻 -->
                <div v-for="item in topNewsList" :key="item._id" @click="handleChangePage(item._id)" class="top-news-text">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="time">{{ whichTime(item.editTime) }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref, watchEffect, onBeforeUnmount } from 'vue';
import { StarFilled } from '@element-plus/icons-vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
moment.locale('zh-cn');
const route = useRoute();
const currentNews = ref({});
const topNewsList = ref([]);

// 问题：当前页跳转当前页 数据不更新
// 解决：用watchEffect 当依赖发生改变时 重新执行该函数 开启监听
const stop = watchEffect(async () => {
    if(!route.params.id) return;
    const res = await axios.get(`/webapi/news/list/${route.params.id}`);
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
    currentNews.value = res.data.data[0];
    topNewsList.value = res2.data.data;
});
// 离开当前页 销毁监听
onBeforeUnmount(() => {
    stop();
});

const whichTime = item => {
    return moment(item).format('lll');
}
// 跳转新闻详情
const router = useRouter();
const handleChangePage = (id) => {
    router.push(`/news/${id}`);
}
</script>
<style lang="scss" scoped>
.el-row {
    margin-top: 30px;

}

.time {
    font-size: 13px;
    color: #666;
}
.top-news-text {
    padding: 10px 0;
    cursor: pointer;
}
</style>