const lengthSlider = document.querySelector("[data_lengthSlider]");
const lengthDisplay = document.querySelector("[data_lengthNo]");

const passDisplay = document.querySelector(".display");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");

const indicator= document.querySelector("[data_indicator]");
const generateBtn = document.querySelector("#genrateButton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~!@#$%^&*()_:'


let password = "";
let passwordLength = 10;
let checkCount= 1;

//strength color grey
handleSlider();
//ser length of slider
function handleSlider(){
    //pass length ko ui p reflect krata h 

    lengthSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;


}

setIndicator();

function setIndicator(color){
    indicator.style.backgroundColor = color;
   indicator.style.boxShadow = '0px 0px 5px 5px color';
   
}

function getRndInt(min,max){
 return  Math.floor(Math.random() * (max - min)) + min;

}

function genRanNo(){
    return getRndInt(0,9);
}

function genRanLowerCase(){
    return String.fromCharCode( getRndInt(97,123))
} 

function genRanUpperCase(){
        return String.fromCharCode(getRndInt(65,91))
    }

function genRanSymbols(){
    const ranNum = getRndInt(0, symbols.length)
    
    return symbols.charAt(ranNum);
}

function calStength(){
    let hasupper = false;
    let haslower = false;
    let hasnumber = false;
    let hassymbol = false;


    if(uppercaseCheck.checked) hasupper = true;
    if(lowercaseCheck.checked) haslower = true;
    if(numberCheck.checked) hasnumber = true;
    if(symbolCheck.checked) hassymbol = true;


    if(hasupper && haslower && (hasnumber || hassymbol) && passwordLength>=8){
        setIndicator('green');
    }

    else if((hasupper || haslower) && (hasnumber || hassymbol) && passwordLength>=6){
        setIndicator('blue');
    }else {
        setIndicator('red');
    }

}

 async function copyContent(){
   try{
       await navigator.clipboard.writeText(passDisplay.value)
       copyMsg.innerText = "copied";
   }
   catch(e){
    copyMsg.innerText = "failed";
   }
//to make copy wala span visible

copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active")
 },2000);

}

function shufflePassword(array){

    for(let i=0;i<array.length - 1; i++){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function handleCheckBoxUpdate(){
    checkCount = 0;
    allcheckbox.forEach( (checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
   });

   //special case
     if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
     }
}
allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxUpdate);
})


lengthSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
  handleSlider();
})

copyBtn.addEventListener('click', () => {
  if(passDisplay.value){
    copyContent();
  }
})

generateBtn.addEventListener('click', () => {
  if(checkCount <= 0) return;

  if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";


 // checkbox k anusar
// if(uppercaseCheck.checked){
//     password += genRanUpperCase();
// }
// if(lowercaseCheck.checked){
//     password += genRanLowerCase();
// }
// if(numberCheck.checked){
//     password += genRanNo();
// }
// if(symbolCheck.checked){
//     password += genRanSymbols();
// }

let funArry = [];

if(uppercaseCheck.checked)
   funArry.push(genRanUpperCase);

if(lowercaseCheck.checked)
    funArry.push(genRanLowerCase);

if(numberCheck.checked)
    funArry.push(genRanNo);

if(symbolCheck.checked)
    funArry.push(genRanSymbols);
 
// compulsary condn

for(let i=0;i<funArry.length; i++){
    password += funArry[i]();
}

// remaining cond

for(let i=0; i<passwordLength - funArry.length; i++){
  let ranIndex = getRndInt(0, funArry.length);
  password += funArry[ranIndex]();
}

password = shufflePassword(Array.from(password));

//show in ui
passDisplay.value = password;

calStength();

});