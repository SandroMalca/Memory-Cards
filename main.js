//inicializacion de variables
let tarjetasDespatadas=0
let tarjeta1=null
let tarjeta2=null
let primerResultado=null
let segundoResultado=null
let movimientos=0
let aciertos=0
let temporizador=false
let timer=30
let timerInicial=30
let tiempoRegresivoId=null

let winAudio= new Audio('./sound/win.wav')
let clickAudio= new Audio('./sound/click.wav')
let loseAudio= new Audio('./sound/lose.wav')
let rightAudio= new Audio('./sound/right.wav')
let wrongAudio= new Audio('./sound/wrong.wav')

//Mostrar en documentos HTML
let mostrarMovimientos=document.getElementById('movimientos')
let mostrarAciertos=document.getElementById('aciertos')
let mostrarTiempo=document.getElementById('t-restante')

//Generacion de numeros aleatorios
let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros=numeros.sort(()=>Math.random()-0.5)

//Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--
        mostrarTiempo.innerHTML=`Tiempo: ${timer} segundos`
        if(timer==0){
            clearInterval(tiempoRegresivoId)
            bloquearTarjetas(numeros)
            loseAudio.play()
        }
    },1000)
    
}

function bloquearTarjetas(){
    for(let i=0; i<=15;i++){
      let tarjetaBloqueada=document.getElementById(i)
      tarjetaBloqueada.innerHTML=`<img src="./images/${numeros[i]}.png" alt="">`
      tarjetaBloqueada.disabled=true   
    }
}
// Funcion principal
function destapar(id){

    if(temporizador==false){
        contarTiempo()
        temporizador=true
    }


    tarjetasDespatadas++
    console.log(tarjetasDespatadas)

    if(tarjetasDespatadas==1){
        // Mostrar primer número
        tarjeta1=document.getElementById(id)
        primerResultado=numeros[id]
        tarjeta1.innerHTML= `<img src="./images/${primerResultado}.png" alt="">`
        clickAudio.play()
        // Desahabilitar primer boton
        tarjeta1.disabled=true
    }else if(tarjetasDespatadas==2){
       // Mostrar primer número
       tarjeta2=document.getElementById(id)
       segundoResultado=numeros[id]
       tarjeta2.innerHTML= `<img src="./images/${segundoResultado}.png" alt="">`
       // Desahabilitar primer boton
       tarjeta2.disabled=true 
       // Incrementar los movimientos
       movimientos++
       mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`

       if(primerResultado==segundoResultado){
        //Contador en cero para tarjetasDestapadas
        tarjetasDespatadas=0

        // Aciertos
        aciertos++
        mostrarAciertos.innerHTML=`Aciertos: ${aciertos}`
        rightAudio.play()
  
        if(aciertos==8){
            winAudio.play()
            clearInterval(tiempoRegresivoId)
            mostrarAciertos.innerHTML= `Aciertos: ${aciertos} 😯`
            mostrarTiempo.innerHTML= `Fantástico 🥳 Soló te demoraste ${timerInicial - timer} segundos`
            mostrarMovimientos.innerHTML= `Movimientos: ${movimientos} 🤟😎`
        }
       }else{
        wrongAudio.play()
        //Mostrar temporalmente valores y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML=" "
            tarjeta2.innerHTML=" "
            tarjeta1.disabled=false
            tarjeta2.disabled=false
            tarjetasDespatadas=0 
        },1000)
       }       
    }
}
