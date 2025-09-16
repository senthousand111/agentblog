# Agent Learning Blog

A personal blog website focused on AI agents, machine learning, and the future of intelligence. Built with a clean, Notion-style UI and bilingual support (English/Chinese).

## 🌟 Features

- **Clean Notion-style UI**: Minimalist design with excellent typography
- **Bilingual Support**: Full English and Chinese language support
- **Admin Panel**: Secure blog post creation with password protection (Code: `33a1Yo18`)
- **Markdown Support**: Write posts in Markdown with syntax highlighting
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **GitHub Pages Ready**: Easy deployment to GitHub Pages
- **Dark Mode**: Automatic dark mode based on system preferences
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🚀 Live Demo

Visit the live demo: [https://yourusername.github.io/agent-learning-blog/](https://yourusername.github.io/agent-learning-blog/)

## 📁 Project Structure

```
agent-learning-blog/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet with Notion-style design
├── js/
│   ├── main.js            # Core application logic
│   └── markdown-parser.js # Markdown parsing functionality
├── data/
│   └── posts.json         # Blog posts data
├── assets/
│   ├── images/
│   │   └── avatar.jpg     # Author profile image
│   └── icons/
│       └── favicon.ico    # Website favicon
├── docs/
│   └── DEPLOYMENT.md      # Deployment instructions
├── README.md              # This file
├── LICENSE                # MIT License
├── _config.yml            # GitHub Pages configuration
└── .gitignore             # Git ignore rules
```

## 🛠️ Setup Instructions

### Method 1: Fork and Deploy (Recommended)

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/agent-learning-blog.git
   cd agent-learning-blog
   ```

3. **Customize the blog**:
   - Edit `index.html` to update your personal information
   - Replace `assets/images/avatar.jpg` with your photo
   - Update the contact links in the About section
   - Modify `data/posts.json` to add your initial posts

4. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click Save

5. **Access your blog** at: `https://yourusername.github.io/agent-learning-blog/`

### Method 2: Download and Customize

1. Download the repository as ZIP
2. Extract and customize the files
3. Upload to your preferred hosting service

## ✍️ Writing Blog Posts

### Using the Admin Panel

1. Click the **+** button in the bottom-right corner
2. Enter the security code: `33a1Yo18`
3. Fill out the post form with:
   - Title (English and Chinese)
   - Tags (comma-separated)
   - Excerpt (English and Chinese)
   - Content (Markdown supported)

### Manual Method

Edit `data/posts.json` and add new posts in this format:

```json
{
  "id": 3,
  "title": "Your Post Title",
  "titleZh": "你的文章标题",
  "content": "# Your Markdown Content\n\nYour post content here...",
  "contentZh": "# 你的Markdown内容\n\n你的文章内容...",
  "tags": ["AI", "Machine Learning"],
  "date": "2024-09-17",
  "excerpt": "Brief description of your post",
  "excerptZh": "你文章的简短描述"
}
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2e7d32;        /* Main theme color */
    --primary-hover: #1b5e20;        /* Hover state */
    --text-color: #37352f;           /* Main text */
    --text-muted: #6f6f6f;           /* Secondary text */
    --background: #ffffff;            /* Background */
    --surface: #ffffff;               /* Card backgrounds */
    --border-color: #e9e9e7;         /* Borders */
    --accent-bg: #f7f6f3;            /* Accent background */
}
```

### Adding New Sections

1. Add new navigation items in `index.html`
2. Create corresponding page sections
3. Update the navigation logic in `js/main.js`

### Changing the Security Code

Update the `SECURITY_CODE` constant in `js/main.js`:

```javascript
const SECURITY_CODE = 'your-new-code';
```

## 📱 Responsive Design

The blog is fully responsive and optimized for:
- **Desktop**: Full-width layout with sidebar navigation
- **Tablet**: Adapted layout with stacked navigation
- **Mobile**: Mobile-first design with touch-friendly interactions

## 🌙 Dark Mode

Dark mode is automatically enabled based on the user's system preferences using CSS media queries:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #4caf50;
        --text-color: #ffffff;
        --background: #1a1a1a;
        /* ... more dark mode variables */
    }
}
```

## 🔧 Technical Features

- **Vanilla JavaScript**: No frameworks, fast loading
- **CSS Grid & Flexbox**: Modern layout techniques
- **Syntax Highlighting**: Prism.js for code blocks
- **Local Storage**: Posts saved locally for persistence
- **Markdown Parser**: Custom lightweight parser
- **Progressive Enhancement**: Works without JavaScript

## 📊 SEO & Performance

- Semantic HTML5 structure
- Meta tags for social sharing
- Optimized images with lazy loading
- Minified CSS and efficient JavaScript
- Accessibility features (WCAG compliant)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Notion**: Design inspiration
- **Prism.js**: Syntax highlighting
- **GitHub Pages**: Free hosting
- **Open Source Community**: Various code snippets and ideas

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/agent-learning-blog/issues) page
2. Create a new issue for bugs or feature requests
3. Contact the author: Sen千折

---

**Happy Blogging!** 🎉

Made with ❤️ by [Sen千折](https://github.com/yourusername)