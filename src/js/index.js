const palabrAdivinar = ingresarPalabra()
let letrasAcertadas = []
let intentosRestantes = 6
mostrarLetrasAcertadas()

const letra = document.querySelector('input')
letra.oninput = function () {
  soloLetras(letra.value, palabrAdivinar)
}

function ingresarPalabra() {
  const palabra = prompt('Ingresa una palabra para adivinar!')
  const arrPalabra = palabra.split('')
  console.log(arrPalabra)
  let tablero = ''
  arrPalabra.forEach((letra) => {
    tablero = tablero + "<td name='" + letra + "'> ? </td>"
  })
  document.getElementById('tablero').innerHTML = `
        <table border="1">
            <tr>
                ${tablero}
            </tr>
        </table>
    `
  return arrPalabra
}
function soloLetras(cadena, palabrAdivinar) {
  const pattern = new RegExp('[a-zA-Z]')
  console.log(pattern.test(cadena))
  if (!pattern.test(cadena)) {
    document.querySelector('input').value = ''
    document.getElementById('status').innerHTML =
      'Solo puedes ingresar letras!!!..'
    return false
  } else {
    const coincidencias = buscarCoincidencia(cadena, palabrAdivinar)
    if (coincidencias > 0) {
      document.getElementById(
        'status',
      ).innerHTML = `Hubo ${coincidencias} coincidencias!!!`
    } else {
      intentosRestantes--
      document.getElementById('intentos').innerHTML = `${intentosRestantes}`
      document.getElementById('status').innerHTML = `No hubo coinciencias :(`
      document.getElementById('image').src = `img/ahorcado${
        7 - intentosRestantes
      }.png` // display image for incorrect attempt
      if (intentosRestantes == 0) {
        document.getElementById(
          'status',
        ).innerHTML = `¡Perdiste! La palabra era "${palabrAdivinar.join('')}".`
        document.querySelector('input').disabled = true
      }
    }
    return true
  }
}

function buscarCoincidencia(letra, arrPalabra) {
  let coincidencias = 0

  arrPalabra.forEach((caracter, indice) => {
    if (caracter == letra) {
      const elements = document.getElementsByName(caracter)

      elements.forEach((element) => {
        element.innerText = letra
      })
      coincidencias++
      if (!letrasAcertadas.includes(letra)) {
        letrasAcertadas.push(letra)
        mostrarLetrasAcertadas()
      }
    }
  })

  return coincidencias
}
function mostrarLetrasAcertadas() {
  document.getElementById('letrasAcertadas').innerHTML = letrasAcertadas.join(
    ', ',
  )
}
