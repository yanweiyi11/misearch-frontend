<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";

const plugins = [
  gfm(),
  highlight(),
  math(),
  mediumZoom(),
  breaks(),
  frontmatter(),
  gemoji(),
];

/**
 * 定义组件属性的类型
 */
interface Props {
  value: string;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<style scoped></style>