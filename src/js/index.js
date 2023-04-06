const palabrAdivinar = ingresarPalabra();
let letrasAcertadas = [];
mostrarLetrasAcertadas();

const letra = document.querySelector('input');
letra.oninput = function(){
    soloLetras(letra.value, palabrAdivinar);
};

function ingresarPalabra(){
    const palabra = prompt("Ingresa una palabra para adivinar!");
    const arrPalabra = palabra.split("");
    console.log(arrPalabra);
    let tablero = "";
    arrPalabra.forEach(letra => {
        tablero = tablero + "<td id='" + letra + "'> ? </td>";
    });
    document.getElementById("tablero").innerHTML = `
        <table border="1">
            <tr>
                ${tablero}
            </tr>
        </table>
    `;
    return arrPalabra;
};
function soloLetras(cadena, palabrAdivinar){
    const pattern = new RegExp('[a-zA-Z]');
    console.log(pattern.test(cadena));
    if(!pattern.test(cadena)){
        document.querySelector('input').value = "";
        document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!..";
        return false;
    }else{
        const coincidencias = buscarCoincidencia(cadena,palabrAdivinar);
        if (coincidencias > 0) {
            document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
        } else {
            document.getElementById("status").innerHTML = `No hubo coinciencias :(`;
        }
        return true;
    }
}
function buscarCoincidencia(letra, arrPalabra){
    let coincidencias = 0;
    arrPalabra.forEach((caracter, indice) => {
        if(caracter == letra){
            document.getElementById(caracter).innerText = letra;
            coincidencias++;
            if (!letrasAcertadas.includes(letra)) {
                letrasAcertadas.push(letra);
                mostrarLetrasAcertadas();
            }
        }
    });
    return coincidencias;
}
function mostrarLetrasAcertadas(){
    document.getElementById("letrasAcertadas").innerHTML = letrasAcertadas.join(', ');
}