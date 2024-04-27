<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import * as https from "https";
import ikun from "@/assets/ikun.png";

interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>

<template>
  <a-list item-layout="horizontal" :data-source="props.userList">
    <template #renderItem="{ item }">
      <a-card hoverable style="width: 240px">
        <template #cover>
          <img alt="example" :src="item.userAvatar" />
        </template>
        <a-card-meta :title="item.userName">
          <template #description>{{ item.userProfile }}</template>
        </a-card-meta>
      </a-card>
    </template>
  </a-list>
</template>

<style scoped></style>