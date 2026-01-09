// script.js - Babu88 Gaming Platform Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('Babu88 Platform Loaded Successfully!');
    
    // ১. ডাউনলোড বাটন ক্লিক ইভেন্ট
    const downloadBtn = document.querySelector('.download-btn');
    if(downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            showNotification('অ্যাপ ডাউনলোড শুরু হচ্ছে... ৩ সেকেন্ডের মধ্যে শুরু হবে!', 'success');
            simulateDownload();
        });
    }
    
    // ২. নেভিগেশন মেনু ইন্টারেক্টিভিটি
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Active স্টেট আপডেট
            navIcons.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const menuText = this.textContent.trim();
            showNotification(`${menuText} বিভাগে যাচ্ছেন...`, 'info');
            
            // সিমুলেটেড লোডিং
            simulateLoading(menuText);
        });
    });
    
    // ৩. প্রোমো আইটেম হোভার ইফেক্ট
    const promoItems = document.querySelectorAll('.promo-item');
    promoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const percentage = this.querySelector('span')?.textContent || '0%';
            const category = this.textContent.replace(percentage, '').trim();
            
            // টুলটিপ তৈরি
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `${category} গেমে ${percentage} ক্যাশব্যাক পান`;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.9);
                color: #ffd700;
                padding: 10px;
                border-radius: 5px;
                font-size: 14px;
                z-index: 1000;
                white-space: nowrap;
                pointer-events: none;
                transform: translateY(-100%);
                border: 1px solid #ffd700;
            `;
            
            this.appendChild(tooltip);
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if(tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // ৪. জ্যাকপট নম্বর কাউন্টার অ্যানিমেশন
    const jackpotNumbers = document.querySelectorAll('.jackpot-item div');
    jackpotNumbers.forEach(numberElement => {
        const originalValue = parseFloat(numberElement.textContent.replace(/,/g, ''));
        animateJackpotNumber(numberElement, originalValue);
    });
    
    // ৫. নিচের বাটন ইভেন্ট
    const registerBtn = document.querySelector('.yellow-btn');
    const loginBtn = document.querySelector('.blue-btn');
    
    if(registerBtn) {
        registerBtn.addEventListener('click', function() {
            showNotification('রেজিস্ট্রেশন পেজে রিডাইরেক্ট করা হচ্ছে...', 'success');
            
            // রেজিস্ট্রেশন মডাল শো
            setTimeout(() => {
                showRegistrationModal();
            }, 1000);
        });
    }
    
    if(loginBtn) {
        loginBtn.addEventListener('click', function() {
            showNotification('লগইন পেজে রিডাইরেক্ট করা হচ্ছে...', 'info');
            
            // লগইন মডাল শো
            setTimeout(() => {
                showLoginModal();
            }, 1000);
        });
    }
    
    // ৬. রিয়েল-টাইম টাইমার
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
    
    // ৭. অটোমেটিক নোটিফিকেশন
    setTimeout(() => {
        showRandomNotification();
    }, 5000);
    
    // ৮. স্ক্রল ইফেক্ট
    window.addEventListener('scroll', handleScrollEffects);
    
    // ৯. কীবোর্ড শর্টকাট
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // ১০. টাচ সোয়াইপ জেসচার (মোবাইলের জন্য)
    initializeTouchGestures();
});

// ==================== ফাংশন ডেফিনিশন ====================

/**
 * নোটিফিকেশন দেখানো
 */
function showNotification(message, type = 'info') {
    // বিদ্যমান নোটিফিকেশন মুছে ফেলা
    const existingNotification = document.querySelector('.custom-notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // নতুন নোটিফিকেশন তৈরি
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
            <span class="notification-close">&times;</span>
        </div>
    `;
    
    // স্টাইল অ্যাপ্লাই
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        min-width: 300px;
        max-width: 400px;
        border-left: 5px solid ${getNotificationBorderColor(type)};
        animation: slideIn 0.5s ease, fadeOut 0.5s ease 4.5s forwards;
    `;
    
    document.body.appendChild(notification);
    
    // ক্লোজ বাটন ইভেন্ট
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // অটোমেটিক রিমুভ
    setTimeout(() => {
        if(document.body.contains(notification)) {
            notification.remove();
        }
    }, 5000);
}

/**
 * নোটিফিকেশনের জন্য আইকন
 */
function getNotificationIcon(type) {
    const icons = {
        'success': '✓',
        'info': 'ℹ',
        'warning': '⚠',
        'error': '✗'
    };
    return icons[type] || 'ℹ';
}

/**
 * নোটিফিকেশনের জন্য কালার
 */
function getNotificationColor(type) {
    const colors = {
        'success': 'linear-gradient(135deg, #4CAF50, #2E7D32)',
        'info': 'linear-gradient(135deg, #2196F3, #0D47A1)',
        'warning': 'linear-gradient(135deg, #FF9800, #EF6C00)',
        'error': 'linear-gradient(135deg, #F44336, #C62828)'
    };
    return colors[type] || 'linear-gradient(135deg, #2196F3, #0D47A1)';
}

/**
 * নোটিফিকেশনের বর্ডার কালার
 */
function getNotificationBorderColor(type) {
    const colors = {
        'success': '#2E7D32',
        'info': '#0D47A1',
        'warning': '#EF6C00',
        'error': '#C62828'
    };
    return colors[type] || '#0D47A1';
}

/**
 * ডাউনলোড সিমুলেশন
 */
function simulateDownload() {
    const progressBar = document.createElement('div');
    progressBar.className = 'download-progress';
    progressBar.innerHTML = `
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-text">0%</div>
        </div>
    `;
    
    progressBar.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.9);
        padding: 30px;
        border-radius: 15px;
        border: 3px solid #ffd700;
        z-index: 10001;
        min-width: 300px;
        text-align: center;
        color: white;
    `;
    
    document.body.appendChild(progressBar);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if(progress > 100) progress = 100;
        
        const progressFill = progressBar.querySelector('.progress-fill');
        const progressText = progressBar.querySelector('.progress-text');
        
        if(progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            
            if(progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.remove();
                    showNotification('অ্যাপ ডাউনলোড সম্পূর্ণ! ইন্সটলেশন শুরু করুন।', 'success');
                }, 500);
            }
        }
    }, 300);
}

