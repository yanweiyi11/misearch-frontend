<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { Page } from "../../generated";
import { LikeOutlined, StarOutlined } from "@ant-design/icons-vue";
import moment from "moment";

interface Props {
  postPage: Page;
}

const props = withDefaults(defineProps<Props>(), {
  postPage: () => ({}),
});
</script>

<template>
  <a-list :data-source="props.postPage.records" :split="false">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card style="width: 100%" hoverable>
          <template #title>
            <a
              class="link-title"
              :href="`/#/post/${item.id}`"
              target="_blank"
              >{{ item.title }}</a
            >
          </template>
          <template #extra>
            <a-tag v-for="(tag, index) of item.tagList" :key="index">
              {{ tag }}
            </a-tag>
          </template>
          <div class="description">{{ item.content }}</div>
          <div class="footer">
            <span class="footer-item">
              {{ moment(item.updateTime).format("YYYY-MM-DD") }}
            </span>
            <span class="footer-item">
              <component :is="StarOutlined" /> {{ item.favourNum }}
            </span>
            <span class="footer-item">
              <component :is="LikeOutlined" /> {{ item.thumbNum }}
            </span>
          </div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>
.description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer {
  margin-top: 16px;
  color: #8c8c8c;
}

.footer-item {
  margin-right: 20px;
}

.link-title {
  color: #141414; /* 默认颜色 */
}

.link-title:hover {
  color: #1890ff; /* 鼠标移入时的颜色 */
}
</style>
