# 3. 선형회귀와 다중회귀

## 선형회귀

선형회귀란 다수의 데이터, 즉 독립변수 x로부터 종속변수(레이블값) y를 예측하기 위한 통계적 기법이다. 선형회귀란, 독립변수에 따른 종속변수의 분포에 따라, 독립변수로부터 종속변수가 도출될 수 있는 선형 함수 $wx+b$를 찾아 내는 것이 목표이다.

$w, b$를 찾아내는 것이 관건인데, 선형회귀 모델에서는 잔차제곱합(Residual Sum of Square)를 통해 $w,b$의 예측값에 따라 도출된 예측값인 $\hat y$와 실제 값 $y$의 차이인 오차값 $e$가 최소화 되는 값을 찾음으로서 두 값을 구한다.

모든 독립변수 x에 대한 에러값 총합에 대한 식은 다음과 같다.

$$
\Sigma_1^N e^2 = \Sigma_1^N(y_i - (wx_i +b))^2
$$

에러가 최저가 되는 지점은 각각 w, b에 대해 에러 식을 미분하면 구할 수 있다.

- w에 대해 미분

$\frac{\sigma}{\sigma w} \Sigma_1^N e^2 = \frac{\sigma}{\sigma w} \Sigma_1^N(y_i - (wx_i +b))^2$

$\frac{\sigma}{\sigma w} \Sigma_1^N e^2 = \Sigma_1^N -2x_i(y_i - (wx_i +b)) = 0$

$\Sigma_1^N(2x_i^2)w -2x_i(\frac{y_i}{b}_i+1)b = 0$

$\Sigma (2x_i^2)w - 2\Sigma x_i(\frac{y_i}{b}+1)b = 0
$

- b에 대해 미분

$\frac{\sigma}{\sigma b} \Sigma_1^N e^2 = \Sigma_1^N (y_i - (wx_i +b)) = 0$

$\Sigma_1^N (-x_i)w +(\frac{y_i}{b}-1)b = 0$

$\Sigma (-x_i)w + \Sigma (\frac{y_i}{b}-1)b = 0$

합에 대한 식의 연립은 역행렬 연산을 통해 구할 수 있다.

$$\begin{bmatrix} 
    \Sigma(2x_i^2) & \Sigma ( x_i(\frac{y_i}{b}_i+1)) \\
     \Sigma (-x_i) & \Sigma (\frac{y_i}{b}-1) \\ 
\end{bmatrix}

\begin{bmatrix}
w\\
b\\
\end{bmatrix}

=
\begin{bmatrix}
0\\
0\\
\end{bmatrix}$$