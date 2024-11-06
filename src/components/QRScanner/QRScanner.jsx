// src/components/QrScanner.jsx
import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const QrScanner = () => {
    const qrCodeRef = useRef(null);
    const navigate = useNavigate();
    const isScanned = useRef(false); // 이미 스캔이 완료되었는지 상태 관리

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("qr-reader");

        const config = {
            fps: 0.5,
            qrbox: { width: 250, height: 250 },
        };

        html5QrCode.start(
            { facingMode: "environment" },
            config,
            async (decodedText) => {
                if (isScanned.current) return; // 이미 스캔된 경우 중단
                isScanned.current = true; // 스캔 상태 업데이트
                
                console.log(`QR Code detected: ${decodedText}`);
                
                try {
                    const url = new URL(decodedText); // 유효한 URL인지 확인
                    await html5QrCode.stop(); // QR 스캐너 중단
                    window.location.href = url; // URL로 이동
                } catch (error) {
                    console.error("Invalid URL scanned: ", error);
                    isScanned.current = false; // 실패 시 다시 스캔 가능하도록 상태 초기화
                }
            },
            (errorMessage) => {
                console.log(`QR Code scan error: ${errorMessage}`);
            }
        ).catch(err => {
            console.error(`Error starting QR Code scanner: ${err}`);
        });

        return () => {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
            }).catch(err => {
                console.error(`Error stopping QR Code scanner: ${err}`);
            });
        };
    }, [navigate]);

    return (
        <div>
        
            <div id="qr-reader" ref={qrCodeRef} style={{ width: "100%" }}></div>
        </div>
    );
};

export default QrScanner;
