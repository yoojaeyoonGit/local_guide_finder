import React, { useState, useEffect } from 'react';
import './PackageEdit2.css'
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from './api/client';

function PackageEdit2() {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const [boardData, setBoardData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
    
      const fetchBoard = async () => {
        try {
          const response = await apiFetch(`/api/v1/guides/products/${id}/`);
          
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
        return <div className="error">페이지를 불러올 수 없습니다.</div>;
      }


  
  return (
    <div className="page">

      <div className="top-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1>{boardData.title}</h1>
      </div>

      <div className="package-box">

        <div className="image-list">
          {boardData.images?.map((img) => (
    <img 
      key={img.id} 
      src={img.image_url} 
      alt={`product-image-${img.id}`} 
        />
        ))}
        </div>

        <div className="info-box">
          <span>제목</span>
          <p> {boardData.title} </p>
        </div>

        <div className="info-box">
          <span>일정</span>
          <p> {boardData.travel_start_date} / {boardData.travel_end_date} </p>
        </div>

        <div className="info-box">
          <span>상태</span>
          <p> {boardData.is_active ? "신청 가능" : "신청 불가능"} </p>
        </div>

        <div className="info-box">
          <span>제한인원</span>
          <input value="25" />
        </div>

        <div className="content-box">
          <h3>내용</h3>

          <p> {boardData.description} </p>
        </div>

        <button
  className="Apply"
  onClick={() => navigate("/pay")}
>
  신청하기
</button>

      </div>

    </div>
  )
}

export default PackageEdit2
