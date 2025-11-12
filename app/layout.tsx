import "./styles.css";
import BotpressWidget from "./components/Chatbot/BotpressWidget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BotpressWidget />
      </body>
    </html>
  );
}

