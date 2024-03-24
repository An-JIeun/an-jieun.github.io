// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import {useData, useRoute} from 'vitepress';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  setup() {
    const { frontmatter } = usdData();
    const route = useRoute();
    
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
