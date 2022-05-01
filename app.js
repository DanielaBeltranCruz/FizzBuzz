const fs = require("fs");

// Part 1 Read json file ===========================
const rawdata = fs.readFileSync("explorers.json");
const explorers = JSON.parse(rawdata);
console.log(explorers) // Obtener la lista de explorers que solo están en node

// Part 2: Get the quantity of explorers names in node
const explorersInNode = explorers.filter((explorer) => explorer.mission == "node");
console.log("Cantidad de explores en node: " + explorersInNode.length) // Obtener la cantidad de explorers que están en node.


// Part4: Get the explorer's usernames in Node
const explorersInNodeToGetUsernames = explorers.filter((explorer) => explorer.mission == "node");
const usernamesInNode = explorersInNodeToGetUsernames.map((explorer) => explorer.githubUsername);
console.log("Lista de usuarios de GitHub: " + usernamesInNode) // Obtener la lista de usuarios de github de los explorers que están en node.

// DEAD CODE: Part 5,6,7, please remove this and go to Part 8!

// Part 5: Get a new list of explorers in node, if the score numbers is divisible by 3, I need a new propery called trick, and the value assigned is FIZZ, if not the value should be the score itself.
// Score: 3, Trick: FIZZ.
// Score: 4, Trick: 4.
// Score: 5, Trick: 5.

const assignFizzTrick = function(explorer){
    if(explorer.score % 3 === 0){
        explorer.trick = "FIZZ";
        return explorer;
    }else{
        explorer.trick = explorer.score;
        return explorer;
    }
};

const explorersInNodeAndFizzTrick = explorersInNode.map((explorer) => assignFizzTrick(explorer));
// Validación llamada Fizz, si el explorer tiene un score que sea divisible entre 3, deberá tener un campo trick que diga FIZZ, 
// cualquier otro caso el valor de este nuevo campo deberá ser el score mismo. 
console.log(explorersInNodeAndFizzTrick)

// Part 6: Get a new list of explorers in node if the score number is divisible by 5, we need to set a new property called trick and set the value BUZZ, if not this value should be just the score
//
const assignBuzzTrick = function(explorer){
    if(explorer.score % 5 === 0){
        explorer.trick = "BUZZ";
        return explorer;
    }else{
        explorer.trick = explorer.score;
        return explorer;
    }
};

const explorersInNodeAndBuzzTrick = explorersInNode.map((explorer) => assignBuzzTrick(explorer));
// Validación llamada Buzz para cuando el score sea divisible entre 5, 
// entonces el valor del nuevo campo trick será BUZZ, cualquier otro caso el valor será el score.
console.log(explorersInNodeAndBuzzTrick)


//Part7: Get a new list of explorers in Node, if the score number is divisible by 3 AND by 5 we need to set a new property called FIZZBUZZ, if not this value should be the same score value

const assignFizzBuzzTrick = function(explorer){
    if(explorer.score % 5 === 0 && explorer.score % 3 === 0){
        explorer.trick = "FIZZBUZZ";
        return explorer;
    }else{
        explorer.trick = explorer.score;
        return explorer;
    }
};

const explorersInNodeAndFizzBuzzTrick = explorersInNode.map((explorer) => assignFizzBuzzTrick(explorer));
// Validación llamada FIZZBUZZ para cuando el valor del score fuera divisible entre 3 y también entre 5, 
// entonces el valor del campo trick debe ser FIZZBUZZ, de lo contrario tendrá el valor del score.
console.log(explorersInNodeAndFizzBuzzTrick)

// Part 8: Get a list of the explorers in node, if the score is divisible by 5 and 3, set the property trick and the value FIZZBUZZ, if is just divisible by 5 set the property trcik and the value BUZZ, if is just divisible by 3 set the property trick and the value FIZZ, otherwise set the property trick and the score value. TODO
