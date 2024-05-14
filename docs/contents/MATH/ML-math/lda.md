---
title : LDA (Latent Dirichlet Allocation)
description: LDA 알아보기
keywords : '"머신러닝, LDA, 잠재디리클레할당"'
url : "MATH/ML-math/lda.html"
img : "https://an-jieun.github.io/static/img/gmm-thumb.png"
---
# LDA (Linear Distribution Analysis) - 잠재디리클레 할당

LDA는 클래스가 레이블링된 데이터 세트에 대해, 데이터 세트를 구분하는 영역을 가르는 방법에 대한 것이다. 이 점은 Neural Network과도 유사한데, 차이점이 있다면 Neural Network는 결정평면에 대한 최적 파라미터를 Gradient Descent(경사하강)을 통해 에러를 업데이팅 시키며 최적값을 찾아나간다는 것이고, LDA는 결정 평면(또는 직선)을 찾는게 아닌, 최적의 **사영 행렬(projection matrix)** 을 찾는 것이 목적이다. 그러니까, LDA에서는 데이터가 클래스에 따라 잘 쪼개지도록 하는 원점을 지나는 방향 벡터를 찾는 것이 목적이다. LDA에서는 원점을 지나는 방향벡터를 구하는 것이므로 bias가 없다.

Neural Network 과 LDA에서 구하게 되는 것은 결국엔 공통적으로 원본 데이터세트 X를 변환하는 벡터인데, Neural Network 방식은 Thresh Holding을 통한 오차제곱합 갱신을 통해 조금씩 가중치 벡터를 조정하는 방법인 것이고, LDA는 엄밀히 따지면 결정 평면을 찾는 것이라기보단, 최적의 사영공간을 찾는 것이다. 아무튼간에 결과론적으로 보면 데이터에 곱해지는 어떤 가중치 벡터를 통해 클래스를 구분 지을 수 있는 공간을 찾는다는 점에선 비슷하다고도 할 수 있다.

LDA는 곧 PCA와 연관된다. LDA에서의 사영벡터가 차원 축소 방법과 비슷하기 때문이다.(확인필요)

## 목적함수 정의

간단하게 두 데이터가 잘 쪼개지는 직선을 구한다고 생각하자. 기본적으로, 우리가 두 집단의 특성이 상이하다고 하면, 두 집단의 평균이 뭔가 아예 다른 (즉, 평균 값이 엄청 차이가 나는) 상황을 생각할 것이다. 초등학생과 고등학생의 키 분포를 생각하면 그렇다. 둘의 평균값의 거리는 매우 크다.

하지만 이 방법이 항상 들어맞는 것은 아니다. 유아의 남/녀 키 분포를 생각해보자. 사실상 영유아 시기에는 신체적 특성으로 남녀를 구분짓는 것이 거의 의미 없다. 따라서, 유아 시기의 키 데이터 분포를 보면, 남자 아이와 여자 아이들의 키 집단이 명확하게 구분된다기 보다는 혼재되어 있는 양상을 보일 것이다.

이 경우에 두 데이터의 사영된 평균 차이가 큰 것이 의미 있을까? 아마 의미 없을 것이다. 이런 상황에서 의미 있는 방법은 아마 그나마 데이터가 뭉쳐있도록 사영시키는 것이 그나마 합리적일 것이다.

따라서 LDA에서는 **1) 두 클래스의 평균값 차이가 가장 크고** 동시에 **2)두 집단 각각의 분산이 최소** 가 되도록 하는 사영벡터를 최적의 사영벡터로 본다.

수식적으로 나타내면 다음과 같다. 클래스 $C = [C_1, C_2]$ 일 때, 두 클래스 각각의 평균 집합은 $[\mu_1, \mu_2]$이고, 두 집단 각각의 분산은 $[s_1, s_2]$라고 하자.

간단하게 나타내면 아래와 같다. 사영벡터 $\mathbb v$는 기저벡터이므로 $N_2 = 1$이다. 따라서 $||\mathbb v|| = 1$ 을 가정한다.

$$
Max_{||\mathbb v|| = 1} ( \frac{(\mu_1-\mu_2)^2}{s_1^2 + s_2^2})
$$

여기서 평균의 제곱을 inter class, 분모의 두 클래스 각각의 내부 분산을 intra class라고 한다. 분자값이 최대, 분모값이 최소가 되었을 때 해당 분수 값의 크기가 최대가 된다. 즉, 해당 식으로 자연스럽게 평균값 차이가 최대가 되면서 내부분산은 최소가 되는 지점의 사영벡터를 찾을 수 있다.


