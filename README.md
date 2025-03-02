# 个人导航页面

一个现代化的个人导航页面，采用响应式设计，支持自定义主题和动画效果。

## 功能特点

- 🎨 可自定义的主题配置
- 🌈 平滑的动画效果
- 📱 响应式设计
- 🔧 易于配置的JSON配置文件
- 🎯 个性化的个人信息展示
- 📂 项目展示功能
- 📞 联系方式展示

## 配置说明

所有配置项都在 `config.json` 文件中，以下是详细的配置说明：

### 站点配置 (site)

```json
"site": {
    "title": "网站标题",
    "description": "网站描述",
    "favicon": "favicon图标路径"
}
```

### 个人资料 (profile)

```json
"profile": {
    "avatar": {
        "icon": "头像图标类名",
        "alt": "头像替代文本"
    },
    "name": "个人名称",
    "bio": "个人简介",
    "skills": ["技能标签列表"],
    "social": [{
        "platform": "社交平台名称",
        "icon": "平台图标类名",
        "url": "社交链接"
    }]
}
```

### 项目展示 (projects)

```json
"projects": [{
    "title": "项目标题",
    "icon": "项目图标类名",
    "description": "项目描述",
    "technologies": ["使用的技术栈"],
    "link": "项目链接"
}]
```

### 联系方式 (contact)

```json
"contact": {
    "title": "联系方式标题",
    "description": "联系方式描述",
    "methods": [{
        "type": "联系方式类型",
        "icon": "图标类名",
        "value": "联系方式值"
    }]
}
```

### 主题配置 (theme)

#### 颜色配置 (colors)

```json
"colors": {
    "primary": "主要颜色",
    "secondary": "次要颜色",
    "text": "文本颜色",
    "background": "背景颜色/渐变",
    "accent": "强调色",
    "success": "成功状态颜色",
    "warning": "警告状态颜色",
    "card": {
        "background": "卡片背景色",
        "border": "卡片边框色",
        "shadow": "卡片阴影色"
    }
}
```

#### 动画配置 (animations)

```json
"animations": {
    "pageLoad": {
        "duration": "页面加载动画持续时间",
        "delay": "动画延迟时间",
        "easing": "缓动函数"
    },
    "cardHover": {
        "duration": "卡片悬停动画持续时间",
        "scale": "放大比例",
        "easing": "缓动函数"
    },
    "scrollReveal": {
        "duration": "滚动显示动画持续时间",
        "distance": "移动距离",
        "easing": "缓动函数",
        "interval": "间隔时间"
    },
    "parallax": {
        "enabled": "是否启用视差效果",
        "speed": "视差速度"
    }
}
```

#### 排版配置 (typography)

```json
"typography": {
    "headings": {
        "fontFamily": "标题字体",
        "letterSpacing": "字间距",
        "lineHeight": "行高"
    },
    "body": {
        "fontFamily": "正文字体",
        "lineHeight": "行高",
        "fontSize": "字体大小"
    }
}
```

#### 间距配置 (spacing)

```json
"spacing": {
    "section": "区块间距",
    "element": "元素间距",
    "card": "卡片内边距"
}
```

#### 圆角配置 (borderRadius)

```json
"borderRadius": {
    "card": "卡片圆角",
    "button": "按钮圆角",
    "tag": "标签圆角"
}
```

## 使用方法

1. 克隆项目到本地
2. 根据需求修改 `config.json` 配置文件
3. 部署到您的Web服务器

## 技术栈

- HTML5
- CSS3 (动画、过渡效果)
- JavaScript (交互效果)
- Font Awesome (图标库)