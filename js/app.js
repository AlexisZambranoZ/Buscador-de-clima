const container = document.querySelector(`.container`)
const resultado = document.querySelector(`#resultado`)
const formulario = document.querySelector(`#formulario`)

window.addEventListener(`load`, () =>{
    formulario.addEventListener(`submit`, buscarClima)


})

function buscarClima(e){
    e.preventDefault()

    console.log(`Buscando Clima`);
    
    //Validar
    const ciudad = document.querySelector(`#ciudad`).value
    const pais = document.querySelector(`#pais`).value

    if(ciudad === `` || pais === ``){
        //Hubo un error
       mostrarError(`Ambos campos son obligatorios`)

       return
    }
    /* console.log(ciudad);
    console.log(pais); */


    //Consultar la API
    consultarApi(ciudad,pais)

    

}

function mostrarError(mensaje){
    const alerta = document.querySelector(`.bg-red-100`)

    if(!alerta){    
        //Crear una alerta
        const alerta = document.createElement(`div`)

        alerta.classList.add(`bg-red-100`, `border-red-400`, `text-red-700`, `px-4`, `py-3`, 
        `rounded`, `max-w-md`,`mx-auto`,`mt-6`,`text-center`)

        alerta.innerHTML = `
            <strong class= font-bold>Error</strong>
            <span class="block">${mensaje}</span>
        `
        container.appendChild(alerta)

        //Se elimine la alerta despues de 5 segundos
        setTimeout(() => {
            alerta.remove()
        }, 2000);
    



    }
}

function consultarApi(ciudad, pais){
    const appId = `bfa35a93b59bace443bb1fda053a8bb7`

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    spinner() //Muestra el spinner

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        limpiarHTML() //Limpiar HTML previo
        /* console.log(datos); */
        if(datos.cod === `404`){
            mostrarError(`Ciudad no encontrada`)
            return
        }

        //Imprime la respuesta en el HTML
        mostrarClima(datos)
    })

}

function mostrarClima(datos){
    const { sys: {country} , name , main: {temp, temp_max , temp_min } } = datos


    console.log(datos);
    
    const nombreCiudad = document.createElement(`p`)
    nombreCiudad.innerHTML = `Clima en ${name}`
    nombreCiudad.classList.add(`font-bold`, `text-2xl`)
    
    const nombrePais = document.createElement(`p`)
    nombrePais.innerHTML = `${country}`
    nombrePais.classList.add(`text-xl`)

    const centigrados = kelvinACentigrados(temp)
    const max = kelvinACentigrados(temp_max)
    const min = kelvinACentigrados(temp_min)
   
    const actual = document.createElement(`p`)
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add(`font-bold`,`text-6xl`)
   
    const tempMaxima = document.createElement(`p`)
    tempMaxima.innerHTML = `Max: ${max} &#8451`
    tempMaxima.classList.add(`text-xl`)
    

    const tempMin = document.createElement(`p`)
    tempMin.innerHTML = `Min: ${min} &#8451`
    tempMin.classList.add(`text-xl`)
    
   
    const resultadoDiv = document.createElement(`div`)
    resultadoDiv.classList.add(`text-center`, `text-white`)
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(nombrePais)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMin)


    resultado.appendChild(resultadoDiv)



}

function kelvinACentigrados(grados){
    return parseInt(grados - 273.15)
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
    
}

function spinner() {

     limpiarHTML()

    const divSpinner = document.createElement(`div`)
    divSpinner.classList.add("sk-cube-grid")
    divSpinner.innerHTML= `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>  
    `
    resultado.appendChild(divSpinner)
}