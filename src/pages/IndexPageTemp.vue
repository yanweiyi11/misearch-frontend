<!--<template>-->
<!--  <div class="store-page">-->
<!--    <a-input-search-->
<!--      v-model:value="searchText"-->
<!--      placeholder="搜索文章/图片/用户"-->
<!--      enter-button-->
<!--      @search="onSearch"-->
<!--    />-->
<!--    <MyDivider />-->
<!--    <a-tabs v-model:activeKey="currentTab" @change="onTabChange">-->
<!--      <a-tab-pane key="post" tab="文章">-->
<!--        <PostList :postList="postList" />-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane key="picture" tab="图片">-->
<!--        <PictureList :pictureList="pictureList" />-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane key="user" tab="用户">-->
<!--        <UserList :userList="userList" />-->
<!--      </a-tab-pane>-->
<!--    </a-tabs>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, watchEffect } from "vue";-->
<!--import { useRoute, useRouter } from "vue-router";-->

<!--import PostList from "@/components/PostList.vue";-->
<!--import UserList from "@/components/UserList.vue";-->
<!--import PictureList from "@/components/PictureList.vue";-->
<!--import MyDivider from "@/components/MyDivider.vue";-->
<!--import { SearchControllerService, SearchRequest } from "../../generated";-->
<!--import { message } from "ant-design-vue";-->
<!--import { ResourceType } from "@/enums/ResourceType";-->

<!--// 引用数据列表-->
<!--const postList = ref([]);-->
<!--const userList = ref([]);-->
<!--const pictureList = ref([]);-->

<!--// 路由和路由参数-->
<!--const router = useRouter();-->
<!--const route = useRoute();-->
<!--const currentTab = ref(route.params.category);-->

<!--// 初始化搜索参数-->
<!--const initialSearchParams = {-->
<!--  type: currentTab.value,-->
<!--  searchText: "",-->
<!--  pageSize: 10,-->
<!--  pageNum: 1,-->
<!--} as SearchRequest;-->

<!--// 实际搜索参数-->
<!--const searchParams = ref<SearchRequest>({ ...initialSearchParams });-->

<!--// 搜索文本-->
<!--const searchText = ref("");-->

<!--/**-->
<!-- * 加载数据-->
<!-- *-->
<!-- * @param params-->
<!-- */-->
<!--const fetchSearchData = async (params: SearchRequest) => {-->
<!--  const searchRequestParams = { ...params };-->
<!--  if (!searchRequestParams.type) {-->
<!--    searchRequestParams.type = ResourceType.POST;-->
<!--  }-->
<!--  // 发起搜索请求-->
<!--  const res = await SearchControllerService.doSearchUsingPost(params);-->
<!--  if (res.code === 0) {-->
<!--    // 使用映射来简化条件逻辑-->
<!--    const resourceMap = {-->
<!--      [ResourceType.POST]: () => postList.value = res.data.dataList,-->
<!--      [ResourceType.USER]: () => userList.value = res.data.dataList,-->
<!--      [ResourceType.PICTURE]: () => pictureList.value = res.data.dataList,-->
<!--    };-->

<!--    // 根据类型更新对应的数据列表-->
<!--    const updateFunction = resourceMap[searchRequestParams.type];-->
<!--    if (updateFunction) {-->
<!--      updateFunction();-->
<!--    }-->
<!--  } else {-->
<!--    message.error("加载失败，" + res.message);-->
<!--  }-->
<!--};-->

<!--// 监听路由变化并加载数据-->
<!--watchEffect(() => {-->
<!--  searchParams.value = {-->
<!--    ...initialSearchParams,-->
<!--    searchText: route.query.searchText as string,-->
<!--    type: route.params.category as string,-->
<!--  };-->
<!--  fetchSearchData(searchParams.value);-->
<!--});-->

<!--// 处理搜索事件-->
<!--const onSearch = (value: string) => {-->
<!--  router.push({-->
<!--    query: {-->
<!--      ...searchParams.value,-->
<!--      searchText: value,-->
<!--    },-->
<!--  });-->
<!--};-->

<!--// 处理标签页改变事件-->
<!--const onTabChange = (tabName: string) => {-->
<!--  router.push({-->
<!--    path: `/${tabName}`,-->
<!--    query: searchParams.value,-->
<!--  });-->
<!--};-->
<!--</script>-->
