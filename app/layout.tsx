// app/layout.tsx
import "./styles.css";
import BotpressWidget from "./components/Chatbot/BotpressWidget";
import { ThemeProvider } from "@/context/theme-context";

const setInitialTheme = `
(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Script que aplica el modo oscuro antes de que React monte */}
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <BotpressWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}