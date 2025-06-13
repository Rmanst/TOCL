// JavaScript for Transducer on Chip Limited website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Set up navigation
    setupNavigation();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Set up forms
    setupForms();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Set up interactive elements
    setupInteractiveElements();
    
    // Show home section by default
    showSection('home');
}

// Navigation Functions
function setupNavigation() {
    // Add click listeners to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                showSection(sectionId);
                updateActiveNavLink(this);
            }
        });
    });
    
    // Add click listeners to dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                showSection(sectionId);
                // Update main nav link
                const mainNavLink = this.closest('.dropdown').querySelector('.nav-link');
                updateActiveNavLink(mainNavLink);
            }
        });
    });
    
    // Add click listeners to footer links
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const sectionId = href.substring(1);
            showSection(sectionId);
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Update URL hash without jumping
    history.pushState(null, null, `#${sectionId}`);
    
    // Close mobile menu if open
    closeMobileMenu();

    // 強制補回 class 與樣式
    const qrImg = document.querySelector('img[src="sQRcode.png"]');
    if (qrImg) {
        qrImg.classList.add('qr-img');
        qrImg.style.width = '18vw';
        qrImg.style.maxWidth = '120px';
        qrImg.style.minWidth = '64px';
        qrImg.style.height = 'auto';
        qrImg.style.display = 'block';
    }
}


function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Mobile Menu Functions
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-wrapper')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Form Handling Functions
function setupForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
    }
    
    // Support form
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', handleSupportForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show success message
    showNotification('感謝您的諮詢！我們將在24小時內回覆您。', 'success');
    
    // Reset form
    e.target.reset();
}

function handleQuoteForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateQuoteForm(data)) {
        return;
    }
    
    // Show success message
    showNotification('詢價申請已提交！我們的銷售團隊將盡快與您聯繫。', 'success');
    
    // Reset form
    e.target.reset();
}

function handleSupportForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateSupportForm(data)) {
        return;
    }
    
    // Show success message
    showNotification('客訴申請已提交！我們將儘快處理您的問題。', 'success');
    
    // Reset form
    e.target.reset();
}

function validateContactForm(data) {
    if (!data.name || !data.phone || !data.email || !data.message || !data.inquiryType) {
        showNotification('請填寫所有必填欄位。', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('請輸入有效的電子郵件地址。', 'error');
        return false;
    }
    
    return true;
}

function validateQuoteForm(data) {
    if (!data.productCategory || !data.quantity || !data.application || !data.contactName || 
        !data.companyName || !data.contactPhone || !data.contactEmail) {
        showNotification('請填寫所有必填欄位。', 'error');
        return false;
    }
    
    if (!isValidEmail(data.contactEmail)) {
        showNotification('請輸入有效的電子郵件地址。', 'error');
        return false;
    }
    
    if (data.quantity < 1) {
        showNotification('數量必須大於0。', 'error');
        return false;
    }
    
    return true;
}

function validateSupportForm(data) {
    if (!data.issueType || !data.issueDescription || !data.contactName || 
        !data.contactPhone || !data.contactEmail) {
        showNotification('請填寫所有必填欄位。', 'error');
        return false;
    }
    
    if (!isValidEmail(data.contactEmail)) {
        showNotification('請輸入有效的電子郵件地址。', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
        ${getNotificationStyles(type)}
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
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
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationStyles(type) {
    switch (type) {
        case 'success':
            return 'background-color: #10b981; color: white;';
        case 'error':
            return 'background-color: #ef4444; color: white;';
        case 'warning':
            return 'background-color: #f59e0b; color: white;';
        default:
            return 'background-color: #3b82f6; color: white;';
    }
}

// Interactive Elements
function setupInteractiveElements() {
    // Set up category selection
    setupCategorySelection();
    // Add hover effects to process flow
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.substring(1);
            showSection(sectionId);
        } else {
            showSection('home');
        }
    });
    
    // Check initial hash on page load
    const initialHash = window.location.hash;
    if (initialHash) {
        const sectionId = initialHash.substring(1);
        showSection(sectionId);
    }
}

// Hero Section Functions
function showProductsOverview() {
    // Smooth scroll to products overview section
    const productsSection = document.querySelector('.products-overview');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showTechCore() {
    // Smooth scroll to process flow
    const processFlow = document.querySelector('.process-flow');
    if (processFlow) {
        processFlow.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function showAboutDetail() {
    // Show a detailed about section or modal
    showNotification('關於我們的詳細資訊即將推出，敬請期待！', 'info');
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Add scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--blue-main);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }, 100));
}

// Initialize scroll to top when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTop();
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize
    closeMobileMenu();
    
    // Adjust layouts if needed
    adjustLayoutsOnResize();
}, 250));

function adjustLayoutsOnResize() {
    // Any layout adjustments needed on window resize
    const processFlow = document.querySelector('.process-flow');
    if (processFlow && window.innerWidth < 768) {
        // Mobile adjustments if needed
    }
}

// Performance optimization: Lazy load images if any are added later
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Export functions for global access
window.showSection = showSection;
window.showProductsOverview = showProductsOverview;
window.showTechCore = showTechCore;
window.showAboutDetail = showAboutDetail;

