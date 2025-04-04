'use client';

import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';


interface SearchResult {
  place_name: string;
  category_name: string;
  address_name: string;
  x: number;
  y: number;
}

interface KakaoPlace {
  place_name: string;
  category_group_name: string;
  address_name: string;
  x: string;
  y: string;
}

type KakaoStatus = typeof window.kakao.maps.services.Status[keyof typeof window.kakao.maps.services.Status];

const PlanMap = () => {
  const [placeName, setPlaceName] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        console.log('Kakao Maps SDK Loaded');
        setIsLoaded(true);
      });
    } else {
      console.error('Kakao Maps SDK is not loaded');
    }
  }, []);

  // 장소 이름으로 장소 검색
  const handleSearch = () => {
    if (!isLoaded || !window.kakao || !window.kakao.maps.services) {
      console.error('Kakao Maps 서비스 라이브러리가 로드되지 않았습니다.');
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    // 장소 이름을 이용한 키워드 검색
    ps.keywordSearch(placeName, (data: KakaoPlace[], status: KakaoStatus) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log('키워드 검색 결과:', data);
        if (data.length > 0) {
          const place = data[0];
          setSearchResult({
            place_name: place.place_name,
            category_name: place.category_group_name,
            address_name: place.address_name,
            x: parseFloat(place.x), // 문자열을 숫자로 변환
            y: parseFloat(place.y), // 문자열을 숫자로 변환
          });
          console.log('장소 이름:', place.place_name);
          console.log('카테고리:', place.category_group_name);
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        console.error('검색 결과가 없습니다.');
        setSearchResult(null);
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        console.error('검색 중 오류가 발생했습니다.');
        setSearchResult(null);
      } else {
        console.error('알 수 없는 오류:', status);
        setSearchResult(null);
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="장소 이름을 입력하세요"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '5px' }}>
        검색
      </button>
      <Map
        center={{
          lat: searchResult ? searchResult.y : 37.5665,
          lng: searchResult ? searchResult.x : 126.9780,
        }}
        style={{ width: '100%', height: '400px', marginTop: '10px' }}
        level={3}
      >
        {searchResult && (
          <MapMarker position={{ lat: searchResult.y, lng: searchResult.x }}>
            <div style={{ padding: '5px', color: '#000' }}>
              {searchResult.place_name} - {searchResult.category_name}
            </div>
          </MapMarker>
        )}
      </Map>
    </div>
  );
};

export default PlanMap;