## 수식풀이

### 수식변환

여기서 $\mu$를 구해보자. 데이터 평균의 사영은 사영의 평균과 같다는 점을 이용하여 사영된 데이터의 평균을 구하도록 하자.

$$
\mu_j = \frac{1}{n_{c_j}}\sum_{\mathbb x^{(i)} \in C_j}\mathbb v^t \mathbb x^{(i)} = \mathbb v^t(\frac{1}{n_{c_j}} \sum \mathbb x^{(i)}) 
$$

이에 따라 $(\mu_1 - \mu_2)^2$를 구해보자. $\frac{1}{n}$은 상수이므로 제외하도록 하겠다.

$$
(\mu_1-\mu_2) = \mathbb v^t(\sum_{\mathbb x^{(i)} \in C_1}\mathbb x^{(i)} - \sum_{\mathbb x^{(i)} \in C_2}\mathbb x^{(i)})
$$

$(\sum_{\mathbb x^{(i)} \in C_1}\mathbb x^{(i)} - \sum_{\mathbb x^{(i)} \in C_2}\mathbb x^{(i)})$ 를 간단하게 $M_1 - M_2$로 나타내어 보겠다.

$$
(\mu_1 - \mu_2)^2 = (\mathbb v^t(M_1 - M_2))^2 
$$

벡터의 제곱은 $V^TV$ 형태로 나타낼 수 있다. 따라서 위 식을 벡터 곱으로 다시 표현하면 다음과 같다.

$$
(\mu_1 - \mu_2)^2 = (\mathbb v^t(M_1 - M_2))^T(\mathbb v^t(M_1 - M_2)) = \mathbb v^T(M_1 - M_2)(M_1 - M_2)^T \mathbb v
$$

$(M_1 - M_2)(M_1-M_2)^T$ 는 $d*d$ 정방행렬이고, 두 클래스의 평균의 차이를 나타내는 행렬이다. (inter-class scatter matrix) 이 식을 $\mathbb S_b$로 치환하여 위의 식을 다시 표현하면 아래와 같은 형태를 띄게 된다.

$$
(\mathbb v^t(M_1 - M_2))^T(\mathbb v^t(M_1 - M_2)) = \mathbb v^T(M_1 - M_2)(M_1 - M_2)^T \mathbb v = \mathbb v^t \mathbb S_b \mathbb v
$$

이번에는 $s_1^2 + s_2^2$을 구해보자. 분산은 데이터 값과 평균값의 차이에 대한 제곱합의 평균을 구한다. 즉 $s_j =\frac{1}{n_j}\sum(\tilde x^{(i)} - \mu_j)^2$ 이다. 그리고 $\tilde x^{(i)} = \mathbb v^t \mathbb x^{(i)}$로 구할 수 있다. 앞서 언급했듯이, 사영벡터의 평균이나 평균의 사영벡터나 값이 같으므로 (덧셈 기호 바깥에 사영벡터 곱해도 된다는 말이다.) 다음과 같이 정리할 수 있다.

$$
\sum(\tilde x^{(i)} - \mu_j)^2 = \sum(\mathbb v^T\mathbb x - \mathbb v^tm_j)^2= \mathbb v^T(\sum(\mathbb x^{(i)} - m_j)(\mathbb x^{(i)} - m_j)^T)\mathbb v
$$

$(\sum(\mathbb x^{(i)} - m_j)(\mathbb x^{(i)} - m_j)^T)$ 는 곧 intra-class scatter Matrix를 나타낸다. 즉, 내부분산을 나타내는 $d*d$ 행렬로, 앞선 경우와 마찬가지로 이를 $\mathbb S_w$로 표현할 수 있다.

최종적으로 $\mathbb v$에 대한 미분을 위한 목적함수로 표현하면 아래와 같다.
$$
Max(\frac{\mathbb v^T \mathbb S_b \mathbb v}{\mathbb v^T \mathbb S_w \mathbb v})
$$

### 미분

$Max(\frac{\mathbb v^T \mathbb S_b \mathbb v}{\mathbb v^T \mathbb S_w \mathbb v})$는 $\mathbb v$로 해당 목적함수를 미분하였을 때 0이 나오는 벡터를 대입함으로써 구할 수 있다. 

:::info 💡몫의 미분법이란
$$
\left\{ \frac{f(x)}{g(x)} \right\}^` = \frac{f(x)g^`(x) - f^`(x)g(x)}{ \left\{ g(x)\right\}^2}
$$
:::