// app/dev/layout.tsx
export const metadata = {
  // In Next.js app router you can set robots via the metadata export.
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <>{children}</>;
}