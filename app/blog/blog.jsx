"use client"
import { Plus, User, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import LogoGenio from "../components/LogoGenio"
const Blog = () => {
  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className=" my-10 mt-18 ml-4 flex items-center gap-8 max-w-7xl mx-auto ">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800" >
                Lo mas reciente de GENIO
            </h2>
            <LogoGenio variant="simplified" className="mb-4 w-24 h-24"/>
            
        </div>
        <div className="flex left-28 justify-between mb-6 my-10 ml-4">
            <Button className="flex items-center gap-2 w-fit px-6 py-6 text-lg transition-all hover:scale-105">
              <Plus className="w-6 h-6" />
              Agregar Aviso
            </Button> {/* Carlos Aca agrege la funcion con la base de datos cuando la actualize  */}
        </div>
            
        <div className="max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                
                <div className="group flex flex-col rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-all overflow-hidden hover:border-purple-600 duration-500">
                    <div className='m-4 relative'>
                        <button className="flex flex-row gap-2 top-2 right-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                            <Trash className="w-5 h-5" />
                            <p>Eliminar anuncio</p> {/* lo mismo aca obvio esto solo lo veremos nosotros  */}
                        </button>
                        
                        <div className="justify-between flex p-6 text-gray-500">
                            <p>Sitios</p>
                            <p>oct 24, 2025</p>
                        </div>
                        <div className="p-8">
                                <h3 className="text-2xl font-bold mb-2 pb-4">
                                Cómo crear un sitio web desde cero
                                </h3>
                            <p className="text-slate-600 text-m leading-relaxed ">
                                En Costa Rica, muchas PYMES aún no cuentan con presencia en línea por falta de conocimientos técnicos. 
                                Con herramientas visuales como GENIO, puedes diseñar y publicar tu sitio web en minutos, 
                                usando plantillas profesionales que se adaptan a tu marca. Digitalizar tu negocio nunca había sido tan fácil.
                            </p>
                            <p className="mt-6 gap-2 flex items-center text-sm text-slate-700 font-medium  transition-colors ">
                                <User className="h-8 w-8"/>
                                Carlos sanchez
                            </p>
                        </div> 
                    </div> 
                </div>{/* Tarjeta completa cierra aca */}
                 
            </div>
        </div>
    </section>
)
}

export default Blog