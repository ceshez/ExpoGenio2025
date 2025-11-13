// puck.config.tsx
import * as React from "react";
import { type Config } from "@measured/puck";
import {
  Bolt, Eye, Target, ShieldCheck, Rocket, Lightbulb,
  HeartHandshake, Scale, Star, UserRound, Link as LinkIcon
} from "lucide-react";

/* ---------- utilidades de clases ---------- */
const gridCols = (n: number) =>
  ({
    1:"grid-cols-1",2:"grid-cols-2",3:"grid-cols-3",4:"grid-cols-4",5:"grid-cols-5",6:"grid-cols-6",
    7:"grid-cols-7",8:"grid-cols-8",9:"grid-cols-9",10:"grid-cols-10",11:"grid-cols-11",12:"grid-cols-12"
  }[Math.max(1, Math.min(12, n))] || "grid-cols-3");

const gaps: Record<string,string> = { "0":"gap-0","1":"gap-1","2":"gap-2","3":"gap-3","4":"gap-4","6":"gap-6","8":"gap-8","12":"gap-12" };
const pads: Record<string,string> = {
  "0":"p-0", xs:"p-2", sm:"p-4", md:"p-6", lg:"p-8", xl:"p-12",
  "y-sm":"py-6", "y-md":"py-10", "y-lg":"py-16",
};
const pad = (v: string) => pads[v] || "p-0";

const bgOpts = [
  "bg-white","bg-gray-50","bg-gray-100","bg-gray-900","bg-black",
  "bg-purple-600","bg-purple-700","bg-blue-600","bg-blue-700",
  "bg-emerald-600","bg-red-600","bg-orange-500","bg-yellow-400","bg-pink-600",
];
const textOpts = ["text-black","text-gray-900","text-gray-700","text-white","text-gray-100"];
const borderOpts = ["","border border-gray-200","border border-gray-300","border-t border-gray-200","border-b border-gray-200","ring-1 ring-gray-200"];
const shadowOpts = ["","shadow-sm","shadow","shadow-md","shadow-lg"];

/* ---------- tipos ---------- */
type Props = {
  Texto: { contenido: string; };
  Parrafo: { contenidoparrafo: string; };
  Header: {
    titulo: string; logoUrl: string;
    nav: { label: string; url: string }[];
    fondo: string; texto: string; padding: string; borde: string; sombra: string;
  };
  Video: {
    url: string;
    poster: string;
    caption: string;

    autoplay: "si" | "no";
    loop: "si" | "no";
    controls: "si" | "no";
    muted: "si" | "no";

    variante: "simple" | "card" | "framed";
    ratio: "16/9" | "4/3" | "1/1" | "9/16";
    fit: "cover" | "contain";

    radio: "sm" | "md" | "lg" | "xl";
    borde: string;
    sombra: string;

    alineacion: "start" | "center" | "end";
    ancho: "max-w-sm" | "max-w-md" | "max-w-lg" | "max-w-2xl" | "max-w-4xl" | "max-w-none";

    fondo: string;
    texto: string;
    padding: string;
  };
  Grid: {
    items: any[]; columnas: number; gap: string; colorFondo: string; padding: string;
  };
  Boton: {
    label: string; url: string;
    alineacion: "start" | "center" | "end";
    fondo: string; texto: string; borde: string; sombra: string; tam: "sm" | "md" | "lg";
  };
  CartaProducto: {
    imagenUrl: string; titulo: string; descripcion: string;
    precio: string; moneda: "CRC" | "USD" | "EUR";
    botonLabel: string; botonUrl: string; botonAlineacion: "start" | "center" | "end";
    layout: "vertical" | "horizontal";
    fondo: string; texto: string; padding: string; borde: string; sombra: string;
  };
  Hero: {
    titulo: string; descripcion: string; ctaLabel: string; ctaUrl: string; imagenUrl: string;
    fondo: string; texto: string; padding: string;
  };
  SeccionTexto: {
    nivel: "h1"|"h2"|"h3"|"h4"|"h5"|"h6";
    titulo: string; contenido: string; fondo: string; texto: string; padding: string; borde: string; sombra: string;
  };
  MisionVision: {
    variante: "dos-col" | "tarjetas";
    items: { icono: string; titulo: string; texto: string }[];
    fondo: string; texto: string; padding: string;
  };
  MisionVisionValores: {
    items: { icono: string; titulo: string; texto: string }[];
    fondo: string; texto: string; padding: string;
  };
  Carrusel: {
    slides: { tipo: "image" | "video"; url: string; caption?: string }[];
    fondo: string; texto: string; padding: string; borde: string; sombra: string;
  };
  Imagen: { url: string; alt: string; borde: string; sombra: string; radio: "sm"|"md"|"lg"|"xl" };
  Galeria: {
    contenido: any[]; columnasDesktop: number; gap: string; fondo: string; padding: string;
  };
  FlexBox: {
    contenido: any[]; direccion: "row"|"column"; alineacion: "start"|"center"|"end"|"between"; gap: string;
    fondo: string; padding: string;
  };
  CartaPerfil: {
    fotoUrl: string; nombre: string; rol: string; bio: string;
    fondo: string; texto: string; padding: string; borde: string; sombra: string;
    links: { label: string; url: string }[];
  };
  Espacio: { ancho: "auto"|"1/4"|"1/3"|"1/2"|"2/3"|"3/4"|"full"; alto: "0"|"2"|"4"|"6"|"8"|"12"|"16" };
  Carta: {
     titulo: string; 
     descripcion: string 
     padding: number;
     variante: string;
     colorDeFondo: string;
  };
};

