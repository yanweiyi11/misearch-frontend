<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { PostControllerService, PostVO } from "../../generated";
import { message } from "ant-design-vue";
import MDViewer from "@/components/MDViewer.vue";

const route = useRoute();
const post = ref<PostVO>();

const loadData = async () => {
  const res = await PostControllerService.getPostVoByIdUsingGet(
    route.params.id as any
  );
  if (res.code === 0) {
    post.value = res.data;
  } else {
    message.error("加载数据失败，" + res.message);
  }
};
onMounted(() => {
  loadData();
});
</script>

<template>
  <div id="post-content">
    <a-card :title="post?.title">
      <template #extra>
        <a-tag v-for="(tag, index) of post?.tagList" :key="index">
          {{ tag }}
        </a-tag>
      </template>
      <MDViewer id="md-viewer" :value="post?.content as string" />
    </a-card>
  </div>
</template>

<style scoped>
::v-deep(.medium-zoom-image) {
  max-width: 93vh;
}
#post-content {
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px 0 30px 0;
}
</style>
