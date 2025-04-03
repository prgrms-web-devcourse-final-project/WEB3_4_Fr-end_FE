'use client';

import { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  useEffect(() => {
    if (!window.kakao) {
      console.error('Kakao map SDK is not loaded');
      return;
    }
    window.kakao.maps.load(() => {
      console.log('Kakao Maps SDK Loaded');
    });
  }, []);

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.9780 }}
      style={{ width: '100%', height: '400px' }}
      level={3}
    >
      <MapMarker position={{ lat: 37.5665, lng: 126.9780 }}>
        <div style={{ padding: '5px', color: '#000' }}>
          서울입니다!
        </div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;
