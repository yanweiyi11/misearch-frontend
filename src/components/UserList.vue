<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { Page } from "../../generated";

interface Props {
  userPage: Page;
}

const props = withDefaults(defineProps<Props>(), {
  userPage: () => ({}),
});
</script>

<template>
  <a-list
    :grid="{ gutter: 2, column: 4 }"
    :data-source="props.userPage.records"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable>
          <template #cover>
            <img :alt="item.userName" :src="item.userAvatar" />
          </template>
          <a-card-meta :title="item.userName">
            <template #description>{{ item.userProfile }}</template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
