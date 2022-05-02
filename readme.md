# 💥 Proyecto FIZZBUZZ

FIZZBUZZ es un proyecto del curso de back-end con Node.js de LaunchX, el cual consiste en la aplicación de los temas vistos durante todo el curso, como son ejecutar pruebas de unidad haciendo uso de **jest**, crear APIs y levantar servidores usando **Express.js**, y aplicar formato a los scripts generados empleando **ESLint**.

✔️ **Requerimientos**

1. Refactorizar el script legado y rehacerlo con mucho cuidado. 
2. Crear un API para usar la funcionalidad anterior:

| Endpoint | Request | Response |
|---|---|---|
| `localhost:3000/v1/explorers/:mission` | `localhost:3000/v1/explorers/node` | Deberás obtener la lista de explorers en la misión que enviaste (node o java) |
| `localhost:3000/v1/explorers/amount/:mission` | `localhost:3000/v1/explorers/amount/node` | Deberás obtener la cantidad de explorers según la misión que enviaste (node o java) |
| `localhost:3000/v1/explorers/usernames/:mission` | `localhost:3000/v1/explorers/usernames/node` | Deberás obtener la lista de usernames en la misión que enviaste (node o java) |

3. Crear un endpoint para recibir un número y aplicar la validación del fizzbuzz. 

## 💫 Parte 1. Refactoring

Este proyecto lee un archivo `explorers.json` que contiene una lista de explorers con información que se necesita procesar. Con este script se logró:

+ Obtener la lista de explorers que solo están en node.
+ Obtener la cantidad de explorers que están en node.
+ Obtener la lista de usuarios de github de los explorers que están en node.
+ Se necesitó crear una validación llamada FizzBuzz, si el explorer tiene un score que sea divisible entre 3 (revisa cómo hacer esto), deberá tener un campo trick que diga FIZZ, cualquier otro caso el valor de este nuevo campo deberá ser el score mismo. Esta validación nos sirve porque necesitamos aplicarla a la lista de todos los explorers y saber cuáles son FIZZ.
+ Después necesitamos una validación muy similar pero para cuando el score sea divisible entre 5, entonces el valor del nuevo campo trick será BUZZ, cualquier otro caso el valor será el score.
+ Pero después volvimos a necesitar otro caso para cuando el valor del score fuera divisible entre 3 y también entre 5, entonces el valor del campo trick debe ser FIZZBUZZ, de lo contrario tendrá el valor del score.

Actualmente las últimas 3 validaciones se corren independientemente. Se necesita una misma validación que apliqué las tres reglas a toda la lista:

+ Si el campo score del explorer es divisible entre 3, entonces se agrega un campo nuevo llamado trick cuyo valor será FIZZ.
+ Si el campo score del explorer es divisible entre 5, entonces se agrega un campo nuevo llamado trick cuyo valor será BUZZ.
+ Si el campo score del explorer es divisible entre 3 y 5, entonces se agrega un campo nuevo llamado trick cuyo valor será FIZZBUZZ.
+ Si el campo score no es divisible por ninguna de las reglas anteriores, se agrega un campo nuevo llamado trick cuyo valor será el del score.

<details>
<summary> app.js & explorers.json </summary>
```app

```javascript
const fs = require("fs");

// Part 1 Read json file ===========================
const rawdata = fs.readFileSync("explorers.json");
const explorers = JSON.parse(rawdata);

// Part 2: Get the quantity of explorers names in node
const explorersInNode = explorers.filter((explorer) => explorer.mission == "node");
//console.log(explorersInNode.length)

// Part4: Get the explorer's usernames in Node
const explorersInNodeToGetUsernames = explorers.filter((explorer) => explorer.mission == "node");
const usernamesInNode = explorersInNodeToGetUsernames.map((explorer) => explorer.githubUsername);
//console.log(usernamesInNode)

// DEAD CODE: Part 5,6,7, please remove this and go to Part 8!

// Part 5: Get a new list of explorers in node, if the score numbers is divisible by 3, I need a new propery called trick, and the value assigned is FIZZ, if not the value should be the score itself.
// Score: 3, Trick: FIZZ.
// Score: 4, Trick: 4.
// Score: 5, Trick: 5.

const assignFizzTrick = function(explorer){
    if(explorer.score%3 === 0){
        explorer.trick = "FIZZ";
        return explorer;
    }else{
        explorer.trick = explorer.score;
        return explorer;
    }
};

const explorersInNodeAndFizzTrick = explorersInNode.map((explorer) => assignFizzTrick(explorer));

// Part 6: Get a new list of explorers in node if the score number is divisible by 5, we need to set a new property called trick and set the value BUZZ, if not this value should be just the score
//
const assignBuzzTrick = function(explorer){
    if(explorer.score%5 === 0){
        explorer.trick = "BUZZ";
        return explorer;
    }else{
        explorer.trick = explorer.score;
        return explorer;
    }
};

const explorersInNodeAndBuzzTrick = explorersInNode.map((explorer) => assignBuzzTrick(explorer));

