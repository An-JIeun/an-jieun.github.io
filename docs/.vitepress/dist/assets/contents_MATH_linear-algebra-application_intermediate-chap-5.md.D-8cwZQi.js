import{_ as s,c as t,a as e,m as a,a3 as n,o as l}from"./chunks/framework.BfR3yx5i.js";const z=JSON.parse('{"title":"5. 시그모이드와 로지스틱","description":"","frontmatter":{},"headers":[],"relativePath":"contents/MATH/linear-algebra-application/intermediate-chap-5.md","filePath":"contents/MATH/linear-algebra-application/intermediate-chap-5.md","lastUpdated":1711280243000}'),i={name:"contents/MATH/linear-algebra-application/intermediate-chap-5.md"},r=a("h1",{id:"_5-시그모이드와-로지스틱",tabindex:"-1"},[e("5. 시그모이드와 로지스틱 "),a("a",{class:"header-anchor",href:"#_5-시그모이드와-로지스틱","aria-label":'Permalink to "5. 시그모이드와 로지스틱"'},"​")],-1),o=a("h2",{id:"최소제곱오차-min-square-error",tabindex:"-1"},[e("최소제곱오차 (min-square error) "),a("a",{class:"header-anchor",href:"#최소제곱오차-min-square-error","aria-label":'Permalink to "최소제곱오차 (min-square error)"'},"​")],-1),c=a("p",null,[e("지금까지 다룬 방식은 모두, 임의의 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",null,[a("semantics",null,[a("mrow",null,[a("mi",null,"w"),a("mi",null,"x"),a("mo",null,"+"),a("mi",null,"b"),a("mo",null,"="),a("mover",{accent:"true"},[a("mi",null,"y"),a("mo",null,"^")])]),a("annotation",{encoding:"application/x-tex"},"wx+b = \\hat y")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"strut",style:{height:"0.69444em"}}),a("span",{class:"strut bottom",style:{height:"0.8888799999999999em","vertical-align":"-0.19444em"}}),a("span",{class:"base textstyle uncramped"},[a("span",{class:"mord mathit",style:{"margin-right":"0.02691em"}},"w"),a("span",{class:"mord mathit"},"x"),a("span",{class:"mbin"},"+"),a("span",{class:"mord mathit"},"b"),a("span",{class:"mrel"},"="),a("span",{class:"mord accent"},[a("span",{class:"vlist"},[a("span",{style:{top:"0em"}},[a("span",{class:"fontsize-ensurer reset-size5 size5"},[a("span",{style:{"font-size":"0em"}},"​")]),a("span",{class:"mord mathit",style:{"margin-right":"0.03588em"}},"y")]),a("span",{style:{top:"0em","margin-left":"0.11112em"}},[a("span",{class:"fontsize-ensurer reset-size5 size5"},[a("span",{style:{"font-size":"0em"}},"​")]),a("span",{class:"accent-body"},[a("span",null,"^")])]),a("span",{class:"baseline-fix"},[a("span",{class:"fontsize-ensurer reset-size5 size5"},[a("span",{style:{"font-size":"0em"}},"​")]),e("​")])])])])])]),e("와 실제 데이터값(종속변수) "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",null,[a("semantics",null,[a("mrow",null,[a("mi",null,"y")]),a("annotation",{encoding:"application/x-tex"},"y")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"strut",style:{height:"0.43056em"}}),a("span",{class:"strut bottom",style:{height:"0.625em","vertical-align":"-0.19444em"}}),a("span",{class:"base textstyle uncramped"},[a("span",{class:"mord mathit",style:{"margin-right":"0.03588em"}},"y")])])]),e("의 오차를 최소화 하는 방식으로 결정 직선/평면에 대한 방정식을 최적화 하였다.")],-1),p=n('<p>오차제곱합에 대한 식은 다항식이며, 따라서 미분을 통한 최적화가 가능했다.</p><h2 id="로지스틱-회귀" tabindex="-1">로지스틱 회귀 <a class="header-anchor" href="#로지스틱-회귀" aria-label="Permalink to &quot;로지스틱 회귀&quot;">​</a></h2><p>로지스틱 회귀(Logistic Reggression)란, y값이 연속적인 수치가 아닌, 불연속적인 값(type)인 경우에서의 결정 직선/평면에 대한 방정식을 도출하는 회귀 방법이다. 또는, 로지스틱 회귀는 레이블 된 y 값이 없고, 특정 타입값에 대한 비중만 알 수 있을 때, 개별 데이터의 타입을 분류할 수 있는 결정 직선/평면 방정식을 최적화 한다.</p><blockquote><p>예를들어 키, 몸무게에 따른 남/여 카테고리 컬럼이 존재하는 경우, 남성과 여성을 구분하는 결정 직선을 구하고자 한다면 로지스틱 회귀를 적용해야 한다.</p></blockquote><blockquote><p>최소제곱오차에 따른 선형 회귀 방식을 적용하는 경우는 키에 따른 몸무게를 예측하고자 하는 상황과 같이, 이미 존재하는 두 수치 변수간의 관계를 파악하고자 할 떄 이다.</p></blockquote><p>우리가 분류를 할 때를 생각하면, 분류라는 것은 &#39;어떠한 값을 넘으면 1, 넘지 않으면 0&#39;와 같이, 어떠한 기준에 따라 값이 불연속적으로 분포하게 되는 경우를 생각할 수 있다.</p><p>하지만, 불연속적인 값은 미분이 불가능하다. 즉, 미분을 통해 어떤 지점이 두 타입을 가르는 최적의 지점인지 확인할 수 없다는 것이다.</p><p>상식적인 측면에서도, 남자/여자와 같은 타입 값을 연속적인 수치로 나타내는 것도 이상하다. (누구는 여자 30..남자 70 이렇게 할 수는 없다는 것이다)</p><p>그래서 타입</p><p>그래서 로지스틱 회귀에서는 시그모이드 함수를 사용한다. 시그모이드 함수는 특정 값에 대해 0,1과 같은 값으로 분류하는 기능을 수행할 수 있으나 함수가 끊어지지 않고 이어져있어 미분이 가능하다.</p>',10),m=a("p",null,[e("하지만, 시그모이드 함수에는 자연상수 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",null,[a("semantics",null,[a("mrow",null,[a("mi",null,"e")]),a("annotation",{encoding:"application/x-tex"},"e")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"strut",style:{height:"0.43056em"}}),a("span",{class:"strut bottom",style:{height:"0.43056em","vertical-align":"0em"}}),a("span",{class:"base textstyle uncramped"},[a("span",{class:"mord mathit"},"e")])])]),e("가 있다. 자연상수가 있다는 것은 미분이 불가능 하다는 것인데... 이렇게 되면 앞서 미분가능성때문에 시그모이드 함수를 사용한다는 말과 모순된다.")],-1),h=a("p",null,"결과적으로 말하면 시그모이드 함수는 미분이 가능하다. 대신",-1),d=a("h2",{id:"최대우도의-등장",tabindex:"-1"},[e("최대우도의 등장 "),a("a",{class:"header-anchor",href:"#최대우도의-등장","aria-label":'Permalink to "최대우도의 등장"'},"​")],-1);function u(_,x,b,g,y,f){return l(),t("div",null,[r,o,c,p,e(" Sigmoid = \\frac{1-exp(z)}{1}\\newline z = wx + b "),m,h,d])}const q=s(i,[["render",u]]);export{z as __pageData,q as default};
