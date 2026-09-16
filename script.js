const pantalla = document.querySelector('.pantalla span');
const numeros = document.querySelectorAll('.numero');
const operadores = document.querySelectorAll('.operador');
const del = document.querySelector('.signoDel');
const AC = document.querySelector('.signoAC');
const punto = document.querySelector('.punto');
const igual = document.querySelector('.igual');
const cambioSigno = document.querySelector('.cambioSigno');

let primerNumero;
let segundoNumero;
let operador;
let esperandoSegundoNumero = false;
let acaboDeCalcular = false;
let resultado;

function agregarNumero(){
  numeros.forEach(numero => {
    numero.addEventListener('click', () => {
      if(acaboDeCalcular){
        pantalla.textContent = numero.textContent;
        acaboDeCalcular = false;
      }
      else if (esperandoSegundoNumero) {
          pantalla.textContent = numero.textContent;
          esperandoSegundoNumero = false;
      } else {
          pantalla.textContent += numero.textContent;
      }
    })
  })
} 

function borrar(){
  AC.addEventListener('click', () => {
    pantalla.textContent = "";
    primerNumero = undefined;
    segundoNumero = undefined;
    operador = undefined;
    esperandoSegundoNumero = false;
    acaboDeCalcular = false;
  })
}

function borrarUltimo(){
  del.addEventListener('click', () => {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
  })
}

function agregarPunto(){
  punto.addEventListener('click', () => {
    if(!pantalla.textContent.includes('.')){ 
      if (pantalla.textContent === "") {
      pantalla.textContent = "0";
      esperandoSegundoNumero = false;
      }
      pantalla.textContent += ".";
    }
  })
}

function agregarOperadorYprimerNumero() {

  operadores.forEach(operadorElemento => {

    operadorElemento.addEventListener('click', () => {

      if (!esperandoSegundoNumero) {

        if (pantalla.textContent !== "" && pantalla.textContent !== ".") {

          // Si ya existe una operación pendiente,
          // calculamos el resultado antes de reemplazar el primer número.
          if (primerNumero !== undefined && operador !== undefined) {

            calcularResultado(false);

          } else {

            primerNumero = parseFloat(pantalla.textContent);

          }

          operador = operadorElemento.textContent;

          esperandoSegundoNumero = true;

          pantalla.textContent = "";

        }

      }

    });

  });

}

function clickIgual() {
    igual.addEventListener('click', () => {
      calcularResultado(true);
    });
}

function calcularResultado(finalizar) {
        if (primerNumero !== undefined && operador !== undefined && pantalla.textContent !== "") {
        segundoNumero = parseFloat(pantalla.textContent);
        switch (operador) {
          case '+':
            resultado = primerNumero + segundoNumero;
            break;
          case '-':
            resultado = primerNumero - segundoNumero;
            break;
          case 'x':
            resultado = primerNumero * segundoNumero;
            break;
          case '/':
            if (segundoNumero === 0) {
              resultado = "Indefinido";
              break;
            }
            resultado = primerNumero / segundoNumero;
            break;
          case '%':
            resultado = (primerNumero/100) * segundoNumero;
            break;
        }

        pantalla.textContent = resultado;

        if(finalizar){
          acaboDeCalcular = true;
          primerNumero = undefined;
          segundoNumero = undefined;
          operador = undefined;
          esperandoSegundoNumero = false;
        } else {
          primerNumero = resultado;
        }
      }
}

function cambiarSigno() {
  cambioSigno.addEventListener('click', () => {
    if (pantalla.textContent !== "" && pantalla.textContent !== "0") {
      let numeroActual = parseFloat(pantalla.textContent);
      numeroActual *= -1;
      pantalla.textContent = numeroActual.toString();
    }
})}

// Ejecucion de la función para mostrar los números en la pantalla
agregarNumero()

// Ejecucion de la función para borrar la pantalla
borrar()

// Ejecucion de la función para borrar el último número ingresado
borrarUltimo()

// Ejecucion de la función para agregar un punto decimal
agregarPunto()

// Ejecucion de la función para agregar un operador
agregarOperadorYprimerNumero()

// Ejecucion de la función para calcular el resultado
clickIgual()

// Ejecucion de la función para cambiar el signo del número
cambiarSigno()