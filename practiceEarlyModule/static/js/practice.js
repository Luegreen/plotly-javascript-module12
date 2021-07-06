var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
 
var sWords = words.filter((word)=>word.startsWith("s"));

console.log(sWords);


const countries = ['Norway', 'Sweden',  'Denmark', 'New Zealand'];

const startsWithN = countries.filter((country) => country.startsWith("N"));

console.log(startsWithN);




researcher1 = {
    name: 'Roza',
    age: 34,
    hobby: 'Hiking'
};

console.log(Object.entries(researcher1));

researcher1.forEach(([first, second]) => console.log(first
    + ": " + second));