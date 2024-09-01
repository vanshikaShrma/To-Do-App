let btnUp = document.querySelector("#btnUp");
let btnIn = document.querySelector("#btnIn");

btnUp.addEventListener("click" , fun);
btnIn.addEventListener("click" , fun1);
function fun()
{
    window.location.href=  '/signup';
}


function fun1()
{
    window.location.href=  '/signin';
}


