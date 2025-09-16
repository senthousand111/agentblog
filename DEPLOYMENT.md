# Deployment Guide

This guide covers various deployment options for your Agent Learning Blog.

## 🚀 GitHub Pages (Recommended)

GitHub Pages is the easiest and most cost-effective way to deploy your blog.

### Prerequisites
- GitHub account
- Git installed on your computer

### Step-by-Step Deployment

1. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `agent-learning-blog` or any name you prefer
   - Make it public (required for free GitHub Pages)

2. **Upload your files**
   ```bash
   # Clone your repository
   git clone https://github.com/yourusername/agent-learning-blog.git
   cd agent-learning-blog
   
   # Add all files
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your blog**
   - Your blog will be available at: `https://yourusername.github.io/agent-learning-blog/`
   - It may take a few minutes to deploy initially

### Custom Domain (Optional)

1. **Purchase a domain** from any domain registrar
2. **Add a CNAME file** to your repository root:
   ```
   yourdomain.com
   ```
3. **Configure DNS** at your domain registrar:
   - Add a CNAME record pointing to `yourusername.github.io`
4. **Update GitHub Pages settings** with your custom domain

## 🌐 Alternative Deployment Options

### Netlify

1. **Connect your repository** to Netlify
2. **Build settings**: Leave empty (static site)
3. **Deploy**: Automatic deployment on git push

### Vercel

1. **Import your GitHub repository** to Vercel
2. **Framework preset**: Other
3. **Deploy**: Automatic deployment

### Static Hosting Services

Upload the files to any static hosting service:
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh
- Render
- DigitalOcean App Platform

## ⚙️ Configuration Updates

Before deploying, update these files:

### 1. `index.html`
```html
<!-- Update meta tags -->
<meta property="og:url" content="https://yourdomain.com/">
<meta property="twitter:url" content="https://yourdomain.com/">

<!-- Update contact links -->
<a href="mailto:your.actual.email@example.com">Email</a>
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://twitter.com/yourusername">Twitter</a>
```

### 2. `_config.yml`
```yaml
title: "Your Blog Title"
description: "Your blog description"
author: "Your Name"
email: "your.email@example.com"
baseurl: "/your-repository-name"
url: "https://yourusername.github.io"
```

### 3. `README.md`
- Update the live demo URL
- Replace placeholder usernames
- Add your personal information

## 🔧 Environment-Specific Settings

### Development
```javascript
// js/main.js - for local development
const API_BASE = 'http://localhost:3000';
const ENVIRONMENT = 'development';
```

### Production
```javascript
// js/main.js - for production
const API_BASE = 'https://yourdomain.com';
const ENVIRONMENT = 'production';
```

## 📊 Analytics Setup (Optional)

### Google Analytics 4

1. **Create a GA4 property** at [analytics.google.com](https://analytics.google.com)
2. **Add tracking code** to `index.html`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Plausible Analytics (Privacy-friendly alternative)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🔍 SEO Optimization

### Sitemap Generation

Add to your repository root:
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add more URLs as needed -->
</urlset>
```

### robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## 🚨 Troubleshooting

### Common Issues

1. **404 Error on GitHub Pages**
   - Check that `index.html` is in the root directory
   - Verify GitHub Pages is enabled in settings
   - Wait 10-15 minutes for deployment

2. **CSS/JS not loading**
   - Check file paths are relative (no leading `/`)
   - Verify files exist in the repository
   - Check browser developer tools for 404 errors

3. **Posts not displaying**
   - Validate JSON syntax in `data/posts.json`
   - Check browser console for JavaScript errors
   - Verify file encoding is UTF-8

4. **Admin panel not working**
   - Ensure JavaScript is enabled in browser
   - Check the security code in `js/main.js`
   - Verify localStorage is available

### Debug Mode

Enable debug mode by adding to `js/main.js`:
```javascript
const DEBUG = true;
console.log('Blog posts loaded:', blogPosts);
```

## 📱 Mobile Optimization

The blog is already responsive, but for optimal mobile experience:

1. **Test on various devices**
   - Use browser dev tools
   - Test on actual mobile devices
   - Check touch interactions

2. **Performance optimization**
   - Optimize images (WebP format)
   - Minify CSS/JS (optional)
   - Enable compression on server

## 🔒 Security Considerations

1. **Change the admin security code**
   ```javascript
   // js/main.js
   const SECURITY_CODE = 'your-secure-code-here';
   ```

2. **Use HTTPS**
   - GitHub Pages automatically provides HTTPS
   - For custom domains, enable "Enforce HTTPS" in settings

3. **Content Security Policy** (Advanced)
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com;">
   ```

## 📈 Performance Monitoring

### Lighthouse Audits
Run regular Lighthouse audits to monitor:
- Performance
- Accessibility
- SEO
- Best practices

### Core Web Vitals
Monitor these metrics:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

---

**Need help?** Create an issue in the GitHub repository or contact the maintainer.