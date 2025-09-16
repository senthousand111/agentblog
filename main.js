// Agent Learning Blog - Main JavaScript
// Global state
let currentLanguage = 'en';
let blogPosts = [];
let isAuthenticated = false;
const SECURITY_CODE = '33a1Yo18';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    updateLanguage();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // Admin form submission
    document.getElementById('admin-form').addEventListener('submit', handleAdminSubmit);

    // Modal outside click close
    document.getElementById('admin-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Load blog posts from JSON file or localStorage
async function loadBlogPosts() {
    try {
        // Try to load from data/posts.json first
        const response = await fetch('data/posts.json');
        if (response.ok) {
            const data = await response.json();
            blogPosts = data.posts;
        } else {
            // Fallback to sample posts
            blogPosts = getSamplePosts();
        }
    } catch (error) {
        console.log('Loading sample posts...');
        blogPosts = getSamplePosts();
    }
    
    // Load additional posts from localStorage
    const savedPosts = localStorage.getItem('blog-posts');
    if (savedPosts) {
        try {
            const parsed = JSON.parse(savedPosts);
            blogPosts = [...blogPosts, ...parsed];
        } catch (error) {
            console.error('Error parsing saved posts:', error);
        }
    }
    
    renderBlogPosts();
}

// Get sample blog posts
function getSamplePosts() {
    return [
        {
            id: 1,
            title: "Understanding Multi-Agent Reinforcement Learning",
            titleZh: "理解多智能体强化学习",
            content: `# Understanding Multi-Agent Reinforcement Learning

Multi-agent reinforcement learning (MARL) represents one of the most fascinating frontiers in artificial intelligence. Unlike traditional single-agent RL, MARL involves multiple learning agents that must navigate and adapt to environments where other agents are also learning and evolving their strategies.

## Key Challenges in MARL

### 1. Non-Stationarity
The environment appears non-stationary from each agent's perspective because other agents are simultaneously learning and changing their policies.

### 2. Credit Assignment
Determining which agent's actions contributed to a particular outcome becomes significantly more complex with multiple actors.

### 3. Scalability
As the number of agents increases, the state and action spaces can grow exponentially.

## Popular MARL Algorithms

\`\`\`python
# Example: Simple multi-agent Q-learning setup
class MultiAgentQLearning:
    def __init__(self, n_agents, state_size, action_size):
        self.n_agents = n_agents
        self.q_tables = [np.zeros((state_size, action_size)) 
                        for _ in range(n_agents)]
    
    def update(self, agent_id, state, action, reward, next_state):
        # Update Q-value for specific agent
        current_q = self.q_tables[agent_id][state][action]
        max_next_q = np.max(self.q_tables[agent_id][next_state])
        new_q = current_q + self.learning_rate * (reward + self.gamma * max_next_q - current_q)
        self.q_tables[agent_id][state][action] = new_q
\`\`\`

The future of MARL holds immense promise for applications in autonomous vehicles, robotic swarms, and distributed systems optimization.`,
            contentZh: `# 理解多智能体强化学习

多智能体强化学习（MARL）代表了人工智能中最迷人的前沿之一。与传统的单智能体强化学习不同，MARL涉及多个学习智能体，它们必须在其他智能体也在学习和演化策略的环境中导航和适应。

## MARL中的关键挑战

### 1. 非平稳性
由于其他智能体同时在学习和改变其策略，环境从每个智能体的角度看起来是非平稳的。

### 2. 信用分配
确定哪个智能体的行动对特定结果产生了贡献在多个参与者的情况下变得显著更复杂。

### 3. 可扩展性
随着智能体数量的增加，状态和动作空间可能呈指数增长。

## 流行的MARL算法

\`\`\`python
# 示例：简单的多智能体Q学习设置
class MultiAgentQLearning:
    def __init__(self, n_agents, state_size, action_size):
        self.n_agents = n_agents
        self.q_tables = [np.zeros((state_size, action_size)) 
                        for _ in range(n_agents)]
    
    def update(self, agent_id, state, action, reward, next_state):
        # 更新特定智能体的Q值
        current_q = self.q_tables[agent_id][state][action]
        max_next_q = np.max(self.q_tables[agent_id][next_state])
        new_q = current_q + self.learning_rate * (reward + self.gamma * max_next_q - current_q)
        self.q_tables[agent_id][state][action] = new_q
\`\`\`

MARL的未来在自动驾驶汽车、机器人群和分布式系统优化等应用中具有巨大前景。`,
            tags: ["MARL", "Reinforcement Learning", "AI"],
            date: "2024-09-15",
            excerpt: "Exploring the complexities and opportunities in multi-agent reinforcement learning systems.",
            excerptZh: "探索多智能体强化学习系统的复杂性和机遇。"
        },
        {
            id: 2,
            title: "The Future of Large Language Model Agents",
            titleZh: "大语言模型智能体的未来",
            content: `# The Future of Large Language Model Agents

Large Language Model (LLM) agents represent a paradigm shift in how we think about artificial intelligence. These systems combine the reasoning capabilities of LLMs with the ability to take actions in the world, creating truly autonomous intelligent agents.

## What Makes LLM Agents Special?

### 1. Reasoning and Planning
LLM agents can break down complex tasks into smaller, manageable steps through chain-of-thought reasoning.

### 2. Tool Integration
They can seamlessly integrate with external tools and APIs to extend their capabilities beyond text generation.

### 3. Adaptability
Unlike traditional rule-based systems, LLM agents can adapt to new situations and requirements dynamically.

## Architecture of LLM Agents

\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Input     │───▶│  Reasoning  │───▶│   Action    │
│ Processing  │    │   Engine    │    │  Execution  │
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                   │                   │
       │                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Feedback   │◀───│   Memory    │    │   Tools &   │
│   Loop      │    │   System    │    │    APIs     │
└─────────────┘    └─────────────┘    └─────────────┘
\`\`\`

## Current Challenges

- **Hallucination**: LLM agents may generate confident but incorrect information
- **Security**: Ensuring safe execution of agent-generated actions
- **Alignment**: Making sure agents pursue intended goals

## Real-World Applications

LLM agents are already being deployed in:
- Customer service automation
- Code generation and debugging
- Research assistance
- Personal productivity tools

The key to successful LLM agents lies in careful prompt engineering, robust safety measures, and effective human oversight.`,
            contentZh: `# 大语言模型智能体的未来

大语言模型（LLM）智能体代表了我们对人工智能思考方式的范式转变。这些系统将LLM的推理能力与在世界中采取行动的能力相结合，创造出真正自主的智能代理。

## LLM智能体的特殊之处

### 1. 推理和规划
LLM智能体可以通过思维链推理将复杂任务分解为较小的、可管理的步骤。

### 2. 工具集成
它们可以无缝集成外部工具和API，将其能力扩展到文本生成之外。

### 3. 适应性
与传统的基于规则的系统不同，LLM智能体可以动态适应新情况和需求。

## LLM智能体的架构

\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   输入      │───▶│   推理      │───▶│   动作      │
│   处理      │    │   引擎      │    │   执行      │
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                   │                   │
       │                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  反馈       │◀───│   记忆      │    │  工具和     │
│  循环       │    │   系统      │    │   API       │
└─────────────┘    └─────────────┘    └─────────────┘
\`\`\`

## 当前挑战

- **幻觉**：LLM智能体可能生成自信但错误的信息
- **安全性**：确保智能体生成的动作的安全执行
- **对齐**：确保智能体追求预期目标

## 现实世界应用

LLM智能体已经被部署在：
- 客户服务自动化
- 代码生成和调试
- 研究辅助
- 个人生产力工具

成功的LLM智能体的关键在于仔细的提示工程、强大的安全措施和有效的人工监督。`,
            tags: ["LLM", "AI Agents", "Natural Language Processing"],
            date: "2024-09-10",
            excerpt: "How large language models are evolving into autonomous agents capable of reasoning and action.",
            excerptZh: "大语言模型如何发展为能够推理和行动的自主智能体。"
        }
    ];
}

// Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show target page
    document.getElementById(pageId + '-page').classList.remove('hidden');
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const targetNav = document.querySelector(`[data-page="${pageId}"]`);
    if (targetNav) {
        targetNav.classList.add('active');
    }
}

