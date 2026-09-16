# Calculadora JavaScript

Calculadora web construida desde cero con HTML, CSS y JavaScript vanilla. El proyecto fue desarrollado como práctica de manipulación del DOM, manejo de eventos, estado de una interfaz y separación entre la lógica de cálculo y la interacción con el usuario.

## Demo

[Ver demo en vivo](https://TU_USUARIO.github.io/calculator-js/)

> Reemplaza `TU_USUARIO` por tu nombre de usuario de GitHub después de activar GitHub Pages.

## Funcionalidades

- Operaciones básicas: suma, resta, multiplicación y división.
- Porcentajes, por ejemplo: `200 % 10 = 20`.
- Operaciones encadenadas, por ejemplo: `5 + 2 + 3 = 10`.
- Números decimales.
- Cambio de signo.
- Botón `AC` para reiniciar la calculadora.
- Botón `DEL` para borrar el último carácter.
- Manejo de división entre cero mostrando `Indefinido`.
- Inicio de una nueva operación al escribir un número después de `=`.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla

## Ejecución local

1. Clona este repositorio:

```bash
git clone https://github.com/TU_USUARIO/calculator-js.git
```

2. Abre la carpeta del proyecto.
3. Abre `index.html` en el navegador.

También puedes usar la extensión Live Server de VS Code para visualizar la aplicación durante el desarrollo.

## Casos probados

Las siguientes pruebas manuales se utilizaron para comprobar que la refactorización mantuviera el comportamiento original:

| Caso | Entrada | Resultado esperado |
|---|---|---|
| Suma | `5 + 2 =` | `7` |
| Resta | `8 - 3 =` | `5` |
| Multiplicación | `4 x 6 =` | `24` |
| División | `20 / 4 =` | `5` |
| Porcentaje | `200 % 10 =` | `20` |
| Operación encadenada | `5 + 2 + 3 =` | `10` |
| Decimal comenzando con punto | `.5 + .5 =` | `1` |
| Decimal después de un operador | `5 + .5 =` | `5.5` |
| Cambio de signo | `5`, luego `+/-` | `-5` |
| Reinicio completo | Introducir una operación, luego `AC` | Pantalla vacía y estado reiniciado |
| Borrar último carácter | `123`, luego `DEL` | `12` |
| División entre cero | `5 / 0 =` | `Indefinido` |
| Número después de resultado | `5 + 2 =`, luego `8` | `8` |
| Punto después de un operador | `5 + .` | `0.` |

## Aprendizajes

- Selección y actualización de elementos del DOM.
- Registro de eventos con `addEventListener`.
- Gestión explícita del estado de una interfaz.
- Uso de funciones con responsabilidades concretas.
- Separación de la lógica matemática en una función independiente.
- Refactorización sin cambiar el comportamiento observable.
- Identificación de casos límite y estados de la aplicación.

## Próximas mejoras

- Añadir soporte para teclado.
- Incorporar pruebas automatizadas.
- Mejorar la accesibilidad de los controles.
- Añadir un historial de operaciones.
