// puck.config.tsx
import * as React from "react";
import { type Config } from "@puckeditor/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bolt, Eye, Target, ShieldCheck, Rocket, Lightbulb,
  HeartHandshake, Scale, Star, UserRound, Link as LinkIcon,
  ChevronDown, CheckCircle2, Quote, Phone, Mail, MapPin,
  Instagram, Twitter, Facebook, Linkedin, Youtube,
  ShoppingBag, Award, TrendingUp, Users, Clock,
} from "lucide-react";

/* ============================================================
   UTILIDADES
   ============================================================ */

const pads: Record<string, string> = {
  "0": "p-0", xs: "p-2", sm: "p-4", md: "p-6", lg: "p-8", xl: "p-12",
  "y-sm": "py-8", "y-md": "py-16", "y-lg": "py-24", "y-xl": "py-32",
};
const pad = (v: string) => pads[v] || "p-0";

const gaps: Record<string, string> = {
  "0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6",
  "8": "gap-8", "10": "gap-10", "12": "gap-12",
};

const gridCols = (n: number) =>
  (["","grid-cols-1","grid-cols-2","grid-cols-3","grid-cols-4",
    "grid-cols-5","grid-cols-6"][Math.max(1, Math.min(6, n))] || "grid-cols-3");

const bgOpts = [
  "bg-white", "bg-gray-50", "bg-gray-100", "bg-gray-900", "bg-black",
  "bg-slate-50", "bg-slate-800", "bg-slate-900",
  "bg-zinc-50", "bg-zinc-900",
  "bg-stone-50", "bg-stone-900",
  "bg-blue-600", "bg-blue-950",
  "bg-emerald-600", "bg-emerald-950",
  "bg-rose-600", "bg-amber-400",
];

const textOpts = [
  "text-gray-900", "text-gray-700", "text-gray-500",
  "text-white", "text-gray-100",
  "text-slate-900", "text-slate-100",
];

const borderOpts = [
  "", "border border-gray-100", "border border-gray-200",
  "border border-gray-300", "border-t border-gray-100",
  "border-b border-gray-100", "ring-1 ring-gray-100",
];

const shadowOpts = ["", "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl"];

const roundOpts = [
  { label: "Sin borde", value: "" },
  { label: "sm", value: "rounded-sm" },
  { label: "md", value: "rounded-md" },
  { label: "lg", value: "rounded-lg" },
  { label: "xl", value: "rounded-xl" },
  { label: "2xl", value: "rounded-2xl" },
  { label: "3xl", value: "rounded-3xl" },
  { label: "Full", value: "rounded-full" },
];

const ICONS: Record<string, React.ReactElement> = {
  bolt: <Bolt className="w-5 h-5" />,
  eye: <Eye className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  idea: <Lightbulb className="w-5 h-5" />,
  handshake: <HeartHandshake className="w-5 h-5" />,
  scale: <Scale className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  bag: <ShoppingBag className="w-5 h-5" />,
  check: <CheckCircle2 className="w-5 h-5" />,
};

const buttonTransitions: Record<string, string> = {
  "scale": "hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95",
  "lift": "hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 active:translate-y-0",
  "glow": "hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 active:shadow-none",
  "slide": "hover:translate-x-1 transition-all duration-300 active:-translate-x-0.5",
  "pulse": "hover:animate-pulse transition-all duration-300",
  "gradient": "hover:bg-gradient-to-r transition-all duration-300 active:opacity-80",
  "smooth": "hover:opacity-90 transition-opacity duration-500 active:opacity-75",
};

/* ============================================================
   COMPONENTES REACT SEPARADOS (para los que usan hooks)
   ============================================================ */

