// Write a simple fucntion in javaScript which returns the reverse of string passed as an argument to the function. 



function reverseName(value) {

    for (let i = value.length - 1; i >= 0; i--)
    {
        console.log (value[i])
        
    }


}

const name = "farhan"
let fun= reverseName(name)

console.log(fun)
