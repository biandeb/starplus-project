import { añadirCategorias, editarCategorias } from "./abmCategoria.js";
import { estaEditandoCat, tablaCat } from "./adminUtils.js";
import { validarNombre } from "./validators.js";

tablaCat()


const formCategoria = document.getElementById("form-categoria");
const campoCategoria = document.getElementById("input-categoria");


campoCategoria.addEventListener("blur",(e)=>{
const valor = e.target.value;
   
validarNombre(valor, campoCategoria)
   
      
   });

   formCategoria.addEventListener("submit", (e)=>{
        e.preventDefault();
        
       const nombre = campoCategoria.value;
       
 
 
        if ( validarNombre(nombre, campoCategoria)) {

            if (estaEditandoCat()){
                editarCategorias(nombre)
            } else {
                 añadirCategorias(nombre)
            }
      

      tablaCat();

      formCategoria.reset()
    campoCategoria.classList.remove("is-valid","is-invalid")
      
    }
 })