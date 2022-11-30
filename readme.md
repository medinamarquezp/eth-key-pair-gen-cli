# ETH key pair gen CLI

Este programa consiste en una pequeña utilidad de línea de comandos que nos permite:

- Generar pares de claves aleatorios para utilizar en la red de Ethereum.
- Generar pares de claves de vanidad para utilizar en la red de Ethereum.
- Validar direcciones.

A continuación se muestra el flujo de ejecución de acciones:
![cli-flow](https://raw.githubusercontent.com/medinamarquezp/eth-key-pair-gen-cli/master/doc/images/eth-keypair-cli-flow.png)

Cabe destacar la acción que nos permite generar [direcciones de vanidad](https://academy.bit2me.com/que-es-una-vanity-address/#:~:text=Las%20vanity%20address%20o%20direcciones,a%20la%20seguridad%20que%20brindan.). Mediante esta acción, podemos generar direcciones cuyo sufijo sea una secuencia de caracteres hexadecimales a nuestra elección o elegidos de una lista de sugerencias. Si el tiempo de ejecución de la operación pudiera demorar demasiado, se ofrece la opción de elegir el tiempo de espera y, si se alcanza el tiempo de espera, se ofrece un conjunto de claves aleatorias.

## Cómo usar el cli

Para usar este CLI es requerido disponer de versiones recientes de Node y NPM.

Los pasos a seguir para iniciarlo son:

- Hacemos una copia de este repositorio.
- Instalamos las dependencias mediante `npm install`
- Iniciamos el programa mediante `npm start`

## Cómo es la interfaz

A continuación podemos ver algunas capturas de cómo luce la interfaz:

### Inicio

![home](https://raw.githubusercontent.com/medinamarquezp/eth-key-pair-gen-cli/master/doc/images/home.png)

### Generación de dirección de vanidad

![vanity-address](https://raw.githubusercontent.com/medinamarquezp/eth-key-pair-gen-cli/master/doc/images/custom-vanity.png)

### Validación de una dirección

![validate](https://raw.githubusercontent.com/medinamarquezp/eth-key-pair-gen-cli/master/doc/images/validate.png)