/**
 * লোডিং সিমুলেশন
 */
function simulateLoading(section) {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">${section} লোড হচ্ছে...</div>
    `;
    
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10002;
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // ২ সেকেন্ড পর লোডিং হাইড
    setTimeout(() => {
        loadingOverlay.remove();
        showNotification(`${section} সফলভাবে লোড হয়েছে!`, 'success');
    }, 2000);
}

/**
 * জ্যাকপট নম্বর অ্যানিমেশন
 */
function animateJackpotNumber(element, targetValue) {
    let currentValue = 0;
    const increment = targetValue / 100;
    const duration = 2000; // ২ সেকেন্ড
    const interval = duration / 100;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if(currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        // ফরম্যাট নম্বর
        element.textContent = currentValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }, interval);
}

/**
 * রেজিস্ট্রেশন মডাল
 */
function showRegistrationModal() {
    const modal = document.createElement('div');
    modal.className = 'registration-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>নতুন অ্যাকাউন্ট তৈরি করুন</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <form id="registration-form">
                    <input type="text" placeholder="নাম" required>
                    <input type="email" placeholder="ইমেইল" required>
                    <input type="password" placeholder="পাসওয়ার্ড" required>
                    <input type="tel" placeholder="মোবাইল নম্বর" required>
                    <button type="submit" class="submit-btn">রেজিস্টার করুন</button>
                </form>
                <p class="terms">রেজিস্ট্রেশন করে আপনি আমাদের <a href="#">শর্তাবলী</a> মেনে নিচ্ছেন</p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10003;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
        color: #333;
    `;
    
    document.body.appendChild(modal);
    
    // ক্লোজ বাটন
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // ফর্ম সাবমিট
    const form = modal.querySelector('#registration-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('রেজিস্ট্রেশন সফল! স্বাগতম।', 'success');
        modal.remove();
    });
    
    // মডাল বাইরে ক্লিক করলে ক্লোজ
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * লগইন মডাল
 */
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>লগইন করুন</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <form id="login-form">
                    <input type="text" placeholder="ইউজারনেম / ইমেইল" required>
                    <input type="password" placeholder="পাসওয়ার্ড" required>
                    <button type="submit" class="submit-btn">লগইন</button>
                </form>
                <p class="forgot-password"><a href="#">পাসওয়ার্ড ভুলে গেছেন?</a></p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10003;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 350px;
        width: 90%;
        color: #333;
    `;
    
    document.body.appendChild(modal);
    
    // ক্লোজ বাটন
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // ফর্ম সাবমিট
    const form = modal.querySelector('#login-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('লগইন সফল! স্বাগতম।', 'success');
        modal.remove();
    });
    
    // মডাল বাইরে ক্লিক করলে ক্লোজ
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * রিয়েল-টাইম টাইমার আপডেট
 */
function updateLiveTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('bn-BD');
    
    // যদি টাইমার ডিসপ্লে এলিমেন্ট না থাকে তবে তৈরি করুন
    let timerDisplay = document.querySelector('.live-timer');
    if(!timerDisplay) {
        timerDisplay = document.createElement('div');
        timerDisplay.className = 'live-timer';
        timerDisplay.style.cssText = `
            position: fixed;
            top: 120px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: #ffd700;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 999;
            border: 1px solid #ffd700;
        `;
        document.body.appendChild(timerDisplay);
    }
    
    timerDisplay.innerHTML = `
        <span>⏰</span>
        <span>${timeString}</span>
    `;
}

/**
 * র্যান্ডম নোটিফিকেশন
 */
function showRandomNotification() {
    const notifications = [
        "🎰 নতুন স্লট গেম যোগ হয়েছে! এখনই চেষ্টা করুন",
        "🎁 আজকের বিশেষ অফার: ১০০% ডিপোজিট বোনাস",
        "🔥 জ্যাকপট এখন ৳১৫০,০০০ ছাড়িয়েছে!",
        "⭐ ৫ টা ডিপোজিট করলে ফ্রি স্পিন পান",
        "🏆 শীর্ষ খেলোয়াড় প্রতিযোগিতা শুরু হয়েছে",
        "💰 উইকএন্ড ক্যাশব্যাক: সর্বোচ্চ ৳৫,০০০"
    ];
    
    const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
    showNotification(randomNotif, 'info');
    
    // পরবর্তী নোটিফিকেশনের জন্য র্যান্ডম টাইম সেট
    const nextTime = Math.random() * 30000 + 30000; // ৩০-৬০ সেকেন্ড পর
    setTimeout(showRandomNotification, nextTime);
}

/**
 * স্ক্রল ইফেক্ট হ্যান্ডলার
 */
function handleScrollEffects() {
    const scrollY = window.scrollY;
    
    // হেডার ট্রান্সপারেন্সি
    const header = document.querySelector('header');
    if(header) {
        if(scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
    }
    
    // প্যারালাক্স ইফেক্ট
    const mainBanner = document.querySelector('.main-banner');
    if(mainBanner) {
        const scrolled = scrollY * 0.5;
        mainBanner.style.backgroundPositionY = `${scrolled}px`;
    }
    
    // স্ক্রল টু টপ বাটন
    showScrollToTopButton(scrollY);
}

/**
 * স্ক্রল টু টপ বাটন
 */
function showScrollToTopButton(scrollY) {
    let scrollBtn = document.querySelector('.scroll-to-top');
    
    if(scrollY > 500) {
        if(!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '↑';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: #ffd700;
                color: black;
                border: none;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                z-index: 999;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                transition: all 0.3s;
            `;
            
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            document.body.appendChild(scrollBtn);
        }
    } else if(scrollBtn) {
        scrollBtn.remove();
    }
}

