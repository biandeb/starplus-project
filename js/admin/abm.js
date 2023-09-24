import { PeliculaSeries } from "./PeliculasSeries.js";
import { agregarPeliculasOSeriesALS, cargarTabla, obtenerPeliculasOSeriesDeLS } from "./adminUtils.js";


export const añadirPeliculasSerie = (nombre, tipo, duracion, caratula, descripcion, publicada,categoria) =>{
    const nuevaPOS = new PeliculaSeries (nombre, tipo, duracion, caratula, descripcion, publicada, categoria)

agregarPeliculasOSeriesALS(nuevaPOS);

    swal.fire({
        title:"Exito",
        text: "Se guardó de manera exitosa",
        icon:"success",
    })
};


export const editarPeliculasSeries = (nombre, tipo, duracion, caratula, descripcion, publicada,categoria) =>{
const codigo = sessionStorage.getItem("codigoPeliculaOSerie")
const peliculaOSerie = obtenerPeliculasOSeriesDeLS();
if(!codigo){
    swal.fire({
        title: "Error",
        text:"No se encontró",
        icon: "Error",
    })
    return;
} 
const posicionpeliculaOSerie = peliculaOSerie.findIndex(
    (item)=>item.codigo === codigo
    );
if(posicionpeliculaOSerie === -1){
    swal.fire({
        title: "Error",
        text:"No se encontró",
        icon: "Error",
    })
}
const pelicilaOSerieEditada = new PeliculaSeries(nombre,tipo,duracion,caratula,descripcion,publicada,categoria)
peliculaOSerie.splice(posicionpeliculaOSerie,1,pelicilaOSerieEditada)

localStorage.setItem("peliculasSeries", JSON.stringify(peliculaOSerie))
swal.fire({
    title: "Éxito",
    text:"Se modificó con éxito",
    icon: "success",
})

sessionStorage.removeItem("codigoPeliculaOSerie")
}


export const eliminarPeliculasSerie = (codigo) => {
swal
.fire({
    title:"¿Estás seguro?",
    text:"Esta opción no será reversible",
    icon:"warning",
    showCancelButton: true,
    cancelButtonText:"Cancelar",
    confirmButtonText:"Sí, eliminar",
    })
    .then((action)=>{
        if(action.isConfirmed){
            
            const peliculaOSerie = obtenerPeliculasOSeriesDeLS();

            const listaFiltrada = peliculaOSerie.filter(
                (item)=>item.codigo !== codigo
                );
                localStorage.setItem("peliculasSeries", JSON.stringify(listaFiltrada))

                swal.fire({
                    title: "Exito",
                    text:"Se eliminó con éxito",
                    icon: "success",
                })
                cargarTabla();

        } 
    });
}

export const destacarPeliculasSerie = (codigo) => {
    const peliculaOSerie = obtenerPeliculasOSeriesDeLS();
  
    const indexPelicula = peliculaOSerie.findIndex((item) => {
      return item.codigo === codigo;
    })
  
    if (indexPelicula === -1) {
      console.error("Hubo un error");
      return;
    }
  
    const peliculaSeleccionada = peliculaOSerie[indexPelicula];
    const estabaDestacada = peliculaSeleccionada.destacada;
    peliculaSeleccionada.destacada = !estabaDestacada;
  
    localStorage.setItem("peliculasSeries", JSON.stringify(peliculaOSerie));
  
    if (estabaDestacada) {
      swal.fire({
        title: "Éxito",
        text: "Se destacó exitosamente",
        icon: "success",
      });
    } else {
      swal.fire({
        title: "Éxito",
        text: "Se quitó el destacado de la película/serie",
        icon: "success",
      });
    }
}

