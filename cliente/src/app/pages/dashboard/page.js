import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/components/ListUsers";
import "./style.css"
import Excluir from "@/app/components/excluir"

export default  function Dashboard() {

   const users =  getUsers() 
    return (
        <div class="body">
           <Suspense fallback={<p>Carregando....</p>}>

            <div class="lista">
            <ListUsers class="lista" users={users}/>
            </div>
            <div class="alterar">
            <button class="button-1" role="button" ><span class="text"><a href="/pages/alterar">Alterar</a></span></button>
            <button class="button-2" role="button" ><span class="text"><a href="/pages/registrar">Registrar</a></span></button>
            </div>
           </Suspense>
           <Excluir class="Excluir"/>
        </div>
    );
};