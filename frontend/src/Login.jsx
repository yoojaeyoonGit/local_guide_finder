import './Login.css'

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>로그인</h1>
        <p>계정에 로그인 하세요</p>

        <input
          type="email"
          placeholder="이메일"
        />

        <input
          type="password"
          placeholder="비밀번호"
        />

        <button>로그인</button>

        <div className="signup-text">
          계정이 없으신가요? <span>회원가입</span>
        </div>
      </div>
    </div>
  )
}

export default Login