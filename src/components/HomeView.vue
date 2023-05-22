<template>
    <section>
    <div class="grid grid-cols-2 gap-3 m-3">
        <div>
            <div class="py-2 px-4 my-10 mx-auto max-w-screen-xl text-center lg:">
                <div class="py-3 px-4 bg-white drop-shadow-xl rounded-lg">
                    <button class="rounded-md text-3xl bg-mint">Profile</button>
                    <div class="grid grid-cols-2 pt-3 place-items-center pb-5">
                            <div class="auto-rows-auto">
                                <div class="px-12 pb-3">
                                    <img width="180" src="@/assets/profile.png" />
                             </div>
                                <span>Contact Me!</span>
                                <div class="pt-3 grid grid-cols-3 bg-white rounded-md py-3">
                                    <div class="grid grid-cols-1 place-items-center"> <a href="https://github.com/An-JIeun/portfolio"><img width = "45" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" /></a></div>
                                    <div class="grid grid-cols-1 place-items-center"> <a href="https://twitter.com/lempicka_in_"><img width = "55" src="@/assets/twitter.png" /></a></div>
                                    <div class="grid grid-cols-1 place-items-center"> <a href="https://www.linkedin.com/in/%EC%A7%80%EC%9D%80-%EC%95%88-752667214/"><img width = "45" src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" /></a></div>
                                </div>
                            </div>

                            <div class="pt-4 pb-4 px-4 rounded-lg bg-white flex items-left shadow-md">
                                <ul>
                                    <li class="text-left">🥬 <b class="bg-yellow">이름</b>  JII</li>
                                    <li class="text-left">🤓 <b class="bg-yellow">관심사</b><br>데이터 시각화/분석, 공공데이터, 지식그래프, 그래프 데이터, UX/UI</li>
                                    <li class="text-left">🧙 <b class="bg-yellow">스킬</b><br> Python, C, JavaScript, Vue .. (추가예정 😊)</li>
                                    <li class="text-left">🏃‍♀️ <b class="bg-yellow">취미</b><br>독서, 달리기, 음악 감상, 가사 쓰기, 카페 탐방, 사진 찍기, 전시회 가기</li>
                                    <li class="text-left">💞 <b class="bg-yellow">좋아하는 것</b><br>산리오 패밀리, 고양이, 미소의 세상 야옹이, 햄뿡이</li>
                                    <li class="text-left">😎 <b class="bg-yellow">TMI</b><br>먹을 것을 주면 친해질 수 있습니다.</li>
                                </ul>
                            </div>
                    </div>
                    <div class="grid grid-cols-1 place-items-center">
                        <div class="bg-white hover:bg-discord rounded-md shadow-md grid grid-flow-row-dense grid-cols-6 place-items-center">
                            <div class="col-span-5"><span class="text-2xl">공부방은 24/7 OPEN</span></div>
                            <div class="col-span-1"><a href="https://discord.gg/NeVhvAwE"><img width = "29.5" src="@/assets/discord-mark-black.png" /></a></div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

        <div>
            <v-network-graph class="w-full h-full" :nodes="nodes" :edges="edges" :configs="configs" :layouts="layouts" />
        </div>
    </div>

       
    </section> 
    
</template>

<script setup>
import { reactive } from "vue"
import * as vNG from "v-network-graph"
import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout"

