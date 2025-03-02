/**
 * 小轩的导航页面脚本
 * 使用现代JavaScript实现页面动画和交互效果
 * 优化版本：模块化设计，提高可维护性和扩展性
 */

// 配置加载模块
const ConfigLoader = {
    /**
     * 加载配置文件
     * @returns {Promise<Object>} 配置对象
     */
    async load() {
        try {
            const response = await fetch('config.json');
            return await response.json();
        } catch (error) {
            console.error('加载配置文件失败:', error);
            return null;
        }
    }
};

// 内容渲染模块
const ContentRenderer = {
    /**
     * 渲染网站所有内容
     * @param {Object} config - 配置对象
     */
    async render(config) {
        if (!config) return;

        this.renderSiteInfo(config.site);
        this.renderProfile(config.profile);
        this.renderProjects(config.projects);
        this.renderContact(config.contact);
        
        // 设置网站图标
        this.setFavicon(config.site.favicon);
    },

    /**
     * 渲染网站基本信息
     * @param {Object} siteInfo - 网站信息配置
     */
    renderSiteInfo(siteInfo) {
        document.title = siteInfo.title;
        document.querySelector('.header__title').textContent = siteInfo.title;
        document.querySelector('.header__desc').textContent = siteInfo.description;
    },

    /**
     * 设置网站图标
     * @param {string} faviconPath - 图标路径
     */
    setFavicon(faviconPath) {
        const faviconLink = document.querySelector('link[rel="icon"]');
        if (faviconLink && faviconPath) {
            faviconLink.href = faviconPath;
        }
    },

    /**
     * 渲染个人资料部分
     * @param {Object} profile - 个人资料配置
     */
    renderProfile(profile) {
        document.querySelector('.profile__avatar-icon').className = profile.avatar.icon + ' profile__avatar-icon';
        document.querySelector('.profile__title').textContent = profile.name;
        document.querySelector('.profile__bio').textContent = profile.bio;

        // 渲染社交链接
        const socialContainer = document.querySelector('.profile__social');
        socialContainer.innerHTML = profile.social.map(social => `
            <a href="${social.url}" title="${social.platform}" class="profile__social-link">
                <i class="${social.icon}"></i>
            </a>
        `).join('');
    },

    /**
     * 渲染项目列表
     * @param {Array} projects - 项目配置数组
     */
    renderProjects(projects) {
        const projectsContainer = document.querySelector('.cards');
        projectsContainer.innerHTML = projects.map(project => `
            <div class="card">
                <div class="card__content">
                    <i class="${project.icon} card__icon"></i>
                    <h3 class="card__title">${project.title}</h3>
                    <p class="card__text">${project.description}</p>
                    <div class="card__tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="card__link" target="_blank">查看项目 <i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `).join('');
    },

    /**
     * 渲染联系方式
     * @param {Object} contact - 联系方式配置
     */
    renderContact(contact) {
        // 更新联系方式标题和描述
        const footerTitle = document.querySelector('.footer__title');
        const footerDesc = document.querySelector('.footer__desc');
        if (footerTitle) footerTitle.textContent = contact.title;
        if (footerDesc) footerDesc.textContent = contact.description;

        // 更新联系方式列表
        const contactContainer = document.querySelector('.footer__contact');
        contactContainer.innerHTML = contact.methods.map(method => `
            <div class="footer__contact-item">
                <i class="${method.icon} footer__contact-icon"></i>
                <span class="footer__contact-text">${method.type}: 
                    <a href="${method.type.toLowerCase() === 'email' ? 'mailto:' : ''}${method.value}" 
                       ${method.value.startsWith('http') ? 'target="_blank"' : ''} 
                       class="footer__contact-link">${method.value}</a>
                </span>
            </div>
        `).join('');
    }
};

