---
title: 1. 고유값과 고유벡터
description: 고유값과 고유벡터란 무엇인가
keywords: ["선형대수", "고유값", 'eigenvalue']
url: "MATH/linear-algebra-application/intermediate-chap-1.html"
---
# 1. 고유값과 고유벡터

## 고유벡터와 고유값

고유하다는 것은 상황이 변화해도 그 특성을 잃지 않는 것을 의미한다. 그럼, 벡터가 고유하다는 것은 무엇일까? 벡터가 어떠한 상황에서도 그 특성, 즉 방향성을 잃지 않는 것을 의미한다. 즉, 고유벡터란 **선형변환 이후에도 변환 결과가 자신의 상수배를 한 결과일 때의 벡터**를 의미한다. 선형 변환이란 쉽게 말해 어떤 행렬을 벡터에 곱하는 것이다.

<details>
    <summary> 여러가지 선형변환들 </summary>

**선형변환이란?**

벡터에 어떠한 행렬을 곱하는 것을 '벡터에 행렬을 통과시킨다'라고 표현한다. 아무튼, 벡터에 어떠한 행렬을 곱하게 되면 벡터의 크기와 방향이 변한다.

하지만, 아무리 벡터의 크기나 방향이 변해 봤자, 조금 더 벡터의 크기가 커진다거나, 벡터의 방향이 치우치는 정도에 그치게 된다. 벡터가 곡선의 형상을 띄거나 하지는 않는다는 것이다. 이를 '선형적으로 변화했다'라고 말한다.

이처럼, 벡터가 어떠한 행렬을 통과하여 선형적인 변화를 일으키게 하는 것을 **선형변환 (linear transformation)** 이라고 한다.


선형변환에 속하는 다양한 변환들이 있으며, 모든 변환들은 행렬을 곱하여 이뤄진다. 어찌보면, 벡터에 곱해지는 행렬이 곧 함수와도 같은 역할을 한다고 볼 수 있다. 이런 변환들은 주로 컴퓨터 그래픽에 많이 활용된다. 하지만 아핀변환이라는 것은 LLM에서도 자주 언급되긴 한다.


---

▶️**scailing (비례변환)**  비례변환은 벡터의 방향과 크기가 변화하는 변환을 의미한다.

▶️**Rotation (회전변환)**  회전변환은 좌표평면이 원점을 중심으로 회전하는 것을 의미한다. 회전변환된 벡터는 원래의 벡터와 선형독립이며, 회전변환시 고유값과 고유벡터는 존재하지 않는다. 

▶️**Shearing (전단변환)** 전단변환은 특정 차원값에만 변화를 주는 변환을 의미한다. 기하학적으로 이해하면, y축을 고정하고 x축 방향으로만 변화를 가하는 것을 의미한다.

앞서 살펴본 변환들은 모두 원점이 변화하지 않는 변환이다. 원점을 이동시키는 변환도 있다. 바로 **이동변환** 이라는 것인데, 대표적으로 **아핀변환(Affine)** 이 있다.              
</details>

<details>
    <summary>아핀변환 (Affine Transformation)</summary>
    TBD
</details>



식으로 나타내면 다음과 같이 표현할 수 있다.

$Xv = \lambda v$

여기서 $\lambda$ 는 벡터에 곱해지는 스칼라를 의미한다. 이 스칼라 값인 람다를 **고유값**이라고 칭한다. 즉, 고유값이란 고유벡터에 곱해지는 상수값을 의미한다.

고유벡터는 하나만 존재할 수도, 무한하게 존재할 수도 있으며, 고유 벡터가 아예 존재하지 않을 수 있다. 다음은 고유벡터를 구하는 과정을 나타낸 식이다.

$Av = \lambda v$

$Av - \lambda v = 0$

$(A- \lambda I)v = 0$

$v \neq 0, \space  (A-\lambda I) = 0$

$eigen\space vector = v \forall N(A - \lambda I)$

고유벡터가 무한히 존재하는 경우, 보통 해당 벡터의 basis를 고유벡터로 삼는다. 고유벡터가 무한히 존재하는 경우는 보통 행렬식이 0, 즉, 곱해지는 행렬이 선형 종속이라 1차원에서 span하는 경우이다. 이런 케이스를 시각적으로 보면, 좌표 평면이 일직선으로 짜부라드는 것을 확인할 수 있다.


## 고유값 분해 (eigenvalue decomposition)

고유값 분해는 말 그대로 어떤 벡터를 스칼라(고유값)과 고유 벡터로 나누는 것을 의미한다.

$\lambda$ 값은 여러 개 존재할 수 있으며, 대각행렬로 lambda 값들을 표현할 수 있다. 대각행렬로 나타낸 람다값은 대문자 람다 $\Lambda$로 나타낸다.

$AV = V \Lambda$ 로 나타낼 수 있는데, 고윳값을 갖는 모든 벡터는 Invertable 하다는 성질을 활용해 식을 정리하면

