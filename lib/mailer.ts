// lib/mailer.ts
import { smtpTransporter } from "@/lib/smtp";

export async function sendOtpEmail(to: string, code: string) {
  const app = "GENIO";
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto">
      <h2>Código de verificación</h2>
      <p>Usa este código para acceder a tu cuenta de ${app}:</p>
      <div style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</div>
      <p>Este código expira en 10 minutos. Si no fuiste tú, ignora este correo.</p>
    </div>
  `;

  const info = await smtpTransporter.sendMail({
    from: process.env.SMTP_FROM!, // p.ej. "GENIO <tu_cuenta@gmail.com>"
    to,
    subject: "Tu código de acceso",
    html,
  });

  return info;
}
