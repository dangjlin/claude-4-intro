// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarEffects();
    initButtonEffects();
    initTypingAnimation();
    initParallaxEffects();
});

// 平滑滾動功能
function initSmoothScrolling() {
    // 為所有內部連結添加平滑滾動
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考慮導航欄高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滾動動畫效果
function initScrollAnimations() {
    // 創建 Intersection Observer 來監控元素進入視窗
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // 只執行一次動畫
            }
        });
    }, observerOptions);
    
    // 監控需要動畫的元素
    const animatedElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .section-title, .hero-title, .hero-subtitle'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 導航欄效果
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // 根據滾動方向顯示/隱藏導航欄
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // 根據滾動位置調整導航欄透明度
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 按鈕互動效果
function initButtonEffects() {
    // 為所有按鈕添加點擊波紋效果
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .pricing-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 創建波紋效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // 移除波紋效果
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 添加 CSS 樣式給波紋效果
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 打字動畫效果
function initTypingAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    // 為代碼行添加打字效果
    codeLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 500);
    });
}

// 打字效果函數
function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// 視差滾動效果
function initParallaxEffects() {
    const floatingCard = document.querySelector('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (floatingCard) {
            floatingCard.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// 數字計數動畫
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 模態框功能
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 關閉模態框
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // 添加模態框樣式
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-content {
                background: var(--background-tertiary);
                border-radius: var(--radius-xl);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--spacing-lg);
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: var(--font-size-2xl);
                cursor: pointer;
                color: var(--text-secondary);
            }
            
            .modal-body {
                padding: var(--spacing-lg);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

// 為按鈕添加點擊事件
document.addEventListener('click', function(e) {
    // 處理 "立即體驗" 按鈕
    if (e.target.textContent === '立即體驗' || e.target.textContent === '免費試用') {
        e.preventDefault();
        createModal(
            '開始使用 Claude 4',
            `
                <p>感謝您對 Claude 4 的興趣！</p>
                <p>您可以通過以下方式開始使用：</p>
                <ul style="margin: var(--spacing-lg) 0; padding-left: var(--spacing-lg);">
                    <li>訪問 <a href="https://claude.ai" target="_blank" style="color: var(--primary-blue);">claude.ai</a> 開始免費試用</li>
                    <li>查看 <a href="https://docs.anthropic.com" target="_blank" style="color: var(--primary-blue);">API 文檔</a> 了解開發者選項</li>
                    <li>聯繫我們的銷售團隊了解企業方案</li>
                </ul>
            `
        );
    }
    
    // 處理 "了解更多" 按鈕
    if (e.target.textContent === '了解更多' || e.target.textContent === '查看文檔') {
        e.preventDefault();
        createModal(
            'Claude 4 詳細資訊',
            `
                <h4>技術規格</h4>
                <ul style="margin: var(--spacing-md) 0; padding-left: var(--spacing-lg);">
                    <li>200K 上下文視窗</li>
                    <li>支援多模態輸入（文字、圖像）</li>
                    <li>延伸思考模式</li>
                    <li>工具整合能力</li>
                    <li>增強記憶功能</li>
                </ul>
                
                <h4>應用場景</h4>
                <ul style="margin: var(--spacing-md) 0; padding-left: var(--spacing-lg);">
                    <li>軟體開發與編程</li>
                    <li>數據分析與研究</li>
                    <li>內容創作與編輯</li>
                    <li>客戶服務自動化</li>
                    <li>教育與培訓</li>
                </ul>
            `
        );
    }
});

// 鍵盤快捷鍵支援
document.addEventListener('keydown', function(e) {
    // ESC 鍵關閉模態框
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
});

// 性能優化：節流函數
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 使用節流優化滾動事件
window.addEventListener('scroll', throttle(() => {
    // 滾動相關的性能敏感操作
}, 16)); // 約 60fps

// 載入完成後的初始化
window.addEventListener('load', function() {
    // 移除載入動畫
    document.body.classList.remove('loading');
    
    // 添加載入完成的類別
    document.body.classList.add('loaded');
});

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('發生錯誤:', e.error);
});

// 導出功能供其他腳本使用
window.ClaudeApp = {
    createModal,
    animateCounter,
    typeText
};