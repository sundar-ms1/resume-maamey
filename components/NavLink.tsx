import React from 'react';

/**
 * Routing that survives both `next dev` and a static export served from a sub-path.
 *
 * In development the app uses real routes (`/editor`). `next build` exports flat files
 * (`editor.html`) and every asset reference is relative, so the exported `out/` folder can be
 * dropped at any URL depth — S3, a preview proxy, GitHub Pages project sites — and still work.
 */
export type RouteKey = 'home' | 'templates' | 'editor';

const STATIC = process.env.NEXT_PUBLIC_STATIC === '1';

const MAP: Record<RouteKey, string> = STATIC
  ? { home: './index.html', templates: './templates.html', editor: './editor.html' }
  : { home: '/', templates: '/templates', editor: '/editor' };

export function href(to: RouteKey, opts?: { query?: string; hash?: string }) {
  return `${MAP[to]}${opts?.query ? `?${opts.query}` : ''}${opts?.hash ? `#${opts.hash}` : ''}`;
}

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: RouteKey;
  query?: string;
  hash?: string;
};

export function NavLink({ to, query, hash, children, ...rest }: Props) {
  return (
    <a href={href(to, { query, hash })} {...rest}>
      {children}
    </a>
  );
}
