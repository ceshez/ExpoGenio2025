<p align="center">
  <img src="./app/public/banner-genio.svg" alt="GENIO Banner" width="100%" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/ExpoTec-2025-purple?style=for-the-badge" />
</p>

# 🧠 GENIO -- Creador de Sitios Web Inteligente

**GENIO** es una plataforma **no-code / low-code** desarrollada por
**Carlos Sánchez Hernández**, creada para ayudar a **emprendedores,
tiendas y pymes** a construir su presencia digital fácilmente mediante
un sistema **drag & drop** intuitivo, moderno y totalmente funcional.

![Genio Preview](https://your-image-url-here.png)

------------------------------------------------------------------------

## 🚀 Descripción General

GENIO permite a los usuarios crear sitios web completos sin necesidad de
programar, combinando **simplicidad visual** con una **arquitectura
sólida en React y Next.js**.\
A través de una interfaz intuitiva basada en **Puck**, los usuarios
pueden agregar secciones, personalizar colores, ajustar diseños y
publicar su sitio directamente, con todo guardado en base de datos.

> 💡 *El propósito de GENIO es empoderar a los pequeños negocios de
> Costa Rica y Latinoamérica, dándoles acceso a tecnología profesional
> de forma sencilla y accesible.*

------------------------------------------------------------------------

## 🧩 Características Principales

-   🖱️ **Editor visual drag & drop** (basado en Puck)
-   🎨 **Componentes personalizables**
-   🧠 **Secciones inteligentes:** encabezados, héroes, carruseles,
    grids, cartas de producto, secciones "Misión y Visión", perfiles,
    etc.
-   📱 **Diseño responsive** con Tailwind CSS
-   🔒 **Sistema de autenticación seguro**
-   🗄️ **Base de datos PostgreSQL (Prisma)**
-   ⚙️ **API en Node.js / Express / Prisma**
-   💾 **Persistencia en tiempo real**
-   🌐 **Modo tienda y landing page**

------------------------------------------------------------------------

## 🧱 Stack Tecnológico

  Tecnología               Uso
  ------------------------ ---------------------------------------
  **Next.js 14**           Framework principal del frontend
  **React 18**             Base del sistema visual
  **Tailwind CSS**         Estilización rápida y responsive
  **shadcn/ui**            Componentes modernos
  **Puck (Measured)**      Motor del editor visual drag & drop
  **Node.js + Express**    Backend del sistema de autenticación
  **Prisma ORM**           Gestión de base de datos (PostgreSQL)
  **Prisma**               Base de datos PostgreSQL escalable
  **TypeScript**           Tipado seguro
  **Lucide React Icons**   Iconografía moderna

------------------------------------------------------------------------

## 🧩 Componentes Personalizados

GENIO incluye una librería de elementos diseñados para sitios
empresariales y tiendas:

-   **Encabezado**
-   **Hero Section**
-   **Grid / Flex / Galería**
-   **Carta de Producto**
-   **Sección de Texto**
-   **Misión / Visión / Valores**
-   **Carrusel**
-   **Carta de Perfil**
-   **Espacio**
-   **Video (en desarrollo)**

------------------------------------------------------------------------

## 🔐 Seguridad

-   Contraseña mínima de 8 caracteres\
-   Al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial\
-   Contraseñas encriptadas con **bcrypt**
-   Protección de rutas con **JWT**
-   Validación de datos tanto en frontend como backend

------------------------------------------------------------------------

## 🧰 Scripts Principales

``` bash
npm install
npm run dev
npm run build
npm start
npx prisma db push
```

------------------------------------------------------------------------

## 🧠 Estructura del Proyecto

    app/
     ├── api/
     │   └── auth/
     │       ├── register/route.ts
     │       └── login/route.ts
     ├── puck/
     │   ├── config.tsx
     │   └── page.tsx
     ├── components/
     │   ├── FloatingInput.tsx
     │   ├── Modal.tsx
     │   ├── LogoGenio.tsx
     │   └── ...
     ├── (auth)/
     │   ├── Register.tsx
     │   ├── Login.tsx
     │   └── ...
     └── lib/
         ├── prisma.ts
         ├── validations.ts
         └── utils.ts

------------------------------------------------------------------------

## 💡 Filosofía del Proyecto

> "GENIO no es solo una herramienta.\
> Es el puente entre la creatividad de las personas y la tecnología que
> las hace visibles."

Cada decisión en su desarrollo está pensada para: - Simplificar el
diseño web sin perder personalización.\
- Reducir las barreras técnicas para emprendedores.\
- Fomentar el uso de tecnologías modernas en Costa Rica.

------------------------------------------------------------------------

## 👤 Autor

<p align="left">
  <img src="/app/public/logo-genio.svg" alt="GENIO Logo" width="70" align="left" style="margin-right:10px;" />
  <strong>Carlos Eduardo Sánchez Hernández</strong><br/>
  Colegio Técnico Profesional CEDES Don Bosco<br/>
  🇨🇷 San José, Costa Rica<br/>
  💻 Especialidad en Desarrollo Web
</p>

------------------------------------------------------------------------

## 📄 Licencia

MIT License © 2025 --- Carlos Sánchez Hernández\
Libre para uso educativo y de innovación tecnológica.
