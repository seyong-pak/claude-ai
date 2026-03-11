function svgToDataUrl(svg) {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
}

// 메인 팝업 배너 1 (오렌지-레드)
const popup1Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B6B"/>
      <stop offset="100%" stop-color="#FF8E53"/>
    </linearGradient>
  </defs>
  <rect width="480" height="300" fill="url(#g)"/>
  <rect x="32" y="32" width="416" height="236" rx="8" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <text x="240" y="108" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="rgba(255,255,255,0.75)" text-anchor="middle" letter-spacing="4">POPUP BANNER 1</text>
  <text x="240" y="158" font-family="Arial,sans-serif" font-size="38" font-weight="bold" fill="white" text-anchor="middle">팝업 배너 1</text>
  <text x="240" y="196" font-family="Arial,sans-serif" font-size="15" fill="rgba(255,255,255,0.8)" text-anchor="middle">2026.03.01 ~ 2026.03.15</text>
  <rect x="160" y="222" width="160" height="36" rx="18" fill="rgba(255,255,255,0.22)"/>
  <text x="240" y="245" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="white" text-anchor="middle">자세히 보기</text>
</svg>`

// 메인 팝업 배너 2 (보라-인디고)
const popup2Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#4338CA"/>
    </linearGradient>
  </defs>
  <rect width="480" height="300" fill="url(#g)"/>
  <circle cx="400" cy="60" r="120" fill="rgba(255,255,255,0.05)"/>
  <circle cx="80" cy="240" r="80" fill="rgba(255,255,255,0.05)"/>
  <rect x="32" y="32" width="416" height="236" rx="8" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <text x="240" y="108" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="rgba(255,255,255,0.7)" text-anchor="middle" letter-spacing="4">POPUP BANNER 2</text>
  <text x="240" y="158" font-family="Arial,sans-serif" font-size="38" font-weight="bold" fill="white" text-anchor="middle">팝업 배너 2</text>
  <text x="240" y="196" font-family="Arial,sans-serif" font-size="15" fill="rgba(255,255,255,0.8)" text-anchor="middle">2026.03.01 ~ 2026.03.15</text>
  <rect x="160" y="222" width="160" height="36" rx="18" fill="rgba(255,255,255,0.2)"/>
  <text x="240" y="245" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="white" text-anchor="middle">이벤트 참여하기</text>
</svg>`

// 메인 바텀 배너 1 (블루)
const bottom1Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1A73E8"/>
      <stop offset="100%" stop-color="#0D47A1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="200" fill="url(#g)"/>
  <circle cx="1050" cy="100" r="160" fill="rgba(255,255,255,0.04)"/>
  <circle cx="150" cy="20" r="120" fill="rgba(255,255,255,0.04)"/>
  <text x="600" y="76" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="rgba(255,255,255,0.6)" text-anchor="middle" letter-spacing="5">BOTTOM BANNER 1</text>
  <text x="600" y="120" font-family="Arial,sans-serif" font-size="34" font-weight="bold" fill="white" text-anchor="middle">바텀 배너 1 — 특별 프로모션</text>
  <text x="600" y="158" font-family="Arial,sans-serif" font-size="15" fill="rgba(255,255,255,0.75)" text-anchor="middle">2026.03.01 ~ 2026.03.15</text>
</svg>`

// 메인 바텀 배너 2 (청록)
const bottom2Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00897B"/>
      <stop offset="100%" stop-color="#00695C"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="200" fill="url(#g)"/>
  <circle cx="200" cy="100" r="180" fill="rgba(255,255,255,0.04)"/>
  <circle cx="1100" cy="150" r="120" fill="rgba(255,255,255,0.04)"/>
  <text x="600" y="76" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="rgba(255,255,255,0.6)" text-anchor="middle" letter-spacing="5">BOTTOM BANNER 2</text>
  <text x="600" y="120" font-family="Arial,sans-serif" font-size="34" font-weight="bold" fill="white" text-anchor="middle">바텀 배너 2 — 신규 서비스 안내</text>
  <text x="600" y="158" font-family="Arial,sans-serif" font-size="15" fill="rgba(255,255,255,0.75)" text-anchor="middle">2026.03.01 ~ 2026.03.15</text>
</svg>`

// 로그인 배너 1 (그린)
const login1Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="130">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00C853"/>
      <stop offset="100%" stop-color="#00897B"/>
    </linearGradient>
  </defs>
  <rect width="420" height="130" fill="url(#g)" rx="12"/>
  <circle cx="370" cy="20" r="80" fill="rgba(255,255,255,0.06)"/>
  <circle cx="50" cy="110" r="60" fill="rgba(255,255,255,0.06)"/>
  <text x="210" y="48" font-family="Arial,sans-serif" font-size="11" font-weight="600" fill="rgba(255,255,255,0.65)" text-anchor="middle" letter-spacing="4">LOGIN BANNER 1</text>
  <text x="210" y="82" font-family="Arial,sans-serif" font-size="26" font-weight="bold" fill="white" text-anchor="middle">로그인 배너 1</text>
  <text x="210" y="110" font-family="Arial,sans-serif" font-size="13" fill="rgba(255,255,255,0.8)" text-anchor="middle">2026.03.01 ~ 2026.03.15</text>
</svg>`

// 로그인 배너 2 (앰버-오렌지)
const login2Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="130">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFB300"/>
      <stop offset="100%" stop-color="#F4511E"/>
    </linearGradient>
  </defs>
  <rect width="420" height="130" fill="url(#g)" rx="12"/>
  <circle cx="50" cy="20" r="80" fill="rgba(255,255,255,0.06)"/>
  <circle cx="380" cy="120" r="70" fill="rgba(255,255,255,0.06)"/>
  <text x="210" y="48" font-family="Arial,sans-serif" font-size="11" font-weight="600" fill="rgba(255,255,255,0.65)" text-anchor="middle" letter-spacing="4">LOGIN BANNER 2</text>
  <text x="210" y="82" font-family="Arial,sans-serif" font-size="26" font-weight="bold" fill="white" text-anchor="middle">로그인 배너 2</text>
  <text x="210" y="110" font-family="Arial,sans-serif" font-size="13" fill="rgba(255,255,255,0.8)" text-anchor="middle">2026.03.01 ~ 2026.03.15</text>
</svg>`

export function seedBanners() {
  const data = {
    mainPopup: [
      { id: 1, image: svgToDataUrl(popup1Svg), imageName: 'popup-banner-1.svg', startDate: '2026-03-01', endDate: '2026-03-15' },
      { id: 2, image: svgToDataUrl(popup2Svg), imageName: 'popup-banner-2.svg', startDate: '2026-03-01', endDate: '2026-03-15' }
    ],
    mainBottom: [
      { id: 3, image: svgToDataUrl(bottom1Svg), imageName: 'bottom-banner-1.svg', startDate: '2026-03-01', endDate: '2026-03-15' },
      { id: 4, image: svgToDataUrl(bottom2Svg), imageName: 'bottom-banner-2.svg', startDate: '2026-03-01', endDate: '2026-03-15' }
    ],
    loginBanner: [
      { id: 5, image: svgToDataUrl(login1Svg), imageName: 'login-banner-1.svg', startDate: '2026-03-01', endDate: '2026-03-15' },
      { id: 6, image: svgToDataUrl(login2Svg), imageName: 'login-banner-2.svg', startDate: '2026-03-01', endDate: '2026-03-15' }
    ]
  }
  localStorage.setItem('app_banners', JSON.stringify(data))
}
