import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductSelection.css';
import { apiFetch } from '../api/client';

const ProductSelection = () => {
  const navigate = useNavigate();




  const [boardData, setBoardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchBoard = async () => {
      try {
        const response = await apiFetch('/api/v1/guides/products/');
        
        const jsonData = await response.json();
        console.log(jsonData);

  
        setBoardData(jsonData);
        setIsLoading(false);
  
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchBoard();
    }, []);
  
    if (isLoading) {
      return <div className="loading">로딩 중...</div>;
    }
  
    if (!boardData) {
      return <div className="error">게시글을 불러올 수 없습니다.</div>;
    }

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
        {boardData.map((product) => (
          <div 
            key={product.id} 
            className="product-card-item" 
            onClick={() => navigate(`/package-edit2/${product.id}`)}
          >
            <div className="card-img-wrapper">
              <img src={product.thumbnail_url} alt={product.title} />
            </div>
            <div className="card-content-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-meta">내용 간략 설명...</p>
              <p className="product-meta">{product.country} / {product.country}</p>
              
              {/* 평점 표시 영역 추가 */}
              <div className="product-rating">
                <span className="star-icon">☆</span>
                <span className="rating-score">{product.average_rating}</span>
              </div>

              <div className="card-footer-row">
                <span className="product-price-tag">{product.price}</span>
                <div className="product-stats-icons">
                  
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