<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import unloaded_image from "@/assets/unloaded_image.png";
import { Page } from "../../generated";

interface Props {
  picturePage: Page;
}

const props = withDefaults(defineProps<Props>(), {
  picturePage: () => ({}),
});
</script>

<template>
  <a-list :grid="{ gutter: 6, column: 3 }" :data-source="props.picturePage.records">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable>
          <template #cover>
            <a-image :src="item.url" :fallback="unloaded_image" />
          </template>
          <a-card-meta :title="item.title" />
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>