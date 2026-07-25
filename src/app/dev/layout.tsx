// app/panel/layout.tsx
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <>{children}</>;
}