$A = V \Lambda  V^{-1}$ 
로 정리할 수 있다.

이번에는 $\Lambda$만 남도록 식을 정리해보자. 마찬가지로, V의 invertable한 성질을 활용하도록 한다. 

$V^{-1}A = V^{-1}V\Lambda V^{-1}$

$V^{-1}AV = V^{-1}\Lambda V^{-1}V$

$V^{-1}AV = \Lambda$


다음은 고유값 분해와 관련된 특성들이다.

1. **$A^T$의 고유값은 A의 고유값과 같다.**

2. **A가 orthogonal matrix이면, $\lambda = \pm 1$ 이다.**

    $A = Q,
    Qv = \lambda v$

    ${(Qv)}^T Qv=v^TQ^TQv$

    $Q^TQ = I,
     \therefore {(Qv)}^TQv =||v||_2^2$

    이렇게 되면
    
    $\lambda^2 v^2 = ||v||_2^2$

    $\therefore \lambda = \pm 1$
    
    가 성립한다.

3. **A가 Postivie Semi Definite (PSD) 이면 $\lambda$는 무조건 0보다 크거나 같다.**

<details>
    <summary>Positive Semi Definte란?</summary>
</details>

4. **Diagonal Matrix $\Lambda$의 Non-Zero 고유값의 개수는 rank와 동일하다.**
    
    이 성질은 고유값 분해를 기하학적으로 이해하는데 중요하다.

    rank라는 것은, 벡터의 계수, 즉 벡터가 span하는 차원을 의미한다.

    A는 고유벡터와 고유값의 곱으로 표현된다. 즉, 벡터와 벡터의 스팬하는 비율을 구하는 것이다.

    즉, 고유값 분해란 A의 고유벡터가 span하는 차원들에 대한 벡터로 쪼개고,

    각 차원에 곱해진 $\lambda_k$를 찾는 과정이다.

    여기서 $\lambda$는 각 차원별로 곱해지는 값의 모음이므로, 대각행렬성분의 개수가 곧 고유벡터의 랭크와 같다.

    Lambda의 값은 제각각인데, 데이터 압축의 분야에서는 고유값 분해 후, 크기가 작은 고유값은 제거하는 방식으로 데이터를 압축한다. 


5. **Symmetric Matrix는 무조건 Diagonalizable 하며 (역 성립 X), 따라서 $A = Q\Lambda Q^T$ 된다.**
    
    대칭행렬이란 $A^T = A$인 행렬이다. 대칭행렬은 무조건 대각화가 가능하다는 성질을 갖는다.  

> **(+) 대각화란?(diangolize)**

대각화란 어떠한 행렬을 고유벡터로 이뤄진 가역행렬과 가역행렬에 곱해진 고유값들에 대한 대각행렬의 곱으로 나타내는 것을 의미한다. 즉, $AX = X\Lambda, A = X\Lambda X^T$의 꼴로 나타내는 것을 의미한다.
    
    
> **대각화가능조건**
1. n x n 행렬 A는 일차독립인 교유벡터를 가져야 한다. 즉, 행렬 A의 고유벡터들은 Full-rank여야 한다.
2. n x n 행렬 A가 서로 다른 n개의 고유값을 갖는 경우 대각화 가능하다. 고유값분해와 혼동하지 말아야 할 것은, 고유값분해는 꼭 서로 다른 고유값을 가질 필요는 없다는 것이다.($\Lambda$의 대각성분으로 0이 대다수 나타나는 경우가 있다.)


## 고유값 분해의 장점

고유값 분해로 얻을 수 있는 장점은 무엇일까?

1. **행렬의 거듭제곱 계산이 용이해진다**

    고유값분해가 되는 행렬을 거듭제곱하면 다음과 같이 나타낼 수 있다.

    $A^k = V\Lambda V^{-1} \cdot V\Lambda V^{-1} \cdot V\Lambda V^{-1}...$

    여기서 $V^{-1}V$는 $I$로, 나열된 수식에서 소거된다. 따라서, 이를 정리하면

    $A^k = V\Lambda^k V^{-1}$ 
    
    을 얻을 수 있는데, $\Lambda^k$는 대각행렬의 제곱이므로 복잡한 연산 없이 대각성분들을 k승 해주기만 하면 된다. 


2. **고유값 분해를 통해 쉽게 Inverse Matrix를 얻을 수 있다**

    $A^{-1} = {(V\Lambda V^{-1})}^{-1}$

    $V\Lambda^{-1}V^{-1}$



3. **행렬식을 구하기 쉽다**
    
    A의 행렬식을 고유값과 고유벡터의 곱으로 나타내면

    $det(A) = det(V\Lambda V^{-1})$

    $det(A) = det(V)det(\Lambda)det(V^{-1})$

    인데, invese 벡터의 행렬식은 벡터의 행렬식의 약수이다.
    
    따라서, 결국에는 $det(A) = det(\Lambda)$ 만 남는다.

    그리고, 대각행렬에서의 행렬식은 곧 대각성분들의 총 곱과 같으므로
    
    $det(A) = \Pi_{i=1}^n \lambda_{i}$
    
    가 성립한다.


