import React from 'react'

export const TennisBall: React.FC<{ className?: string }> = ({ className = 'size-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Lingkaran bola tenis */}
    <circle cx="12" cy="12" r="9.5" />
    {/* Garis lengkung jahitan bola tenis sisi kiri */}
    <path d="M5.3 4.2a9.5 9.5 0 0 1 0 15.6" />
    {/* Garis lengkung jahitan bola tenis sisi kanan */}
    <path d="M18.7 4.2a9.5 9.5 0 0 0 0 15.6" />
  </svg>
)

export default TennisBall