/**
 * কীবোর্ড শর্টকাট
 */
function handleKeyboardShortcuts(e) {
    // Ctrl+D = ডাউনলোড বাটন
    if(e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        const downloadBtn = document.querySelector('.download-btn');
        if(downloadBtn) downloadBtn.click();
    }
    
    // Ctrl+R = রেজিস্ট্রেশন
    if(e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        const registerBtn = document.querySelector('.yellow-btn');
        if(registerBtn) registerBtn.click();
    }
    
    // Ctrl+L = লগইন
    if(e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        const loginBtn = document.querySelector('.blue-btn');
        if(loginBtn) loginBtn.click();
    }
    
    // Escape = সব মডাল ক্লোজ
    if(e.key === 'Escape') {
        const modals = document.querySelectorAll('.registration-modal, .login-modal');
        modals.forEach(modal => modal.remove());
    }
}

/**
 * টাচ জেসচার ইনিশিয়ালাইজেশন
 */
function initializeTouchGestures() {
    let startX, startY;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if(!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // সোয়াইপ ডিটেক্ট
        if(Math.abs(diffX) > Math.abs(diffY)) {
            // হরিজন্টাল সোয়াইপ
            if(diffX > 50) {
                // বাম দিকে সোয়াইপ = পরবর্তী মেনু
                navigateNextMenu();
            } else if(diffX < -50) {
                // ডান দিকে সোয়াইপ = পূর্ববর্তী মেনু
                navigatePrevMenu();
            }
        }
        
        startX = null;
        startY = null;
    });
}

