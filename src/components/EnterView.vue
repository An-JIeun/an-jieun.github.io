<template>

    <div class="grid grid-rows-5 place-items-center">
        <div class="rows-span-2 mt-12">
            <span class="text-5xl">🦄Welcome To <span class="bg-yellow"><b>Study Sturdy</b></span>🦄</span>
                <ul class="drop-shadow-lg pt-10">
                    <router-link to="/study"><li class="bg-purple rounded-lg m-1 p-5 doa1 text-center"><span class="text-3xl text-white">Study</span><br><span class="pt-4 text-1xl text-white">CS, DA, Front End 관련 공부 자료 및 기타 정보 모음</span></li></router-link>
                    <router-link to="/portfolios"><li class="bg-mint rounded-lg m-1 p-5 doa2 text-center"><span class="text-3xl">Portfolio</span><br><span class="pt-4 text-1xl">2020 ~ 데이터 분석 공모전 및 기타 프로젝트 자료 모음</span></li></router-link>
                    <router-link to="/about"><li class="bg-green rounded-lg m-1 p-5 doa3 text-center"><span class="text-3xl">About Host</span><br><span class="pt-4 text-1xl">주인장은 어떤 사람인가</span></li></router-link>
                </ul>
                <router-view />
        </div>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'

export default {
    mounted(){
        anime.timeline({
            duration: 2000,
            easing: 'easeOutElastic(1, .8)',
            begin: function() {
                const doa3 = document.querySelector('.doa3');
                const doa2 = document.querySelector('.doa2');
                const doa1 = document.querySelector('.doa1');
                doa3.classList.add('hidden');
                doa2.classList.add('hidden');
                doa1.classList.add('hidden');
            },
            delay:anime.stagger(200)
        }).add({
            easing: 'easeOutElastic(1, .8)',
            targets: ['.doa3'],
            translateY: [-300,0],
            rotate: 360,
            duration: 700,
            direction: 'normal',
            update: function() {
                const doa = document.querySelector('.doa3');
                doa.classList.remove('hidden');
            },
            loop: false
        }).add({
            easing: 'easeOutElastic(1, .8)',
            targets: ['.doa2'],
            translateY: [-300,0],
            rotate: 360,
            duration: 500,
            direction: 'normal',
            update: function() {
                const doa = document.querySelector('.doa2');
                doa.classList.remove('hidden');
            },
            loop: false
        }).add({
            easing: 'easeOutElastic(1, .8)',
            targets: ['.doa1'],
            translateY: [-300,0],
            rotate: 360,
            duration: 500,
            direction: 'normal',
            loop: false,
            update: function() {
                const doa = document.querySelector('.doa1');
                doa.classList.remove('hidden');
            }
        });
    }
}
</script>
