import { useState, useCallback } from 'react';
import type { Screen } from './types';
import { useTheme } from './hooks/useTheme';
import { POSTS } from './data/posts';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { FilterBar } from './components/FilterBar';
import { LayoutB } from './components/LayoutB';
import { ArticleView } from './components/ArticleView';
import { EmptyState } from './components/EmptyState';

export default function App() {
  const { theme, toggle } = useTheme();
  const [screen, setScreen] = useState<Screen>('home');
  const [openId, setOpenId] = useState<string>(POSTS[0].id);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterAuthor, setFilterAuthor] = useState('All');

  const openPost = useCallback((id: string) => {
    setOpenId(id);
    setScreen('article');
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback(() => {
    setScreen('home');
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = POSTS.filter(p => {
    if (filterCategory !== 'All' && p.category !== filterCategory) return false;
    if (filterAuthor !== 'All' && p.author !== filterAuthor) return false;
    return true;
  });

  const currentPost = POSTS.find(p => p.id === openId) ?? POSTS[0];
  const relatedPosts = POSTS.filter(p => p.id !== currentPost.id).slice(0, 3);

  const screenKey = screen === 'article' ? `a-${openId}` : 'home';

  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <Nav theme={theme} onToggleTheme={toggle} onGoHome={goHome} />

      <main key={screenKey} className="screen-enter" style={{ paddingTop: 64, minHeight: '100vh' }}>
        {screen === 'home' && (
          <>
            <FilterBar
              filterCategory={filterCategory}
              filterAuthor={filterAuthor}
              onSetCategory={setFilterCategory}
              onSetAuthor={setFilterAuthor}
            />
            {filteredPosts.length === 0 ? (
              <EmptyState />
            ) : (
              <LayoutB posts={filteredPosts} onOpenPost={openPost} />
            )}
          </>
        )}

        {screen === 'article' && (
          <ArticleView
            post={currentPost}
            relatedPosts={relatedPosts}
            onGoHome={goHome}
            onOpenPost={openPost}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
