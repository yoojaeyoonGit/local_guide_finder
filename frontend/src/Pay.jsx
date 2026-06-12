import './Pay.css'
import { useNavigate } from "react-router-dom";

function Pay() {
  const navigate = useNavigate();

  return (
    <div className="payment-page">

      <h1>
        베이징 관광 패키지를
        <br /><br />
        결제 하시겠습니까?
      </h1>

      <div className="price">
        25$
      </div>

      <div className="button-group">
        <button
          className="pay-btn"
          onClick={() => {
            const ok = window.confirm("결제되었습니다.");
            if (ok) {
              navigate("/package-edit3");
            }
          }}
        >
          결제하기
        </button>

        <button
          className="cancel-btn"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </div>

    </div>
  )
}

export default Pay