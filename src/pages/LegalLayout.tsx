import type { CSSProperties, ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    padding: '2rem 1.5rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 800,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    padding: '2.5rem 2.5rem 3rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    color: '#a78bfa',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1.5rem',
    transition: 'opacity 0.2s',
  },
  meta: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  },
  content: {
    color: '#e2e8f0',
    lineHeight: 1.8,
    fontSize: '0.95rem',
  },
};

// Injected as a <style> tag so we can handle hover states, headings, lists, and
// links which are impractical with inline styles alone.
const globalCSS = `
  .legal-content h2 {
    font-size: 1.35rem;
    font-weight: 600;
    color: #f1f5f9;
    margin: 2rem 0 0.75rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .legal-content h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #cbd5e1;
    margin: 1.5rem 0 0.5rem;
  }

  .legal-content p {
    color: #94a3b8;
    margin-bottom: 0.75rem;
    line-height: 1.8;
  }

  .legal-content ul,
  .legal-content ol {
    margin: 0.5rem 0 1rem 1.5rem;
    color: #94a3b8;
    line-height: 1.8;
  }

  .legal-content li {
    margin-bottom: 0.35rem;
  }

  .legal-content a {
    color: #a78bfa;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .legal-content a:hover {
    color: #c4b5fd;
  }

  .legal-content strong {
    color: #e2e8f0;
    font-weight: 600;
  }

  .legal-content .disclaimer-box {
    background: rgba(139, 92, 246, 0.08);
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 8px;
    padding: 0.85rem 1.1rem;
    margin-bottom: 1.75rem;
    font-size: 0.85rem;
    color: #c4b5fd;
    line-height: 1.6;
  }

  .legal-back-link:hover {
    opacity: 0.75;
  }
`;

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div style={styles.wrapper}>
      <style>{globalCSS}</style>

      <div style={styles.container}>
        <a href="/" className="legal-back-link" style={styles.backLink}>
          ← Back to Aria Flipbook
        </a>

        <h1 style={styles.title}>{title}</h1>
        <p style={styles.meta}>Last Updated: June 11, 2026</p>

        <div className="legal-content" style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
