import React, { useState, useRef } from "react"

export function AudioPermissionModal({ isOpen, onClose }) {
  const audioRef = useRef(null)

  const handleUserConsent = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://megasimages3.s3.ap-northeast-2.amazonaws.com/chickSound.wav")
    }
    audioRef.current
      .play()
      .then(() => {
        audioRef.current.pause()
        onClose(true) // 사용자가 동의함을 부모 컴포넌트에 알림
      })
      .catch((error) => {
        console.error("Error playing the audio:", error)
        onClose(false) // 오류 발생 시 처리
      })
  }

  if (!isOpen) return null // 모달이 열리지 않았으면 아무것도 렌더링하지 않음

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h2>알림 기능 활성화</h2>
      <p>알림 소리를 재생하기 위해 권한이 필요합니다. 계속하시겠습니까?</p>
      <button onClick={handleUserConsent}>예</button>
      <button onClick={() => onClose(false)}>아니요</button>
    </div>
  )
}
