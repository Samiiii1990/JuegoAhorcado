const palabrAdivinar = ingresarPalabra() //constante llama a la funcion ingresarPalabra()
let letrasAcertadas = [] //array almacena letras acertadas
let letrasErradas = [] //array almacena letras erradas
let intentosRestantes = 6 // variable global numero de intentos que tiene el jugador

const letra = document.querySelector('input') //recupera el elemento input del documento html y lo asigna a una variable "letra"
letra.oninput = function () {
  //detector de eventos en el elemento de entrada cuando el jugador escribe una letra llama a la funcion
  soloLetras(letra.value, palabrAdivinar) //parametros letra ingresada verificando que sea una letra y la palabra a adivinar
}

function ingresarPalabra() {
  const palabra = prompt('Ingresa una palabra para adivinar!') //muestra un cuadro de dialogo donde el usuario ingresa la palabra a adivinar
  const arrPalabra = palabra.split('') //toma la palabra la divide y convierte en un arreglo de caracteres"arrPalabra"
  let tablero = '' //inicializa el tablero vacio
  arrPalabra.forEach((letra) => {
    //recorre el arreglo por cada letra agrega un guion
    tablero = tablero + "<td name='" + letra + "'>_</td>"
  })
  document.getElementById('tablero').innerHTML = `
        <table>
            <tr>
                ${tablero}
            </tr>
        </table>
    ` //Actualiza el tablero en el documento html ID=tablero
  return arrPalabra //devuelve la palabra a adivinar como un array de caracteres
}
function soloLetras(cadena, palabrAdivinar) {
  //parametros cadena(entrada),palabra a adivinar
  const pattern = new RegExp('[a-zA-Z]') //crea un patron
  console.log(pattern.test(cadena)) //prueba si la cadena coincide con el patron
  if (!pattern.test(cadena)) {
    //si la cadena de entrada contiene algo distinto al patron (caracter)
    document.querySelector('input').value = '' //borra el campo de entrada
    document.getElementById('status').innerHTML = //muestra un mensaje de error en el elemento Html id=status
      'Solo puedes ingresar letras!!!..'
    return false //indica que la entrada no es valida
  } else {
    //si es una cadena valida
    const coincidencias = buscarCoincidencia(cadena, palabrAdivinar) //lama a la funcion
    validarCoincidencias(coincidencias) //llama a la funcion
    verificarVictoria() //llama a la funcion
    return true //indica que es una cadena valida
  }
}

function buscarCoincidencia(letra, arrPalabra) {
  //parametros letra ingresada y palabra a adivinar
  let coincidencias = 0 //inicializa en cero almacena el numero de coincidencias

  arrPalabra.forEach((caracter) => {
    //por cada caracter comprueba si coincide con la letra de entrada
    if (caracter === letra) {
      //si el caracter es igual a la letra de entrada
      const elements = document.getElementsByName(caracter) //recupera del doc Html todos los elementos con el atributo "name" con el valor de "caracter"

      elements.forEach((element) => {
        //recorre cada uno de los elementos Html
        element.innerText = letra //establece su texto interno en la letra de entrada acutalizando la pantalla para mostrar la letra adivinada
      })

      coincidencias++ //incrementa las coinciencias

      if (!letrasAcertadas.includes(letra) && !letrasErradas.includes(letra)) {
        //si la letra acertada no esta en la Matriz de letras acertadas
        letrasAcertadas.push(letra) //agrega la letra acertada a la matriz
        mostrarLetrasAcertadas() //llama a la funcion
      }
    }
  })

  if (
    coincidencias === 0 && //si no hay coincidencias
    !letrasAcertadas.includes(letra) && //si la letra no esta en la matriz de letras acertadas
    !letrasErradas.includes(letra) //si la letra no esta en la matriz de letras erradas
  ) {
    letrasErradas.push(letra) //agrega la letra a la matriz de letras erradas
    mostrarLetrasErradas() //llama a la funcion
  }
  return coincidencias //devuelve el numero de coincidencias
}

function validarCoincidencias(coincidencias) {
  //parametro coincidencias
  if (coincidencias > 0) {
    // si hay coincidencias
    document.getElementById(
      'status',
    ).innerHTML = `Hubo ${coincidencias} coincidencias!!!` //muestra las coincidencias
  } else {
    intentosRestantes-- //si no hay coincidencias decrementa el numero de intentos restantes
    document.getElementById('intentos').innerHTML = `${intentosRestantes}` //muestra el numero de intentos restantes
    document.getElementById('status').innerHTML = `No hubo coinciencias :(` //muestra mensaje en el id status
    document.getElementById('image').src = `img/ahorcado${
      //muestra la imagen dependiendo del numero de intentos restantes
      7 - intentosRestantes
    }.svg`
    if (intentosRestantes == 0) {
      //si no hay intentos restantes
      document.getElementById(
        'status',
      ).innerHTML = `¡Perdiste! La palabra era "${palabrAdivinar.join('')}".` //muestra el mensaje, la palabra a adivinar
      document.getElementById('image').src = `img/gameover.svg` //muestra la imagen cara triste
      document.querySelector('input').disabled = true //termina el juego
      let btn = document.getElementById('button')
      btn.innerHTML = 'Seguir Jugando'
      btn.onclick = function () {
        window.location.reload()
      }
    }
  }
}

function mostrarLetrasAcertadas() {
  document.getElementById('letrasAcertadas').innerHTML = letrasAcertadas.join(
    ' - ', //toma el Id letras acertadas del hatml y lo actualiza y lo establece en el contenido de la
  ) //matriz letras acertadas con el metodo join lo convierte en cadena y toma como argumento '-'
} //concatena todos los elementos en una sola cadena y los muestra en la web
function mostrarLetrasErradas() {
  document.getElementById('letrasErradas').innerHTML = letrasErradas.join(' - ')
} //idem que mostrar letras acertadas...

//esta funcion muestra mensaje e imagen cuando ganó
function verificarVictoria() {
  if (letrasAcertadas.length === palabrAdivinar.length) {
    //compara si la longitud de la matriz letrasAcertadas es = a la matriz palabrAdivinar
    document.getElementById('status').innerHTML = `Felicidades Ganaste !!! : )` //muestra el mensaje de ganaste
    document.getElementById('image').src = `img/happyface.svg` //muestra la imagen de cara feliz

    document.querySelector('input').disabled = true //termina el juego
  }
}
