// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import {useData, useRoute} from 'vitepress';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  setup() {
    const { frontmatter } = useData();
    const route = useRoute();
    giscusTalk({
      repo: "An-JIeun/an-jieun.github.io",
      repoID: "R_kgDOJhkViQ",
      category: "General",
      categoryID:"DIC_kwDOJhkVic4CeNGm",
      mapping: "title",
      inputPosition: "top",
      lightTheme: "light_tritanopia",
      darkTheme: "dark_tritanopia",
      emitMetadata: 1,
      lang: "ko",
      loading: "lazy"

  }, {
      frontmatter, route
  },
      // Whether to activate the comment area on all pages.
      // The default is true, which means enabled, this parameter can be ignored;
      // If it is false, it means it is not enabled.
      // You can use `comment: true` preface to enable it separately on the page.
      true
  );

    

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
