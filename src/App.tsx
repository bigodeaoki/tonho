import { useEffect, useLayoutEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Credits from './pages/Credits';
import NotFound from './pages/NotFound';
import { ScrollTrigger, scrollToTarget, startSmoothScroll } from './lib/motion';

/** Leva à âncora certa, inclusive a um painel da esteira horizontal de coleções. */
function scrollToHash(hash: string) {
  const el = document.getElementById(hash.slice(1));
  if (!el) return;
  const track = el.closest('.cs-track') as HTMLElement | null;
  if (track && window.innerWidth >= 900) {
    const section = track.closest('.cs') as HTMLElement;
    const st = ScrollTrigger.getAll().find((t) => t.trigger === section);
    const start = st ? st.start : section.getBoundingClientRect().top + window.scrollY;
    const max = track.scrollWidth - window.innerWidth;
    scrollToTarget(start + Math.min(el.offsetLeft, max));
    return;
  }
  scrollToTarget(el);
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (!hash) scrollToTarget(0, true);
  }, [pathname, hash]);
  useEffect(() => {
    if (!hash) return;
    const id = window.setTimeout(() => scrollToHash(hash), 120);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);
  // recalcula posições depois que fontes e fotos carregam
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, [pathname]);
  return null;
}

/** Links internos com # (ex.: /#colecoes) passam pela rolagem suave. */
function useHashLinks() {
  const { pathname } = useLocation();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target || e.metaKey || e.ctrlKey) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash || url.pathname !== pathname) return;
      e.preventDefault();
      history.replaceState(null, '', url.hash);
      scrollToHash(url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);
}

function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    startSmoothScroll();
  }, []);
  useHashLinks();
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <ScrollManager />
      <Header />
      <main id="conteudo" key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="loja" element={<Shop />} />
        <Route path="loja/:slug" element={<Product />} />
        <Route path="creditos" element={<Credits />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
