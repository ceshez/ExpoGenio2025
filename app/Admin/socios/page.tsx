 "use client"
 import Dashboard from "../dashboard"
import {Earth} from "lucide-react"
 
 export default function SociosAdmin() {
   return (
     <div className="flex min-h-screen">
       <Dashboard />
 
       <main className="flex-1 p-8 bg-gray-50">
         <h1 className="text-2xl font-bold text-slate-800">Gestión de Socios</h1>
         <p className="mt-2 text-slate-600">
           Administra los socios de GENIO.
         </p>
 
         <div className="mt-8">
           <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
             Nuevo socio
           </button>
 
           {/* ejemplo de tabla como las de yutu muejeje aca seria con la base de datos*/}
           <div className="mt-6 border rounded-lg overflow-hidden">
             <table className="w-full text-left border-collapse">
               <thead className="bg-purple-100">
                 <tr>
                   <th className="p-3 text-slate-700">Nombre</th>
                   <th className="p-3 text-slate-700">Logo</th> {/* Aca obvio seria el archivo .png */}
                   <th className="p-3 text-slate-700">Descripcion</th>
                   <th className="p-3 text-slate-700 text-right">Acciones</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="border-t">
                   <td className="p-3">Meic</td>
                   <td className="p-3"><Earth className="w-12 h-12"/></td>
                   <td className="p-3">En Costa Rica, muchas PYMES aún no cuentan con presencia en línea por falta de conocimientos técnicos. 
                                 Con herramientas visuales como GENIO, puedes diseñar y publicar tu sitio web en minutos, 
                                 usando plantillas profesionales que se adaptan a tu marca. Digitalizar tu negocio nunca había sido tan fácil</td>
                   <td className="p-3 text-right space-x-2">
                     <button className="text-purple-600 hover:underline">Editar</button>
                     <button className="text-red-500 hover:underline">Eliminar</button>
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
       </main>
     </div>
   )
 }
 