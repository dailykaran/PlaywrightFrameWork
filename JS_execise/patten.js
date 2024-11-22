
/* for(let i=0; i<10; i++){
    console.log(i);
}

for(let i=0; i<10; i = i+2){
    console.log(i);
}

for(let i=9; i>=0; i--){
    console.log(i+1);
} */


/* let output = ''
for(let i=0; i<=10; i++){
    output = output + '* ';
    //console.log(i%2, '\n');
    if(i%2 == 0){
        console.log('0');
    }
    else{
        console.log('1');
    }
}
console.log(output) */

// Print the star by odd value of "i"
/* let total = '';
for(let i=1; i<10; i++){
    let temp = (i*2)-1
    for(let j=0; j<temp; j++){
        //total = j%2;
        //total = total + (i%2==0?1:0) + '';    
        total = total + "* ";
    }
    total = total + "\n";
}
console.log(total); */
/* 
// print the triangle star
let total = '';
for(let i=10; i>0; i--){
    //let temp = (i*2)-1
    for(let j=0; j<i; j++){
        //total = j%2;
        //total = total + (i%2==0?1:0) + '';    
        total = total + "* ";
    }
    total = total + "\n";
}
console.log(total);
*/

// print test code with star 1 to 10 at right side(triangle)
/* let total = '';
for(let i=9; i>=0; i--){
    //let temp = (i*2)-1
    for(let j=0; j<i; j++){    
        total = total + "  ";
    }
    for(let k=i; k<10; k++){
        total = total + "* "
    }
    total = total + "\n";
}
console.log(total); */

// print test code with star 1 to 10 at right side(triangle - reverse direction)
/* let total = '';
for(let i=0; i<=10; i++){
    //let temp = (i*2)-1
    for(let j=0; j<i; j++){    
        total = total + "  ";    
    }
    for(let k=i; k<10; k++){
        total = total + "* "
    }
    total = total + "\n";
}
console.log(total); */

// print the pyramid 
/* let total = '';
for(let i=9; i>=0; i--){
    let temp = (i*2)-1
    for(let j=0; j<i; j++){    
        total = total + "  ";
    }
    for(let k=temp; k<=17; k++){
        total = total + "* "
    }
    total = total + "\n";
}
console.log(total); */



function dymond(input) {
    let total = '';
for(let i=input-1; i>=0; i--){
    let temp = (i*2)-1
    for(let j=0; j<i; j++){    
        total = total + "  ";
    }
    for(let k=temp; k<=((input-1)*2)-1; k++){
        total = total + "* "
    }
    total = total + "\n";
}

for(let i=input-1; i>=0; i--){
    for(let j=i; j<input; j++){    
        total = total + "  ";
    }
    let temp = i*2-1
    for(let k=0; k<temp; k++){
        total = total + "* "
    }
    total = total + "\n";
}

console.log(total);
}
dymond(6)


function pattern(input) {
    let total = '';
for(let i=input-1; i>=0; i--){
    let temp = (i*2)-1
    for(let j=0; j<i; j++){    
        total = total + "  ";
    }
    for(let k=temp; k<=((input-1)*2)-1; k++){
        if(k===temp || k===((input-1)*2)-1){
            total = total + "* ";
        }else{
            total = total + "  ";
        }        
    }
    total = total + "\n";
}

for(let i=input-1; i>=0; i--){
    for(let j=i; j<input; j++){    
        total = total + "  ";
    }
    let temp = i*2-1
    for(let k=0; k<temp; k++){
        if(k===0 || k===temp-1){
            total = total + "* ";
        }else{
            total = total + "  ";
        }
        //total = total + "* "
    }
    total = total + "\n";
}

console.log(total);
}
pattern(6)

