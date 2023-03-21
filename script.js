const container = document.getElementById('container');
const easy = document.getElementById('ls1');
const intermediate = document.getElementById('ls2');
const hard = document.getElementById('ls3');
const footer = document.getElementsByClassName('footer');
const timer = document.getElementById('timer');
const remtime = document.getElementById('remtime');
const score = document.getElementById('score');
const displayscore = document.getElementById('displayscore');
const displayhighscore = document.getElementById('displayhighscore');
let cards = "",previous="";
let count = 0;
emojis = ['😊','😊','🐄','🐄','🚀','🚀','😎','😎','🎶','🎶','🦁','🦁'];
emojis1 = ['😊','😊','🐄','🐄','🚀','🚀','😎','😎','🎶','🎶','🦁','🦁','🐧','🐧','🦋','🦋','🎮','🎮','🎲','🎲'];
emojis2  = ['😊','😊','🐄','🐄','🚀','🚀','😎','😎','🎶','🎶','🦁','🦁','🐧','🐧','🦋','🦋','🎮','🎮','🎲','🎲','🐬','🐬','🎆','🎆','🎀','🎀','🎠','🎠','👑','👑']
let flipped = [],timerem = 0,curscore=0,flag=0,timefun;
let cnt = 0 , highscore = 0;


function shuffleArray(array) { 
    return array.sort( ()=>Math.random()-0.5 );
} 

function createCards(number_of_cards){
    let k = 0,r=3,c=4;
    if(number_of_cards==20){
        c=5;
        r=4;
    }
    if(number_of_cards==30){
        c=6;
        r=5;
    }
    for(let i=0;i<r;i++){
        let row = document.createElement("div");
        row.setAttribute('class','rows');
        for(let j=0;j<c;j++){
            let str = 'card'+k;
            let node = document.createElement("div");
            node.setAttribute("id",str);
            node.setAttribute("class",'card');
            let front = document.createElement("div"),back = document.createElement("div");
            if(number_of_cards==20)   back.innerHTML = emojis1[k++];
            if(number_of_cards==30)   back.innerHTML = emojis2[k++];
            if(number_of_cards==12)   back.innerHTML = emojis[k++];
            front.setAttribute('class','front');
            back.setAttribute('class','back');
            node.appendChild(front);
            node.appendChild(back);
            row.appendChild(node);
        }
        row.setAttribute('class','rows');
        container.appendChild(row);
    }
}



easy.addEventListener('click',handleclick);
intermediate.addEventListener('click',handleclick);
hard.addEventListener('click',handleclick);



function handleclick(event){
        const btn  = event.target;
        score.style.fontSize="16px";
        flag = 0;
        if(btn.id=='ls1'){
            container.textContent="";
            emojis = shuffleArray(emojis);
            createCards(emojis.length);
            timerem = 20;
        }
        else if(btn.id=='ls2'){
            container.textContent="";
            emojis1 = shuffleArray(emojis1);
            createCards(emojis1.length);
            timerem = 60;
            
        }
        else if(btn.id=='ls3'){
            container.textContent="";
            emojis2 = shuffleArray(emojis2);
            createCards(emojis2.length);
            timerem = 120;
        }
        const temp = document.getElementById(btn.id);
        temp.style.backgroundColor="black";
        temp.style.color="white";
        if(btn.id!='ls1'){
            const t = document.getElementById('ls1');
            t.style.backgroundColor="green";
            t.style.color="black";
        }
        if(btn.id!='ls2'){
            const t = document.getElementById('ls2');
            t.style.backgroundColor="yellow";
            t.style.color="black";
        }
        if(btn.id!='ls3'){
            const t = document.getElementById('ls3');
            t.style.backgroundColor="red";
            t.style.color="black";
        }
        if(previous.length==0) previous=btn;
        else if(previous.id!=btn.id){
            highscore=0;
            displayhighscore.textContent=highscore;
            previous=btn;
        }
        remtime.textContent=timerem;
        clearInterval(timefun);
        curscore = 0;
        displayscore.textContent=curscore;
        cards = document.querySelectorAll('.card');
        cardFlip(cards);
    

}



function cardFlip(cards){
    cards.forEach(card => {
        card.addEventListener('click', () => {
        if(flag==0){
            flag=1;
            timefun = setInterval(updateTimer, 1000);
            updateTimer();
        }
        if(timerem>0){
            if(flipped.length!=2) {card.classList.add('clicked');}
            flipped.push(card);
            if (flipped.length === 2) {
                const firstCard = flipped[0];
                const secondCard = flipped[1];
                if(firstCard.id==secondCard.id){
                    flipped.pop();
                }
                else if (firstCard.innerHTML===secondCard.innerHTML) {
                    count+=2;
                    if(count==cards.length){
                        curscore+=timerem*5;
                        timerem = -1;
                    }
                    else curscore+=5;
                    
                    displayscore.textContent=curscore;
                    setTimeout(() => {
                        firstCard.style.visibility = "hidden";
                        secondCard.style.visibility = "hidden";
                        flipped=[];
                    }, 500);
                    
                } 
                else {
                    displayscore.textContent=curscore;
                    setTimeout(() => {
                        firstCard.classList.remove("clicked");
                        secondCard.classList.remove("clicked");
                        flipped=[];
                    }, 500);
                }
            }
            
        }
        });
    });
}

function flashCards(){
    cards.forEach(card => {
        card.classList.add('clicked');
    });
}

function updateTimer(){
    timerem = timerem - 1;
    if(timerem < 0){
        flashCards();
        clearInterval(timefun);
        score.style.fontSize="25px";
        if(highscore < curscore) highscore = curscore;
        displayhighscore.textContent = highscore;
        count = 0;
    }
    else{
        remtime.textContent = timerem;
    }
}



easy.click();