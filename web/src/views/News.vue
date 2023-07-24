<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage: `url(${require('@/assets/images/newsbj.jpg')})`
        }"></div>
        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchTxt" class="w-50 m-2" placeholder="请输入新闻关键字" :prefix-icon="Search"
                        type="search" size="large" @input="visible = true" @blur="visible = false" />
                </template>
                <div v-if="searchnewslist.length">
                    <div class="search-itetm" v-for="data in searchnewslist" :key="data._id" @click="handleChangePage(data._id)">{{ data.title }}</div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50" />
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewList" :key="item._id" @click="handleChangePage(item._id)">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <img :src="`http://localhost:3000${item.cover}`" :alt="item.title" class="image" />
                        <div style="padding: 14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ whichTime(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-tabs v-model="whichTab" class="demo-tabs">
            <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="con in tabcontent[item.name]" :key="con._id" @click="handleChangePage(con._id)">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <img :src="`http://localhost:3000${con.cover}`" :alt="con.title" class="image" />
                            <div style="padding: 14px">
                                <span>{{ con.title }}</span>
                                <div class="bottom">
                                    <time class="time">{{ whichTime(con.editTime) }}</time>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, computed } from 'vue';
import moment from 'moment';
moment.locale('zh-cn');
import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'vue-router';

const searchTxt = ref('');
const visible = ref(false);
const newslist = ref([]);

onMounted(async () => {
    const res = await axios.get('/webapi/news/list');
    newslist.value = res.data.data;
});

// 检索新闻
const searchnewslist = computed(() =>
    searchTxt.value ? newslist.value.filter(item =>
        item.title.includes(searchTxt.value)
    ) : []
);

// 推荐新闻列表
const topNewList = computed(() => newslist.value.slice(0, 4));
const whichTime = item => {
    return moment(item).format('lll');
}

// 分类标签页
const whichTab = ref(1);
const tablist = [
    {
        label: '最新动态',
        name: 1
    },
    {
        label: '典型案例',
        name: 2
    },
    {
        label: '通知公告',
        name: 3
    }
];
// 组装tab内容
const tabcontent = computed(() =>
    // 按照category来分组
    _.groupBy(newslist.value, item => item.category)
);

// 跳转新闻详情
const router = useRouter();
const handleChangePage = (id) => {
    router.push(`/news/${id}`);
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}

.news-header {
    width: 100%;
    height: 400px;
    background-size: cover;
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-itetm {
    padding: 0 10px;
    height: 50px;
    line-height: 50px;

    &:hover {
        background: whitesmoke;
        color: red;
    }
}

.topnews,
.demo-tabs {
    margin: 20px;

    img {
        width: 100%;
        height: 150px;
    }

    .time {
        font-size: 13px;
        color: #666;
    }
}
</style>