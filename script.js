/* --- f:\source\vibecording\vscode\script.js --- */
// --- 인터렉티브 기능 스크립트 ---
const card = document.querySelector('.profile-card');

// 1. 마우스 움직임에 따른 3D 틸트(기울기) 효과
document.addEventListener('mousemove', (e) => {
    // 화면 중앙을 기준으로 마우스 위치 계산
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    
    // 카드를 마우스 반대 방향으로 회전시켜 입체감 부여
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// 2. 이메일 버튼 클릭 시 주소 복사 기능
const emailBtn = document.querySelector('.btn-primary');
emailBtn.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 메일 앱 실행 방지 (필요시 제거 가능)
    const email = emailBtn.getAttribute('href').replace('mailto:', '');
    
    navigator.clipboard.writeText(email).then(() => {
        const originalHtml = emailBtn.innerHTML;
        emailBtn.innerHTML = '<i class="fa-solid fa-check"></i> 복사 완료!';
        emailBtn.style.backgroundColor = '#2ecc71'; // 성공 색상(녹색)으로 변경
        
        setTimeout(() => {
            emailBtn.innerHTML = originalHtml;
            emailBtn.style.backgroundColor = ''; // 원래 색상으로 복귀
        }, 2000);
    });
});

// 3. 다크 모드 전환 기능
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 4. 프로필 이미지 자동 변경 (슬라이드쇼)
const profileImg = document.querySelector('.profile-img');
const cardHeader = document.querySelector('.card-header');
const images = ['./image1.png', './image2.png', './image3.png']; 
const backgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',       // image1: 기존 보라/파랑
    'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', // image2: 짙은 청록/남색
    'linear-gradient(135deg, #141e30 0%, #243b55 100%)'        // image3: 차분한 다크 네이비
];
let currentIndex = 0;

setInterval(() => {
    profileImg.style.opacity = 0; // 1. 투명하게 만들기 (페이드 아웃)

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length; // 2. 이미지 주소 변경
        profileImg.src = images[currentIndex];
        cardHeader.style.background = backgrounds[currentIndex]; // 3. 배경색 변경
        profileImg.style.opacity = 1; // 3. 다시 보이게 만들기 (페이드 인)
    }, 500); // 0.5초(CSS transition 시간) 후에 실행
}, 7000); // 7000ms = 7초마다 변경
