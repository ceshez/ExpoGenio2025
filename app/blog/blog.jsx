"use client"
import { SquareUserRound } from 'lucide-react';
import LogoGenio from "../components/LogoGenio"
const Blog = () => {
  return (
    <section className="p-6 bg-white ">
        <div className=" my-10 mt-18 ml-4 flex items-center gap-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" >
                Lo mas reciente de GENIO
            </h2>
            <LogoGenio variant="simplified" className="mb-4 w-24 h-24"/>
        </div>

        <div className="max-w-7xl px-6">
            <div className="grid grid-flow-rows grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
                <div className="group flex w-s flex-col rounded-xl border border-gray-300 shadow-lg hover: shadow-4xl transition-all overflow-hidden hover:border-purple-600 duration=500 ">
                    <div className='m-4'>
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
  Con herramientas visuales como <strong>GENIO</strong>, puedes diseñar y publicar tu sitio web en minutos, 
  usando plantillas profesionales que se adaptan a tu marca. Digitalizar tu negocio nunca había sido tan fácil.
                        </p>
                        
                        <p className="mt-6 gap-2 flex items-center text-sm text-slate-700 font-medium  transition-colors ">
                            <SquareUserRound className="h-8 w-8"/>
                            Carlos sanchez
                        </p>
                    </div>  
                    </div>   
                </div>
            </div>
        </div>
    </section>
)
}

export default Blog