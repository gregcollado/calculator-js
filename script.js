// Script para la calculadora basada en JavaScript

// Variables para almacenar los elementos del DOM
const pantalla = document.querySelector('.pantalla span');
const numeros = document.querySelectorAll('.numero');
const operadores = document.querySelectorAll('.operador');
const del = document.querySelector('.signoDel');
const AC = document.querySelector('.signoAC');
const punto = document.querySelector('.punto');
const igual = document.querySelector('.igual');
const cambioSigno = document.querySelector('.cambioSigno');

// Estado de la calculadora
const estado = {
  primerNumero : undefined,
  segundoNumero : undefined,
  operador : undefined,
  esperandoSegundoNumero : false,
  acaboDeCalcular : false // Indica si se acaba de calcular un resultado
}

// Función para registrar los eventos de los números
function registrarEventosNumeros(){
  numeros.forEach(numero => {
    numero.addEventListener('click', () => {
      if(estado.acaboDeCalcular){ // Si se acaba de calcular un resultado, reiniciamos la pantalla
        pantalla.textContent = numero.textContent;
        estado.acaboDeCalcular = false;
      }
      else if (estado.esperandoSegundoNumero) { // Si se está esperando el segundo número, reemplazamos la pantalla con el nuevo número
          pantalla.textContent = numero.textContent;
          estado.esperandoSegundoNumero = false;
      } else { // Si no se está esperando el segundo número, concatenamos el nuevo número a la pantalla
          pantalla.textContent += numero.textContent;
      }
    })
  })
} 

// Función para registrar el evento del botón DEL
function registrarEventoDEL(){ 
  del.addEventListener('click', () => {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
  })
}

// Función para registrar el evento del botón decimal
function registrarEventoPunto(){
  punto.addEventListener('click', () => {
    if(!pantalla.textContent.includes('.')){ 
      if (pantalla.textContent === "") {
      pantalla.textContent = "0";
      estado.esperandoSegundoNumero = false;
      }
      pantalla.textContent += ".";
    }
  })
}

// Función para seleccionar el operador y manejar la lógica de la calculadora
function seleccionarOperador(operadorSeleccionado) {
      if (!estado.esperandoSegundoNumero) {
        if (pantalla.textContent !== "" && pantalla.textContent !== ".") {
          // Si ya existe una operación pendiente,
          // calculamos el resultado antes de reemplazar el primer número.
          if (estado.primerNumero !== undefined && estado.operador !== undefined) {
            // Resultado intermedio: permite continuar una operacion encadenada.
            calcularResultado(false);
          } else {
            estado.primerNumero = parseFloat(pantalla.textContent);
          }
          estado.operador = operadorSeleccionado;
          estado.esperandoSegundoNumero = true;
          pantalla.textContent = "";
        }
      }
}

// Función para registrar los eventos de los operadores
function registrarEventosOperadores() {
  operadores.forEach(operadorElemento => {
    operadorElemento.addEventListener('click', () => {
      seleccionarOperador(operadorElemento.textContent);
    });
  });
}

// Función para registrar el evento del botón AC
function registrarEventoAC(){
  AC.addEventListener('click', () => {
    pantalla.textContent = "";
    reiniciarEstado();
  })
}

// Función para registrar el evento del botón igual
function registrarEventoIgual() {
    igual.addEventListener('click', () => {
      // Resultado final: termina la operacion y reinicia el estado.
      calcularResultado(true);
    });
}

/**
 * Calcula la operacion pendiente y muestra el resultado.
 * @param {boolean} esResultadoFinal - Si es true, reinicia el estado.
 */
function calcularResultado(esResultadoFinal) {
        if (estado.primerNumero !== undefined && estado.operador !== undefined && pantalla.textContent !== "") {
        estado.segundoNumero = parseFloat(pantalla.textContent);

        const resultado = calcularOperacion(estado.primerNumero, estado.operador, estado.segundoNumero);

        pantalla.textContent = resultado;

        if(esResultadoFinal){
          reiniciarEstado();
        } else {
          estado.primerNumero = resultado;
        }
      }
}

// Función para realizar la operación matemática según el operador seleccionado
function calcularOperacion(primerNumero, operador, segundoNumero) {
        switch (operador) {
          case '+':
            return primerNumero + segundoNumero;
          case '-':
            return primerNumero - segundoNumero;
          case 'x':
            return primerNumero * segundoNumero;
          case '/':
            if (segundoNumero === 0) {
              return "Indefinido";
            }
            return primerNumero / segundoNumero;
          case '%':
            return (primerNumero/100) * segundoNumero;
        }
}

// Función para registrar el evento del botón de cambio de signo
function registrarEventoCambioSigno() {
  cambioSigno.addEventListener('click', () => {
    if (pantalla.textContent !== "" && pantalla.textContent !== "0") {
      let numeroActual = parseFloat(pantalla.textContent);
      numeroActual *= -1;
      pantalla.textContent = numeroActual.toString();
    }
})}


// Función para reiniciar el estado de la calculadora
function reiniciarEstado() {
  estado.primerNumero = undefined;
  estado.segundoNumero = undefined;
  estado.operador = undefined;
  estado.esperandoSegundoNumero = false;
  estado.acaboDeCalcular = false;
}

// Evitar el zoom en dispositivos móviles al hacer pinch
document.addEventListener('touchmove', function (event) {
  if (event.scale !== 1) { 
    event.preventDefault(); 
  }
}, { passive: false });


// Ejecucion de la función para mostrar los números en la pantalla
registrarEventosNumeros()

// Ejecucion de la función para registrar el botón AC
registrarEventoAC()

// Ejecucion de la función para registrar el botón DEL
registrarEventoDEL()

// Ejecucion de la función para registrar el botón decimal
registrarEventoPunto()

// Ejecucion de la función para registrar los botones de operadores
registrarEventosOperadores()

// Ejecucion de la función para registrar el botón igual
registrarEventoIgual()

// Ejecucion de la función para registrar el botón de cambio de signo
registrarEventoCambioSigno()