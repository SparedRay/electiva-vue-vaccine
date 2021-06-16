<template>
  <div id="layout" class="pure-g">
    <div class="sidebar pure-u-1 pure-u-md-1-4">
      <div class="header">
        <h1 class="brand-title">{{ title }}</h1>
        <h2 class="brand-tagline">{{ tagline }}</h2>

        <nav class="nav">
          <slot name="navigation"></slot>
        </nav>
      </div>
    </div>

    <div class="content pure-u-1 pure-u-md-3-4">
      <div>
        <!-- A wrapper for all the blog posts -->
        <div class="posts">
          <h1 class="content-subhead">{{ content }}</h1>
          <slot></slot>
        </div>

        <div class="footer">
          <div class="pure-menu pure-menu-horizontal">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
  props: {
    title: {
      type: String,
      required: true
    },
    tagline: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    }
  }
});
</script>

