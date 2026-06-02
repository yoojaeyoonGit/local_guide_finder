import './Pay.css'

function Pay() {
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
        <button className="pay-btn">
          결제하기
        </button>

        <button className="cancel-btn">
          취소
        </button>
      </div>

    </div>
  )
}

export default Pay