// 產品分類選擇功能
function selectCategory(categoryId) {
    // 移除所有分類卡片的選中狀態
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.classList.remove('selected');
    });

    // 為當前選中的分類卡片添加選中狀態
    const selectedCard = document.querySelector(`.category-card[onclick="selectCategory('${categoryId}')"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }

    // 隱藏所有分類產品區域
    const categoryProducts = document.querySelectorAll('.category-products');
    categoryProducts.forEach(products => {
        products.classList.remove('active');
    });

    // 顯示對應的分類產品
    const targetProducts = document.getElementById(`products-${categoryId}`);
    if (targetProducts) {
        targetProducts.classList.add('active');
    } else {
        // 如果不存在對應的產品區域，則動態創建
        createCategoryProducts(categoryId);
    }

    // 滾動到產品區域
    setTimeout(() => {
        const productsSection = document.getElementById(`products-${categoryId}`);
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 200);

    // 顯示通知
    showNotification(`已選擇 ${getCategoryName(categoryId)} 分類`, 'success');
}

// 動態創建分類產品區域
function createCategoryProducts(categoryId) {
    const categoryData = getCategoryData(categoryId);
    if (!categoryData) return;

    // 創建產品區域HTML
    const productsHTML = `
        <div id="products-${categoryId}" class="category-products active">
            <h3>${categoryData.name}</h3>
            <div class="products-list">
                ${categoryData.products.map(product => `
                    <div class="product-item-simple" onclick="showProductDetails('${product.id}')">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <div class="product-specs">
                            ${product.specs ? product.specs.map(spec => `<span class="spec">${spec}</span>`).join('') : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 將產品區域插入到分類選擇區域之後
    const categoriesSection = document.querySelector('.product-categories-selection');
    if (categoriesSection) {
        categoriesSection.insertAdjacentHTML('afterend', productsHTML);
    }
}

// 獲取分類數據
function getCategoryData(categoryId) {
    const categories = {
        'meters': {
            name: '計量表 (Meters)',
            products: [
                { id: 'scale', name: '秤', description: '高精度電子秤，適用於各種稱重需求', specs: ['精度±0.1g', '最大載重5kg'] },
                { id: 'multimeter', name: '三用電表', description: '測量電壓、電流、電阻的多功能儀表', specs: ['DC/AC測量', '自動量程'] },
                { id: 'battery-tester', name: '電池表', description: '精確檢測電池電量和健康狀況', specs: ['支援多種電池', '數位顯示'] },
                { id: 'power-meter', name: '電能表', description: '智能電力計量，支持遠程監控', specs: ['智能監控', '遠程讀取'] },
                { id: 'flow-meter', name: '流體表', description: '精確測量液體流量，工業級可靠性', specs: ['工業級', '高精度'] },
                { id: 'gas-meter', name: '流氣表', description: '高精度氣體流量測量解決方案', specs: ['氣體測量', '高精度'] },
                { id: 'thermometer-ear', name: '耳溫槍', description: '快速準確的體溫測量設備', specs: ['1秒測溫', '醫療級'] },
                { id: 'blood-pressure', name: '血壓計', description: '專業級血壓監測設備', specs: ['全自動', '記憶功能'] },
                { id: 'glucose-meter', name: '血糖計', description: '精確的血糖檢測儀器', specs: ['快速檢測', '小血量'] }
            ]
        },
        'portable': {
            name: '手攜產品 (Portable Products)',
            products: [
                { id: 'battery-15v', name: '1.5V電池', description: 'C、D、AA、N、AAA、AAAA型號電池，長效耐用', specs: ['多種型號', '長效電力'] },
                { id: 'lithium-battery', name: '鋰電池', description: '高能量密度，適用於各種便攜設備', specs: ['高能量密度', '可充電'] },
                { id: 'power-box', name: '電源盒', description: '便攜式電源管理解決方案', specs: ['便攜式', '多接口'] }
            ]
        },
        'sensors': {
            name: '傳感器 (Sensors)',
            products: [
                { id: 'contact-thermometer', name: '接觸式溫度計', description: '高精度接觸式溫度傳感器，適用於各種工業和科研應用', specs: ['高精度', '工業級'] },
                { id: 'infrared-probe', name: '紅外線測溫頭', description: '非接觸式紅外線溫度感應器，安全便捷的測溫解決方案', specs: ['非接觸', '快速響應'] }
            ]
        },
        'memory': {
            name: '記憶體 (Memory)',
            products: [
                { id: 'eeprom', name: 'EEPROM', description: '電子抹除式可程式唯讀記憶體，提供可靠的非揮發性數據存儲', specs: ['非揮發性', '可程式'] }
            ]
        },
        'batteries': {
            name: '動力電池 (Power Batteries)',
            products: [
                { id: 'high-energy-battery', name: '高能量密度電池組', description: '先進鋰離子技術，提供卓越的能量密度和續航表現', specs: ['高能量密度', '長續航'] },
                { id: 'high-power-battery', name: '高功率輸出電池組', description: '專為高功率應用設計，提供強勁的瞬間功率輸出', specs: ['高功率輸出', '快充支援'] }
            ]
        },
        'Other': {
            name: '其他 (Other)',
            products: [
                { id: 'Other-1', name: '其他1', description: '先進其他技術，提供卓越的能量密度和續航表現', specs: ['其他', '其他'] },
                { id: 'Other-2', name: '其他2', description: '專為高功率應用設計，提供強勁的瞬間功率輸出', specs: ['其他', '其他'] }
            ]
        }
    };

    return categories[categoryId];
}

// 獲取分類名稱
function getCategoryName(categoryId) {
    const names = {
        'meters': '計量表',
        'portable': '手攜產品',
        'sensors': '傳感器',
        'memory': '記憶體',
        'batteries': '動力電池',
        'other': '其他'
    };
    return names[categoryId] || '未知分類';
}

// 顯示產品詳情
function showProductDetails(productId) {
    // 這裡可以實現產品詳情顯示功能
    showNotification(`正在查看產品：${productId}`, 'info');
    // 可以添加更多產品詳情顯示邏輯
}

// 在現有的setupInteractiveElements函數中添加分類選擇初始化
function setupCategorySelection() {
    // 為分類卡片添加鍵盤支援
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}