//Part7: Get a new list of explorers in Node, if the score number is divisible by 3 AND by 5 we need to set a new property called FIZZBUZZ, if not this value should be the same score value

const assignFizzBuzzTrick = function(explorer){
    if(explorer.score%5 === 0 && explorer.score%3 === 0){
        explorer.trick = "FIZZBUZZ";
        return explorer;
    }else{
        explorer.trick = explorer.score;
        return explorer;
    }
};

const explorersInNodeAndFizzBuzzTrick = explorersInNode.map((explorer) => assignFizzBuzzTrick(explorer));

// Part 8: Get a list of the explorers in node, if the score is divisible by 5 and 3, set the property trick and the value FIZZBUZZ, if is just divisible by 5 set the property trcik and the value BUZZ, if is just divisible by 3 set the property trick and the value FIZZ, otherwise set the property trick and the score value. TODO

```

  `explorers.json`
``` json
[
{
  "name": "Woopa1",
  "githubUsername": "ajolonauta1",
  "score": 1,
  "mission": "node",
  "stacks": [
    "javascript",
    "reasonML",
    "elm"
  ]
},
{
  "name": "Woopa2",
  "githubUsername": "ajolonauta2",
  "score": 2,
  "mission": "node",
  "stacks": [
    "javascript",
    "groovy",
    "elm"
  ]
},
{
  "name": "Woopa3",
  "githubUsername": "ajolonauta3",
  "score": 3,
  "mission": "node",
  "stacks": [
    "elixir",
    "groovy",
    "reasonML"
  ]
},
{
  "name": "Woopa4",
  "githubUsername": "ajolonauta4",
  "mission": "node",
  "score": 4,
  "stacks": [
    "javascript"
  ]
},
{
  "name": "Woopa5",
  "githubUsername": "ajolonauta5",
  "score": 5,
  "mission": "node",
  "stacks": [
    "javascript",
    "elixir",
    "elm"
  ]
},
{
  "name": "Woopa6",
  "githubUsername": "ajolonauta6",
  "score": 6,
  "mission": "java",
  "stacks": [
    "elm"
  ]
},
{
  "name": "Woopa7",
  "githubUsername": "ajolonauta7",
  "mission": "java",
  "score": 7,
  "stacks": [
  ]
},
{
  "name": "Woopa8",
  "githubUsername": "ajolonauta8",
  "score": 8,
  "mission": "java",
  "stacks": [
    "elm"
  ]
},
{
  "name": "Woopa9",
  "githubUsername": "ajolonauta9",
  "score": 9,
  "mission": "java",
  "stacks": [
    "javascript",
    "elixir",
    "groovy",
    "reasonML",
    "elm"
  ]
},
{
  "name": "Woopa10",
  "githubUsername": "ajolonauta10",
  "score": 10,
  "mission": "java",
  "stacks": [
    "javascript",
    "elixir",
    "groovy",
    "reasonML",
    "elm"
  ]
},
{
  "name": "Woopa11",
  "githubUsername": "ajolonauta11",
  "score": 11,
  "mission": "node",
  "stacks": [
    "javascript",
    "elixir",
    "groovy",
    "reasonML",
    "elm"
  ]
},
{
  "name": "Woopa12",
  "githubUsername": "ajolonauta12",
  "score": 12,
  "mission": "node",
  "stacks": [
    "javascript",
    "elixir",
    "groovy",
    "reasonML",
    "elm"
  ]
},
{
  "name": "Woopa13",
  "githubUsername": "ajolonauta13",
  "score": 13,
  "mission": "node",
  "stacks": [
    "javascript",
    "elixir",
    "groovy",
    "reasonML",
    "elm"
  ]
},
{
  "name": "Woopa14",
  "githubUsername": "ajolonauta14",
  "score": 14,
  "mission": "node",
  "stacks": [
    "javascript",
    "elixir",
    "groovy",
    "reasonML",
    "elm"
  ]
},
{
  "name": "Woopa15",
  "githubUsername": "ajolonauta15",
  "score": 15,
  "mission": "node",
  "stacks": [
    "javascript",
    "elixir",
    "groovy",
    "reasonML",
    "elm"
  ]
}
] 
```  
</details>

### 📌 Scripts

Para llevar a cabo la primera parte, se crearon dos carpetas, `lib` y `test` respectivamente. En dichas carpetas se guardaron los scripts correspondientes para refactorizar el código del archivo `app`.

📁 Carpeta `lib/utils`: Aquí se tiene una clase para leer un archivo json. Refactorización de la lectura del archivo.

**Script**: [`Reader.js`](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/lib/utils/Reader.js)

📁 Carpeta `lib/services`: Aquí se tienen dos clases para realizar toda la lógica que se necesita.

**Script**: [`ExplorerService.js`](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/lib/services/ExplorerService.js)

**Script**: [`FizzbuzzService.js`](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/lib/services/FizzbuzzService.js)

📁 Carpeta `test/services`: Aquí se tiene una prueba.

**Script**: [`ExplorerService.test.js`](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/test/services/ExplorerService.test.js)

#### 📎 Referencia 

Enlace: [1_refactoring_fizzbuzz_parte1.md](https://github.com/LaunchX-InnovaccionVirtual/MissionNodeJS/blob/main/semanas/semana_4/1_refactoring_fizzbuzz_parte1.md)

## 💫 Parte 2. API con Express

Estas son las clases que se tienen hasta ahora que permiten implementar la lógica legada anteriomente:

```mermaid
graph TD;
    Reader-->ExplorerService;
    FizzbuzzService;
