import { smtpTransporter } from "@/lib/smtp"

export async function sendOtpEmail(to: string, code: string) {
  const app = "GENIO"
  const brandPrimary = "#6D28D9" // morado
  const brandAccent = "#DB2777" // rosado
  const textColor = "#111827" // gray-900
  const muted = "#6B7280" // gray-500
  const preheader = `Tu código de acceso es ${code}. Expira en 10 minutos.`

  const cid = "gio-send@genio" // cualquier id único

  const html = `
<!doctype html>
<html lang="es">
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${app} – Código de verificación</title>
  <style>
    /* Resets básicos seguros para email */
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100% }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt }
    img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; display:block }
    body { margin:0; padding:0; width:100% !important; height:100% !important; background:#F9FAFB }
    a { color:${brandPrimary}; text-decoration:none }
    .btn:hover { filter:brightness(0.95) }
    @media (prefers-color-scheme: dark) {
      body { background:#0B0B0F !important }
      .card { background:#11121A !important; box-shadow:none !important }
      .text { color:#E5E7EB !important }
      .muted { color:#9CA3AF !important }
      .code { background:#0F172A !important; color:#E2E8F0 !important }
    }
  </style>
</head>
<body>
  <!-- Preheader (oculto) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; visibility:hidden;">
    ${preheader}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;" class="card">
          <tr>
            <td style="background:linear-gradient(135deg, #FFFFFF 0%, #F8FAFB 100%); border-radius:20px; box-shadow:0 16px 48px rgba(17,24,39,0.08); overflow:hidden;">

              <!-- Header con Logo y Gradiente -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:40px 24px 32px; background:linear-gradient(135deg, ${brandPrimary} 0%, ${brandAccent} 100%);">
                    <!-- Logo SVG inline -->
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:16px;">
                      <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4m0 36c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16m0-28c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12" fill="white"/>
                    </svg>
                    <h1 style="margin:0; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:28px; font-weight:800; color:#FFFFFF; letter-spacing:-0.5px;">
                      ${app}
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Contenido Principal -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:40px 24px;">
                    
                    <!-- Título -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding:0 0 24px 0;">
                          <h2 style="margin:0; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:24px; font-weight:700; color:${textColor}; line-height:1.3;">
                            Verifica tu identidad
                          </h2>
                          <p style="margin:8px 0 0 0; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:15px; color:${muted}; line-height:1.5;">
                            Tu código de acceso de dos factores
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Código Principal (Destacado) -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding:32px 0;">
                          <div style="
                            font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                            font-weight:800; 
                            font-size:36px; 
                            letter-spacing:6px;
                            color:#FFFFFF; 
                            background:linear-gradient(135deg, ${brandPrimary}, ${brandAccent});
                            padding:20px 28px; 
                            border-radius:16px; 
                            display:inline-block;
                            box-shadow:0 8px 24px rgba(109, 40, 217, 0.24);">
                            ${code}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:16px 0 0 0;">
                          <p style="margin:0; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:13px; color:${muted};">
                            Expira en 10 minutos • No lo compartas con nadie
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Descripción -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding:28px 0 0 0;">
                          <p style="margin:0; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:14px; color:${muted}; line-height:1.6;">
                            Usa este código para completar el login seguro en <strong>${app}</strong>. Si no solicitaste este código, ignora este mensaje.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Separador visual -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:28px 0;">
                          <div style="height:1px; background:linear-gradient(90deg, transparent, #E5E7EB, transparent);"></div>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding:8px 0;">
                          <a class="btn" href="https://genio-flame.vercel.app/login/2fa" style="
                            background:linear-gradient(135deg, ${brandPrimary}, ${brandAccent});
                            color:#FFF; 
                            padding:13px 32px; 
                            border-radius:12px;
                            font-family:system-ui,-apple-system, Segoe UI, Roboto, Arial; 
                            font-weight:600; 
                            font-size:14px; 
                            display:inline-block;
                            text-decoration:none;
                            transition:all 0.3s ease;
                            box-shadow:0 4px 12px rgba(109, 40, 217, 0.2);">
                            Abrir ${app}
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6; border-top:1px solid #E5E7EB;">
                <tr>
                  <td align="center" style="padding:24px 16px;">
                    <p style="margin:0 0 12px 0; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:12px; color:${muted};">
                      © ${new Date().getFullYear()} ${app}. Todos los derechos reservados.
                    </p>
                    <p style="margin:0; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:11px; color:#9CA3AF;">
                      <a href="#" style="color:${brandPrimary}; text-decoration:none;">Política de privacidad</a> • 
                      <a href="#" style="color:${brandPrimary}; text-decoration:none;">Términos de servicio</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  // Texto plano (fallback)
  const text = `Tu código de acceso a ${app} es: ${code}\n\nEste código expira en 10 minutos.\nSi no fuiste tú, ignora este correo.`

  const info = await smtpTransporter.sendMail({
    from: process.env.SMTP_FROM!,
    to,
    subject: `Tu código de verificación: ${code}`,
    html,
    text,
  })

  return info
}
