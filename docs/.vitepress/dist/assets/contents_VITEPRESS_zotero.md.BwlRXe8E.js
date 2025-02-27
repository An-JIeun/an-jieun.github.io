import{_ as o,c as t,o as e,a5 as r}from"./chunks/framework.BuWuHeYF.js";const n="/assets/zotero-set.042Zoafv.png",a="/assets/koofr.DBWZTqiE.png",_=JSON.parse('{"title":"Zotero에 Koofr 연동하기","description":"zotero 저장공간 koofr에 연동하기","frontmatter":{"title":"Zotero에 Koofr 연동하기","description":"zotero 저장공간 koofr에 연동하기","keywords":"\\"zotero\\", \\"koofr\\"","url":"VITEPRESS/zotero.html","img":"https://an-jieun.github.io/static/img/zoteroimg.png","head":[["script",{"type":"application/ld+json"},"{\\n  \\"@context\\":\\"http://schema.org\\",\\n  \\"@type\\":\\"BlogPosting\\",\\n  \\"mainEntityOfPage\\" : {\\n    \\"@type\\" : \\"WebPage\\",\\n    \\"@id\\" : \\"https://an-jieun.github.io/contentsVITEPRESS/zotero.html\\"\\n  },\\n  \\"image\\" : {\\n    \\"@type\\" : \\"ImageObject\\",\\n    \\"url\\" : \\"https://an-jieun.github.io/static/img/zoteroimg.png\\"\\n    \\"width\\" : \\"800px\\",\\n    \\"height\\" : \\"800px\\"\\n  },\\n  \\"name\\":\\"Zotero에 Koofr 연동하기\\",\\n  \\"url\\" : \\"https://an-jieun.github.io/contents/VITEPRESS/zotero.html\\",\\n  \\"headline\\":\\"zotero 저장공간 koofr에 연동하기\\",\\n  \\"description\\":\\"zotero 저장공간 koofr에 연동하기\\",\\n  \\"keywords\\" : [\\"zotero\\", \\"koofr\\"],\\n  \\"inLanguage\\":\\"ko\\",\\n  \\"author\\" : {\\n    \\"@type\\" : \\"Person\\",\\n    \\"name\\" : \\"Jieun\\",\\n    \\"email\\" : \\"aje20010827@gmail.com\\"\\n    }\\n  },\\n}"],["meta",{"property":"og:title","content":"Zotero에 Koofr 연동하기"}],["meta",{"property":"og:description","content":"zotero 저장공간 koofr에 연동하기"}],["meta",{"property":"og:url","content":"https://an-jieun.github.io/"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image","content":"https://an-jieun.github.io/static/img/zoteroimg.png"}],["meta",{"property":"og:site_name","content":"전자두뇌만들기"}],["meta",{"property":"og:locale","content":"ko_KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:title","content":"Zotero에 Koofr 연동하기"}],["meta",{"name":"twitter:description","content":"zotero 저장공간 koofr에 연동하기"}],["meta",{"name":"twitter:image","content":"https://an-jieun.github.io/static/img/zoteroimg.png"}],["meta",{"property":"@context","content":"http://schema.org"}],["meta",{"property":"@type","content":"TechArticle"}],["meta",{"property":"name","content":"Zotero에 Koofr 연동하기"}],["meta",{"property":"url","content":"https://an-jieun.github.io/contents/VITEPRESS/zotero.html"}],["meta",{"property":"description","content":"zotero 저장공간 koofr에 연동하기"}],["meta",{"property":"keywords","content":"zotero, koofr"}],["meta",{"property":"version","content":"1.0"}],["meta",{"property":"inLanguage","content":"ko"}],["meta",{"property":"technicalAudience","content":"developer, DBA, Web Developer"}],["meta",{"property":"proficiencyLevel","content":"beginner"}],["meta",{"property":"author","content":"Jieun"}]]},"headers":[],"relativePath":"contents/VITEPRESS/zotero.md","filePath":"contents/VITEPRESS/zotero.md","lastUpdated":1736235511000}'),i={name:"contents/VITEPRESS/zotero.md"},p=r('<h1 id="zotero에-koofr-연동하기" tabindex="-1">Zotero에 Koofr 연동하기 <a class="header-anchor" href="#zotero에-koofr-연동하기" aria-label="Permalink to &quot;Zotero에 Koofr 연동하기&quot;">​</a></h1><div class="info custom-block"><p class="custom-block-title">INFO</p><p>본 내용은 chanmuzi 님의 블로그를 참조하여 작성하였습니다. <a href="https://chanmuzi.tistory.com/489" target="_blank" rel="noreferrer">https://chanmuzi.tistory.com/489</a></p></div><p>로컬과 연결된 구글 드라이브를 사용하면 webDav 설정 없이 쉽게 클라우드 환경에 연동할 수 있으나, 이 경우 모바일 zotero 앱에서 원본 pdf 파일을 바로 확인할 수 없다. 모바일에서도 PC에서처럼 논문을 보고 싶으면 webDav로 동기화 설정을 해야한다. Synology를 사용할 수도 있지만 그런게 없는 상황이라면 Koofr를 고려해볼 수 있다. Koofr는 무료로 10Gb정도 사용할 수 있다.</p><h3 id="_1-zotmoov-설치" tabindex="-1">1. ZotMoov 설치 <a class="header-anchor" href="#_1-zotmoov-설치" aria-label="Permalink to &quot;1. ZotMoov 설치&quot;">​</a></h3><p>ZotMoov는 ver 7에서 동작하는 동기화 관련 플러그인이다. <a href="https://github.com/wileyyugioh/zotmoov/releases/tag/1.2.10" target="_blank" rel="noreferrer">여기</a>서 <code>.xpi</code> 파일을 다운받고, zotero에서 plugin으로 적용하면 된다. plugin 적용 방법은 <a href="https://blog.harampark.com/blog/zotero-setting/" target="_blank" rel="noreferrer">여기</a>를 참고하면 된다. 이 블로그에서는 시놀로지로 WebDav 연결하는 방법도 소개하고 있으니, 시놀로지를 사용하고자 하는 경우는 이 블로그를 참고하자.</p><h3 id="_2-koofr-가입" tabindex="-1">2. Koofr 가입 <a class="header-anchor" href="#_2-koofr-가입" aria-label="Permalink to &quot;2. Koofr 가입&quot;">​</a></h3><p>Koofr에 가입하고, Zotero와의 WebDav 연결을 위한 비밀번호를 발급받는 과정은 <a href="https://chanmuzi.tistory.com/489" target="_blank" rel="noreferrer">이 블로그</a>를 따라하면 된다.</p><h3 id="_3-webdav-설정" tabindex="-1">3. WebDav 설정 <a class="header-anchor" href="#_3-webdav-설정" aria-label="Permalink to &quot;3. WebDav 설정&quot;">​</a></h3><p><code>환경설정 &gt; 동기화</code>에서 아래 사진과 같이 설정을 변경하면 된다. URL은 <code>app.koofr.net/dav/Koofr</code> 를 입력하면 된다.</p><p><img src="'+n+'" alt="zotero setting"></p><p>사용자명은 Koofr 가입 시 사용한 이메일을, 비밀번호는 앞선 과정에서 발급받은 비밀번호까지 모두 입력하면 된다.</p><p>꼭 서버검증 버튼을 눌러서 잘 연결되었는지 확인하자.</p><hr><p>이제 zotero쪽에 논문을 업로드하면 자동으로 Koofr 서버에도 저장이 된다. 단점이 있다면 Koofr에는 다운로드 받을 당시 원본 파일 명 그대로 저장되므로, Koofr에서 논문을 찾기가 불편하다는 것이다. Koofr를 통한 webDav 연동은 모바일 Zotero로 논문을 읽고자 하는 경우에만 권장한다.</p><p><img src="'+a+'" alt="koofr에 저장된 파일들"></p><p>모바일 환경에서 zotero를 사용할 때에는 Attachment란에 있는 PDF 파일을 클릭하면 바로 Koofr 서버에서 로컬 환경(모바일)으로 다운로드 된다.</p>',16),c=[p];function s(m,h,l,g,f,d){return e(),t("div",null,c)}const b=o(i,[["render",s]]);export{_ as __pageData,b as default};
