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
            <v-network-graph class="w-full h-full" :nodes="nodes" :edges="edges" v-model:layouts="layouts" />
        </div>
    </div>

       
    </section> 
    
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
    setup() {
        const nodes = {
            node1: { name: "노인장애인보호구역" },

            node2: { name: "양평군 노인복지관" },
            node3: { name: "경기도" },
            node4: { name: "양평군" },
            node5: { name: "경기도 양평군" },

            node6: { name: "송파노인종합복지관" },
            node7: { name: "서울특별시" },
            node8: { name: "송파구" },
            node9: { name: "서울특별시 송파구" },

        }
        const layouts = {
            nodes: {
                node1: { x: 100, y: 0 },
                node2: { x: 200, y: 0 },
                node3: { x: 200, y: 100 },
                node4: { x: 200, y: 200 },
                node5: { x: 200, y: 300 },

                node6: { x: 0, y: 0 },
                node7: { x: 0, y: 100 },
                node8: { x: 0, y: 200 },
                node9: { x: 0, y: 300 },

            }
        }
        const edges = {
            // 전체 연결
            edge1: { source: "node1", target: "node6" },
            edge10: { source: "node1", target: "node2" },
            // 양평군 노인복지관
            edge2: { source: "node2", target: "node3" },
            edge3: { source: "node2", target: "node4" },
            edge4: { source: "node2", target: "node5" },
            // 송파노인종합복지관
            edge5: { source: "node6", target: "node7" },
            edge6: { source: "node6", target: "node8" },
            edge7: { source: "node6", target: "node9" },
            // hasDistrict 표시
            edge8: { source: "node3", target: "node4" },
            edge9: { source: "node7", target: "node8" },
        }
        return { nodes, edges, layouts }
    },
})
</script>