```

Ahora se necesita crear otra clase que permita extender un puente entre funcionalidad y el server que se va a crear:

```mermaid
graph TD;
    Reader-->ExplorerService;
    FizzbuzzService;
    ExplorerService-->ExplorerController
    FizzbuzzService-->ExplorerController
```

Para que en el server que será el API solo se comuniqué a partir de ahí:

```mermaid
graph TD;
    Reader-->ExplorerService;
    FizzbuzzService;
    ExplorerService-->ExplorerController
    FizzbuzzService-->ExplorerController
    ExplorerController-->Server
```

Para lograr lo anterior, se creó una carpeta nueva llamada `controllers` con un script llamado `ExplorerController.js`, cuya función es conectar la funcionalidad con el server.

Posteriormente, se creó el server usando Express y un script llamado `server.js`, en dicho script se encuentra el código correspondiente al levantamiento del servidor así como de los endpoints requeridos para regresar información.

### 📌 Scripts

📁 Carpeta `lib/controllers`: Aquí se tiene una clase para conectar la funcionalidad con el server.

**Script**: [`ExplorerController.js`](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/lib/controllers/ExplorerController.js)

📁 Carpeta `lib`: Aquí se tiene el código del server.

**Script**: [`server.js`](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/lib/server.js)


### 📍 Endpoints

1. Endpoint para recibir un parámetro por query params, y regresar la lista de explorers filtrados por el parámetro: 

![Imagen](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/images/req_2.1.PNG)

2. Endpoint para regresar la cantidad de explorers según la misión que se envíe:

![Imagen](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/images/req_2.2.PNG)

3. Endpoint para regresar la lista de usernames de los explorers filtrados por la misión:

![Imagen](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/images/req_2.3.PNG)

#### 📎 Referencia 

Enlace: [2_api_fizzbuzz_parte2.md](https://github.com/LaunchX-InnovaccionVirtual/MissionNodeJS/blob/main/semanas/semana_4/2_api_fizzbuzz_parte2.md)

## 💫 Parte 3. Nuevo requerimiento: Crear un endpoint para recibir un número y aplicar la validación del fizzbuzz

| Endpoint | Request | Response |
|---|---|---|
| `localhost:3000/v1/fizzbuzz/:score` | `localhost:3000/v1/fizzbuzz/1` | `{score: 1, trick: 1}` |
| `localhost:3000/v1/fizzbuzz/:score` | `localhost:3000/v1/fizzbuzz/3` | `{score: 3, trick: "Fizzz"}` |
| `localhost:3000/v1/fizzbuzz/:score` | `localhost:3000/v1/fizzbuzz/5` | `{score: 5, trick: "Buzz"}` |
| `localhost:3000/v1/fizzbuzz/:score` | `localhost:3000/v1/fizzbuzz/15` | `{score: 15, trick: "Fizzbuzz"}` |

### Diseño actual

```mermaid
graph TD;
    Reader-->ExplorerService;
    FizzbuzzService;
    ExplorerService-->ExplorerController
    FizzbuzzService-->ExplorerController
    ExplorerController-->Server
```

### Flujo de Nueva funcionalidad

```mermaid
graph TD;
    FizzbuzzService-->ExplorerController;
    ExplorerController-->Server
```

**Solución**

Se creó la nueva funcionalidad dentro de FizzbuzzService, misma que es usada en el ExplorerController y de ahí es implementada en el server.

![Imagen](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/images/req_3.1.PNG)

![Imagen](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/images/req_3.2.PNG)

![Imagen](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/images/req_3.3.PNG)

![Imagen](https://github.com/DanielaBeltranCruz/FizzBuzz/blob/master/images/req_3.4.PNG)

#### 📎 Referencia 

Enlace: [3_nuevo_feature_fizzbuzz_parte3.md](https://github.com/LaunchX-InnovaccionVirtual/MissionNodeJS/blob/main/semanas/semana_4/3_nuevo_feature_fizzbuzz_parte3.md)

# Documentación 

Para realizar pruebas con `jest`, puedes consultar: 
<https://jestjs.io/docs/getting-started>

Para crear aplicaciones y servidores con `express`, puedes consultar:
<https://expressjs.com/es/starter/installing.html>

Para aplicar formato a los scripts de JS con `ESLint`, puedes consultar:
<https://eslint.org/docs/user-guide/getting-started>