const palabrAdivinar = ingresarPalabra()
let letrasAcertadas = []
let letrasErradas = []
let intentosRestantes = 6
mostrarLetrasAcertadas()
mostrarLetrasErradas()

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
    tablero = tablero + "<td name='" + letra + "'>_</td>"
  })
  document.getElementById('tablero').innerHTML = `
        <table>
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
      }.png` 
      if (intentosRestantes == 0) {
        document.getElementById(
          'status',
        ).innerHTML = `¡Perdiste! La palabra era "${palabrAdivinar.join('')}".`
        document.getElementById('image').src = `img/gameover.png` 
        document.querySelector('input').disabled = true
      }
    }
    return true
  }
}

function buscarCoincidencia(letra, arrPalabra) {
  let coincidencias = 0

  arrPalabra.forEach((caracter, indice) => {
    if (caracter === letra) {
      const elements = document.getElementsByName(caracter)

      elements.forEach((element) => {
        element.innerText = letra
      })

      coincidencias++

      if (!letrasAcertadas.includes(letra) && !letrasErradas.includes(letra)) {
        letrasAcertadas.push(letra)
        mostrarLetrasAcertadas()
      }
    }
  })

  if (
    coincidencias === 0 &&
    !letrasAcertadas.includes(letra) &&
    !letrasErradas.includes(letra)
  ) {
    letrasErradas.push(letra)
    mostrarLetrasErradas()


    document.getElementById('intentos').innerHTML = `${intentosRestantes}`
    document.getElementById('image').src = `img/ahorcado${
      7 - intentosRestantes
    }.png`

    if (intentosRestantes === 0) {
      document.getElementById(
        'status',
      ).innerHTML = `¡Perdiste! La palabra era "${arrPalabra.join('')}".`
      document.querySelector('input').disabled = true
    } else {
      document.getElementById('status').innerHTML = `No hubo coincidencias :(`
    }
  } else if (coincidencias > 0) {
    document.getElementById(
      'status',
    ).innerHTML = `Hubo ${coincidencias} coincidencias!!!`
  }

  return coincidencias
}

function mostrarLetrasAcertadas() {
  document.getElementById('letrasAcertadas').innerHTML = letrasAcertadas.join(
    ' - ',
  )
}
function mostrarLetrasErradas() {
  document.getElementById('letrasErradas').innerHTML = letrasErradas.join(' - ')
}