/* ---------- iconos ---------- */
const ICONS: Record<string, React.ReactElement> = {
  bolt: <Bolt className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  shield: <ShieldCheck className="w-6 h-6" />,
  rocket: <Rocket className="w-6 h-6" />,
  idea: <Lightbulb className="w-6 h-6" />,
  handshake: <HeartHandshake className="w-6 h-6" />,
  scale: <Scale className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
};

/* ---------- config ---------- */
export const config: Config<Props> = {
  categories: {
    Escritura: { title: "Escritura", components: ["Header","Texto","Parrafo","Hero","SeccionTexto","Boton","Carta"] },
    Layout: { title: "Layout", components: ["Grid","FlexBox","Galeria","Espacio","MisionVision","MisionVisionValores"] },
    Negocios: { title: "Negocios", components: ["CartaProducto","CartaPerfil"] },
    Multimedia: { title: "Multimedia", components: ["Carrusel","Imagen","Video"] },
    others: { title: "Otros" },
  },

  components: {
    /* Encabezado */
    Header: { 
      ai: {
        instructions: "Always place this first",
      },
      fields: {
        titulo: { type: "text" },
        logoUrl: { type: "text" },
        nav: { type: "array", arrayFields: { label:{ type:"text" }, url:{ type:"text" } }, defaultItemProps:{ label:"Enlace", url:"#"} },
        fondo: { type: "select", options: bgOpts.map(v=>({label:v,value:v})) },
        texto: { type: "select", options: textOpts.map(v=>({label:v,value:v})) },
        padding: { type: "select", options: Object.keys(pads).map(v=>({label:v,value:v})) },
        borde: { type: "select", options: borderOpts.map(v=>({label:v||"Sin borde",value:v})) },
        sombra:{ type:"select", options: shadowOpts.map(v=>({label:v||"Sin sombra",value:v})) },
      },
      defaultProps: {
        titulo: "GENIO", logoUrl: "",
        nav: [{label:"Inicio",url:"#"}, {label:"Servicios",url:"#"}, {label:"Contacto",url:"#"}],
        fondo: "bg-white", texto: "text-gray-900", padding: "sm", borde: "border-b border-gray-200", sombra: "",
      },
      render: ({ titulo, logoUrl, nav, fondo, texto, padding, borde, sombra }) => (
        <header className={`${fondo} ${texto} ${pad(padding)} ${borde} ${sombra}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {logoUrl ? <img src={logoUrl} alt={titulo} className="h-10 w-auto" /> : null}
              <span className="text-xl font-bold">{titulo}</span>
            </div>
            {!!nav?.length && (
              <nav className="hidden md:block">
                <ul className="flex items-center gap-6">
                  {nav.map((n,i)=>(<li key={i}><a className="hover:underline" href={n.url}>{n.label}</a></li>))}
                </ul>
              </nav>
            )}
          </div>
        </header>
      ),
    },
    Texto: {
      fields: {
        contenido: { type: "textarea" },
      },
      defaultProps: {
        contenido: "Encabezado",
      },
      render: ({ contenido }) => (
        <div className="text-4xl font-bold p-4">
          <h1>{contenido}</h1>
        </div>
      ),
    },
        Parrafo: {
      fields: {
        contenidoparrafo: { type: "textarea" },
      },
      defaultProps: {
        contenidoparrafo: "Este es un párrafo de ejemplo para mostrar cómo se ve el texto en este componente.",
      },
      render: ({ contenidoparrafo }) => (
        <div className="text-xl font-light p-4">
          <p>{contenidoparrafo}</p>
        </div>
      ),
    },

    /* Grid */
    Grid: {
      fields: {
        items: { type: "slot" },
        columnas: { type: "number" },
        gap: { type: "select", options: Object.keys(gaps).map(v=>({label:v,value:v})) },
        colorFondo: { type: "select", options: bgOpts.map(v=>({label:v,value:v})) },
        padding: { type: "select", options: Object.keys(pads).map(v=>({label:v,value:v})) },
      },
      defaultProps: { items: [], columnas: 3, gap: "4", colorFondo: "bg-white", padding: "0" },
      render: ({ items: Items, columnas, gap, colorFondo, padding }) => (
        <div className={`${colorFondo} ${pad(padding)}`}>
          <Items className={`grid ${gridCols(Number(columnas))} ${gaps[gap] || gaps["4"]}`} />
        </div>
      ),
    },

    /* Botón */
    Boton: {
      fields: {
        label:{ type:"text" }, url:{ type:"text" },
        alineacion:{ type:"select", options:[{label:"Izquierda",value:"start"},{label:"Centro",value:"center"},{label:"Derecha",value:"end"}]},
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v}))},
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v}))},
        borde:{ type:"select", options:borderOpts.map(v=>({label:v||"Sin borde",value:v}))},
        sombra:{ type:"select", options:shadowOpts.map(v=>({label:v||"Sin sombra",value:v}))},
        tam:{ type:"select", options:[{label:"sm",value:"sm"},{label:"md",value:"md"},{label:"lg",value:"lg"}]},
      },
      defaultProps: {
        label: "Llévame", url:"#", alineacion:"start",
        fondo:"bg-purple-600", texto:"text-white", borde:"", sombra:"shadow", tam:"md",
      },
      render: ({ label, url, alineacion, fondo, texto, borde, sombra, tam }) => {
        const size = tam==="sm"?"px-3 py-2":tam==="lg"?"px-6 py-3":"px-4 py-2";
        const align = alineacion==="center"?"justify-center":alineacion==="end"?"justify-end":"justify-start";
        return (
          <div className={`flex ${align}`}>
            <a href={url} className={`inline-flex rounded-lg ${size} ${fondo} ${texto} ${borde} ${sombra} hover:opacity-90 transition`}>
              {label}
            </a>
          </div>
        );
      }
    },

    /* CartaProducto */
    CartaProducto: {
      fields: {
        imagenUrl:{ type:"text" }, titulo:{ type:"text" }, descripcion:{ type:"textarea" },
        precio:{ type:"text" },
        moneda:{ type:"select", options:[{label:"₡ CRC",value:"CRC"},{label:"$ USD",value:"USD"},{label:"€ EUR",value:"EUR"}]},
        botonLabel:{ type:"text" }, botonUrl:{ type:"text" },
        botonAlineacion:{ type:"select", options:[{label:"Izquierda",value:"start"},{label:"Centro",value:"center"},{label:"Derecha",value:"end"}]},
        layout:{ type:"radio", options:[{label:"Vertical",value:"vertical"},{label:"Horizontal",value:"horizontal"}]},
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v})) },
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v})) },
        padding:{ type:"select", options:Object.keys(pads).map(v=>({label:v,value:v})) },
        borde:{ type:"select", options:borderOpts.map(v=>({label:v||"Sin borde",value:v})) },
        sombra:{ type:"select", options:shadowOpts.map(v=>({label:v||"Sin sombra",value:v})) },
      },
      defaultProps: {
        imagenUrl:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
        titulo:"Nombre del producto",
        descripcion:"Descripción corta que resalte beneficios.",
        precio:"19,900", moneda:"CRC",
        botonLabel:"Comprar", botonUrl:"#", botonAlineacion:"start",
        layout:"horizontal",
        fondo:"bg-white", texto:"text-gray-900", padding:"md", borde:"border border-gray-200", sombra:"shadow-sm",
      },
      render: (p) => {
        const symbol = p.moneda==="CRC"?"₡":p.moneda==="EUR"?"€":"$";
        const align = p.botonAlineacion==="center"?"justify-center":p.botonAlineacion==="end"?"justify-end":"justify-start";
        return (
          <div className={`${p.fondo} ${p.texto} ${pad(p.padding)} ${p.borde} ${p.sombra} rounded-xl`}>
            <div className={p.layout==="horizontal"?"flex gap-6":""}>
              {p.imagenUrl ? (
                <img
                  src={p.imagenUrl}
                  alt={p.titulo}
                  className={p.layout==="horizontal"?"w-1/3 rounded-lg object-cover":"w-full rounded-lg object-cover mb-4"}
                />
              ) : <div className="w-full h-40 bg-gray-100 rounded-lg mb-4" />}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{p.titulo}</h3>
                <p className="text-gray-600 mt-1">{p.descripcion}</p>
                {p.precio && <p className="mt-3 text-xl font-bold">{symbol}{p.precio}</p>}
                <div className={`mt-4 flex ${align}`}>
                  <a href={p.botonUrl} className="inline-flex rounded-lg px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition">
                    {p.botonLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },

    /* Hero (compacto) */
    Hero: {
      fields: {
        titulo:{ type:"text" }, descripcion:{ type:"textarea" },
        ctaLabel:{ type:"text" }, ctaUrl:{ type:"text" }, imagenUrl:{ type:"text" },
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v}))},
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v}))},
        padding:{ type:"select", options:[{label:"y-sm",value:"y-sm"},{label:"y-md",value:"y-md"},{label:"y-lg",value:"y-lg"}]},
      },
      defaultProps: {
        titulo:"Esta pagina fue creada con Genio",
        descripcion:"Genio ayuda a las pequeñas y medianas empresas a crear su presencia en línea de manera fácil y rápida.",
        ctaLabel:"Comenzar", ctaUrl:"#",
        imagenUrl:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        fondo:"bg-gray-50", texto:"text-gray-900", padding:"y-lg",
      },
      render: ({ titulo, descripcion, ctaLabel, ctaUrl, imagenUrl, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl font-extrabold">{titulo}</h1>
              <p className="mt-4 text-lg text-gray-600">{descripcion}</p>
              <div className="mt-6">
                <a href={ctaUrl} className="inline-flex px-5 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                  {ctaLabel}
                </a>
              </div>
            </div>
            {imagenUrl ? <img src={imagenUrl} alt={titulo} className="rounded-2xl w-full object-cover shadow-lg" /> : null}
          </div>
        </section>
      ),
    },

    /* Sección de texto */
    SeccionTexto: {
      fields: {
        nivel:{ type:"select", options:["h1","h2","h3","h4","h5","h6"].map(v=>({label:v,value:v})) },
        titulo:{ type:"text" }, contenido:{ type:"textarea" },
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v})) },
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v})) },
        padding:{ type:"select", options:Object.keys(pads).map(v=>({label:v,value:v})) },
        borde:{ type:"select", options:borderOpts.map(v=>({label:v||"Sin borde",value:v})) },
        sombra:{ type:"select", options:shadowOpts.map(v=>({label:v||"Sin sombra",value:v})) },
      },
      defaultProps: { nivel:"h2", titulo:"Sección", contenido:"Texto descriptivo.", fondo:"bg-white", texto:"text-gray-900", padding:"md", borde:"", sombra:"" },
      render: ({ nivel, titulo, contenido, fondo, texto, padding, borde, sombra }) => {
        const Tag = nivel as keyof React.JSX.IntrinsicElements;
        return (
          <section className={`${fondo} ${texto} ${pad(padding)} ${borde} ${sombra}`}>
            {React.createElement(Tag, { className: "text-2xl md:text-3xl font-bold mb-3" }, titulo)}
            <p className="text-gray-600">{contenido}</p>
          </section>
        );
      },
    },

    /* Misión / Visión */
    MisionVision: {
      fields: {
        variante:{ type:"select", options:[{label:"2 columnas",value:"dos-col"},{label:"Tarjetas",value:"tarjetas"}] },
        items:{
          type:"array",
          arrayFields:{
            icono:{ type:"select", options:Object.keys(ICONS).map(v=>({label:v,value:v})) },
            titulo:{ type:"text" }, texto:{ type:"textarea" },
          },
          defaultItemProps:{ icono:"target", titulo:"Misión", texto:"Describe tu misión." },
        },
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v})) },
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v})) },
        padding:{ type:"select", options:[{label:"sm",value:"sm"},{label:"lg",value:"lg"}] },
      },
      defaultProps: {
        variante:"dos-col",
        items:[
          { icono:"target", titulo:"Nuestra Misión", texto:"Impulsar PYMES con presencia digital." },
          { icono:"eye", titulo:"Nuestra Visión", texto:"Ser la herramienta más fácil para vender." },
        ],
        fondo:"bg-white", texto:"text-gray-900", padding:"lg",
      },
      render: ({ variante, items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className={variante==="tarjetas"?"max-w-7xl mx-auto grid md:grid-cols-2 gap-6":"max-w-7xl mx-auto grid md:grid-cols-2 gap-10"}>
            {items?.map((it,i)=>(
              <div key={i} className={variante==="tarjetas"?"rounded-xl border border-gray-200 p-6 bg-white shadow-sm":"flex items-start gap-4"}>
                <div className="text-purple-600">{ICONS[it.icono] || ICONS["idea"]}</div>
                <div>
                  <h3 className="text-xl font-semibold">{it.titulo}</h3>
                  <p className="text-gray-600 mt-1">{it.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    /* Misión / Visión / Valores */
    MisionVisionValores: {
      fields: {
        items:{
          type:"array",
          arrayFields:{
            icono:{ type:"select", options:Object.keys(ICONS).map(v=>({label:v,value:v})) },
            titulo:{ type:"text" }, texto:{ type:"textarea" },
          },
          defaultItemProps:{ icono:"star", titulo:"Valor", texto:"Explica el valor." },
        },
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v})) },
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v})) },
        padding:{ type:"select", options:[{label:"sm",value:"sm"},{label:"lg",value:"lg"}] },
      },
      defaultProps: {
        items:[
          { icono:"handshake", titulo:"Compromiso", texto:"Acompañamos a nuestros clientes." },
          { icono:"scale", titulo:"Integridad", texto:"Hacemos lo correcto." },
          { icono:"star", titulo:"Excelencia", texto:"Buscamos el máximo valor." },
        ],
        fondo:"bg-white", texto:"text-gray-900", padding:"lg",
      },
      render: ({ items, fondo, texto, padding }) => (
        <section className={`${fondo} ${texto} ${pad(padding)}`}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
            {items?.map((it,i)=>(
              <div key={i} className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm flex gap-4">
                <div className="text-purple-600">{ICONS[it.icono] || ICONS["star"]}</div>
                <div>
                  <h3 className="text-lg font-semibold">{it.titulo}</h3>
                  <p className="text-gray-600 mt-1">{it.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    /* Carrusel (con flechas y snap) */
    Carrusel: {
      fields: {
        slides:{
          type:"array",
          arrayFields:{
            tipo:{ type:"radio", options:[{label:"Imagen",value:"image"},{label:"Video",value:"video"}]},
            url:{ type:"text" }, caption:{ type:"text" },
          },
          defaultItemProps:{ tipo:"image", url:"", caption:"" },
        },
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v}))},
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v}))},
        padding:{ type:"select", options:[{label:"0",value:"0"},{label:"sm",value:"sm"},{label:"lg",value:"lg"}]},
        borde:{ type:"select", options:borderOpts.map(v=>({label:v||"Sin borde",value:v}))},
        sombra:{ type:"select", options:shadowOpts.map(v=>({label:v||"Sin sombra",value:v}))},
      },
      defaultProps: {
        slides:[
          { tipo:"image", url:"https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600&q=80&auto=format&fit=crop", caption:"Primera" },
          { tipo:"image", url:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1600&q=80&auto=format&fit=crop", caption:"Segunda" },
        ],
        fondo:"bg-white", texto:"text-gray-900", padding:"sm", borde:"", sombra:"",
      },
      render: ({ slides, fondo, texto, padding, borde, sombra }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const scrollBy = (d:number) => ref.current?.scrollBy({ left: d*(ref.current.clientWidth*0.8), behavior:"smooth" });
        return (
          <section className={`${fondo} ${texto} ${pad(padding)} ${borde} ${sombra} overflow-hidden relative`}>
            <div className="relative overflow-hidden">
              <div ref={ref} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                {slides?.map((s,i)=>(
                  <div key={i} className="snap-center shrink-0 basis-full md:basis-[70%]">
                    {s.tipo==="image"
                      ? (s.url ? <img className="w-full h-[360px] object-cover rounded-xl" src={s.url} alt={s.caption||""} /> : <div className="w-full h-[360px] bg-gray-100 rounded-xl" />)
                      : (s.url ? <video className="w-full h-[360px] object-cover rounded-xl" src={s.url} controls/> : <div className="w-full h-[360px] bg-gray-100 rounded-xl" />)}
                    {s.caption && <p className="mt-2 text-center text-sm text-gray-600">{s.caption}</p>}
                  </div>
                ))}
              </div>
              <button onClick={()=>scrollBy(-1)} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow p-2">‹</button>
              <button onClick={()=>scrollBy(1)} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow p-2">›</button>
            </div>
          </section>
        );
      },
    },

    /* Imagen (ahora nunca devuelve null) */
    Imagen: {
      fields: {
        url:{ type:"text" }, alt:{ type:"text" },
        borde:{ type:"select", options:borderOpts.map(v=>({label:v||"Sin borde",value:v}))},
        sombra:{ type:"select", options:shadowOpts.map(v=>({label:v||"Sin sombra",value:v}))},
        radio:{ type:"select", options:[{label:"sm",value:"sm"},{label:"md",value:"md"},{label:"lg",value:"lg"},{label:"xl",value:"xl"}]},
      },
      defaultProps: { url:"data:image/jpeg;base64,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",
      alt:"Imagen", borde:"", sombra:"", radio:"xl" },
      render: ({ url, alt, borde, sombra, radio }) => {
        const r = radio==="sm"?"rounded":radio==="md"?"rounded-md":radio==="lg"?"rounded-lg":"rounded-xl";
        return url
          ? <img src={url} alt={alt} className={`w-full h-auto object-cover ${r} ${borde} ${sombra}`} />
          : <div className={`w-full h-40 bg-gray-100 ${r} ${borde} ${sombra}`} />;
      },
    },

    /* Galería (slot acepta Imagen) */
    Galeria: {
      fields: {
        contenido: { type: "slot", allow: ["Imagen"] },
        columnasDesktop: { type: "number" },
        gap: { type: "select", options: ["0","2","4","6","8"].map(v=>({label:v,value:v})) },
        fondo: { type: "select", options: bgOpts.map(v=>({label:v,value:v})) },
        padding: { type: "select", options: [{label:"0",value:"0"},{label:"sm",value:"sm"},{label:"lg",value:"lg"}] },
      },
      defaultProps: {
        contenido: [],
        columnasDesktop: 4, gap: "4", fondo: "bg-white", padding: "sm",
      },
      render: ({ contenido: Content, columnasDesktop, gap, fondo, padding }) => {
        const cols =
          columnasDesktop >= 6 ? "md:columns-3 lg:columns-6" :
          columnasDesktop === 5 ? "md:columns-3 lg:columns-5" :
          columnasDesktop === 4 ? "md:columns-2 lg:columns-4" :
          columnasDesktop === 3 ? "md:columns-2 lg:columns-3" : "md:columns-2 lg:columns-2";
        return (
          <section className={`${fondo} ${pad(padding)}`}>
            <Content className={`columns-1 ${cols} ${gaps[gap] || gaps["4"]} [column-fill:_balance] [&>*]:mb-4 [&>*]:break-inside-avoid`} />
          </section>
        );
      },
    },

    /* FlexBox */
    FlexBox: {
      fields: {
        contenido: { type: "slot" },
        direccion: { type:"select", options:[{label:"Fila",value:"row"},{label:"Columna",value:"column"}] },
        alineacion: { type:"select", options:[
          {label:"Inicio",value:"start"},{label:"Centro",value:"center"},{label:"Final",value:"end"},{label:"Espaciado",value:"between"}
        ]},
        gap: { type:"select", options:Object.keys(gaps).map(v=>({label:v,value:v})) },
        fondo: { type:"select", options:bgOpts.map(v=>({label:v,value:v})) },
        padding: { type:"select", options:Object.keys(pads).map(v=>({label:v,value:v})) },
      },
      defaultProps: { contenido: [], direccion:"row", alineacion:"start", gap:"4", fondo:"bg-white", padding:"0" },
      render: ({ contenido: Content, direccion, alineacion, gap, fondo, padding }) => {
        const dir = direccion==="column"?"flex-col":"flex-row";
        const just =
          alineacion==="center"?"justify-center":
          alineacion==="end"?"justify-end":
          alineacion==="between"?"justify-between":"justify-start";
        return (
          <div className={`${fondo} ${pad(padding)} flex ${dir} ${just} ${gaps[gap] || gaps["4"]}`}>
            <Content />
          </div>
        );
      }
    },

    /* Carta de presentación */
    CartaPerfil: {
      fields: {
        fotoUrl:{ type:"text" }, nombre:{ type:"text" }, rol:{ type:"text" }, bio:{ type:"textarea" },
        fondo:{ type:"select", options:bgOpts.map(v=>({label:v,value:v})) },
        texto:{ type:"select", options:textOpts.map(v=>({label:v,value:v})) },
        padding:{ type:"select", options:Object.keys(pads).map(v=>({label:v,value:v})) },
        borde:{ type:"select", options:borderOpts.map(v=>({label:v||"Sin borde",value:v})) },
        sombra:{ type:"select", options:shadowOpts.map(v=>({label:v||"Sin sombra",value:v})) },
        links:{ type:"array", arrayFields:{ label:{type:"text"}, url:{type:"text"} }, defaultItemProps:{ label:"Web", url:"#"} }
      },
      defaultProps: {
        fotoUrl:"", nombre:"Tu nombre", rol:"Propietario", bio:"Breve descripción o presentación.",
        fondo:"bg-white", texto:"text-gray-900", padding:"md", borde:"border border-gray-200", sombra:"shadow-sm",
        links:[{label:"Sitio",url:"#"}]
      },
      render: ({ fotoUrl, nombre, rol, bio, fondo, texto, padding, borde, sombra, links }) => (
        <div className={`${fondo} ${texto} ${pad(padding)} ${borde} ${sombra} rounded-xl flex items-center gap-4`}>
          {fotoUrl ? <img src={fotoUrl} alt={nombre} className="w-20 h-20 rounded-full object-cover" /> : <UserRound className="w-16 h-16 text-gray-400" />}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{nombre}</h3>
            <p className="text-gray-600">{rol}</p>
            <p className="mt-2 text-gray-700">{bio}</p>
            {!!links?.length && (
              <div className="mt-3 flex flex-wrap gap-2">
                {links.map((l,i)=>(
                  <a key={i} href={l.url} className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                    <LinkIcon className="w-4 h-4" />{l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    },
    /* Video */
Video: {
  fields: {
    url: { type: "text" },
    poster: { type: "text" },
    caption: { type: "text" },

    autoplay: { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
    loop:     { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
    controls: { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
    muted:    { type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },

    variante: { type: "select", options: [
      { label: "Simple", value: "simple" },
      { label: "Card", value: "card" },
      { label: "Framed", value: "framed" },
    ]},

    ratio: { type: "select", options: [
      { label: "16/9", value: "16/9" },
      { label: "4/3",  value: "4/3"  },
      { label: "1/1",  value: "1/1"  },
      { label: "9/16", value: "9/16" },
    ]},

    fit: { type: "select", options: [
      { label: "Cover",   value: "cover" },
      { label: "Contain", value: "contain" },
    ]},

    radio:  { type: "select", options: [
      { label: "sm", value: "sm" },
      { label: "md", value: "md" },
      { label: "lg", value: "lg" },
      { label: "xl", value: "xl" },
    ]},
    borde:  { type: "select", options: borderOpts.map(v => ({ label: v || "Sin borde", value: v })) },
    sombra: { type: "select", options: shadowOpts.map(v => ({ label: v || "Sin sombra", value: v })) },

    alineacion: { type: "select", options: [
      { label: "Izquierda", value: "start" },
      { label: "Centro",    value: "center" },
      { label: "Derecha",   value: "end" },
    ]},

    ancho: { type: "select", options: [
      { label: "max-w-sm",  value: "max-w-sm"  },
      { label: "max-w-md",  value: "max-w-md"  },
      { label: "max-w-lg",  value: "max-w-lg"  },
      { label: "max-w-2xl", value: "max-w-2xl" },
      { label: "max-w-4xl", value: "max-w-4xl" },
      { label: "Sin límite",value: "max-w-none"},
    ]},

    fondo:   { type: "select", options: bgOpts.map(v => ({ label: v, value: v })) },
    texto:   { type: "select", options: textOpts.map(v => ({ label: v, value: v })) },
    padding: { type: "select", options: Object.keys(pads).map(v => ({ label: v, value: v })) },
  },

  defaultProps: {
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "",
    caption: "",

    autoplay: "no",
    loop: "no",
    controls: "si",
    muted: "no",

    variante: "simple",
    ratio: "16/9",
    fit: "cover",

    radio: "lg",
    borde: "",
    sombra: "shadow",

    alineacion: "start",
    ancho: "max-w-2xl",

    fondo: "bg-white",
    texto: "text-gray-900",
    padding: "sm",
  },

  render: (p) => {
    const r = p.radio === "sm" ? "rounded"
      : p.radio === "md" ? "rounded-md"
      : p.radio === "lg" ? "rounded-lg"
      : "rounded-xl";

    const align = p.alineacion === "center" ? "justify-center"
      : p.alineacion === "end" ? "justify-end"
      : "justify-start";

    const aspectMap: Record<string, string> = {
      "16/9": "16 / 9",
      "4/3":  "4 / 3",
      "1/1":  "1 / 1",
      "9/16": "9 / 16",
    };

    const wrapper =
      p.variante === "framed"
        ? `${p.fondo} ${p.texto} ${pad(p.padding)} ${p.borde} ${p.sombra} ${p.ancho} w-full`
        : p.variante === "card"
        ? `${p.borde || "border border-gray-200"} ${p.sombra} bg-white ${p.ancho} w-full p-2`
        : `${p.ancho} w-full`;

    return (
      <div className={`flex ${align}`}>
        <figure className={wrapper}>
          <div
            className={`${r} overflow-hidden`}
            style={{ width: "100%", aspectRatio: aspectMap[p.ratio] || "16 / 9" }}
          >
            <video
              src={p.url}
              poster={p.poster || undefined}
              controls={p.controls === "si"}
              autoPlay={p.autoplay === "si"}
              muted={p.muted === "si"}
              loop={p.loop === "si"}
              style={{ width: "100%", height: "100%", objectFit: p.fit === "contain" ? "contain" : "cover" }}
              className={`block ${r}`}
            />
          </div>
          {p.caption ? <figcaption className="mt-2 text-sm text-gray-600">{p.caption}</figcaption> : null}
        </figure>
      </div>
    );
  },
},
    /* Espacio (separador transparente) */
    Espacio: {
      fields: {
        ancho:{ type:"select", options:[
          {label:"auto",value:"auto"},{label:"1/4",value:"1/4"},{label:"1/3",value:"1/3"},{label:"1/2",value:"1/2"},
          {label:"2/3",value:"2/3"},{label:"3/4",value:"3/4"},{label:"full",value:"full"},
        ]},
        alto:{ type:"select", options:[{label:"0",value:"0"},{label:"2",value:"2"},{label:"4",value:"4"},{label:"6",value:"6"},{label:"8",value:"8"},{label:"12",value:"12"},{label:"16",value:"16"}] }
      },
      defaultProps: { ancho:"auto", alto:"4" },
      render: ({ ancho, alto }) => {
        const w = ancho==="auto"?"w-auto":ancho==="full"?"w-full":`w-${ancho.replace("/","/")}`;
        const h = `h-${alto}`;
        return <div className={`${w} ${h}`} />;
      }
    },
    Carta: {
      fields: {
        titulo: { type: "text" },
        descripcion: { type: "textarea" },
        padding: { type: "number"},
        variante: { type: "select", 
        options: [
          {label:"Normal",value:"border rounded-md"}, 
          {label:"Destacado",value:"shadow-lg"}
        ],
      },
        colorDeFondo: { type: "select", 
        options: [
          {label:"Inherente",value:"inherit"}, 
          {label:"Rojo",value:"red-300"},
          {label:"Amarillo",value:"yellow-100"},
          {label:"Verde",value:"green-100"},
        ],
      },
      },
      defaultProps: {
        titulo: "titulo",
        descripcion: "descripcion de la carta",
        padding: 16,
        variante: "border rounded-md",
        colorDeFondo: "inherit",
      }, 
      render: ({ titulo, descripcion, padding, variante,colorDeFondo}) => {
        //cuando hay muchas variantes de un elemento el classname se escribe de esta manera 
        //clasname={`${variante}`}
       return <div style={{ padding }} className={`${variante} bg-${colorDeFondo} `}>
          <h2 className="text-4xl font-bold p-4">{titulo}</h2>
          <p className="text-xl font-light p-4">{descripcion}</p>
        </div>
      },
      },
    }
  };
export default config;
