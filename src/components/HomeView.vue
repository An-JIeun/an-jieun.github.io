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

        <div class="grid gap-4">
            <div>
                <div id="gallery" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
         <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
        </div>
        <!-- Item 3 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
        </div>
        <!-- Item 4 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
        </div>
        <!-- Item 5 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
        </div>
    </div>
    <!-- Slider controls -->
    <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
            </div>
            <div class="grid grid-cols-5 gap-4">
                <div>
                    <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="">
                </div>
                <div>
                    <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="">
                </div>
                <div>
                    <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="">
                </div>
                <div>
                    <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="">
                </div>
                <div>
                    <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
    </section>  
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import homeView from "@/views/HomeView.vue"
export default {
  name: 'App',
  //components: {
  //  HomeView:homeView
  //},  
}
</script>