const nodes = {
  root: { name: "Who Is JII?", size: 40, color: "#FFE194", label: true },
  node1: { name: "보유 스킬", size: 25, color: "#E8F6EF", label: true  },
  node2: { name: "취미", size: 25, color: "#E8F6EF", label: true },
  node3: { name: "관심사", size: 25, color: "#E8F6EF", label: true },
  m1: { name: "Python", size: 15, color: "#1B9C8560", label: true },
  m2: { name: "SQL",size: 15, color: "#1B9C8560", label: true },
  m3: { name: "JavaScript", size: 15, color: "#1B9C8560", label: true },
  m4: { name: "C", size: 15, color: "#1B9C8560", label: true },
  mi1: { name: "pandas", size: 15, color: "#1B9C8560", label: true },
  mi2: { name: "numpy", size: 15, color: "#1B9C8560", label: true },
  M_2: { name: "DA", size: 15, color: "#1B9C85", label: true },
  M_3: { name: "DB", size: 15, color: "#1B9C85", label: true },
  M_4: { name: "CS", size: 15, color: "#1B9C85", label: true },
  m5: { name: "Vue", size: 15, color: "#1B9C8560", label: true },
  m6: { name: "HTML", size: 15, color: "#1B9C8560", label: true },
  m7: { name: "CSS", size: 15, color: "#1B9C8560", label: true },
  mi8: { name: "DB Architecture Design", size: 15, color: "#1B9C85", label: true },
  M_1: { name: "Front-end", size: 15, color: "#1B9C85", label: true },

  h1: { name: "독서", size: 15, color: "#4C4C6D50", label: true },
  h2: { name: "달리기", size: 15, color: "#4C4C6D50", label: true },
  h3: { name: "음악 감상", size: 15, color: "#4C4C6D50", label: true },
  h4: { name: "가사 쓰기", size: 15, color: "#4C4C6D50", label: true },
  h5: { name: "카페 탐방", size: 15, color: "#4C4C6D50", label: true },
  h6: { name: "사진 찍기", size: 15, color: "#4C4C6D50", label: true },
  h7: { name: "전시회 가기", size: 15, color: "#4C4C6D50", label: true },
  h8: { name: "등산, 하이킹", size: 15, color: "#4C4C6D50", label: true },
  h9: { name: "영화감상", size: 15, color: "#4C4C6D50", label: true },


  in1: { name: "데이터 시각화/분석", size: 15, color: "#f4c095", label: true },
  in2: { name: "공공데이터", size: 15, color: "#f4c095", label: true  },
  in3: { name: "지식그래프", size: 15, color: "#f4c095", label: true  },
  in4: { name: "UX/UI", size: 15, color: "#f4c095", label: true  },
  in5: { name: "그래프 데이터", size: 15, color: "#f4c095", label: true  },
  in6: { name: "데이터대시보드 디자인", size: 15, color: "#f4c095", label: true  },
  int7: { name: "웹디자인" , size: 15, color: "#f4c095", label: true },
}

const layouts = {
  nodes: {
    root: { x: 100, y: 0 },
    node1 :  { x: 100, y: 100 },
  },
}

const edges = {
  ed1: { source: "root", target: "node1", width : 9 },
  ed2: { source: "root", target: "node2", width : 9 },
  ed3: { source: "root", target: "node3", width : 9 },

  ed4 :{source: "node1", target: "M_1", width : 6},
  ed5 :{source: "node1", target: "M_2", width : 6},
  ed6 :{source: "node1", target: "M_3", width : 6},
  ed_1 :{source: "node1", target: "M_4", width : 6},

  ed7 :{source: "node3", target: "M_1"},
  ed8 :{source: "node3", target: "M_2"},
  ed9 :{source: "node3", target: "M_3"},
  ed10 : {source: "node3", target: "in3"},
  ed11 : {source: "node3", target: "in2"},
  ed12 : {source: "node3", target: "in5"},

  ee1: {source: "M_2", target: "m1"},
  eee1: {source: "m1", target: "mi1"},
  eee2: {source: "m1", target: "mi2"},

  ei1 : {source: "M_2", target: "in6"},
  ei2 : {source: "M_2", target: "in1"},


  ef1 : {source: "M_1", target: "m5"},
  ef2 : {source: "M_1", target: "m6"},
  ef3 : {source: "M_1", target: "m7"},
  ef4 : {source: "M_1", target: "m3"},
  fei1 : {source: "M_1", target: "in4"},
  fei2 : {source: "M_1", target: "int7"},

  
  els1 : {source: "node2", target: "h1"},
  els2 : {source: "node2", target: "h2"},
  els3 : {source: "node2", target: "h3"},
  els4 : {source: "node2", target: "h4"},
  els5 : {source: "node2", target: "h5"},
  els6 : {source: "node2", target: "h6"},
  els7 : {source: "node2", target: "h7"},
  els8 : {source: "node2", target: "h8"},
  els9 : {source: "node2", target: "h9"},

}

const configs = reactive(
  vNG.defineConfigs({
    view : {
  layoutHandler: new ForceLayout({
    positionFixedByDrag: false,
    positionFixedByClickWithAltKey: true,
    createSimulation: (d3, nodes, edges) => {
      const forceLink = d3.forceLink(edges).id(d => d.id)
      return d3
        .forceSimulation(nodes)
        .force("edge", forceLink.distance(40).strength(0.5))
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter().strength(0.05))
        .alphaMin(0.001)}}
  )},
    node: {
      normal: {
        type: "circle",
        radius: node => node.size,
        color: node => node.color,
      },
      hover: {
        radius: node => node.size + 2,
        color: node => node.color,
      },
      selectable: true,
      label: {
        visible: node => !!node.label,
      },
      focusring: {
        color: "darkgray",
      },
    },
    edge: {
      normal: {
        width: edge => edge.width,
        color: "darkgray",
        dasharray: edge => (edge.dashed ? "4" : "0"),
      },
    },
  }))

</script>