// Show individual blog post
function showPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    const title = currentLanguage === 'zh' ? (post.titleZh || post.title) : post.title;
    const content = currentLanguage === 'zh' ? (post.contentZh || post.content) : post.content;
    
    document.getElementById('post-content').innerHTML = `
        <h1>${escapeHtml(title)}</h1>
        <div class="post-meta">${post.date} • ${post.tags.join(', ')}</div>
        ${parseMarkdown(content)}
    `;
    
    showPage('post');
}

// Language toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    updateLanguage();
    renderBlogPosts();
    
    const toggle = document.querySelector('.language-toggle');
    toggle.textContent = currentLanguage === 'en' ? '中文' : 'English';
}

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = currentLanguage === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password')) {
            element.placeholder = text;
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
}

// Blog post rendering
function renderBlogPosts() {
    const container = document.getElementById('blog-posts');
    if (!container) return;

    if (blogPosts.length === 0) {
        container.innerHTML = `<div class="loading" data-en="No posts available." data-zh="暂无文章。">${currentLanguage === 'zh' ? '暂无文章。' : 'No posts available.'}</div>`;
        return;
    }

    container.innerHTML = blogPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(post => {
            const title = currentLanguage === 'zh' ? (post.titleZh || post.title) : post.title;
            const excerpt = currentLanguage === 'zh' ? (post.excerptZh || post.excerpt) : post.excerpt;
            
            return `
                <article class="blog-post" onclick="showPost(${post.id})">
                    <h3 class="post-title">${escapeHtml(title)}</h3>
                    <div class="post-meta">${post.date}</div>
                    <p class="post-excerpt">${escapeHtml(excerpt)}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                </article>
            `;
        }).join('');
}

