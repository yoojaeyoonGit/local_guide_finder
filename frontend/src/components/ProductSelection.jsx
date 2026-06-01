import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductSelection.css';

const ProductSelection = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: '베이징 관광 패키지',
      location: '중국 베이징',
      date: '2026.07.15',
      price: '$53',
      views: 234,
      hearts: 12,
      rating: 4.8, // 평점 데이터 추가
      img: 'https://picsum.photos/200'
    },
    {
      id: 2,
      title: '도쿄 도심 투어',
      location: '일본 도쿄',
      date: '2026.08.01',
      price: '$60',
      views: 150,
      hearts: 8,
      rating: 4.5, // 평점 데이터 추가
      img: 'https://picsum.photos/200'
    },
    {
      id: 3,
      title: '방콕 야시장 투어',
      location: '태국 방콕',
      date: '2026.07.20',
      price: '$35',
      views: 410,
      hearts: 25,
      rating: 4.9, // 평점 데이터 추가
      img: 'https://picsum.photos/200'
    }
  ];

  return (
    <div className="selection-container">
      {/* 상단 헤더 섹션 */}
      <div className="selection-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <div className="search-bar-wrapper">
          <input 
            type="text" 
            placeholder="검색어를 입력해주세요." 
            className="search-input-field"
            readOnly
          />
          <button className="search-icon-btn">🔍</button>
        </div>
      </div>

      {/* 상품 리스트 그리드 */}
      <div className="product-list-grid">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card-item" 
            onClick={() => navigate('/chat')}
          >
            <div className="card-img-wrapper">
              <img src={product.img} alt={product.title} />
            </div>
            <div className="card-content-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-meta">내용 간략 설명...</p>
              <p className="product-meta">{product.location} / {product.date}</p>
              
              {/* 평점 표시 영역 추가 */}
              <div className="product-rating">
                <span className="star-icon">☆</span>
                <span className="rating-score">{product.rating}</span>
              </div>

              <div className="card-footer-row">
                <span className="product-price-tag">{product.price}</span>
                <div className="product-stats-icons">
                  <span>👁 {product.views}</span>
                  <span>♡ {product.hearts}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelection;