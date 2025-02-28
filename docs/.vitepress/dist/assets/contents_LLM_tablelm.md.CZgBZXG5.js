import{_ as a,c as e,o as t,a5 as n}from"./chunks/framework.BuWuHeYF.js";const u=JSON.parse('{"title":"LLM을 활용한 데이터 정제 툴 알아보기","description":"","frontmatter":{"head":[["script",{"type":"application/ld+json"},"{\\n  \\"@context\\":\\"http://schema.org\\",\\n  \\"@type\\":\\"BlogPosting\\",\\n  \\"mainEntityOfPage\\" : {\\n    \\"@type\\" : \\"WebPage\\",\\n    \\"@id\\" : \\"https://an-jieun.github.io/contentsundefined\\"\\n  },\\n  \\"image\\" : {\\n    \\"@type\\" : \\"ImageObject\\",\\n    \\"url\\" : \\"undefined\\"\\n    \\"width\\" : \\"800px\\",\\n    \\"height\\" : \\"800px\\"\\n  },\\n  \\"name\\":\\"undefined\\",\\n  \\"url\\" : \\"https://an-jieun.github.io/contents/undefined\\",\\n  \\"headline\\":\\"undefined\\",\\n  \\"description\\":\\"undefined\\",\\n  \\"keywords\\" : [undefined],\\n  \\"inLanguage\\":\\"ko\\",\\n  \\"author\\" : {\\n    \\"@type\\" : \\"Person\\",\\n    \\"name\\" : \\"Jieun\\",\\n    \\"email\\" : \\"aje20010827@gmail.com\\"\\n    }\\n  },\\n}"],["meta",{"property":"og:title"}],["meta",{"property":"og:description"}],["meta",{"property":"og:url","content":"https://an-jieun.github.io/"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image"}],["meta",{"property":"og:site_name","content":"전자두뇌만들기"}],["meta",{"property":"og:locale","content":"ko_KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:title"}],["meta",{"name":"twitter:description"}],["meta",{"name":"twitter:image"}],["meta",{"property":"@context","content":"http://schema.org"}],["meta",{"property":"@type","content":"TechArticle"}],["meta",{"property":"name"}],["meta",{"property":"url","content":"https://an-jieun.github.io/contents/undefined"}],["meta",{"property":"description"}],["meta",{"property":"keywords"}],["meta",{"property":"version","content":"1.0"}],["meta",{"property":"inLanguage","content":"ko"}],["meta",{"property":"technicalAudience","content":"developer, DBA, Web Developer"}],["meta",{"property":"proficiencyLevel","content":"beginner"}],["meta",{"property":"author","content":"Jieun"}]]},"headers":[],"relativePath":"contents/LLM/tablelm.md","filePath":"contents/LLM/tablelm.md","lastUpdated":1740639677000}'),r={name:"contents/LLM/tablelm.md"},o=n('<h1 id="llm을-활용한-데이터-정제-툴-알아보기" tabindex="-1">LLM을 활용한 데이터 정제 툴 알아보기 <a class="header-anchor" href="#llm을-활용한-데이터-정제-툴-알아보기" aria-label="Permalink to &quot;LLM을 활용한 데이터 정제 툴 알아보기&quot;">​</a></h1><h2 id="intro" tabindex="-1">Intro <a class="header-anchor" href="#intro" aria-label="Permalink to &quot;Intro&quot;">​</a></h2><p>분산 시스템에서 생성된 데이터를 통합해 분석을 하기 위해서는 전처리 과정이 필수적으로 선행되어야 한다. 특히, 기업/기관 내부의 데이터 뿐만 아니라, 외부의 데이터까지 연계해야 하는 상황에서는 규칙 기반의 정제 모듈로는 완벽한 수준의 정제가 어렵다.</p><p>생성형 인공지능이 등장하면서, 테이블 데이터에서의 활용 가능성도 논의되었다. 그리고, 생성형 인공지능의 텍스트 생성 능력과 높은 문맥 이해 능력을 기반으로 심볼릭 데이터에 대한 정제의 가능성도 열리게 되었다. 하지만 현재까지 정제 도구에 LLM을 결합한 사례는 드문 편이다.</p><p>여기서는 LLM 등장 이전까지의 데이터 정제에 관한 현황을 톺아 보고, 데이터 정제에 LLM을 적용한 연구들을 설명한다. 또한, 현재 개방되어 사용할 수 있는 정제 도구 사례를 소개하며, 데이터 정제에서의 LLM 적용의 장점과 단점, 그리고 고려해야 할 사안들에 대해 소개하도록 하겠다.</p><h2 id="llm을-활용한-데이터-정제-연구" tabindex="-1">LLM을 활용한 데이터 정제 연구 <a class="header-anchor" href="#llm을-활용한-데이터-정제-연구" aria-label="Permalink to &quot;LLM을 활용한 데이터 정제 연구&quot;">​</a></h2><p>대규모 언어 모델이 등장한 이후, 데이터 정제는 데이터 활용에 특화된 LLM인 LLM-GDO(LLM-Generic Data Operator)의 측면에서 거론된다. LLM을 통한 유연한 데이터 패턴에 대한 추론과 분석 뿐만 아니라, 오류 값에 대한 수정값을 생성한다는 점에서, 보다 범용적이고 유연한 데이터 정제가 가능할 것으로 보인다. 현재 LLM을 데이터 정제에 활용하고자 한 연구들의 대부분은 기존의 데이터 정제 프로세스를 LLM을 자동화 하는데 초점이 맞춰져 있다. 즉, 테이블 데이터의 컬럼들에 대한 유형 분석을 진행하고, 데이터의 패턴을 추출하며, 패턴에 어긋나는 오류 값들을 수정하는 방식으로 진행된다. 연구마다 프롬프트의 설계 방식이나 기존의 통계적 방식을 통한 테이블 프로파일링의 활용 등에서 차이를 보인다.</p><h3 id="zhang-s-huang-z-wu-e-2024-data-cleaning-using-large-language-models" tabindex="-1">Zhang, S., Huang, Z., &amp; Wu, E. (2024). Data Cleaning Using Large Language Models <a class="header-anchor" href="#zhang-s-huang-z-wu-e-2024-data-cleaning-using-large-language-models" aria-label="Permalink to &quot;Zhang, S., Huang, Z., &amp; Wu, E. (2024). Data Cleaning Using Large Language Models&quot;">​</a></h3><p>Zangh[5]은 기존의 통계적 방식의 정제 방식과 함께 생성형 인공지능 API를 활용하는 방식을 결합한 모델인 Cocoon을 제안하였다. Cocoon은 컬럼별 데이터 분산, 결측비율과 같은 테이블에 대한 프로파일을 생성할 때에는 기존의 통계적 기법을 사용한다. 그리고 이렇게 분석된 프로파일은 LLM 프롬프트에 함께 입력된다. 이를 통해 LLM은 보다 효율적으로 테이블을 이해할 수 있다. 정제 작업은 종래의 데이터 정제 서비스들과 유사하게, 데이터의 오류 유형별로 진행된다. LLM은 문자열과 데이터 패턴 상의 이상치를 검출하는 프로세스와 ‘N/A’, ‘null’과 같이 의미 상으로는 결측치이지만 마치 유효 데이터 값 처럼 표현된 ‘위장된 결측치’를 식별하는 프로세스, 중복 행을 탐색하고 키 값으로 사용이 가능한 컬럼을 식별하는 등의 과정에 활용된다. 이 과정들은 모두 각 케이스에 따라 구조화된 답변을 내도록 작성된 프롬프트 구문을 사용해 생성형 모델에 질의되며, 답변을 바탕으로 해당 오류를 수정하는 구문을 작성해 정제한다. 그림 1은 실제로 사용된 프롬프트의 예시이다. 수정사항에 대한 구조화된 값 뿐만 아니라, 각 정제 과정별로 사용자가 답변을 확인할 수 있도록 답변에 대한 설명문도 함께 작성하도록 설계하였다.</p><h3 id="ma-l-thakurdesai-n-chen-j-xu-j-korpeoglu-e-kumar-s-achan-k-2023-llms-with-user-defined-prompts-as-generic-data-operators-for-reliable-data-processing" tabindex="-1">Ma, L., Thakurdesai, N., Chen, J., Xu, J., Korpeoglu, E., Kumar, S., &amp; Achan, K. (2023). LLMs with User-defined Prompts as Generic Data Operators for Reliable Data Processing <a class="header-anchor" href="#ma-l-thakurdesai-n-chen-j-xu-j-korpeoglu-e-kumar-s-achan-k-2023-llms-with-user-defined-prompts-as-generic-data-operators-for-reliable-data-processing" aria-label="Permalink to &quot;Ma, L., Thakurdesai, N., Chen, J., Xu, J., Korpeoglu, E., Kumar, S., &amp; Achan, K. (2023). LLMs with User-defined Prompts as Generic Data Operators for Reliable Data Processing&quot;">​</a></h3><p>Ma[6]는 LLM-GDO를 위한 사용자 정의 프롬프트 예시를 제시하였다. 해당 연구에서는 데이터 정제 뿐만 아니라 데이터 마이닝, 모델링에 대한 프롬프트를 제안하였고, 실제로 프롬프트를 통해 생성된 답변을 반영한 데이터 가공 결과도 함께 제시하였다. 연구에서는 파이썬과 SQL을 사용하여 구현하였는데, 파이썬으로 LLM 프롬프트 템플릿을 LLM API에 전달하는 함수를 작성하고, SQL문으로 해당 함수를 통해 도출된 결과문을 쿼리로 바로 적용할 수 있도록 하였다.</p><h3 id="zhang-h-dong-y-xiao-c-oyamada-m-2024-jellyfish-a-large-language-model-for-data-preprocessing" tabindex="-1">Zhang, H., Dong, Y., Xiao, C., &amp; Oyamada, M. (2024). Jellyfish: A Large Language Model for Data Preprocessing <a class="header-anchor" href="#zhang-h-dong-y-xiao-c-oyamada-m-2024-jellyfish-a-large-language-model-for-data-preprocessing" aria-label="Permalink to &quot;Zhang, H., Dong, Y., Xiao, C., &amp; Oyamada, M. (2024). Jellyfish: A Large Language Model for Data Preprocessing&quot;">​</a></h3><p>Zangh[7]은 Insruction Tuning 기법을 활용해 데이터 작업에 특화되도록 LLM을 학습시키는 연구를 진행하였다. 실제 원본 데이터세트들에 대해서 시리얼화를 진행하고, 여기에 데이터 세트와 관련된 지식을 주입하였다. 그리고 이를 바탕으로 데이터 가공에 대한 지시문(Task Data)을 생성하고, 이를 다시 LLM(Mixtral 8x7B)에 넣어 기존 지시문에 추론 과정을 추가하였다. 그림 3은 원본 지시문과 추론이 추가된 지시문의 예시로, 원본 지시문과 비교하였을 때, 추론 과정에 대한 설명이 추가된 것을 확인할 수 있다.</p><p>Zangh[5], Ma[6]와 동일하나, API를 활용한 단순한 프롬프트 엔지니어링의 수준을 넘어 베이스 모델 자체를 훈련시켰다는 점이 차별적이다. 또한, 실제 원본 데이터들을 바탕으로 여러 학습 지시문을 제작하는 데에서 나아가 추론에 대한 지시문 추가를 LLM을 활용했다는 점과 다양한 규모의 LLM을 활용해 학습을 진행하고, 이에 대한 성능을 비교했다나는 점에서, 앞선 연구들보다 기술적인 차원에서 테이블 데이터에서의 LLM 접목을 시도한 연구로 볼 수 있다.</p><h2 id="테이블-데이터에-llm을-적용한-사례" tabindex="-1">테이블 데이터에 LLM을 적용한 사례 <a class="header-anchor" href="#테이블-데이터에-llm을-적용한-사례" aria-label="Permalink to &quot;테이블 데이터에 LLM을 적용한 사례&quot;">​</a></h2><h3 id="pandas-ai" tabindex="-1">Pandas AI <a class="header-anchor" href="#pandas-ai" aria-label="Permalink to &quot;Pandas AI&quot;">​</a></h3><p>Pandas AI는 테이블 데이터 활용을 지원하는 파이썬 라이브러리인 Pandas와 ChatGPT와 같은 대화형 어시스턴트 기능을 결합하여, 테이블 데이터에 대해서도 ChatGPT와 같이 대화형으로 데이터를 분석할 수 있도록 하는 라이브러리이다. 해당 라이브러리에서 자체적으로 데이터를 정제하는 기능을 지원하지는 않지만, chat 기능을 활용해 데이터세트를 표준화 하는 프롬프트를 작성하는 방법으로 정제가 가능하다. 계정 생성이 필요하며, 사용에 앞서 서비스키를 발급받아야 한다. pandas ai 플랫폼에 대한 소스코드를 다운받아 사용할 수 있으며, 라이브러리로 사용할 수도 있다. 라이브러리로 사용할 경우 pip 명령어로 설치할 수 있다. 파이썬에서 테이블 데이터 가공에 자주 활용되는 Pandas 라이브러리와의 호환성이 뛰어난다. 기존에 데이터를 가공했던 방식대로 pandas 패키지를 이용해 데이터 프레임을 불러오고, 이를 pandas ai 라이브러리의 SmartDataframe 모듈에 매개변수로 넘겨주면, 대화형으로 데이터 프레임을 가공하거나 분석을 진행할 수 있다. 다만, 데이터를 가공하는 경우, 요청 사항과 함께 가공된 데이터 프레임을 반환할 것을 명시해야 오류가 발생하지 않는다. 그림 5는 실제로 pandas ai를 활용하여 데이터 프레임에서 ‘_’ 문자를 제거한 예시이다. 복잡한 코드 필요 없이, chat 메소드에 프롬프트를 전달하는 방식만으로도 간단히 의도한 작업을 수행하였다. 하지만, 앞서 언급한 바와 같이 수정된 데이터 프레임을 반환하라는 지시가 없으면 오류가 발생하고, 복잡한 지시문에 대해서는 오류를 발생시킬 가능성이 크다는 문제점이 있다. 또한, 무료로 개방된 도구가 아니므로, 무료 계정에 대해서는 기능상의 제한이 존재한다.</p><h3 id="cocoon" tabindex="-1">Cocoon <a class="header-anchor" href="#cocoon" aria-label="Permalink to &quot;Cocoon&quot;">​</a></h3><p>2.2.에서 언급된 Cocoon은 실제로 이용자들이 정제를 수행해 볼 수 있도록 서비스 페이지를 개방하고 있다. 사용에 있어 별도의 로그인은 필요하지 않으며, 예시 데이터 세트를 제공한다. 또한 오픈소스로 개방하고 있어, 코드 상에서도 활용이 가능하다. 홈페이지에는 이메일 입력 란과 파일 업로드 버튼이 있는데, 여기에 이메일을 작성하고 정제할 테이블 데이터를 업로드 하면 현재 정제 대기 순서를 알려주는 화면이 나타난다. 정제에는 2분에서 40분 사이의 시간이 소요되며, 정제가 완료되면 작성했던 이메일로 정제 리포트에 대한 링크가 전송된다. 테스트한 파일은 총 190여개의 행과 6개의 컬럼으로 구성된 CSV 파일이었는데, 총 2분 가량 소요되었다. 그림 6은 실제로 정제 이후 전송받은 정제 결과 리포로, 정제 전후의 테이블 데이터를 100행 가량 미리 볼 수 있도록 하였으며, 테이블 데이터 전반에 대한 요약, 그리고 컬럼에 대한 부분으로 구성되어 있다. 정제 후, 정제 전 컬럼명이 없었던 데이터세트에 대해 컬럼별 인스턴스를 기반으로 새로운 컬럼명이 부여되었다. 새로 부여된 컬럼명에 대해 설명한 부분에서는 해당 컬럼명을 제안한 경위에 대해 간단히 서술하였으며, 실제 컬럼의 내용과 부여된 컬럼명을 비교하였을 때 적절히 부여되었음을 확인할 수 있었다. 화면 우측에는 컬럼별로 나타나는 인스턴스 패턴을 정규 표현식으로 제공하였으며, 각 패턴들에 대한 출현 비율도 제시하였다. 또한, 단순한 정규표현식 패턴 검출에서 나아가 인스턴스가 어떤 패턴으로 구성되어 있는지에 대해서도 설명한다.</p><p>사용한 예시 데이터가 규모가 매우 작으며, 아직 상용화 수준의 서비스가 아니라서 이용자가 적은 상황이었기에 정제에 그리 긴 시간이 소요되지는 않았다. 하지만, 데이터의 규모가 커지거나 이용자가 많을 경우 정제에 소요되는 시간이 길어질 뿐만 아니라, 대기 시간도 길어진다는 점에서 서비스의 안정성 측면에서 부족한 부분이 있다. 또한, API를 활용한 프롬프트 전략을 사용한다는 점에서, API에 대한 의존성이 크며, 오픈소스가 아닌 GPT 모델의 API를 사용한다는 점에서 비용에 대한 고려가 필요하다. 하지만, 프롬프트를 사용하는 수준에서도 업무에 사용할 만한 수준의 분석 결과를 제공하고, 데이터로부터 추출된 패턴을 명시적으로 제공한다는 장점이 있고, 작은 규모의 데이터 세트에 대해서는 비교적 신속하게 결과를 제공한다는 특성이 있다. 이러한 부분을 실무 상에 활용한다면, 데이터 가공 이전 샘플 데이터를 만들어 해당 서비스에 넣어보고, 도출된 결과를 통해 기초적인 테이블 정보를 확인하거나, 정제 작업에서 필요한 정규표현식 패턴 정보를 습득할 수 있을 것이다.</p><h2 id="고려해야-할-사항" tabindex="-1">고려해야 할 사항 <a class="header-anchor" href="#고려해야-할-사항" aria-label="Permalink to &quot;고려해야 할 사항&quot;">​</a></h2><p>Cocoon의 사례와 같이, 테이블 데이터에서의 LLM 기술의 도입은 프롬프트 설계 단계에서 적절한 형식의 답변을 생성하도록 하는 수준에 그친다. 따라서 LLM이 생성한 결과에 대한 정확성을 보장할 수 없으며, 의도하지 않은 형식으로 답변을 생성하게 되는 경우가 존재할 수도 있다. 이러한 경우는 해당 정제 도구가 특정 소프트웨어에 내장되어, 다른 프로세스 모듈과 상호작용을 해야 하는 상황에서 치명적인 오류를 발생시킬 위험도 있다. 따라서, 현재 개방된 LLM을 적용한 데이터 정제 도구를 사용할 경우, 예외 상황에 대한 처리 프로세스를 보다 철저하게 설계할 필요가 있다. 또한, 답변의 정확성 향상하기 위해, LLM의 생성 결과를 온전히 수용하기보다는, 실제 데이터세트에 대한 통계적 분석 기법과 규칙 기반 방식을 적절히 융합하는 것이 바람직하다. 또한, 생성형 LLM의 사용에 앞서 해당 데이터 세트가 개인정보나 민감 정보를 포함하고 있는지를 고려해야 한다. 개방된 LLM 서비스의 경우, 사용자의 답변이 외부 서버에 저장되며, 다른 사용자의 답변 과정에서 자신이 입력했던 정보가 노출될 가능성이 있기 때문이다. (OWASP Foundation, 2023) 따라서, 현재 개방된 LLM 기반 정제 서비스나, 외부의 API를 활용할 때는 더욱 이를 유념하여 사용하여야 하며, 개인정보가 다수 포함된 데이터를 정제해야하는 상황이라면 Jellyfish와 같은 로컬 기반에서 동작하는 모델이나 정제 도구를 사용하는 것이 적합하다.</p><h2 id="참고문헌" tabindex="-1">참고문헌 <a class="header-anchor" href="#참고문헌" aria-label="Permalink to &quot;참고문헌&quot;">​</a></h2><p>[1] 박소영, 이동엽, 김정아. (2023). 학습 데이터 구축에 필요한 공공 데이터 정제 사례.아시아태평양융합연구교류논문지,9(5), 117-128. <a href="http://dx.doi.org/10.47116/apjcri.2023.05.10" target="_blank" rel="noreferrer">http://dx.doi.org/10.47116/apjcri.2023.05.10</a></p><p>[2] 이종원, 김세헌, 김덕우, 이승언. (2022). 건축물 주소 기반의 공공개방데이터 활용성 제고를 위한 주소오류유형 분석 - 공공기관 주소목록 사례분석 -.대한건축학회논문집,38(4), 25-34.</p><p>[3] 이진형. (2017). 머신러닝을 이용한 빅데이터 품질진단 자동화에 관한 연구. 한국빅데이터학회지, 2(2), 75-86.</p><p>[4] 문석재, 정계동, 이종용, 최영근. (2014). 클라우드 환경에서 XMDR-DAI를 이용한 데이터 정제 시스템. 디지털융복합연구, 12(2), 263-270.</p><p>[5] Zhang, S., Huang, Z., &amp; Wu, E. (2024). Data Cleaning Using Large Language Models(No. arXiv:2410.15547). arXiv. <a href="https://doi.org/10.48550/arXiv.2410.15547" target="_blank" rel="noreferrer">https://doi.org/10.48550/arXiv.2410.15547</a></p><p>[6] Ma, L., Thakurdesai, N., Chen, J., Xu, J., Korpeoglu, E., Kumar, S., &amp; Achan, K. (2023). LLMs with User-defined Prompts as Generic Data Operators for Reliable Data Processing(No. arXiv:2312.16351). arXiv. <a href="https://doi.org/10.48550/arXiv.2312.16351" target="_blank" rel="noreferrer">https://doi.org/10.48550/arXiv.2312.16351</a></p><p>[7] Zhang, H., Dong, Y., Xiao, C., &amp; Oyamada, M. (2024). Jellyfish: A Large Language Model for Data Preprocessing(No. arXiv:2312.01678). arXiv. <a href="https://doi.org/10.48550/arXiv.2312.01678" target="_blank" rel="noreferrer">https://doi.org/10.48550/arXiv.2312.01678</a></p><p>[8] OWASP Foundation. (2023). OWASP top 10 for large language model applications: Version 1.1[PDF]. OWASP. Retrieved December 17, 2024, from <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-2023-v1_1.pdf" target="_blank" rel="noreferrer">https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-2023-v1_1.pdf</a></p>',31),i=[o];function p(l,s,d,h,g,c){return t(),e("div",null,i)}const L=a(r,[["render",p]]);export{u as __pageData,L as default};
