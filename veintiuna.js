const sc = require('prompt-sync')();

let seHaPlantado = false
let baraja = llenarBaraja()
baraja = barajar(baraja)

const manoCasa = []
const manoJugador = []
repartir(2, manoJugador)
repartir(2, manoCasa)
console.log('Mano del jugador => ', manoJugador)
console.log('Mano de la casa => ', ocultarMano(manoCasa))


while (!seHaPlantado && !teHasPasao(manoJugador)) {
    jugar()
}

if (seHaPlantado) {
    while(sumarValoresMano(manoCasa)<17){
        jugarCasa()
    }
    console.log('Mano del jugador',manoJugador);
    console.log('Mano de la casa',manoCasa);

    const puntosJugador=sumarValoresMano(manoJugador);
    const puntosCasa=sumarValoresMano(manoCasa);

    if(puntosCasa > 21 || puntosJugador > puntosCasa){
        console.log("Ganaste con un total de puntos => ", puntosJugador);
    }else {
    console.log('Gana la casa chaval')
    }   
}

function sumarValoresMano(mano) {
    let suma = 0
    for (let i = 0; i < mano.length; i++) {
        suma += mano[i]
    }
    return suma
}

function teHasPasao(mano) {
    return sumarValoresMano(mano) > 21
}
function jugarCasa(){

}
function jugar() {
    console.log("Mano actual del jugador",manoJugador);
    const decision = sc('¿Quieres otra? (s/n)')
    if (decision.toLowerCase()== 's') {
        repartir(1, manoJugador)
    } else if (decision.toLowerCase() === 'n'){
        seHaPlantado = true
    }else {
        console.log("entrada no valida");
    }
}

function repartir(numCartas, mano) {
    for (let i = 0; i < numCartas; i++) {
        if(baraja.length>0){

        
        mano.push(baraja.pop())
    }else {
        console.log("no hay cartas suficientes");
    }
}
}

function barajar(baraja) {
    return baraja.sort(function (a,b) {return 0.5 - Math.random() });
}

function llenarBaraja() {
    let cartas = []
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 10; j++) {
            if (j > 7) {
                cartas.push(10)
            } else {
                cartas.push(j)
            }
        }
    }
    return cartas
}
function jugarCasa(){
    return repartir(1, manoCasa)
}

function ocultarMano(mano) {
    const manoOculta=[...mano];
    manoOculta[0]='*';
    return manoOculta;
    
}