// 动画效果模块
const AnimationManager = {
    /**
     * 初始化所有动画效果
     * @param {Object} config - 配置对象
     */
    init(config) {
        const animations = config?.theme?.animations || {};
        
        this.initPageTransition(animations.pageLoad);
        this.initScrollReveal(animations.scrollReveal);
        this.initCardHover(animations.cardHover);
    },

    /**
     * 初始化页面加载过渡动画
     * @param {Object} options - 页面加载动画配置
     */
    initPageTransition(options = {}) {
        const container = document.querySelector('.container');
        const duration = options.duration || '0.8s';
        const delay = options.delay || '100ms';
        const easing = options.easing || 'cubic-bezier(0.4, 0, 0.2, 1)';
        
        // 设置初始状态
        container.style.opacity = '0';
        
        // 添加过渡效果并显示内容
        setTimeout(() => {
            container.style.transition = `opacity ${duration} ${easing}`;
            container.style.opacity = '1';
        }, parseInt(delay) || 100);
    },

    /**
     * 初始化滚动显示效果
     * @param {Object} options - 滚动显示动画配置
     */
    initScrollReveal(options = {}) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // 添加激活类名使元素显示
                    entry.target.classList.add('scroll-reveal--active');
                    
                    // 设置延迟以创建序列动画效果
                    const interval = options.interval || '0.1s';
                    const delay = index * parseFloat(interval);
                    entry.target.style.transitionDelay = `${delay}s`;
                    
                    // 元素显示后取消观察
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // 观察所有带有scroll-reveal类的元素
        document.querySelectorAll('.scroll-reveal').forEach((element) => {
            // 应用配置的动画参数
            if (options) {
                element.style.transitionDuration = options.duration || '0.8s';
                element.style.transitionTimingFunction = options.easing || 'cubic-bezier(0.4, 0, 0.2, 1)';
                if (options.distance) {
                    element.style.transform = `translateY(${options.distance})`;
                }
            }
            
            observer.observe(element);
        });
    },

    /**
     * 初始化卡片悬停效果
     * @param {Object} options - 卡片悬停动画配置
     */
    initCardHover(options = {}) {
        const cards = document.querySelectorAll('.card');
        const scale = options.scale || 1.03;
        const duration = options.duration || '0.3s';
        const easing = options.easing || 'cubic-bezier(0.4, 0, 0.2, 1)';
        
        cards.forEach(card => {
            // 鼠标进入卡片
            card.addEventListener('mouseenter', (e) => {
                this.applyCardTilt(card, e, scale);
            });
            
            // 鼠标在卡片上移动
            card.addEventListener('mousemove', (e) => {
                this.applyCardTilt(card, e, scale);
            });
            
            // 鼠标离开卡片
            card.addEventListener('mouseleave', () => {
                // 重置卡片样式
                card.style.transform = '';
                card.style.transition = `transform ${duration} ${easing}`;
            });
        });
    },

    /**
     * 应用卡片倾斜效果
     * @param {HTMLElement} card - 卡片元素
     * @param {MouseEvent} e - 鼠标事件
     * @param {number} scale - 放大比例
     */
    applyCardTilt(card, e, scale = 1.02) {
        const cardRect = card.getBoundingClientRect();
        
        // 计算鼠标在卡片上的相对位置
        const mouseX = e.clientX - cardRect.left;
        const mouseY = e.clientY - cardRect.top;
        
        // 计算倾斜角度，最大倾斜角度为8度
        const tiltX = ((cardRect.height / 2 - mouseY) / cardRect.height) * 8;
        const tiltY = ((mouseX - cardRect.width / 2) / cardRect.width) * 8;
        
        // 应用3D变换
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        card.style.transition = 'transform 0.1s ease-out';
    }
};

// 应用入口
document.addEventListener('DOMContentLoaded', async () => {
    // 加载配置
    const config = await ConfigLoader.load();
    
    // 渲染内容
    await ContentRenderer.render(config);

    // 初始化动画效果
    AnimationManager.init(config);
});