/**
 * পরবর্তী মেনুতে নেভিগেট
 */
function navigateNextMenu() {
    const navIcons = document.querySelectorAll('.nav-icon');
    const currentActive = document.querySelector('.nav-icon.active');
    let nextIndex = 0;
    
    if(currentActive) {
        const currentIndex = Array.from(navIcons).indexOf(currentActive);
        nextIndex = (currentIndex + 1) % navIcons.length;
    }
    
    navIcons.forEach(icon => icon.classList.remove('active'));
    navIcons[nextIndex].classList.add('active');
    
    const menuName = navIcons[nextIndex].textContent.trim();
    showNotification(`${menuName} মেনু নির্বাচিত`, 'info');
}

/**
 * পূর্ববর্তী মেনুতে নেভিগেট
 */
function navigatePrevMenu() {
    const navIcons = document.querySelectorAll('.nav-icon');
    const currentActive = document.querySelector('.nav-icon.active');
    let prevIndex = navIcons.length - 1;
    
    if(currentActive) {
        const currentIndex = Array.from(navIcons).indexOf(currentActive);
        prevIndex = (currentIndex - 1 + navIcons.length) % navIcons.length;
    }
    
    navIcons.forEach(icon => icon.classList.remove('active'));
    navIcons[prevIndex].classList.add('active');
    
    const menuName = navIcons[prevIndex].textContent.trim();
    showNotification(`${menuName} মেনু নির্বাচিত`, 'info');
}

// CSS অ্যানিমেশন স্টাইল ডাইনামিক্যালি অ্যাড
const styleElement = document.createElement('style');
styleElement.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .download-progress .progress-container {
        margin: 15px 0;
    }
    
    .download-progress .progress-bar {
        width: 100%;
        height: 20px;
        background: #333;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    .download-progress .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #ffd700, #ffed4e);
        width: 0%;
        transition: width 0.3s;
    }
    
    .loading-overlay .loading-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #333;
        border-top: 5px solid #ffd700;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 2px solid #ffd700;
        padding-bottom: 10px;
    }
    
    .close-modal {
        font-size: 28px;
        cursor: pointer;
        color: #ff0000;
    }
    
    .modal-body input {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
    }
    
    .submit-btn {
        width: 100%;
        padding: 15px;
        background: #ffd700;
        color: black;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 15px;
    }
    
    .terms, .forgot-password {
        margin-top: 15px;
        font-size: 14px;
        text-align: center;
    }
    
    .terms a, .forgot-password a {
        color: #ffd700;
        text-decoration: none;
    }
    
    .nav-icon.active {
        background: rgba(255, 215, 0, 0.2);
        color: #ffd700 !important;
    }
    
    .nav-icon.active::before {
        background: #ffd700 !important;
        box-shadow: 0 0 20px #ffd700 !important;
    }
`;

document.head.appendChild(styleElement);