// Admin functions
function showAdminModal() {
    document.getElementById('admin-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.getElementById('security-code').focus();
}

function closeModal() {
    document.getElementById('admin-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetAdminForm();
}

function resetAdminForm() {
    document.getElementById('admin-form').reset();
    document.getElementById('blog-form').classList.add('hidden');
    isAuthenticated = false;
}

function handleAdminSubmit(e) {
    e.preventDefault();
    
    const securityCode = document.getElementById('security-code').value;
    
    if (!isAuthenticated) {
        if (securityCode === SECURITY_CODE) {
            isAuthenticated = true;
            document.getElementById('blog-form').classList.remove('hidden');
            document.getElementById('post-title').focus();
            showNotification(currentLanguage === 'zh' ? '验证成功！' : 'Authentication successful!', 'success');
        } else {
            showNotification(currentLanguage === 'zh' ? '安全码错误！' : 'Invalid security code!', 'error');
            return;
        }
    } else {
        // Create new blog post
        const newPost = {
            id: Date.now(),
            title: document.getElementById('post-title').value,
            titleZh: document.getElementById('post-title-zh').value || document.getElementById('post-title').value,
            content: document.getElementById('post-content-input').value,
            contentZh: document.getElementById('post-content-input-zh').value || document.getElementById('post-content-input').value,
            excerpt: document.getElementById('post-excerpt').value,
            excerptZh: document.getElementById('post-excerpt-zh').value || document.getElementById('post-excerpt').value,
            tags: document.getElementById('post-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            date: new Date().toISOString().split('T')[0]
        };

        // Add to posts array
        blogPosts.unshift(newPost);
        
        // Save to localStorage
        const userPosts = blogPosts.filter(post => post.id >= 1000000000000); // User-created posts
        localStorage.setItem('blog-posts', JSON.stringify(userPosts));
        
        // Re-render posts
        renderBlogPosts();
        
        // Close modal and show success message
        closeModal();
        showNotification(currentLanguage === 'zh' ? '文章发布成功！' : 'Post published successfully!', 'success');
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);