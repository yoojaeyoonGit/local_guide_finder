import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // navigate 오류 방지용 추가
import './NewProduct.css'; 
import { apiFetch } from '../api/client';


const NewProduct = () => {
  const navigate = useNavigate();

  // 1. API 명세에 맞춘 state 구조 정의
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    category: '',
    country: '',
    city: '',
    price: '',
    travel_start_date: '',
    travel_end_date: '',
  });

  // 이미지 파일 객체들과 미리보기 URL을 관리할 state
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // 일반 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;


    

    const apiFetch = async (data, files) => {
    const formData = new FormData();

    // [핵심] 텍스트 데이터를 하나의 객체로 모은 뒤, JSON 문자열로 변환합니다.
    const requestDto = {
      title: data.title,
      description: data.description,
      category: data.category,
      country: data.country,
      city: data.city,
      price: data.price,
      // 값이 있을 때만 포함 (선택 사항)
      ...(data.travel_start_date && { travel_start_date: data.travel_start_date }),
      ...(data.travel_end_date && { travel_end_date: data.travel_end_date }),
    };

    // 백엔드 수신 스펙에 따라 아래 2가지 방식 중 하나를 선택하세요.
    
    // 방식 A: 일반적인 Spring Boot (@RequestPart) 환경인 경우 (Blob 객체로 감싸서 Content-Type 명시)
    const jsonBlob = new Blob([JSON.stringify(requestDto)], { type: 'application/json' });
    formData.append('request', jsonBlob); // 보통 'request'나 'data'라는 Key를 사용합니다.

    /* // 방식 B: Node.js나 단순히 문자열 그대로 파싱하는 백엔드인 경우 (주석 해제 후 사용)
    formData.append('request', JSON.stringify(requestDto));
    */

    // 이미지 배열 데이터 추가
    files.forEach((file) => {
      formData.append('images', file); 
    });

    // 전송할 API endpoint 설정
    const response = await apiFetch('/api/v1/guides/products/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`서버 에러: ${response.status}`);
    }

    return await response.json();
  };




    // 파일 객체 저장
    setImageFiles(files);

    // 화면 표시용 미리보기 URL 생성
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // FormData 생성 및 서버 전송 핸들러
  // FormData 생성 및 서버 전송 핸들러
const handleSave = async () => {
  // 필수값 검증
  if (!productData.title || !productData.description || !productData.category || !productData.country || !productData.city || !productData.price) {
    alert('필수 입력 항목(*)을 모두 채워주세요.');
    return;
  }

  // FormData 객체 생성
  const formData = new FormData();
  formData.append('title', productData.title);
  formData.append('description', productData.description);
  formData.append('category', productData.category);
  formData.append('country', productData.country);
  formData.append('city', productData.city);
  formData.append('price', productData.price);

  if (productData.travel_start_date) formData.append('travel_start_date', productData.travel_start_date);
  if (productData.travel_end_date) formData.append('travel_end_date', productData.travel_end_date);

  imageFiles.forEach((file) => {
    formData.append('images', file);
  });

  try {
    // 실제 API 요청
    const response = await apiFetch('/api/v1/guides/products/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`서버 에러: ${response.status}`);
    }

    const result = await response.json();
    console.log('서버 응답:', result);

    alert('업데이트가 저장되었습니다.');
    navigate(-1); // 저장 후 이전 페이지로 이동
  } catch (error) {
    console.error('업로드 실패:', error);
    alert('업로드 중 오류가 발생했습니다.');
  }
};


  return (
    <div className="new-product-container">
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>
      <h1 className="main-title">새 상품 페이지</h1>

      <div className="form-box">
        <div className="package-title-row">
          <span className="package-label">패키지 등록</span>
        </div>

        {/* 이미지 업로드 및 가로 갤러리 */}
        <div className="image-upload-section" style={{ marginBottom: '20px' }}>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageChange} 
            id="file-input"
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input" className="save-btn" style={{ cursor: 'pointer', padding: '8px 12px', display: 'inline-block' }}>
            이미지 선택 (다중 가능)
          </label>
        </div>

        <div className="image-gallery">
          {imagePreviews.length > 0 ? (
            imagePreviews.map((src, index) => (
              <div key={index} className="image-item">
                <img src={src} alt={`미리보기 ${index + 1}`} />
              </div>
            ))
          ) : (
            <p style={{ color: '#ccc', fontSize: '14px' }}>선택된 이미지가 없습니다.</p>
          )}
        </div>

        {/* 폼 입력 필드 세션 */}
        <div className="input-fields">
          <div className="input-row">
            <div className="field-label">제목 *</div>
            <div className="field-divider">|</div>
            <input 
              type="text" 
              name="title" 
              value={productData.title} 
              onChange={handleChange} 
              className="field-input"
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="input-row">
            <div className="field-label">시작일</div>
            <div className="field-divider">|</div>
            <input 
              type="date" 
              name="travel_start_date" 
              value={productData.travel_start_date} 
              onChange={handleChange} 
              className="field-input"
            />
          </div>

          <div className="input-row">
            <div className="field-label">종료일</div>
            <div className="field-divider">|</div>
            <input 
              type="date" 
              name="travel_end_date" 
              value={productData.travel_end_date} 
              onChange={handleChange} 
              className="field-input"
            />
          </div>

          <div className="input-row">
            <div className="field-label">가격 *</div>
            <div className="field-divider">|</div>
            <input 
              type="number" 
              step="0.01"
              name="price" 
              value={productData.price} 
              onChange={handleChange} 
              className="field-input"
              placeholder="0.00"
            />
          </div>

          <div className="input-row">
            <div className="field-label">카테고리 *</div>
            <div className="field-divider">|</div>
            <input 
              type="text" 
              name="category" 
              value={productData.category} 
              onChange={handleChange} 
              className="field-input"
            />
          </div>

          <div className="input-row">
            <div className="field-label">나라 *</div>
            <div className="field-divider">|</div>
            <input 
              type="text" 
              name="country" 
              value={productData.country} 
              onChange={handleChange} 
              className="field-input"
            />
          </div>

          <div className="input-row">
            <div className="field-label">도시 *</div>
            <div className="field-divider">|</div>
            <input 
              type="text" 
              name="city" 
              value={productData.city} 
              onChange={handleChange} 
              className="field-input"
            />
          </div>

          {/* 내용 입력 본문 */}
          <div className="textarea-section">
            <div className="textarea-label">내용 (설명) *</div>
            <textarea 
              name="description" 
              value={productData.description} 
              onChange={handleChange} 
              placeholder="내용을 입력하시오." 
              className="content-textarea"
            />
          </div>
        </div>

        {/* 하단 업데이트 저장 버튼 */}
        <div className="button-row">
          <button type="button" onClick={handleSave} className="save-btn">
            업데이트 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
