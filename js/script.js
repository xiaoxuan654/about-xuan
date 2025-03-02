/**
 * 小轩的导航页面脚本
 * 使用现代JavaScript实现页面动画和交互效果
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面过渡动画
    initPageTransition();
    
    // 初始化滚动显示效果
    initScrollReveal();
    
    // 初始化卡片悬停效果
    initCardHover();
});

/**
 * 初始化页面加载过渡动画
 */
function initPageTransition() {
    const container = document.querySelector('.container');
    
    // 设置初始状态
    container.style.opacity = '0';
    
    // 添加过渡效果并显示内容
    setTimeout(() => {
        container.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        container.style.opacity = '1';
    }, 100);
}

/**
 * 初始化滚动显示效果
 * 使用Intersection Observer API监测元素是否进入视口
 */
function initScrollReveal() {
    const observerOptions = {
        root: null, // 使用视口作为根元素
        rootMargin: '0px',
        threshold: 0.1 // 当元素10%进入视口时触发
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加激活类名使元素显示
                entry.target.classList.add('scroll-reveal--active');
                
                // 设置延迟以创建序列动画效果
                const delay = index * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                
                // 元素显示后取消观察
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有带有scroll-reveal类的元素
    document.querySelectorAll('.scroll-reveal').forEach((element) => {
        observer.observe(element);
    });
}

/**
 * 初始化卡片悬停效果
 * 实现3D倾斜效果和平滑过渡
 */
function initCardHover() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // 鼠标进入卡片
        card.addEventListener('mouseenter', (e) => {
            applyCardTilt(card, e);
        });
        
        // 鼠标在卡片上移动
        card.addEventListener('mousemove', (e) => {
            applyCardTilt(card, e);
        });
        
        // 鼠标离开卡片
        card.addEventListener('mouseleave', () => {
            // 重置卡片样式
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

/**
 * 应用卡片倾斜效果
 * @param {HTMLElement} card - 卡片元素
 * @param {MouseEvent} e - 鼠标事件
 */
function applyCardTilt(card, e) {
    const cardRect = card.getBoundingClientRect();
    
    // 计算鼠标在卡片上的相对位置
    const mouseX = e.clientX - cardRect.left;
    const mouseY = e.clientY - cardRect.top;
    
    // 计算倾斜角度，最大倾斜角度为8度
    const tiltX = ((cardRect.height / 2 - mouseY) / cardRect.height) * 8;
    const tiltY = ((mouseX - cardRect.width / 2) / cardRect.width) * 8;
    
    // 应用3D变换
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
}
