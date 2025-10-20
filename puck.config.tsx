import { type Config } from "@measured/puck";

type Props = {
  Encabezado: { titulo: string };
  Grid: { items: any[] };
  Carta: {
     titulo: string; 
     descripcion: string 
     padding: number;
     variante: string;
     colorDeFondo: string;
  };
};

export const config: Config<Props> = {
  categories:{
   Escritura: {
    components: ["Encabezado"],
    title: "Escritura",
   },
   others: {
    title: "Otros", 
   },
  },
  components: {
    Encabezado: {
      fields: {
        titulo: { type: "textarea" },
      },
      defaultProps: {
        titulo: "Encabezado",
      },
      render: ({ titulo }) => (
        <div className="text-4xl font-bold p-4">
          <h1>{titulo}</h1>
        </div>
      ),
    },
    Grid: {
      fields: {
        items: { type: "slot"},
      },
      defaultProps: {
        items: [],
      },
      render: ({ items: Items }) => {
        return <Items className="grid grid-cols-3 gap-4 p-4 "/>;
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
          <h2>{titulo}</h2>
          <p>{descripcion}</p>
        </div>
      },
      },
    },
};

export default config;
