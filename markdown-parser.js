// Simple Markdown Parser for Agent Learning Blog
// This parser handles the most common markdown syntax

function parseMarkdown(markdown) {
    if (!markdown) return '';
    
    let html = markdown;
    
    // Escape HTML entities first
    html = html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
    
    // Code blocks (must be done before inline code)
    html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, function(match, language, code) {
        const lang = language ? ` class="language-${language}"` : '';
        return `<pre><code${lang}>${code.trim()}</code></pre>`;
    });
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
    
    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^\*\*\*$/gm, '<hr>');
    
    // Unordered lists
    html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^+ (.+)$/gm, '<li>$1</li>');
    
    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)\s*(?=<li>)/gs, '$1');
    html = html.replace(/(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gs, function(match) {
        // Check if it's an ordered list (starts with number)
        const isOrdered = /^\d+\./.test(match.replace(/<li>/, ''));
        const tag = isOrdered ? 'ol' : 'ul';
        return `<${tag}>${match}</${tag}>`;
    });
    
    // Tables (basic support)
    html = html.replace(/\|(.+)\|\n\|[-\s|:]+\|\n((?:\|.+\|\n?)*)/g, function(match, header, rows) {
        const headerCells = header.split('|').map(cell => `<th>${cell.trim()}</th>`).join('');
        const rowsHtml = rows.trim().split('\n').map(row => {
            const cells = row.split('|').slice(1, -1).map(cell => `<td>${cell.trim()}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        
        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
    });
    
    // Line breaks and paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Wrap in paragraphs, but avoid wrapping block elements
    const blockElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'blockquote', 'ul', 'ol', 'table', 'hr'];
    const blockRegex = new RegExp(`<(${blockElements.join('|')})[^>]*>`, 'gi');
    
    if (!blockRegex.test(html)) {
        html = `<p>${html}</p>`;
    } else {
        // More complex paragraph wrapping for mixed content
        const parts = html.split(/(<\/?(?:h[1-6]|pre|blockquote|ul|ol|table|hr)[^>]*>)/gi);
        let result = '';
        let inBlock = false;
        let currentP = '';
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            
            if (blockRegex.test(part)) {
                if (currentP.trim()) {
                    result += `<p>${currentP.trim()}</p>`;
                    currentP = '';
                }
                result += part;
                inBlock = part.charAt(1) !== '/';
            } else if (part.trim()) {
                if (inBlock) {
                    result += part;
                } else {
                    currentP += part;
                }
            }
        }
        
        if (currentP.trim()) {
            result += `<p>${currentP.trim()}</p>`;
        }
        
        html = result;
    }
    
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>\s*<\/p>/g, '');
    
    // Fix nested paragraphs in blockquotes and list items
    html = html.replace(/<blockquote><p>(.*?)<\/p><\/blockquote>/g, '<blockquote>$1</blockquote>');
    html = html.replace(/<li><p>(.*?)<\/p><\/li>/g, '<li>$1</li>');
    
    return html;
}

// Additional utility function for syntax highlighting
function highlightCode() {
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Auto-highlight code after DOM updates
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any added nodes contain code blocks
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const codeBlocks = node.querySelectorAll ? node.querySelectorAll('pre code') : [];
                        if (codeBlocks.length > 0 || node.tagName === 'CODE') {
                            setTimeout(highlightCode, 10);
                            break;
                        }
                    }
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}