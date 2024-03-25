import vue from "@vitejs/plugin-vue";
import { onBeforeMount, onMounted } from "vue";
// https://vitepress.dev/reference/site-config
export default{
  title: "전자두뇌만들기",
  lastUpdated: true,
  outline:[2,3],
  // markdown-it-footnote
  markdown: {
    lineNumbers: true,
    math: true,
    config: (md) => {
      md.use(require("markdown-it-katex"));
      md.use(require("markdown-it-footnote"));
      md.use(require("markdown-it-mathjax3"))
    },
    plugins: ["markdown-it-html5-embed"],
  },
  lang: "ko-KR",
  build: {outDir:"/theme/"},
  logo:"/static/logo/logo.png",
  head:[["link", { rel: "icon", href: "/static/logo/logo.png" }]],
  description: "ALL about making artificial intelligence",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],
    footer: {
      // message: 'Docs are released under the MIT License.',
      copyright: "Copyright © 2024 전자두뇌만들기.",
    },
    logo:"/static/logo/logo.png",
    sidebar: [
      {
        text: 'MATH',
        collapsed : false,
        link:'/contents/MATH/math-main.html',
        items: [
          { text: '선형대수 - 기초', 
          collapsed : true,
          items:[
            {text : "1. 선형대수란?", link: "/contents/MATH/linear-algebra-basic/linear-algebra-basic-chap-1.html"},
            {text : "2. 벡터, 행렬 기본개념?", link: "/contents/MATH/linear-algebra-basic/linear-algebra-basic-chap-2.html"},
            {text : "3. 텐서 연산", link: "/contents/MATH/linear-algebra-basic/linear-algebra-basic-chap-3.html"},
            {text : "4. 행렬성질", link: "/contents/MATH/linear-algebra-basic/linear-algebra-basic-chap-4.html"},
          ]
        },
          {text : "선형대수 - 응용",
          collapsed : true,
          items : [
            {text : "1. 고유값과 고유벡터", link: "/contents/MATH/linear-algebra-application/intermediate-chap-1.html"},
            {text : "2. 특이값과 특이값분해", link: "/contents/MATH/linear-algebra-application/intermediate-chap-2.html"},
            {text : "3. PCA (TBD)", link: "/contents/MATH/linear-algebra-application/intermediate-chap-3.html"},
            {text : "4. 선형회귀와 다중회귀", link: "/contents/MATH/linear-algebra-application/intermediate-chap-4.html"},
            {text : "5. 시그모이드와 로지스틱", link: "/contents/MATH/linear-algebra-application/intermediate-chap-5.html"}
          ]},
          { text: 'Automatic Differentiate', link: '/contents/MATH/automatic-differentiate.html' }]
        }   
      ,
      {
        text: 'LLM',
        collapsed : false,
        link:'/contents/LLM/llm-main.html',
        items: [
          { 
            text: 'Fine-Tuning',
            collapsed: true,
            items:[
              {text : "Fine-Tuning이란?", link: "/contents/LLM/finetuning/README.html"},
            ] },
          { 
            text: 'LangChain', 
            collapsed: true,
            items : [
              {text: "LangChain이란?", link: "/contents/LLM/langchain/README.html"},
            ]
            }
        ]
      },
      {
        text: 'Knowledge Graph',
        collapsed : false,
        items: [
          { text: 'Ontology',
            collapsed : true,
            items:[
              {text: "1. 온톨로지 설계 과정", link : "/contents/KG/ontology/ontology-chap-1.html"},
            ] },
          { text: 'Knowlege-Grpah',
            collapsed : true,
            items:[
              {text : "1. 지식그래프란?", link: "/contents/KG/knowledge-graph/kg-chap-1.html"},
            ] }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
}
