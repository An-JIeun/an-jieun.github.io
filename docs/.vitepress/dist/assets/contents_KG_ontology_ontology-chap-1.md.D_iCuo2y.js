import{_ as e,c as t,o as n,a5 as o}from"./chunks/framework.BuWuHeYF.js";const u=JSON.parse('{"title":"온톨로지의 설계 과정","description":"","frontmatter":{"head":[["script",{"type":"application/ld+json"},"{\\n  \\"@context\\":\\"http://schema.org\\",\\n  \\"@type\\":\\"BlogPosting\\",\\n  \\"mainEntityOfPage\\" : {\\n    \\"@type\\" : \\"WebPage\\",\\n    \\"@id\\" : \\"https://an-jieun.github.io/contentsundefined\\"\\n  },\\n  \\"name\\":\\"undefined\\",\\n  \\"url\\" : \\"https://an-jieun.github.io/contents/undefined\\",\\n  \\"headline\\":\\"undefined\\",\\n  \\"description\\":\\"undefined\\",\\n  \\"keywords\\" : [undefined],\\n  \\"version\\":\\"1.0\\",\\n  \\"inLanguage\\":\\"ko\\",\\n  \\"technicalAudience\\" : \\"developer\\",\\n  \\"proficiencyLevel\\" : \\"beginner\\",\\n  \\"author\\" : {\\n    \\"@type\\" : \\"Person\\",\\n    \\"name\\" : \\"Jieun\\",\\n    \\"email\\" : \\"aje20010827@gmail.com\\"\\n    }\\n  },\\n  \\"dependencies\\" : \\"Python\\",\\n  \\"proficiencyLevel\\" : \\"beginner\\",\\n  \\"technicalAudience\\" : \\"developer, DBA, Web Developer\\"\\n}"],["meta",{"property":"og:title"}],["meta",{"property":"og:description"}],["meta",{"property":"og:url"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:site_name","content":"전자두뇌만들기"}],["meta",{"property":"og:locale","content":"ko_KR"}],["meta",{"property":"@context","content":"http://schema.org"}],["meta",{"property":"@type","content":"TechArticle"}],["meta",{"property":"name"}],["meta",{"property":"url","content":"https://an-jieun.github.io/contents/undefined"}],["meta",{"property":"description"}],["meta",{"property":"keywords"}],["meta",{"property":"version","content":"1.0"}],["meta",{"property":"inLanguage","content":"ko"}],["meta",{"property":"technicalAudience","content":"developer, DBA, Web Developer"}],["meta",{"property":"proficiencyLevel","content":"beginner"}],["meta",{"property":"author","content":"Jieun"}],["meta",{"property":"dependencies","content":"Python"}]]},"headers":[],"relativePath":"contents/KG/ontology/ontology-chap-1.md","filePath":"contents/KG/ontology/ontology-chap-1.md","lastUpdated":1711331516000}'),a={name:"contents/KG/ontology/ontology-chap-1.md"},r=o('<h1 id="온톨로지의-설계-과정" tabindex="-1">온톨로지의 설계 과정 <a class="header-anchor" href="#온톨로지의-설계-과정" aria-label="Permalink to &quot;온톨로지의 설계 과정&quot;">​</a></h1><h2 id="_1-요구분석과-기초적인-시각화" tabindex="-1">1. 요구분석과 기초적인 시각화 <a class="header-anchor" href="#_1-요구분석과-기초적인-시각화" aria-label="Permalink to &quot;1. 요구분석과 기초적인 시각화&quot;">​</a></h2><p>온톨로지는 요구사항에 맞춰 도메인의 클래스, 인스턴스, 논리적 포함관계(substances), 관계(association)을 정의한다. 이들에 대해 나타내는 용어를 &#39;단어(term)&#39;이라고 하며, 보통 설계 초기에는 단어를 정의하고 이들의 실질적 관계를 엑셀 시트 등의 테이블 형태 문서에 정리한다.</p><p>단어에 대한 정의가 완료되면, 이들의 관계를 그래프 구조로 간단하게 시각화 한다. 아주 기본적이고 형식적이지 않은 방법으로는 마인드맵, ? 의 방법이 있다. 이러한 방법은 기본적인 구조화 이전, 의뢰자와 같이 온톨로지나 지식그래프, 프로그래밍 자체에 대한 기본적인 지식이 없는 사람들에게 온톨로지에 대해 설명하기에 용이하다.</p><p>또한, 본격적인 설계에 앞서 시각화를 통해 단어들간의 전반적인 관계 구조를 파악하고, 이를 기반으로 단어의 재정의나 추가적인 정의 등 본격적인 설계 이전에 단어와 관계를 점검할 수 있다.</p><h2 id="_2-lightweight-ontology" tabindex="-1">2. lightweight ontology <a class="header-anchor" href="#_2-lightweight-ontology" aria-label="Permalink to &quot;2. lightweight ontology&quot;">​</a></h2><p>경량화 온톨로지란 UML이나 ?? 와 같은, 전 분야의 프로그래밍(주로 객체지향)에서 사용되는 모델링 시각화 방식으로 온톨로지를 시각화하는 방법이다. 대표적으로 UML이 사용된다. UML은 클래스와 인스턴스(객체)를 사각형의 도형으로 표현하고, 도형 안에 클래스의 타입 등의 규칙, 속성 등을 기재한다.</p><p>논리적 포함관계는 삼각형으로 채워진 화살표로, 연관관계는 채워지지 않은 화살표로 표현한다.</p><details><summary>&#39;포함(substance)&#39;와 &#39;구성(hasComponent)&#39;의 차이</summary> 구성요소는 특정 클래스/인스턴스의 속성으로 정의되는, 클래스는 인스턴스를 구성하는 다른 클래스나 인스턴스로, 상속관계와는 관련이 없다. 반면, 포함관계는 특정 클래스에서 파생/상속되는 클래스를 의미한다. </details><h2 id="_3-owl" tabindex="-1">3. OWL <a class="header-anchor" href="#_3-owl" aria-label="Permalink to &quot;3. OWL&quot;">​</a></h2><p>OWL은 W3C에서 제정한 표준 온톨로지 모델링 언어이다. UML이나 ??에서 어느정도 구조화된 형식으로 온톨로지 모형을 표현했다면, 이를 온톨로지 모델링 표준 어휘로 더 구체/구조화 된 형식으로 표현한다.</p><p>표준화된 어휘란, 즉, 모든 온톨로지 설계자들이 공통적으로 사용하는 어휘라는 것이다. 즉 온톨로지 모델링에 있어 일종의 파이썬이나 자바같은 언어라는 것이다. 아무래도 UML이나 ??는 온톨로지 모델링 뿐만 아니라 프로그래밍 전반에 사용되는 모델링 언어이다 보니, 온톨로지에서 표준적으로 사용하는 어휘나 관계, 구조나 규칙을 제대로 표현하는데는 한계가 있다.</p><p>온톨로지는 OWL로 구조화 됨으로써 기계가 OWL로 작성된 온톨로지 구조를 판독할 수 있게 되고, 모든 온톨로지 설계자들이 어느 도메인의, 어떤 언어 사용자가 설계 했던 간에 이해할 수 있다.</p><p>OWL은 기본적으로 RDFS(RDF Schema)의 일종이다. 따라서 RDF 표현 형식을 따라 표현한다.</p><details><summary>XML과 마크업 언어</summary><p>XML은 데이터를 정의하는 규칙을 제공하는 마크업 언어이다. 마크업 언어란 태그 등을 이용해 문서나 데이터 구조를 명기하는 언어로, 프로그래밍 언어에 속하지는 않는다. 컴퓨터 등의 기계에 어떤 계산 작업을 수행하도록 지시하는 언어가 아니라, 단순히 문서/데이터 구조를 표현하는 언어이기 때문이다. XML은 <code>&lt;&gt;</code>를 이용해 누구나 자신만의 문서/데이터 구조를 표현할 수 있도록 한다.</p><p>다른 마크업 언어로는 HTML이 있다. HTML은 <code>&lt;h1&gt;</code>등의 태그를 활용해 웹 문서의 구조를 나타낸다.</p></details><details><summary>RDF, RDFS</summary><p>RDF란 웹 상의 정보를 표현하기 위한 규격이다. HTML이 웹 문서 내용을 구조화한다면, RDF는 웹 문서의 메타 정보를 구조화하여 나타내는 프레임워크이다. RDF는 각기 다른 도메인에서 정의되는 동의어를 의미를 분명하게 구분하기 위해 XML의 namespace를 이용한다.</p><p>RDFS는 특정 메타데이터에서 정의하고 있는 어휘들을 선언하기 위해 사용된다. 즉, 어떤 도메인에서 표준적으로 활용하기 위해 도메인에 적합하도록 사용어휘나 표현 규칙을 체계화하여 RDF를 표현형식대로 자료를 기술하는 어휘 체계를 의미한다. RDFS의 일종인 OWL은, 웹 자원에 대한 메타 정보를 온톨로지 형태로 표준화하여 기술하도록 하는 어휘 체계라고 할 수 있다.</p></details>',16),p=[r];function i(c,s,l,d,h,m){return n(),t("div",null,p)}const g=e(a,[["render",i]]);export{u as __pageData,g as default};
