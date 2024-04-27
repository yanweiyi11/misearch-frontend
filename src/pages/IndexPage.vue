<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.search"
      placeholder="请输入搜索文本"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :postList="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureList />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :userList="userList"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import mxios from "@/plugins/mxios";

const postList = ref([]);
const userList = ref([]);

mxios.post("/post/list/page/vo", {}).then((res: any) => {
  postList.value = res.records;
});

mxios.post("/user/list/page/vo", {}).then((res: any) => {
  userList.value = res.records;
});

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;

const initSearchParams = { search: "", pageSize: 10, pageNum: 1 };
const searchParams = ref(initSearchParams);

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    search: route.query.search,
  } as any;
});

const onSearch = (value: string) => {
  router.push({
    query: searchParams.value,
  });
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
