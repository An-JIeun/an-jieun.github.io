import{_ as a,c as i,a as $,a3 as A,m as e,o as n}from"./chunks/framework.BfR3yx5i.js";const q=JSON.parse('{"title":"2. 특이값과 특이값 분해","description":"","frontmatter":{},"headers":[],"relativePath":"contents/MATH/linear-algebra-application/intermediate-chap-2.md","filePath":"contents/MATH/linear-algebra-application/intermediate-chap-2.md","lastUpdated":null}'),t={name:"contents/MATH/linear-algebra-application/intermediate-chap-2.md"},o=A("",11),r=e("p",null,"(A^TA)^T = A^TA \\newline (AA^T)^T = AA^T",-1),T=e("p",null,"AA^T = U\\Sigma V^T \\cdot V \\Sigma^T U^T \\newline V^T \\perp V, \\therefore V \\cdot V^T = I \\newline \\therefore AA^T = U\\Sigma\\Sigma^T U^T",-1),l=e("p",null,"A^TA = V\\Sigma^TU^T \\cdot U \\Sigma V^T \\newline U^T\\cdot U = I, \\therefore A^TA = V^T\\Sigma^T\\Sigma V",-1),s=e("p",null,"A^+ = (A^TA)^{-1}A^T \\newline A^+A = (A^TA)^{-1}A^TA \\newline A^+A = (A^TA)^{-1}(A^TA) = I \\newline \\therefore A^+A = I",-1),m=e("p",null,"A^+ = A^T(AA^T)^{-1} \\newline AA^+ = AA^T(AA^T)^{-1} \\newline AA^+ = (AA^T)(AA^T)^{-1} = I \\newline \\therefore AA^+ = I",-1),_=e("p",null,"A^+ = V\\Sigma^+ U^T",-1),g=e("p",null,"\\hat{y} = w^Tx",-1),d=e("p",null,"\\Sigma^N_{i=1} e^2 = \\Sigma^N_{i=1}(y_i - w^Tx_i)^2",-1),p=e("p",null,"e^2 = e^Te \\newline e^Te = (y-Xw)^T(y-Xw)",-1),c=e("p",null,"Ax = b \\newline A^TAx = A^Tb \\newline (A^TA)^{-1}A^TAx = (A^TA)^{-1}A^Tb \\newline (A^TA)^{-1}(A^TA)x = (A^TA)^{-1}A^Tb \\newline x = (A^TA)^{-1}A^Tb",-1),h=e("p",null,"x = A^{+}b",-1);function u(S,V,U,b,f,w){return n(),i("div",null,[o,$(" A^TA$$와 $$AA^T$$가 대칭행렬임을 확인하는 식은 다음과 같다. "),r,$(" $$A^TA$$ 나 $$AA^T$$ 모두 전치해도 자기 자신과 같으므로 대칭적이라는 것이다. *** ## 특이값 분해 공식 기본적으로 특이값 분해는 $$A = U \\Sigma V^T$$ 를 구하는 것이다. 이때, A에 A의 전치 행렬을 곱해 대각화 가능한 정방행렬로 만들어준다. 대각화가 가능하다는 것은 곧 분해가 가능한 형태라는 것이다. ![특이값분해](../../imgs/\\[linear-algebra-int]2-1.png) $$A^TA$$ 와 $$AA^T$$는 다른 행렬이나, 공통적으로 둘 다 대칭적이다. 특이값 분해는 이 점을 활용해, 두 식으로부터 도출되는 특이벡터와 특이 벡터가 통과하는 시그마 행렬을 찾아낸다. 우선 $$A^TA$$로 특이값 분해하는 과정을 알아보자. 그 전에 특이값 분해가 가능하도록 하는 조건 3개를 알아보자. > **특이값 분해의 조건** 1. $$V$$는 $$A$$의 정규직교 고유벡터를 포함한다. 2. $$U$$는 $$A$$의 정규직교 고유벡터를 포함한다. 3. $$\\sigma_1. \\sigma_2 ... \\sigma_k$$는 $$A^TA, AA^T$$ 모두의 0이 아닌 고유값이다 특이값 분해는 $$A$$를 $$A^TA, AA^T$$의 대칭행렬을 좌특이벡터, 우특이벡터와 두 대칭행렬에서 공통적으로 갖는 고유값 행렬로 분해한다. "),T,$(" U는 전치벡터와 직교하며 $$\\Sigma\\Sigma^T$$는 U 의 크기를 갖는 정방행렬이 된다. 따라서, 사실상 $$Q\\Lambda Q^T$$의 형태를 띄게 된다. 여기서부턴 고유분해하듯 구하면 된다. 다음으로는 $$A^TA$$로 특이값 분해하는 과정을 알아보자. "),l,$(" $$AA^T$$의 식과 유사한 형태의 값이 나온다. 여기서도 V는 U와 마찬가지로 직교벡터이고, 시그마 행렬은 V의 크기를 따르는 정방행렬이다. V도 U와 동일한 방식으로 구해준다. * $$\\Sigma \\Sigma^T$$는 U의 차원수와 동일한 크기를 갖는 고유값의 정방행렬을 가진다. * 반대로 $$\\Sigma^T\\Sigma$$는 $$V^T$$와 동일한 크기를 갖는 고유값의 정방행렬을 갖는다. $$\\Sigma$$는 $$V^T$$와 $$U$$가 공통적으로 통과하는 행렬로, $$\\Sigma^T\\Sigma, \\Sigma\\Sigma^T$$의 대각성분은 $$\\sigma_n$$의 제곱으로 이뤄져 있다. $$dimension(U) > dimension(V^T)$$ 일 때, $$\\Sigma\\Sigma^T$$는 n개의 0이 아닌 U, V 모두의 고유값으로 이뤄진 대각성분을 가지며, m-n개의 나머지 대각성분은 0의 값을 갖는다. *** ## 무어-펜로즈 유사역행렬(Moore-Penrose Pseudo Matrix Inverse) 무어-펜로즈 유사역행렬(:의사역행렬)은 임의 행렬에 A에 대해서 , n > m (데이터개수 > 파라미터)이고 모든 열벡터가 선형 독립일 때 다음의 식이 성립한다. n >m 인 상태는 과결정(overdermined)상태를 의미하기도 한다. 선형회귀분석이 적용되는 아주 일반적인 케이스이다 "),s,$(" 이때, $$A^TA$$는 가역행렬이다. $$A^+$$가 좌측 역행렬이 되는 것을 의미한다. 반대로 n < m의 경우 $$A^+$$는 우측역행렬이 된다. n < m(파라미터 > 데이터)은불충분결정평면 (underdetermined) 상태를 의미한다. 회귀에서 자주 보이는 유형은 아니나, 딥러닝에서는 이러한 형태의 행렬벡터가 빈번히 등장한다. 딥러닝의 feature(파라미터)는 수억수천만개이지만 학습시킨 데이터는 이 수준에는 못 미치기 때문이다. "),m,$(" A의 의사역행렬을 구한는 방식은 특이값 분해를 거친다. $$A = U\\Sigma V^T$$로 분해되었을 때, $$A^+$$ 구해진 U, V를 바탕으로 다음의 공식을 통해 구해진다. "),_,$(" 이때, $$\\Sigma^+$$는 $$\\Sigma$$는 특이값을 대각선상에 표현한 대각행렬이므로 유사역행렬은 단순히 특잇값들에 역수를 취하는 방식으로 구할 수 있다. 0인 값은 그냥 0으로 둔다. *** ## 선형회귀에서의 의사역행렬 활용 선형회귀라는 것은 기본적으로 독립변수($$x$$)에서 종속변수($$y$$)를 예측하기 위한 방법으로 독립변수와 가중치 벡터($$w$$)의 가중합으로 $$y$$와 가장 근사한 값 $$\\hat{y}$$을 계산하는 것을 의미한다. 선형회귀모형을 수식적으로 재현하면 다음과 같다. "),g,$(" 예측의 정확성은 가중치벡터가 관건이라고 할 수 있다. 통상적인 관점에서의 머신러닝은 대체로 이 가중치의 최적값을 최대한 효율적으로 구하는 것이 목표이다. 가중치는 잔차제곱합(Residual Sum of Square : RSS)으로 구할 수 있다. 여기서 잔차라는 것은 예측값과 실제값의 차이, 즉 오차(error : $$e$$)를 의미한다. 목표는 간단하다. 잔차들의 합이 최소가 되도록 하는 것이다. "),d,$(" 이 식을 좀 더 대수적관점에 접근해보면 "),p,$(" 로 볼 수 있다. 대체로 머신러닝에서는 방정식의 수보다 미지수가 훨씬 많기에, 최소자승법을 통해 해결한다. 즉, 잔차벡터의 크기를 최소화하는 가중치벡터를 찾는 것이다. 잔차의 제곱을 취한 벡터인 $$\\Sigma e^2$$는 L2 Norm으로도 볼 수 있다. 즉, 최소자승법을 통한 해법은 곧 잔차 벡터의 norm을 최소화 하는 문제이다. 최소자승법에서 $$Ax \\approx b$$이다. 이러한 관점에서 $$x$$를 가중치와 정답값의 결합으로 표현하는 과정은 다음과 같다. "),c,$(" 뭔가 익숙한 식이 보이지 않는가? 우항의 $$(A^TA)^{-1}A^T$$를 보자. 앞서 유사역행렬에 대한 설명에서 $$A$$의 유사역행렬이 $$(A^TA)^{-1}A^T$$임을 공부했다. 따라서, 이 식은 "),h,$(" 로 나타낼 수 있다. 이렇게 하면 보다 간단하게 선형회귀 방정식을 구할 수 있다. 최적의 잔차를 구할 때까지 가중치 벡터를 갱신할 필요가 없어진다는 것이다. *** ## Ref * [선형대수와 선형회귀모형(linear regression)](https://hyeshin.oopy.io/ds/lin\\_algebra/20181121\\_linear\\_regression) * [의사역행렬의 기하학적 의미](https://angeloyeo.github.io/2020/11/11/pseudo\\_inverse.html#google\\_vignette) ")])}const k=a(t,[["render",u]]);export{q as __pageData,k as default};