/* --- Header con Hamburguesa --- */
const HeaderRender = ({ titulo, logoUrl, nav, estilo, fondo, texto, padding, borde, sombra }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className={`${fondo} ${texto} ${pad(padding)} ${borde} ${sombra} sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto">
        <div className={`flex items-center ${estilo === "centrado" ? "flex-col" : "justify-between"}`}>
          {/* Logo/Título */}
          <div className="flex items-center gap-3">
            {logoUrl
              ? <img src={logoUrl} alt={titulo} className="h-8 sm:h-9 w-auto" />
              : <span className="text-base sm:text-lg font-black tracking-tight">{titulo}</span>}
          </div>

          {/* Nav Desktop */}
          {nav?.length > 0 && (
            <nav className="hidden lg:block">
              <ul className={`flex items-center gap-6 ${estilo === "centrado" ? "justify-center" : ""}`}>
                {nav.map((n: any, i: number) => (
                  <li key={i}>
                    <a href={n.url} className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Hamburger Button - Mobile & Tablet */}
          {nav?.length > 0 && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 flex flex-col gap-1.5"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current block transition-all"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-current block transition-all"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current block transition-all"
              />
            </motion.button>
          )}
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 lg:hidden"
              />

              {/* Drawer Nav */}
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg"
              >
                <ul className="flex flex-col">
                  {nav.map((n: any, i: number) => (
                    <li key={i} className="border-b border-gray-100 last:border-0">
                      <a
                        href={n.url}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 sm:px-6 py-3 text-sm font-medium opacity-70 hover:opacity-100 hover:bg-gray-50 transition-colors"
                      >
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

/* --- Hero con palabras rotativas --- */
const HeroAnimadoRender = ({
  titulo, palabras, descripcion, ctaLabel, ctaUrl,
  ctaSecLabel, ctaSecUrl, imagenUrl, fondo, texto, padding,
}: {
  titulo: string; palabras: { texto: string }[];
  descripcion: string; ctaLabel: string; ctaUrl: string;
  ctaSecLabel: string; ctaSecUrl: string; imagenUrl: string;
  fondo: string; texto: string; padding: string;
}) => {
  const [idx, setIdx] = React.useState(0);
  const lista = palabras?.length ? palabras : [{ texto: "increíble" }];

  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % lista.length), 2200);
    return () => clearInterval(t);
  }, [lista.length]);

  return (
    <section className={`${fondo} ${texto} ${pad(padding)} overflow-hidden`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center px-4 sm:px-6 md:px-0">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase opacity-50 mb-3 sm:mb-4"
          >
            Bienvenido
          </motion.p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-3 sm:mb-4">
            {titulo}{" "}
            <span className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500"
                >
                  {lista[idx].texto}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="text-sm sm:text-base opacity-70 mb-6 sm:mb-8 max-w-md leading-relaxed">{descripcion}</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {ctaLabel && (
              <a href={ctaUrl} className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                {ctaLabel}
              </a>
            )}
            {ctaSecLabel && (
              <a href={ctaSecUrl} className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-current font-semibold opacity-70 hover:opacity-100 transition-all">
                {ctaSecLabel}
              </a>
            )}
          </div>
        </div>
        {imagenUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
            <img src={imagenUrl} alt={titulo} className="relative rounded-2xl w-full object-cover shadow-2xl aspect-[4/3]" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

/* --- Carrusel Tradicional con Auto-play --- */
const CarruselRender = ({
  slides, fondo, texto, padding, borde, sombra,
}: {
  slides: { tipo: "image" | "video"; url: string; caption?: string }[];
  fondo: string; texto: string; padding: string; borde: string; sombra: string;
}) => {
  const [current, setCurrent] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  // Auto-play cada 5 segundos
  React.useEffect(() => {
    if (!slides?.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides?.length]);

  const goToSlide = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);

    if (touchStart - touchEnd > 50) {
      goToSlide(current + 1);
    }
    if (touchEnd - touchStart > 50) {
      goToSlide(current - 1);
    }
  };

  if (!slides?.length) return null;

  const slide = slides[current];

  return (
    <section className={`${fondo} ${texto} ${pad(padding)}`}>
      <div className="max-w-5xl mx-auto">
        {/* Carousel Container */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide */}
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {slide.tipo === "image" ? (
              slide.url ? (
                <img
                  src={slide.url}
                  alt={slide.caption || "Slide"}
                  className="w-full h-60 sm:h-80 lg:h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-60 sm:h-80 lg:h-[400px] bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center">
                  <div className="text-center opacity-50">
                    <p className="text-sm font-medium">Imagen no disponible</p>
                  </div>
                </div>
              )
            ) : (
              <video
                src={slide.url}
                controls
                className="w-full h-60 sm:h-80 lg:h-[400px] object-cover bg-black"
              />
            )}
          </motion.div>

          {/* Caption */}
          {slide.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              <p className="text-sm md:text-base font-medium">{slide.caption}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToSlide(current - 1)}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 transition-all shadow-lg z-10"
          >
            <span className="text-lg sm:text-xl font-bold">‹</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToSlide(current + 1)}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 transition-all shadow-lg z-10"
          >
            <span className="text-lg sm:text-xl font-bold">›</span>
          </motion.button>
        </div>

        {/* Dot Indicators */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToSlide(i)}
                whileHover={{ scale: 1.2 }}
                className={`rounded-full transition-all ${
                  i === current
                    ? "bg-gray-900 w-3 h-3"
                    : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* --- FAQ Accordion --- */
const FAQRender = ({
  items, titulo, fondo, texto, padding,
}: {
  items: { pregunta: string; respuesta: string }[];
  titulo: string; fondo: string; texto: string; padding: string;
}) => {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <section className={`${fondo} ${texto} ${pad(padding)}`}>
      <div className="max-w-3xl mx-auto">
        {titulo && <h2 className="text-3xl font-bold mb-10 text-center">{titulo}</h2>}
        <div className="space-y-3">
          {items?.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold hover:bg-gray-50 transition-colors"
              >
                <span>{item.pregunta}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed">{item.respuesta}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   TIPOS
   ============================================================ */
type Props = {
  Texto: { contenido: string; nivel: "h1"|"h2"|"h3"|"h4"; alineacion: "left"|"center"|"right"; fondo: string; texto: string; padding: string; };
  Parrafo: { contenido: string; tamaño: "sm"|"base"|"lg"|"xl"; alineacion: "left"|"center"|"right"; fondo: string; texto: string; padding: string; maxAncho: "sm"|"lg"|"2xl"|"4xl"|"none"; };
  Header: { titulo: string; logoUrl: string; nav: { label: string; url: string }[]; fondo: string; texto: string; padding: string; borde: string; sombra: string; estilo: "simple"|"centrado"; };
  Hero: { titulo: string; descripcion: string; ctaLabel: string; ctaUrl: string; ctaSecLabel: string; ctaSecUrl: string; imagenUrl: string; fondo: string; texto: string; padding: string; };
  HeroAnimado: { titulo: string; palabras: { texto: string }[]; descripcion: string; ctaLabel: string; ctaUrl: string; ctaSecLabel: string; ctaSecUrl: string; imagenUrl: string; fondo: string; texto: string; padding: string; };
  Boton: { label: string; url: string; alineacion: "left"|"center"|"right"; variante: "solido"|"outline"|"ghost"; fondo: string; texto: string; tam: "sm"|"md"|"lg"; radio: string; sombra: string; transicion: "scale"|"lift"|"glow"|"slide"|"pulse"|"smooth"; };
  Equipo: { titulo: string; subtitulo: string; miembros: { foto: string; nombre: string; role: string; bio: string; redes: { tipo: "instagram"|"twitter"|"linkedin"; url: string }[] }[]; fondo: string; texto: string; padding: string; };
  Servicios: { titulo: string; subtitulo: string; items: { icono: string; titulo: string; descripcion: string; enlace: string }[]; variante: "grid"|"columnas"; fondo: string; texto: string; padding: string; };
  Newsletter: { titulo: string; descripcion: string; placeholder: string; botonLabel: string; botonUrl: string; fondo: string; texto: string; padding: string; };
  Pasos: { titulo: string; items: { numero: string; titulo: string; descripcion: string }[]; fondo: string; texto: string; padding: string; };
  Comparativa: { titulo: string; descripcion: string; imagen1Url: string; imagen2Url: string; label1: string; label2: string; fondo: string; texto: string; padding: string; };
  PortfolioGrid: { titulo: string; items: { imagen: string; titulo: string; categoria: string; enlace: string }[]; columnas: number; fondo: string; texto: string; padding: string; };
  EquipoCompacto: { titulo: string; miembros: { nombre: string; rol: string; foto: string }[]; fondo: string; texto: string; padding: string; };
  SeccionTexto: { titulo: string; subtitulo: string; contenido: string; nivel: "h1"|"h2"|"h3"; alineacion: "left"|"center"|"right"; fondo: string; texto: string; padding: string; };
  Imagen: { url: string; alt: string; radio: string; borde: string; sombra: string; aspecto: "auto"|"square"|"video"|"portrait"; };
  Espacio: { alto: "2"|"4"|"6"|"8"|"12"|"16"|"24"|"32"; };
  Grid: { items: any[]; columnas: number; gap: string; colorFondo: string; padding: string; };
  FlexBox: { contenido: any[]; direccion: "row"|"column"; alineacion: "start"|"center"|"end"|"between"; gap: string; fondo: string; padding: string; };
  Galeria: { contenido: any[]; columnasDesktop: number; gap: string; fondo: string; padding: string; };
  Carrusel: { slides: { tipo: "image"|"video"; url: string; caption?: string }[]; fondo: string; texto: string; padding: string; borde: string; sombra: string; };
  Video: { url: string; poster: string; caption: string; autoplay: "si"|"no"; loop: "si"|"no"; controls: "si"|"no"; muted: "si"|"no"; variante: "simple"|"card"|"framed"; ratio: "16/9"|"4/3"|"1/1"; radio: string; borde: string; sombra: string; alineacion: "start"|"center"|"end"; ancho: "max-w-sm"|"max-w-md"|"max-w-lg"|"max-w-2xl"|"max-w-4xl"|"max-w-none"; fondo: string; texto: string; padding: string; };
  MisionVision: { variante: "dos-col"|"tarjetas"; items: { icono: string; titulo: string; texto: string }[]; fondo: string; texto: string; padding: string; };
  MisionVisionValores: { items: { icono: string; titulo: string; texto: string }[]; fondo: string; texto: string; padding: string; };
  CartaPerfil: { fotoUrl: string; nombre: string; rol: string; bio: string; fondo: string; texto: string; padding: string; borde: string; sombra: string; radio: string; links: { label: string; url: string }[]; };
  CartaProducto: { imagenUrl: string; titulo: string; descripcion: string; precio: string; moneda: "CRC"|"USD"|"EUR"; badge: string; botonLabel: string; botonUrl: string; layout: "vertical"|"horizontal"; fondo: string; texto: string; padding: string; borde: string; sombra: string; radio: string; };
  BannerCTA: { titulo: string; descripcion: string; ctaLabel: string; ctaUrl: string; ctaSecLabel: string; ctaSecUrl: string; fondo: string; texto: string; padding: string; alineacion: "left"|"center"; };
  Estadisticas: { items: { numero: string; sufijo: string; descripcion: string; icono: string }[]; fondo: string; texto: string; padding: string; columnas: number; };
  Caracteristicas: { titulo: string; subtitulo: string; items: { icono: string; titulo: string; descripcion: string }[]; variante: "grid"|"lista"|"alternado"; fondo: string; texto: string; padding: string; };
  TestimonioCard: { nombre: string; rol: string; empresa: string; fotoUrl: string; texto: string; estrellas: number; fondo: string; texto_color: string; padding: string; borde: string; sombra: string; radio: string; };
  TestimoniosGrid: { titulo: string; items: { nombre: string; rol: string; texto: string; estrellas: number; fotoUrl: string }[]; fondo: string; texto: string; padding: string; };
  PrecioCard: { titulo: string; precio: string; moneda: "CRC"|"USD"|"EUR"; periodo: "mes"|"año"|"único"; descripcion: string; caracteristicas: { texto: string }[]; ctaLabel: string; ctaUrl: string; destacado: "si"|"no"; fondo: string; texto: string; padding: string; radio: string; };
  FAQAccordion: { titulo: string; items: { pregunta: string; respuesta: string }[]; fondo: string; texto: string; padding: string; };
  ContactoInfo: { titulo: string; descripcion: string; telefono: string; email: string; direccion: string; redes: { tipo: "instagram"|"twitter"|"facebook"|"linkedin"|"youtube"; url: string }[]; fondo: string; texto: string; padding: string; };
  LogoGrid: { titulo: string; logos: { url: string; nombre: string }[]; fondo: string; padding: string; };
  Timeline: { titulo: string; items: { año: string; titulo: string; descripcion: string }[]; fondo: string; texto: string; padding: string; };
  Divisor: { estilo: "linea"|"puntos"|"ondas"; fondo: string; padding: string; };
  Footer: { nombre: string; descripcion: string; columnas: { titulo: string; links: { label: string; url: string }[] }[]; redes: { tipo: "instagram"|"twitter"|"facebook"|"linkedin"|"youtube"; url: string }[]; copyright: string; fondo: string; texto: string; padding: string; };
};

/* ============================================================
   CONFIG
   ============================================================ */
export const config: Config<Props> = {
  categories: {
    Estructura: { title: "Estructura", components: ["Header","Footer","Divisor","Espacio","Grid","FlexBox"] },
    Heroes: { title: "Heroes", components: ["Hero","HeroAnimado","BannerCTA"] },
    Contenido: { title: "Contenido", components: ["Texto","Parrafo","SeccionTexto"] },
    Características: { title: "Características", components: ["Caracteristicas","Estadisticas","MisionVision","MisionVisionValores"] },
    Equipo: { title: "Equipo", components: ["Equipo","EquipoCompacto","CartaPerfil"] },
    Servicios: { title: "Servicios & Productos", components: ["Servicios","CartaProducto","PrecioCard"] },
    Multimedia: { title: "Multimedia", components: ["Imagen","Galeria","Carrusel","Video","Comparativa"] },
    Social: { title: "Prueba Social", components: ["TestimonioCard","TestimoniosGrid","FAQAccordion"] },
    Portafolio: { title: "Portafolio", components: ["PortfolioGrid"] },
    Conversión: { title: "Conversión", components: ["Newsletter","ContactoInfo","LogoGrid","Pasos"] },
    Utilidades: { title: "Utilidades", components: ["Boton","Timeline"] },
    others: { title: "Otros" },
  },

  components: {

    /* ── HEADER ─────────────────────────────────────────────── */
    Header: {
      fields: {
        titulo: { type: "text" },
        logoUrl: { type: "text" },
        nav: { type: "array", arrayFields: { label: { type: "text" }, url: { type: "text" } }, defaultItemProps: { label: "Enlace", url: "#" } },
        estilo: { type: "select", options: [{ label: "Simple", value: "simple" }, { label: "Centrado", value: "centrado" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
        borde: { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
      },
      defaultProps: {
        titulo: "Mi Empresa", logoUrl: "",
        nav: [{ label: "Inicio", url: "#" }, { label: "Servicios", url: "#" }, { label: "Contacto", url: "#" }],
        estilo: "simple", fondo: "bg-white", texto: "text-gray-900", padding: "sm",
        borde: "border-b border-gray-100", sombra: "",
      },
      render: (props) => <HeaderRender {...props} />,
    },

    /* ── FOOTER ──────────────────────────────────────────── */
    Footer: {
      fields: {
        nombre: { type: "text" },
        descripcion: { type: "textarea" },
        columnas: {
          type: "array",
          arrayFields: {
            titulo: { type: "text" },
            links: { type: "array", arrayFields: { label: { type: "text" }, url: { type: "text" } }, defaultItemProps: { label: "Enlace", url: "#" } },
          },
          defaultItemProps: { titulo: "Columna", links: [] },
        },
        redes: {
          type: "array",
          arrayFields: {
            tipo: { type: "select", options: ["instagram","twitter","facebook","linkedin","youtube"].map(v => ({ label: v, value: v })) },
            url: { type: "text" },
          },
          defaultItemProps: { tipo: "instagram", url: "#" },
        },
        copyright: { type: "text" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        nombre: "Mi Empresa",
        descripcion: "Construyendo tu presencia digital.",
        columnas: [
          { titulo: "Empresa", links: [{ label: "Nosotros", url: "#" }, { label: "Servicios", url: "#" }] },
          { titulo: "Soporte", links: [{ label: "FAQ", url: "#" }, { label: "Contacto", url: "#" }] },
        ],
        redes: [{ tipo: "instagram", url: "#" }],
        copyright: `© ${new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.`,
        fondo: "bg-gray-900", texto: "text-white", padding: "y-md",
      },
      render: ({ nombre, descripcion, columnas, redes, copyright, fondo, texto, padding }) => {
        const REDES_ICONS: Record<string, React.ReactElement> = {
          instagram: <Instagram className="w-4 h-4" />,
          twitter: <Twitter className="w-4 h-4" />,
          facebook: <Facebook className="w-4 h-4" />,
          linkedin: <Linkedin className="w-4 h-4" />,
          youtube: <Youtube className="w-4 h-4" />,
        };
        return (
          <footer className={`${fondo} ${texto} ${pad(padding)}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div className="lg:col-span-1">
                  <p className="font-black text-lg mb-3">{nombre}</p>
                  <p className="text-sm opacity-50 leading-relaxed">{descripcion}</p>
                  {redes?.length > 0 && (
                    <div className="flex gap-3 mt-5">
                      {redes.map((r, i) => (
                        <a key={i} href={r.url} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                          {REDES_ICONS[r.tipo]}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {columnas?.map((col, i) => (
                  <div key={i}>
                    <p className="font-semibold text-sm mb-4 opacity-70 tracking-wide uppercase">{col.titulo}</p>
                    <ul className="space-y-2.5">
                      {col.links?.map((l, j) => (
                        <li key={j}><a href={l.url} className="text-sm opacity-50 hover:opacity-100 transition-opacity">{l.label}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6 text-sm opacity-40">{copyright}</div>
            </div>
          </footer>
        );
      },
    },

    /* ── HERO (estático) ─────────────────────────────────── */
    Hero: {
      fields: {
        titulo: { type: "text" },
        descripcion: { type: "textarea" },
        ctaLabel: { type: "text" }, ctaUrl: { type: "text" },
        ctaSecLabel: { type: "text" }, ctaSecUrl: { type: "text" },
        imagenUrl: { type: "text" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Tu negocio en línea",
        descripcion: "Crea tu presencia digital de manera fácil, rápida y profesional.",
        ctaLabel: "Comenzar ahora", ctaUrl: "#",
        ctaSecLabel: "Ver más", ctaSecUrl: "#",
        imagenUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, descripcion, ctaLabel, ctaUrl, ctaSecLabel, ctaSecUrl, imagenUrl, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center px-4 sm:px-6 md:px-0">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-5">{titulo}</h1>
              <p className="text-base sm:text-lg opacity-60 mb-6 sm:mb-8 leading-relaxed max-w-md">{descripcion}</p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                {ctaLabel && (
                  <a href={ctaUrl} className="inline-flex items-center justify-center sm:justify-start px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                    {ctaLabel}
                  </a>
                )}
                {ctaSecLabel && (
                  <a href={ctaSecUrl} className="inline-flex items-center justify-center sm:justify-start px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-current font-semibold opacity-60 hover:opacity-100 transition-all">
                    {ctaSecLabel}
                  </a>
                )}
              </div>
            </div>
            {imagenUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden md:block"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-gray-200 to-gray-100 rounded-3xl blur-2xl" />
                <img src={imagenUrl} alt={titulo} className="relative rounded-2xl w-full object-cover shadow-2xl aspect-[4/3]" />
              </motion.div>
            )}
          </div>
        </section>
      ),
    },

    /* ── HERO ANIMADO ────────────────────────────────────── */
    HeroAnimado: {
      fields: {
        titulo: { type: "text" },
        palabras: { type: "array", arrayFields: { texto: { type: "text" } }, defaultItemProps: { texto: "increíble" } },
        descripcion: { type: "textarea" },
        ctaLabel: { type: "text" }, ctaUrl: { type: "text" },
        ctaSecLabel: { type: "text" }, ctaSecUrl: { type: "text" },
        imagenUrl: { type: "text" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Tu negocio,",
        palabras: [{ texto: "más visible" }, { texto: "más rápido" }, { texto: "más profesional" }],
        descripcion: "Crea tu sitio web en minutos. Sin código, sin complicaciones.",
        ctaLabel: "Empezar gratis", ctaUrl: "#",
        ctaSecLabel: "Ver demo", ctaSecUrl: "#",
        imagenUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
        fondo: "bg-white", texto: "text-gray-900", padding: "y-xl",
      },
      render: (props) => <HeroAnimadoRender {...props} />,
    },

    /* ── BANNER CTA ──────────────────────────────────────── */
    BannerCTA: {
      fields: {
        titulo: { type: "text" },
        descripcion: { type: "textarea" },
        ctaLabel: { type: "text" }, ctaUrl: { type: "text" },
        ctaSecLabel: { type: "text" }, ctaSecUrl: { type: "text" },
        alineacion: { type: "select", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "¿Listo para dar el siguiente paso?",
        descripcion: "Únete a cientos de negocios que ya confían en nosotros.",
        ctaLabel: "Comenzar ahora", ctaUrl: "#",
        ctaSecLabel: "", ctaSecUrl: "#",
        alineacion: "center",
        fondo: "bg-gray-900", texto: "text-white", padding: "y-lg",
      },
      render: ({ titulo, descripcion, ctaLabel, ctaUrl, ctaSecLabel, ctaSecUrl, alineacion, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className={`max-w-4xl mx-auto ${alineacion === "center" ? "text-center" : ""}`}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{titulo}</h2>
            {descripcion && <p className="text-lg opacity-60 mb-8 max-w-xl mx-auto">{descripcion}</p>}
            <div className={`flex flex-wrap gap-3 ${alineacion === "center" ? "justify-center" : ""}`}>
              {ctaLabel && (
                <a href={ctaUrl} className="inline-flex px-7 py-3.5 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5">
                  {ctaLabel}
                </a>
              )}
              {ctaSecLabel && (
                <a href={ctaSecUrl} className="inline-flex px-7 py-3.5 rounded-xl border border-white/30 font-semibold opacity-70 hover:opacity-100 transition-all">
                  {ctaSecLabel}
                </a>
              )}
            </div>
          </div>
        </section>
      ),
    },

    /* ── TEXTO ───────────────────────────────────────────── */
    Texto: {
      fields: {
        contenido: { type: "textarea" },
        nivel: { type: "select", options: ["h1","h2","h3","h4"].map(v => ({ label: v, value: v })) },
        alineacion: { type: "select", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: { contenido: "Tu título aquí", nivel: "h2", alineacion: "left", fondo: "bg-white", texto: "text-gray-900", padding: "sm" },
      render: ({ contenido, nivel, alineacion, fondo, texto, padding }) => {
        const Tag = nivel as keyof React.JSX.IntrinsicElements;
        const sizeMap: Record<string,string> = { h1: "text-5xl md:text-6xl font-black", h2: "text-3xl md:text-4xl font-bold", h3: "text-2xl font-bold", h4: "text-xl font-semibold" };
        const alignMap: Record<string,string> = { left: "text-left", center: "text-center", right: "text-right" };
        return (
          <div className={`${fondo} ${texto} ${pad(padding)} ${alignMap[alineacion]}`}>
            {React.createElement(Tag, { className: `${sizeMap[nivel]} leading-tight` }, contenido)}
          </div>
        );
      },
    },

    /* ── PÁRRAFO ─────────────────────────────────────────── */
    Parrafo: {
      fields: {
        contenido: { type: "textarea" },
        tamaño: { type: "select", options: [{ label: "Pequeño", value: "sm" }, { label: "Normal", value: "base" }, { label: "Grande", value: "lg" }, { label: "Extra", value: "xl" }] },
        alineacion: { type: "select", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        maxAncho: { type: "select", options: [{ label: "Angosto", value: "sm" }, { label: "Mediano", value: "lg" }, { label: "Ancho", value: "2xl" }, { label: "Muy ancho", value: "4xl" }, { label: "Sin límite", value: "none" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        contenido: "Escribe aquí tu texto descriptivo.",
        tamaño: "base", alineacion: "left", maxAncho: "2xl",
        fondo: "bg-white", texto: "text-gray-700", padding: "sm",
      },
      render: ({ contenido, tamaño, alineacion, maxAncho, fondo, texto, padding }) => {
        const sizeMap: Record<string,string> = { sm: "text-sm", base: "text-base", lg: "text-lg", xl: "text-xl" };
        const alignMap: Record<string,string> = { left: "text-left", center: "text-center", right: "text-right" };
        const widthMap: Record<string,string> = { sm: "max-w-sm", lg: "max-w-lg", "2xl": "max-w-2xl", "4xl": "max-w-4xl", none: "max-w-none" };
        return (
          <div className={`${fondo} ${texto} ${pad(padding)} ${alignMap[alineacion]}`}>
            <p className={`${sizeMap[tamaño]} ${widthMap[maxAncho]} leading-relaxed opacity-80 ${alineacion === "center" ? "mx-auto" : ""}`}>
              {contenido}
            </p>
          </div>
        );
      },
    },

    /* ── SECCIÓN TEXTO ───────────────────────────────────── */
    SeccionTexto: {
      fields: {
        titulo: { type: "text" },
        subtitulo: { type: "text" },
        contenido: { type: "textarea" },
        nivel: { type: "select", options: ["h1","h2","h3"].map(v => ({ label: v, value: v })) },
        alineacion: { type: "select", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Sobre nosotros", subtitulo: "Quiénes somos",
        contenido: "Somos una empresa comprometida con el crecimiento de nuestros clientes.",
        nivel: "h2", alineacion: "center",
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, subtitulo, contenido, nivel, alineacion, fondo, texto, padding }) => {
        const Tag = nivel as keyof React.JSX.IntrinsicElements;
        const alignMap: Record<string,string> = { left: "text-left", center: "text-center", right: "text-right" };
        return (
          <section className={`${fondo} ${texto} ${pad(padding)} ${alignMap[alineacion]}`}>
            <div className="max-w-3xl mx-auto">
              {subtitulo && <p className="text-sm font-semibold tracking-widest uppercase opacity-40 mb-3">{subtitulo}</p>}
              {React.createElement(Tag, { className: "text-3xl md:text-4xl font-bold mb-5 leading-tight" }, titulo)}
              {contenido && <p className="text-lg opacity-60 leading-relaxed">{contenido}</p>}
            </div>
          </section>
        );
      },
    },

    /* ── CARACTERÍSTICAS ─────────────────────────────────── */
    Caracteristicas: {
      fields: {
        titulo: { type: "text" },
        subtitulo: { type: "text" },
        variante: { type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Lista", value: "lista" }, { label: "Alternado", value: "alternado" }] },
        items: {
          type: "array",
          arrayFields: {
            icono: { type: "select", options: Object.keys(ICONS).map(v => ({ label: v, value: v })) },
            titulo: { type: "text" }, descripcion: { type: "textarea" },
          },
          defaultItemProps: { icono: "rocket", titulo: "Característica", descripcion: "Descripción." },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "¿Por qué elegirnos?", subtitulo: "Nuestras ventajas",
        variante: "grid",
        items: [
          { icono: "rocket", titulo: "Rápido", descripcion: "Tu sitio listo en minutos." },
          { icono: "shield", titulo: "Seguro", descripcion: "Datos protegidos siempre." },
          { icono: "star", titulo: "Profesional", descripcion: "Diseño de primer nivel." },
        ],
        fondo: "bg-gray-50", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, subtitulo, variante, items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-6xl mx-auto">
            {(titulo || subtitulo) && (
              <div className="text-center mb-12">
                {subtitulo && <p className="text-sm font-semibold tracking-widest uppercase opacity-40 mb-2">{subtitulo}</p>}
                {titulo && <h2 className="text-3xl md:text-4xl font-bold">{titulo}</h2>}
              </div>
            )}
            {variante === "grid" && (
              <div className="grid md:grid-cols-3 gap-6">
                {items?.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-4">
                      {ICONS[item.icono] || ICONS["star"]}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.titulo}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.descripcion}</p>
                  </div>
                ))}
              </div>
            )}
            {variante === "lista" && (
              <div className="space-y-4 max-w-2xl mx-auto">
                {items?.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-9 h-9 bg-gray-900 text-white rounded-lg flex items-center justify-center shrink-0">
                      {ICONS[item.icono] || ICONS["check"]}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{item.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {variante === "alternado" && (
              <div className="space-y-16">
                {items?.map((item, i) => (
                  <div key={i} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-20 h-20 bg-gray-900 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-xl">
                      {ICONS[item.icono] || ICONS["star"]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{item.titulo}</h3>
                      <p className="text-gray-500 leading-relaxed">{item.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ),
    },

    /* ── ESTADÍSTICAS ────────────────────────────────────── */
    Estadisticas: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            numero: { type: "text" }, sufijo: { type: "text" },
            descripcion: { type: "text" },
            icono: { type: "select", options: Object.keys(ICONS).map(v => ({ label: v, value: v })) },
          },
          defaultItemProps: { numero: "100", sufijo: "+", descripcion: "Clientes felices", icono: "users" },
        },
        columnas: { type: "number" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        items: [
          { numero: "500", sufijo: "+", descripcion: "Clientes activos", icono: "users" },
          { numero: "99", sufijo: "%", descripcion: "Satisfacción", icono: "star" },
          { numero: "24", sufijo: "/7", descripcion: "Soporte", icono: "clock" },
          { numero: "5", sufijo: "años", descripcion: "De experiencia", icono: "award" },
        ],
        columnas: 4, fondo: "bg-gray-900", texto: "text-white", padding: "y-md",
      },
      render: ({ items, columnas, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className={`max-w-6xl mx-auto grid ${gridCols(columnas)} gap-8`}>
            {items?.map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3 opacity-40">{ICONS[item.icono] || ICONS["star"]}</div>
                <p className="text-4xl md:text-5xl font-black mb-1">
                  {item.numero}<span className="text-2xl opacity-50">{item.sufijo}</span>
                </p>
                <p className="text-sm opacity-50 font-medium">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    /* ── MISIÓN / VISIÓN ─────────────────────────────────── */
    MisionVision: {
      fields: {
        variante: { type: "select", options: [{ label: "2 columnas", value: "dos-col" }, { label: "Tarjetas", value: "tarjetas" }] },
        items: {
          type: "array",
          arrayFields: {
            icono: { type: "select", options: Object.keys(ICONS).map(v => ({ label: v, value: v })) },
            titulo: { type: "text" }, texto: { type: "textarea" },
          },
          defaultItemProps: { icono: "target", titulo: "Misión", texto: "Describe tu misión." },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        variante: "tarjetas",
        items: [
          { icono: "target", titulo: "Nuestra Misión", texto: "Impulsar el crecimiento digital de las PYMES." },
          { icono: "eye", titulo: "Nuestra Visión", texto: "Ser la plataforma número uno de creación web." },
        ],
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ variante, items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className={`max-w-6xl mx-auto grid md:grid-cols-2 ${variante === "tarjetas" ? "gap-6" : "gap-16"}`}>
            {items?.map((it, i) => (
              <div key={i} className={variante === "tarjetas"
                ? "rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow"
                : "flex items-start gap-5"}>
                <div className={`${variante === "tarjetas" ? "w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-5" : "w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-1"}`}>
                  {ICONS[it.icono] || ICONS["idea"]}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{it.titulo}</h3>
                  <p className="text-gray-500 leading-relaxed">{it.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    /* ── MISIÓN VISIÓN VALORES ───────────────────────────── */
    MisionVisionValores: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            icono: { type: "select", options: Object.keys(ICONS).map(v => ({ label: v, value: v })) },
            titulo: { type: "text" }, texto: { type: "textarea" },
          },
          defaultItemProps: { icono: "star", titulo: "Valor", texto: "Explica el valor." },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        items: [
          { icono: "handshake", titulo: "Compromiso", texto: "Acompañamos a cada cliente." },
          { icono: "scale", titulo: "Integridad", texto: "Hacemos lo correcto, siempre." },
          { icono: "star", titulo: "Excelencia", texto: "Buscamos el máximo valor." },
        ],
        fondo: "bg-gray-50", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {items?.map((it, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shrink-0">
                  {ICONS[it.icono] || ICONS["star"]}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{it.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{it.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    /* ── TESTIMONIO CARD ─────────────────────────────────── */
    TestimonioCard: {
      fields: {
        nombre: { type: "text" }, rol: { type: "text" }, empresa: { type: "text" },
        fotoUrl: { type: "text" }, texto: { type: "textarea" },
        estrellas: { type: "number" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto_color: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
        borde: { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
        radio: { type: "select", options: roundOpts },
      },
      defaultProps: {
        nombre: "María González", rol: "Dueña", empresa: "Boutique Flores",
        fotoUrl: "", texto: "Gracias a esta herramienta pude tener mi sitio web en un día. ¡Increíble!",
        estrellas: 5, fondo: "bg-white", texto_color: "text-gray-900", padding: "md",
        borde: "border border-gray-100", sombra: "shadow-sm", radio: "rounded-2xl",
      },
      render: ({ nombre, rol, empresa, fotoUrl, texto, estrellas, fondo, texto_color, padding, borde, sombra, radio }) => (
        <div className={`${fondo} ${texto_color} ${pad(padding)} ${borde} ${sombra} ${radio}`}>
          <Quote className="w-6 h-6 opacity-20 mb-4" />
          <p className="text-gray-600 leading-relaxed mb-6 text-sm">{texto}</p>
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < estrellas ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            {fotoUrl
              ? <img src={fotoUrl} alt={nombre} className="w-10 h-10 rounded-full object-cover" />
              : <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><UserRound className="w-5 h-5 text-gray-400" /></div>}
            <div>
              <p className="font-semibold text-sm">{nombre}</p>
              <p className="text-xs text-gray-400">{rol}{empresa ? `, ${empresa}` : ""}</p>
            </div>
          </div>
        </div>
      ),
    },

    /* ── TESTIMONIOS GRID ────────────────────────────────── */
    TestimoniosGrid: {
      fields: {
        titulo: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            nombre: { type: "text" }, rol: { type: "text" },
            texto: { type: "textarea" }, estrellas: { type: "number" }, fotoUrl: { type: "text" },
          },
          defaultItemProps: { nombre: "Cliente", rol: "Empresario", texto: "Excelente servicio.", estrellas: 5, fotoUrl: "" },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Lo que dicen nuestros clientes",
        items: [
          { nombre: "Carlos Mora", rol: "Restaurante El Rincón", texto: "Mi sitio quedó increíble, fácil de usar y muy profesional.", estrellas: 5, fotoUrl: "" },
          { nombre: "Sofía Vargas", rol: "Tienda de ropa", texto: "Mis ventas aumentaron desde que tengo mi página web.", estrellas: 5, fotoUrl: "" },
          { nombre: "Pedro Jiménez", rol: "Arquitecto", texto: "Perfecto para mostrar mi portafolio de proyectos.", estrellas: 5, fotoUrl: "" },
        ],
        fondo: "bg-gray-50", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-6xl mx-auto">
            {titulo && <h2 className="text-3xl font-bold text-center mb-12">{titulo}</h2>}
            <div className="grid md:grid-cols-3 gap-6">
              {items?.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <Quote className="w-5 h-5 opacity-20 mb-3" />
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.texto}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < item.estrellas ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {item.fotoUrl
                      ? <img src={item.fotoUrl} alt={item.nombre} className="w-9 h-9 rounded-full object-cover" />
                      : <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><UserRound className="w-4 h-4 text-gray-400" /></div>}
                    <div>
                      <p className="font-semibold text-sm">{item.nombre}</p>
                      <p className="text-xs text-gray-400">{item.rol}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    /* ── PRECIO CARD ─────────────────────────────────────── */
    PrecioCard: {
      fields: {
        titulo: { type: "text" }, precio: { type: "text" },
        moneda: { type: "select", options: [{ label: "₡ CRC", value: "CRC" }, { label: "$ USD", value: "USD" }, { label: "€ EUR", value: "EUR" }] },
        periodo: { type: "select", options: [{ label: "mes", value: "mes" }, { label: "año", value: "año" }, { label: "pago único", value: "único" }] },
        descripcion: { type: "textarea" },
        caracteristicas: { type: "array", arrayFields: { texto: { type: "text" } }, defaultItemProps: { texto: "Característica incluida" } },
        ctaLabel: { type: "text" }, ctaUrl: { type: "text" },
        destacado: { type: "select", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
        radio: { type: "select", options: roundOpts },
      },
      defaultProps: {
        titulo: "Plan Pro", precio: "29,900", moneda: "CRC", periodo: "mes",
        descripcion: "Todo lo que necesitas para crecer.",
        caracteristicas: [{ texto: "Sitio web ilimitado" }, { texto: "Dominio personalizado" }, { texto: "Soporte prioritario" }],
        ctaLabel: "Empezar ahora", ctaUrl: "#", destacado: "no",
        fondo: "bg-white", texto: "text-gray-900", padding: "lg", radio: "rounded-2xl",
      },
      render: ({ titulo, precio, moneda, periodo, descripcion, caracteristicas, ctaLabel, ctaUrl, destacado, fondo, texto, padding, radio }) => {
        const symbol = moneda === "CRC" ? "₡" : moneda === "EUR" ? "€" : "$";
        const isDestacado = destacado === "si";
        return (
          <div className={`${isDestacado ? "bg-gray-900 text-white" : `${fondo} ${texto}`} ${pad(padding)} ${radio} ${isDestacado ? "shadow-2xl scale-105" : "border border-gray-100 shadow-sm"} relative overflow-hidden`}>
            {isDestacado && <div className="absolute top-4 right-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full">Popular</div>}
            <p className="font-bold text-sm tracking-wide uppercase opacity-50 mb-2">{titulo}</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-black">{symbol}{precio}</span>
              <span className="opacity-40 mb-1 text-sm">/ {periodo}</span>
            </div>
            {descripcion && <p className="opacity-50 text-sm mb-6">{descripcion}</p>}
            <ul className="space-y-3 mb-8">
              {caracteristicas?.map((c, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDestacado ? "text-emerald-400" : "text-emerald-500"}`} />
                  {c.texto}
                </li>
              ))}
            </ul>
            <a href={ctaUrl} className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${isDestacado ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-700"}`}>
              {ctaLabel}
            </a>
          </div>
        );
      },
    },

    /* ── CARTA PRODUCTO ──────────────────────────────────── */
    CartaProducto: {
      fields: {
        imagenUrl: { type: "text" }, titulo: { type: "text" }, descripcion: { type: "textarea" },
        precio: { type: "text" },
        moneda: { type: "select", options: [{ label: "₡ CRC", value: "CRC" }, { label: "$ USD", value: "USD" }, { label: "€ EUR", value: "EUR" }] },
        badge: { type: "text" },
        botonLabel: { type: "text" }, botonUrl: { type: "text" },
        layout: { type: "radio", options: [{ label: "Vertical", value: "vertical" }, { label: "Horizontal", value: "horizontal" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
        borde: { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
        radio: { type: "select", options: roundOpts },
      },
      defaultProps: {
        imagenUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop",
        titulo: "Producto destacado",
        descripcion: "Descripción corta del producto con sus beneficios principales.",
        precio: "19,900", moneda: "CRC", badge: "Nuevo",
        botonLabel: "Agregar al carrito", botonUrl: "#", layout: "horizontal",
        fondo: "bg-white", texto: "text-gray-900", padding: "0",
        borde: "border border-gray-100", sombra: "shadow-sm", radio: "rounded-2xl",
      },
      render: (p) => {
        const symbol = p.moneda === "CRC" ? "₡" : p.moneda === "EUR" ? "€" : "$";
        return (
          <div className={`${p.fondo} ${p.texto} ${p.borde} ${p.sombra} ${p.radio} overflow-hidden hover:shadow-md transition-shadow`}>
            <div className={p.layout === "horizontal" ? "flex" : ""}>
              <div className={`relative ${p.layout === "horizontal" ? "w-2/5 shrink-0" : ""}`}>
                {p.imagenUrl
                  ? <img src={p.imagenUrl} alt={p.titulo} className={`w-full object-cover ${p.layout === "horizontal" ? "h-full" : "h-52"}`} />
                  : <div className={`w-full bg-gray-100 ${p.layout === "horizontal" ? "h-full" : "h-52"}`} />}
                {p.badge && <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-full">{p.badge}</span>}
              </div>
              <div className="flex-1 p-5">
                <h3 className="font-bold text-base mb-1">{p.titulo}</h3>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">{p.descripcion}</p>
                <p className="text-xl font-black mb-4">{symbol}{p.precio}</p>
                <a href={p.botonUrl} className="block text-center py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-all">
                  {p.botonLabel}
                </a>
              </div>
            </div>
          </div>
        );
      },
    },

    /* ── FAQ ACCORDION ───────────────────────────────────── */
    FAQAccordion: {
      fields: {
        titulo: { type: "text" },
        items: {
          type: "array",
          arrayFields: { pregunta: { type: "text" }, respuesta: { type: "textarea" } },
          defaultItemProps: { pregunta: "¿Pregunta frecuente?", respuesta: "Respuesta clara y concisa." },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Preguntas frecuentes",
        items: [
          { pregunta: "¿Cómo funciona el servicio?", respuesta: "Creas tu cuenta, eliges una plantilla y empiezas a personalizar tu sitio en minutos." },
          { pregunta: "¿Necesito conocimientos técnicos?", respuesta: "No. Nuestra plataforma está diseñada para que cualquier persona pueda usarla sin experiencia previa." },
          { pregunta: "¿Puedo cancelar en cualquier momento?", respuesta: "Sí, puedes cancelar tu suscripción cuando quieras sin cargos adicionales." },
        ],
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: (props) => <FAQRender {...props} />,
    },

    /* ── CONTACTO INFO ───────────────────────────────────── */
    ContactoInfo: {
      fields: {
        titulo: { type: "text" }, descripcion: { type: "textarea" },
        telefono: { type: "text" }, email: { type: "text" }, direccion: { type: "text" },
        redes: {
          type: "array",
          arrayFields: {
            tipo: { type: "select", options: ["instagram","twitter","facebook","linkedin","youtube"].map(v => ({ label: v, value: v })) },
            url: { type: "text" },
          },
          defaultItemProps: { tipo: "instagram", url: "#" },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Contáctanos",
        descripcion: "Estamos disponibles para atenderte.",
        telefono: "+506 8888-8888", email: "info@miempresa.com", direccion: "San José, Costa Rica",
        redes: [{ tipo: "instagram", url: "#" }],
        fondo: "bg-gray-50", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, descripcion, telefono, email, direccion, redes, fondo, texto, padding }) => {
        const REDES_ICONS: Record<string, React.ReactElement> = {
          instagram: <Instagram className="w-4 h-4" />,
          twitter: <Twitter className="w-4 h-4" />,
          facebook: <Facebook className="w-4 h-4" />,
          linkedin: <Linkedin className="w-4 h-4" />,
          youtube: <Youtube className="w-4 h-4" />,
        };
        return (
          <section className={`${fondo} ${texto} ${pad(padding)}`}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-3">{titulo}</h2>
              {descripcion && <p className="text-gray-500 mb-10">{descripcion}</p>}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {telefono && (
                  <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                    <p className="font-semibold text-sm">Teléfono</p>
                    <p className="text-gray-500 text-sm">{telefono}</p>
                  </div>
                )}
                {email && (
                  <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-gray-500 text-sm">{email}</p>
                  </div>
                )}
                {direccion && (
                  <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
                    <p className="font-semibold text-sm">Dirección</p>
                    <p className="text-gray-500 text-sm">{direccion}</p>
                  </div>
                )}
              </div>
              {redes?.length > 0 && (
                <div className="flex justify-center gap-3">
                  {redes.map((r, i) => (
                    <a key={i} href={r.url} className="p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                      {REDES_ICONS[r.tipo]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      },
    },

    /* ── LOGO GRID ───────────────────────────────────────── */
    LogoGrid: {
      fields: {
        titulo: { type: "text" },
        logos: {
          type: "array",
          arrayFields: { url: { type: "text" }, nombre: { type: "text" } },
          defaultItemProps: { url: "", nombre: "Empresa" },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Empresas que confían en nosotros",
        logos: [{ url: "", nombre: "Empresa 1" }, { url: "", nombre: "Empresa 2" }, { url: "", nombre: "Empresa 3" }, { url: "", nombre: "Empresa 4" }],
        fondo: "bg-white", padding: "y-md",
      },
      render: ({ titulo, logos, fondo, padding }) => (
        <section className={`${fondo} ${pad(padding)}`}>
          <div className="max-w-5xl mx-auto">
            {titulo && <p className="text-center text-sm font-semibold tracking-widest uppercase opacity-40 mb-10">{titulo}</p>}
            <div className="flex flex-wrap items-center justify-center gap-8">
              {logos?.map((logo, i) => (
                <div key={i} className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  {logo.url
                    ? <img src={logo.url} alt={logo.nombre} className="h-10 w-auto object-contain" />
                    : <div className="h-10 px-5 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-400">{logo.nombre}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    /* ── TIMELINE ────────────────────────────────────────── */
    Timeline: {
      fields: {
        titulo: { type: "text" },
        items: {
          type: "array",
          arrayFields: { año: { type: "text" }, titulo: { type: "text" }, descripcion: { type: "textarea" } },
          defaultItemProps: { año: "2020", titulo: "Fundación", descripcion: "Así comenzó todo." },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Nuestra historia",
        items: [
          { año: "2020", titulo: "Fundación", descripcion: "Empezamos con un sueño y mucha dedicación." },
          { año: "2021", titulo: "Primer cliente", descripcion: "Cerramos nuestro primer contrato importante." },
          { año: "2023", titulo: "Expansión", descripcion: "Abrimos nuevas oficinas y ampliamos el equipo." },
          { año: "2025", titulo: "Hoy", descripcion: "Seguimos creciendo junto a nuestros clientes." },
        ],
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-3xl mx-auto">
            {titulo && <h2 className="text-3xl font-bold text-center mb-12">{titulo}</h2>}
            <div className="relative">
              <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-gray-100 hidden md:block" />
              <div className="space-y-10">
                {items?.map((item, i) => (
                  <div key={i} className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <span className="text-xs font-bold tracking-widest uppercase opacity-40">{item.año}</span>
                      <h3 className="font-bold text-lg mt-1">{item.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mt-1">{item.descripcion}</p>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-gray-900 rounded-full shrink-0 mt-5 z-10 ring-4 ring-white" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
    },

    /* ── CARTA PERFIL ────────────────────────────────────── */
    CartaPerfil: {
      fields: {
        fotoUrl: { type: "text" }, nombre: { type: "text" }, rol: { type: "text" }, bio: { type: "textarea" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
        borde: { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
        radio: { type: "select", options: roundOpts },
        links: { type: "array", arrayFields: { label: { type: "text" }, url: { type: "text" } }, defaultItemProps: { label: "Web", url: "#" } },
      },
      defaultProps: {
        fotoUrl: "", nombre: "Tu nombre", rol: "Propietario / Fundador",
        bio: "Breve descripción o presentación personal.",
        fondo: "bg-white", texto: "text-gray-900", padding: "md",
        borde: "border border-gray-100", sombra: "shadow-sm", radio: "rounded-2xl",
        links: [{ label: "Sitio web", url: "#" }],
      },
      render: ({ fotoUrl, nombre, rol, bio, fondo, texto, padding, borde, sombra, radio, links }) => (
        <div className={`${fondo} ${texto} ${pad(padding)} ${borde} ${sombra} ${radio} flex items-center gap-5`}>
          {fotoUrl
            ? <img src={fotoUrl} alt={nombre} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
            : <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0"><UserRound className="w-8 h-8 text-gray-300" /></div>}
          <div className="flex-1">
            <p className="font-bold text-lg leading-tight">{nombre}</p>
            <p className="text-sm opacity-50 mb-2">{rol}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{bio}</p>
            {links?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {links.map((l, i) => (
                  <a key={i} href={l.url} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors">
                    <LinkIcon className="w-3 h-3" />{l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ),
    },

    /* ── BOTÓN ───────────────────────────────────────────── */
    Boton: {
      fields: {
        label: { type: "text" }, url: { type: "text" },
        alineacion: { type: "select", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        variante: { type: "select", options: [{ label: "Sólido", value: "solido" }, { label: "Outline", value: "outline" }, { label: "Ghost", value: "ghost" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        tam: { type: "select", options: [{ label: "Pequeño", value: "sm" }, { label: "Mediano", value: "md" }, { label: "Grande", value: "lg" }] },
        radio: { type: "select", options: roundOpts },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
        transicion: { type: "select", options: [
          { label: "Escala", value: "scale" }, { label: "Levantamiento", value: "lift" }, { label: "Resplandor", value: "glow" },
          { label: "Deslizamiento", value: "slide" }, { label: "Pulso", value: "pulse" }, { label: "Suave", value: "smooth" }
        ] },
      },
      defaultProps: {
        label: "Llévame", url: "#", alineacion: "left",
        variante: "solido", fondo: "bg-gray-900", texto: "text-white",
        tam: "md", radio: "rounded-xl", sombra: "shadow", transicion: "lift",
      },
      render: ({ label, url, alineacion, variante, fondo, texto, tam, radio, sombra, transicion }) => {
        const size = tam === "sm" ? "px-4 py-2 text-sm" : tam === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
        const alignMap: Record<string,string> = { left: "justify-start", center: "justify-center", right: "justify-end" };
        const style = variante === "outline" ? `border-2 border-current bg-transparent ${texto}`
          : variante === "ghost" ? `bg-transparent ${texto} hover:bg-black/5`
          : `${fondo} ${texto}`;
        const transition = buttonTransitions[transicion] || buttonTransitions["lift"];
        return (
          <div className={`flex ${alignMap[alineacion]}`}>
            <a href={url} className={`inline-flex items-center font-semibold ${size} ${radio} ${sombra} ${style} ${transition}`}>
              {label}
            </a>
          </div>
        );
      },
    },

    /* ── IMAGEN ──────────────────────────────────────────── */
    Imagen: {
      fields: {
        url: { type: "text" }, alt: { type: "text" },
        aspecto: { type: "select", options: [{ label: "Auto", value: "auto" }, { label: "Cuadrado", value: "square" }, { label: "Video 16/9", value: "video" }, { label: "Retrato", value: "portrait" }] },
        radio: { type: "select", options: roundOpts },
        borde: { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
      },
      defaultProps: {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
        alt: "Imagen", aspecto: "video", radio: "rounded-2xl", borde: "", sombra: "shadow-md",
      },
      render: ({ url, alt, aspecto, radio, borde, sombra }) => {
        const aspectMap: Record<string,string> = { auto: "", square: "aspect-square", video: "aspect-video", portrait: "aspect-[3/4]" };
        return url
          ? <img src={url} alt={alt} className={`w-full object-cover ${aspectMap[aspecto]} ${radio} ${borde} ${sombra}`} />
          : <div className={`w-full bg-gray-100 ${aspectMap[aspecto] || "h-48"} ${radio} ${borde} ${sombra}`} />;
      },
    },

    /* ── GALERÍA ─────────────────────────────────────────── */
    Galeria: {
      fields: {
        contenido: { type: "slot", allow: ["Imagen"] },
        columnasDesktop: { type: "number" },
        gap: { type: "select", options: ["0","2","4","6","8"].map(v => ({ label: v, value: v })) },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: { contenido: [], columnasDesktop: 3, gap: "4", fondo: "bg-white", padding: "sm" },
      render: ({ contenido: Content, columnasDesktop, gap, fondo, padding }) => {
        const cols = columnasDesktop >= 5 ? "md:columns-3 lg:columns-5"
          : columnasDesktop === 4 ? "md:columns-2 lg:columns-4"
          : columnasDesktop === 3 ? "md:columns-2 lg:columns-3"
          : "md:columns-2 lg:columns-2";
        return (
          <section className={`${fondo} ${pad(padding)}`}>
            <Content className={`columns-1 ${cols} ${gaps[gap] || gaps["4"]} [&>*]:mb-4 [&>*]:break-inside-avoid`} />
          </section>
        );
      },
    },

    /* ── CARRUSEL ────────────────────────────────────────── */
    Carrusel: {
      fields: {
        slides: {
          type: "array",
          arrayFields: {
            tipo: { type: "radio", options: [{ label: "Imagen", value: "image" }, { label: "Video", value: "video" }] },
            url: { type: "text" }, caption: { type: "text" },
          },
          defaultItemProps: { tipo: "image", url: "", caption: "" },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
        borde: { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
      },
      defaultProps: {
        slides: [
          { tipo: "image", url: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600&q=80", caption: "Primera imagen" },
          { tipo: "image", url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1600&q=80", caption: "Segunda imagen" },
        ],
        fondo: "bg-white", texto: "text-gray-900", padding: "sm", borde: "", sombra: "",
      },
      render: (props) => <CarruselRender {...props} />,
    },

    /* ── VIDEO ───────────────────────────────────────────── */
    Video: {
      fields: {
        url: { type: "text" }, poster: { type: "text" }, caption: { type: "text" },
        autoplay: { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
        loop: { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
        controls: { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
        muted: { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
        variante: { type: "select", options: [{ label: "Simple", value: "simple" }, { label: "Card", value: "card" }, { label: "Framed", value: "framed" }] },
        ratio: { type: "select", options: [{ label: "16/9", value: "16/9" }, { label: "4/3", value: "4/3" }, { label: "1/1", value: "1/1" }] },
        radio: { type: "select", options: roundOpts },
        borde: { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
        sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },
        alineacion: { type: "select", options: [{ label: "Izquierda", value: "start" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "end" }] },
        ancho: { type: "select", options: [{ label: "max-w-sm", value: "max-w-sm" }, { label: "max-w-lg", value: "max-w-lg" }, { label: "max-w-2xl", value: "max-w-2xl" }, { label: "max-w-4xl", value: "max-w-4xl" }, { label: "Sin límite", value: "max-w-none" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        poster: "", caption: "", autoplay: "no", loop: "no", controls: "si", muted: "no",
        variante: "simple", ratio: "16/9", radio: "rounded-2xl", borde: "", sombra: "shadow-md",
        alineacion: "center", ancho: "max-w-2xl", fondo: "bg-white", texto: "text-gray-900", padding: "sm",
      },
      render: (p) => {
        const aspectMap: Record<string,string> = { "16/9": "16 / 9", "4/3": "4 / 3", "1/1": "1 / 1" };
        const alignMap: Record<string,string> = { start: "justify-start", center: "justify-center", end: "justify-end" };
        const wrapper = p.variante === "framed"
          ? `${p.fondo} ${p.texto} ${pad(p.padding)} ${p.borde} ${p.sombra} ${p.ancho} w-full ${p.radio}`
          : p.variante === "card"
          ? `${p.borde || "border border-gray-100"} ${p.sombra} bg-white ${p.ancho} w-full p-3 ${p.radio}`
          : `${p.ancho} w-full`;
        return (
          <div className={`flex ${alignMap[p.alineacion]}`}>
            <figure className={wrapper}>
              <div className={`${p.radio} overflow-hidden`} style={{ aspectRatio: aspectMap[p.ratio] || "16 / 9" }}>
                <video src={p.url} poster={p.poster || undefined}
                  controls={p.controls === "si"} autoPlay={p.autoplay === "si"}
                  muted={p.muted === "si"} loop={p.loop === "si"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {p.caption && <figcaption className="mt-2 text-sm text-center opacity-50">{p.caption}</figcaption>}
            </figure>
          </div>
        );
      },
    },

    /* ── GRID ────────────────────────────────────────────── */
    Grid: {
      fields: {
        items: { type: "slot" },
        columnas: { type: "number" },
        gap: { type: "select", options: Object.keys(gaps).map(v => ({ label: v, value: v })) },
        colorFondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: { items: [], columnas: 3, gap: "6", colorFondo: "bg-white", padding: "0" },
      render: ({ items: Items, columnas, gap, colorFondo, padding }) => (
        <div className={`${colorFondo} ${pad(padding)}`}>
          <Items className={`grid ${gridCols(columnas)} ${gaps[gap] || gaps["6"]}`} />
        </div>
      ),
    },

    /* ── FLEXBOX ─────────────────────────────────────────── */
    FlexBox: {
      fields: {
        contenido: { type: "slot" },
        direccion: { type: "select", options: [{ label: "Fila", value: "row" }, { label: "Columna", value: "column" }] },
        alineacion: { type: "select", options: [{ label: "Inicio", value: "start" }, { label: "Centro", value: "center" }, { label: "Final", value: "end" }, { label: "Espaciado", value: "between" }] },
        gap: { type: "select", options: Object.keys(gaps).map(v => ({ label: v, value: v })) },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: { contenido: [], direccion: "row", alineacion: "start", gap: "4", fondo: "bg-white", padding: "0" },
      render: ({ contenido: Content, direccion, alineacion, gap, fondo, padding }) => {
        const dir = direccion === "column" ? "flex-col" : "flex-row flex-wrap";
        const just = alineacion === "center" ? "justify-center" : alineacion === "end" ? "justify-end" : alineacion === "between" ? "justify-between" : "justify-start";
        return (
          <div className={`${fondo} ${pad(padding)} flex ${dir} ${just} ${gaps[gap] || gaps["4"]}`}>
            <Content />
          </div>
        );
      },
    },

    /* ── DIVISOR ─────────────────────────────────────────── */
    Divisor: {
      fields: {
        estilo: { type: "select", options: [{ label: "Línea", value: "linea" }, { label: "Puntos", value: "puntos" }, { label: "Ondas", value: "ondas" }] },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: { estilo: "linea", fondo: "bg-white", padding: "sm" },
      render: ({ estilo, fondo, padding }) => (
        <div className={`${fondo} ${pad(padding)}`}>
          {estilo === "linea" && <hr className="border-t border-gray-100" />}
          {estilo === "puntos" && (
            <div className="flex justify-center gap-2">
              {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />)}
            </div>
          )}
          {estilo === "ondas" && (
            <svg viewBox="0 0 1200 40" className="w-full h-8 opacity-20" preserveAspectRatio="none">
              <path d="M0,20 C300,40 900,0 1200,20" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          )}
        </div>
      ),
    },

    /* ── ESPACIO ─────────────────────────────────────────── */
    Espacio: {
      fields: {
        alto: { type: "select", options: ["2","4","6","8","12","16","24","32"].map(v => ({ label: `${v} (${parseInt(v) * 4}px)`, value: v })) },
      },
      defaultProps: { alto: "8" },
      render: ({ alto }) => <div className={`h-${alto} w-full`} />,
    },

    /* ── EQUIPO ──────────────────────────────────────────── */
    Equipo: {
      fields: {
        titulo: { type: "text" },
        subtitulo: { type: "text" },
        miembros: {
          type: "array",
          arrayFields: {
            foto: { type: "text" },
            nombre: { type: "text" },
            role: { type: "text" },
            bio: { type: "textarea" },
            redes: {
              type: "array",
              arrayFields: {
                tipo: { type: "select", options: ["instagram","twitter","linkedin"].map(v => ({ label: v, value: v })) },
                url: { type: "text" },
              },
              defaultItemProps: { tipo: "linkedin", url: "#" },
            },
          },
          defaultItemProps: { foto: "", nombre: "Nombre", role: "Cargo", bio: "Bio corta", redes: [] },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Nuestro equipo", subtitulo: "Las personas detrás",
        miembros: [
          { foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop", nombre: "Juan Pérez", role: "CEO & Fundador", bio: "Con 10 años de experiencia en tecnología.", redes: [] },
          { foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop", nombre: "María García", role: "Directora Creativa", bio: "Experta en diseño y UX.", redes: [] },
          { foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop", nombre: "Carlos López", role: "Desarrollador Lead", bio: "Especialista en arquitectura web.", redes: [] },
        ],
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, subtitulo, miembros, fondo, texto, padding }) => {
        const REDES_ICONS: Record<string, React.ReactElement> = {
          instagram: <Instagram className="w-3.5 h-3.5" />,
          twitter: <Twitter className="w-3.5 h-3.5" />,
          linkedin: <Linkedin className="w-3.5 h-3.5" />,
        };
        return (
          <section className={`${fondo} ${texto} ${pad(padding)}`}>
            <div className="max-w-6xl mx-auto">
              {(titulo || subtitulo) && (
                <div className="text-center mb-12">
                  {subtitulo && <p className="text-sm font-semibold tracking-widest uppercase opacity-40 mb-2">{subtitulo}</p>}
                  {titulo && <h2 className="text-3xl md:text-4xl font-bold">{titulo}</h2>}
                </div>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {miembros?.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group bg-white/50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative mb-5 overflow-hidden rounded-xl">
                      {m.foto
                        ? <img src={m.foto} alt={m.nombre} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                        : <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center"><UserRound className="w-12 h-12 text-gray-400" /></div>}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{m.nombre}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-2">{m.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                    {m.redes?.length > 0 && (
                      <div className="flex gap-2 mt-4">
                        {m.redes.map((r, j) => (
                          <a key={j} href={r.url} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700">
                            {REDES_ICONS[r.tipo]}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },

    /* ── SERVICIOS ───────────────────────────────────────── */
    Servicios: {
      fields: {
        titulo: { type: "text" },
        subtitulo: { type: "text" },
        variante: { type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Columnas", value: "columnas" }] },
        items: {
          type: "array",
          arrayFields: {
            icono: { type: "select", options: Object.keys(ICONS).map(v => ({ label: v, value: v })) },
            titulo: { type: "text" },
            descripcion: { type: "textarea" },
            enlace: { type: "text" },
          },
          defaultItemProps: { icono: "rocket", titulo: "Servicio", descripcion: "Descripción del servicio.", enlace: "#" },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Nuestros servicios", subtitulo: "Lo que ofrecemos",
        variante: "grid",
        items: [
          { icono: "rocket", titulo: "Desarrollo web", descripcion: "Sitios rápidos y modernos", enlace: "#" },
          { icono: "shield", titulo: "Seguridad", descripcion: "Protección de datos garantizada", enlace: "#" },
          { icono: "star", titulo: "Diseño premium", descripcion: "Interfaces hermosas y funcionales", enlace: "#" },
        ],
        fondo: "bg-gray-50", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, subtitulo, variante, items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-6xl mx-auto">
            {(titulo || subtitulo) && (
              <div className="text-center mb-12">
                {subtitulo && <p className="text-sm font-semibold tracking-widest uppercase opacity-40 mb-2">{subtitulo}</p>}
                {titulo && <h2 className="text-3xl md:text-4xl font-bold">{titulo}</h2>}
              </div>
            )}
            {variante === "grid" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items?.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.enlace}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      {ICONS[item.icono] || ICONS["star"]}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.titulo}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.descripcion}</p>
                  </motion.a>
                ))}
              </div>
            )}
            {variante === "columnas" && (
              <div className="space-y-6 max-w-3xl mx-auto">
                {items?.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.enlace}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                  >
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {ICONS[item.icono] || ICONS["star"]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{item.titulo}</h3>
                      <p className="text-gray-600 text-sm">{item.descripcion}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </section>
      ),
    },

    /* ── NEWSLETTER CON POPUP ────────────────────────────── */
    Newsletter: {
      fields: {
        titulo: { type: "text" },
        descripcion: { type: "textarea" },
        placeholder: { type: "text" },
        botonLabel: { type: "text" },
        botonUrl: { type: "text" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Suscríbete a nuestro boletín",
        descripcion: "Recibe las mejores ofertas y noticias directamente en tu correo.",
        placeholder: "tu@correo.com",
        botonLabel: "Suscribirse",
        botonUrl: "#",
        fondo: "bg-gradient-to-r from-blue-600 to-blue-700",
        texto: "text-white",
        padding: "y-lg",
      },
      render: ({ titulo, descripcion, placeholder, botonLabel, botonUrl, fondo, texto, padding }) => {
        const [email, setEmail] = React.useState("");
        const [showPopup, setShowPopup] = React.useState(false);
        const [isValid, setIsValid] = React.useState(false);

        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(email)) {
            setIsValid(true);
            setShowPopup(true);
            setEmail("");
            setTimeout(() => setShowPopup(false), 3000);
          } else {
            setIsValid(false);
          }
        };

        return (
          <section className={`${fondo} ${texto} ${pad(padding)}`}>
            <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">{titulo}</h2>
              {descripcion && <p className="text-base sm:text-lg opacity-80 mb-6 sm:mb-8">{descripcion}</p>}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg sm:rounded-2xl p-3 flex flex-col sm:flex-row gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm sm:text-base transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  {botonLabel}
                </button>
              </motion.form>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
              {showPopup && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 z-40"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 sm:p-8 max-w-sm mx-4 shadow-2xl z-50"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">¡Perfecto!</h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-6">Te hemos enviado un correo de confirmación. Revisa tu bandeja de entrada.</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPopup(false)}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
                      >
                        Cerrar
                      </motion.button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </section>
        );
      },
    },

    /* ── PASOS / PROCESO ─────────────────────────────────── */
    Pasos: {
      fields: {
        titulo: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            numero: { type: "text" },
            titulo: { type: "text" },
            descripcion: { type: "textarea" },
          },
          defaultItemProps: { numero: "1", titulo: "Paso", descripcion: "Descripción del paso." },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Cómo funciona",
        items: [
          { numero: "1", titulo: "Crea tu cuenta", descripcion: "Es rápido, fácil y gratuito." },
          { numero: "2", titulo: "Personaliza", descripcion: "Diseña tu sitio como desees." },
          { numero: "3", titulo: "Publica", descripcion: "Tu sitio está listo para el mundo." },
        ],
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-5xl mx-auto">
            {titulo && <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{titulo}</h2>}
            <div className="grid md:grid-cols-3 gap-8">
              {items?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-5 shadow-lg">
                      {item.numero}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.titulo}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.descripcion}</p>
                  </div>
                  {i < items.length - 1 && <div className="hidden md:block absolute -right-4 top-8 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent" />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    /* ── COMPARATIVA (ANTES/DESPUÉS) ─────────────────────── */
    Comparativa: {
      fields: {
        titulo: { type: "text" },
        descripcion: { type: "textarea" },
        imagen1Url: { type: "text" },
        imagen2Url: { type: "text" },
        label1: { type: "text" },
        label2: { type: "text" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "El cambio es visible",
        descripcion: "Mira la transformación que hemos logrado",
        imagen1Url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
        imagen2Url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
        label1: "Antes", label2: "Después",
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, descripcion, imagen1Url, imagen2Url, label1, label2, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-5xl mx-auto">
            {titulo && <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{titulo}</h2>}
            {descripcion && <p className="text-center text-lg opacity-60 mb-12 max-w-2xl mx-auto">{descripcion}</p>}
            <div className="grid md:grid-cols-2 gap-8">
              {imagen1Url && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg"
                >
                  <img src={imagen1Url} alt={label1} className="w-full h-80 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <p className="text-white text-lg font-bold">{label1}</p>
                  </div>
                </motion.div>
              )}
              {imagen2Url && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg"
                >
                  <img src={imagen2Url} alt={label2} className="w-full h-80 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <p className="text-white text-lg font-bold">{label2}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      ),
    },

    /* ── PORTFOLIO GRID ──────────────────────────────────── */
    PortfolioGrid: {
      fields: {
        titulo: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            imagen: { type: "text" },
            titulo: { type: "text" },
            categoria: { type: "text" },
            enlace: { type: "text" },
          },
          defaultItemProps: { imagen: "", titulo: "Proyecto", categoria: "Categoría", enlace: "#" },
        },
        columnas: { type: "number" },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "Nuestros proyectos",
        items: [
          { imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", titulo: "Proyecto 1", categoria: "Web Design", enlace: "#" },
          { imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", titulo: "Proyecto 2", categoria: "Branding", enlace: "#" },
          { imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", titulo: "Proyecto 3", categoria: "E-commerce", enlace: "#" },
        ],
        columnas: 3,
        fondo: "bg-gray-50", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, items, columnas, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-6xl mx-auto">
            {titulo && <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{titulo}</h2>}
            <div className={`grid ${gridCols(columnas)} gap-6`}>
              {items?.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.enlace}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all"
                >
                  {item.imagen
                    ? <img src={item.imagen} alt={item.titulo} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                    : <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-100" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-xs font-semibold text-blue-400 mb-1">{item.categoria}</p>
                    <h3 className="text-lg font-bold">{item.titulo}</h3>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    /* ── EQUIPO COMPACTO ─────────────────────────────────── */
    EquipoCompacto: {
      fields: {
        titulo: { type: "text" },
        miembros: {
          type: "array",
          arrayFields: {
            nombre: { type: "text" },
            rol: { type: "text" },
            foto: { type: "text" },
          },
          defaultItemProps: { nombre: "Nombre", rol: "Cargo", foto: "" },
        },
        fondo: { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
        texto: { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
        padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
      },
      defaultProps: {
        titulo: "El equipo",
        miembros: [
          { nombre: "Juan", rol: "CEO", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
          { nombre: "María", rol: "Diseñadora", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },
          { nombre: "Carlos", rol: "Desarrollador", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop" },
        ],
        fondo: "bg-white", texto: "text-gray-900", padding: "y-lg",
      },
      render: ({ titulo, miembros, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-5xl mx-auto">
            {titulo && <h2 className="text-3xl font-bold text-center mb-10">{titulo}</h2>}
            <div className="flex flex-wrap justify-center gap-6">
              {miembros?.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  <div className="relative mb-3 overflow-hidden rounded-full w-20 h-20 border-4 border-gray-100 group-hover:border-blue-300 transition-colors">
                    {m.foto
                      ? <img src={m.foto} alt={m.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      : <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center"><UserRound className="w-10 h-10 text-gray-400" /></div>}
                  </div>
                  <p className="font-semibold text-sm">{m.nombre}</p>
                  <p className="text-xs text-gray-500">{m.rol}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

  },
};

export default config;