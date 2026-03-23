export default function Head() {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class'
            }
          `,
        }}
      />
    </>
  );
}