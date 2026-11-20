export default function AccentTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <span className="dot">.</span>
    </>
  );
}
