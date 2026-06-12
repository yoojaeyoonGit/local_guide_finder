import './Refund.css'
import { useNavigate } from "react-router-dom";

function Refund() {
  const navigate = useNavigate();

  return (
    <div className="payment-page">

      <h1>
        베이징 관광 패키지를
        <br /><br />
        환불 하시겠습니까?
      </h1>

      <div className="price">
        25$
      </div>

      <div className="button-group">
        <button
  className="refund-btn"
  onClick={() => {
    const ok = window.confirm("환불되었습니다.");
    if (ok) {
      navigate("/package-edit2");
    }
  }}
>
  환불하기
</button>

        <button
          className="cancel-btn"
          onClick={() => navigate("/package-edit3")}
        >
          취소
        </button>
      </div>

    </div>
  )
}

export default Refund