4. **trace(대각합)값을 구하기 쉽다**

    대각합은 대각선상의 성분들을 더하는 것이다.

    $tr(A) = tr(V\Lambda V^{-1})$이고, 대각합의 성질 상, $tr(V\Lambda V^{-1}) = tr(\Lambda VV^{-1})$ 로도 정리할 수 있다.
    
    $tr(\Lambda VV^{-1}) = tr(\Lambda)$ 이므로, $tr(A) = tr(\Lambda)$이다. 
    
    따라서,
    
    $$
    tr(A) = tr(\Lambda) = \Sigma_{i=1}^{n} \lambda_{i}
    $$
    
    가 성립한다. 즉, A의 대각합은 고유값의 합과 동일하다는 것이다.


5. **rank-deficient인 행렬일 경우, 0인 고유값이 하나 이상 존재함을 알 수 있다.**

    rank-deficient는 선형 종속인 행렬임을 파악할 수 있는 요소이다. rank-deficient인 경우, $$\lambda$$는 0인 고유값을 반드시 갖게 되는 성질이 있다. 직관적으로 생각하면, full rank가 아닌 이상, 백터의 스팬 차원이 하나 줄어든다.
    

    따라서, 고유벡터를 각 차원 공간에서 스팬하도록 하는 행렬 $$\Lambda$$도 원본 행렬과 동일한 크기의 대각행렬이 되겠지만, 스팬하지 않는 차원의 대각 성분값은 0이 될 수 밖에 없는 것이다. 
    
    
    이를 수식으로 증명하면 다음과 같다.

    $$A = 
    \begin{bmatrix} 
    1 & 2 \\
    3 & 6 \\ 
    \end{bmatrix}, 
        v = 
    \begin{bmatrix}
        x\\
        y\\
    \end{bmatrix}$$
    
    $$Av = \lambda v$$
    
    $$
    \begin{bmatrix} 
        1 & 2 \\
        3 & 6 \\ 
    \end{bmatrix}
    *
    \begin{bmatrix} 
        x \\
        y \\ 
    \end{bmatrix}
    =
    \lambda*
    \begin{bmatrix} 
        x \\
        y \\ 
    \end{bmatrix}$$


    $$\begin{bmatrix} 
        x + 2y \\
        3x + 6y \\ 
    \end{bmatrix}
    =
    \lambda * 
    \begin{bmatrix} 
        x \\
        y \\ 
    \end{bmatrix}
    = 
    \begin{bmatrix}
        \lambda x \\
        \lambda y \\
    \end{bmatrix}$$


    $2y = (\lambda -1)x$ 
    
    로 정리할 수 있다. 이를 $$3x+6y = \lambda y$$ 에 대입하면,

    $3x+3(\lambda - 1)x = \lambda((\lambda-1)x/2)$

    $6\lambda = (\lambda^2-\lambda)x$
    
    $6 = (\lambda -1)x$
    
    $x= 6/(\lambda-1)$
    
    이를 다시 원래 식에 대입하면

    $2y = (\lambda-1)x$
    
    $(\lambda -1)*6/(\lambda-1) = 6$
    
    $\therefore y = 3$

    를 구할 수 있다.
    
    이를 다시 식에 대입하면 첫 번째 방정식에선 다음의 값이 도출된다.
   
    $x + 6 = \lambda x$

    $(\lambda-1)x = 6$
    
    
    두 번째 방정식에선 다음의 식이 도출된다.
    
    $3x+6*3 = \lambda*3$

    $x+6 = \lambda,
    x = \lambda-6$
    
    두 번째 방정식에서 얻은 x의 값을 첫 번째 방정식에 대입하면

 
    $3x =3\lambda-18$

    $x = \lambda-6$

    x를 앞서 정리한 $2y = (\lambda-1)x, y = 3$에 대입하면

    $(\lambda-1)(\lambda-6) = 6$
    
    $\lambda-7\lambda+6 = 6$

    $\lambda(\lambda-7) = 0$

    위의 식에서 $\lambda$는 0 또는 7의 값을 갖는 것을 확인 할 수 있다.

<details>
    <summary>rank-deficient란?</summary>
    rank는 행렬이 갖는 독립적인 행이나 열의 개수를 의미한다. 정방행렬에서 full rank는 랭크가 n개, n x m 행렬에서 full-row rank는 rank가 n, full-column rank에서 rank는 m이다. rank-deficient는 n x m 행렬에서 rank 값이 min(n,m) 보다 작은 경우를 의미한다. 즉, 행렬의 벡터가 독립적이지 않아, 행렬의 차원 수 만큼 벡터가 표현될 수 없는 상태를 의미한다. rank-deficient는 따라서 선형 종속인 상태를 의미하기도 하므로, rank-deficient인 행렬의 행렬식은 0이 될 수밖에 없다.
</details>