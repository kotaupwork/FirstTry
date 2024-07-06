//GAME PARAMETERS
//#region
let tEggs = document.querySelector('.totalEggs')
let pEggs = 50

let Beps = 0
let Teps = 0
let Epc = 1

let pMoney = 0
let Bmps = 0
let Tmps = 0 
//#endregion

class Resourec{
    constructor(tRes, pRes, bRps, tRps, Rpc) {
        this.tRes = tRes
        this.pRes = pRes
        this.bRps = bRps
        this.tRps = tRps
        this.Rpc = Rpc
    }

}

//VARIABLES
//#region 

class Animal{
    constructor(name, cost, effect) {
        
        
      }
    get stats(){
        return this.name + ', ' + this.cost + ', ' + this.effect
    }
    buy(elem){
        if(pMoney > this.cost){
            changeMoney((-1*this.cost))
            
            /* ADD EFFECT*/ 
        }
    }
}

class Packer{
    constructor(name, count, time, cost, cadd, cmul) {
        this.name = name
        this.count = count
        this.time = time
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
      }
    get count(){
        return this.name + ': ' + this.count
    }
    buy(){
        if(pMoney > this.cost){
            changeMoney((-1*this.cost))
            
            /* ADD EFFECT*/ 
        }
    }
}
var eggPacker = new Packer('egg', 0, 10, 8, 2, 1)
var fatPacker = new Packer('fat', 0, 10, 12, 3, 1)

var packet = {
    'sellPrice':4,
    'reqEggs':10
}

class Unit{
    constructor(name, count, maxCount, ops, cost, cadd, cmul) {
        this.name = name
        this.count = count
        this.maxCount = maxCount
        this.ops = ops
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
      }
    get count(){
        return this.name + ': ' + this.count
    }
    buy(){
        if(pMoney > this.cost){
            changeMoney((-1*this.cost))
            
            /* ADD EFFECT*/ 
        }
    }
}
var chick = new Unit('chicken', 1, 10, 0, 4, 1, 1)

class Harvester{
    constructor(name, count, cap, Rps, cost, cadd, cmul){
        this.name = name
        this.count = count
        this.cap = cap
        this.Rps = Rps
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
    }
}
//uncomment this when you change incub in code
//var incub = new Harvester('incubator', 0, 1, 1, 10, 0, 1.2)

var chick = {
    'count':1,
    'cap':10,
    'eps':0,
    'cost':4,
    'cadd':1,
    'cmul':1
}

var incub = {
    'count':0,
    'cap':1,
    'eps':1,
    'cost':10,
    'cadd':0,
    'cmul':1.2
}
//#endregion

//BUY ITEMS
//#region 
function buy(item){
    let itemC = eval(item).cost

    if(pMoney >= itemC){
        changeMoney(-1*itemC)
        addItem(item)
    }
}

function addItem(item){
    eval(item).count ++;
    eval(item).cost = parseInt((eval(item).cost+eval(item).cadd)*eval(item).cmul)

    iCount = document.querySelector('.'+item+'-count')
    iCost = document.querySelector('.'+item+'-cost')
    iCount.innerHTML = parseInt(iCount.innerHTML) + parseInt(1)
    iCost.innerHTML = eval(item).cost

    changeBeps()
}
//#endregion


//RESOURCE
//#region 
function animClick(){
    updateResource(Rpc);
}

function chickenClick(){
    updateEggs(Epc);
}

function changeBeps(){
    if(chick.count>incub.count*incub.cap){
    Beps = chick.count*chick.eps + incub.count*incub.cap*incub.eps
    //beps = c.count*c.eps + i.count*i.cap*i.eps
    }
    else{
    Beps = chick.count*chick.eps + chick.count*incub.eps
    }
    changeTeps();
}
function changeTeps(){
    Teps = Beps * 1;
}

function updateEggs(ammount){
    pEggs = pEggs + ammount
    tEggs.innerHTML = parseInt(Math.round(pEggs))
}

setInterval(() => {
    pEggs += Teps /2
    tEggs.innerHTML = parseInt(Math.round(pEggs))
},500)
//#endregion

//MONEY
//#region 
function getMoney(pack){
    if(pEggs>=packet.reqEggs){
        updateEggs(-10);
        changeMoney(packet.sellPrice)
    }
    if(pMoney>=10){
        checkUpgrades(10, 'money')
        checkUpgrades(13, 'money')
        //checkUpgrades(parseInt(pEggs), 'egg')
    }
}

function changeMoney(value){
    pMoney += parseInt(value)
    document.querySelector('.disp').innerHTML = pMoney
}
//#endregion

//UPGRADES
//#region

//KLASE I KONSTRUKTORI
var indCounter = 0
class Upgrade{
    constructor(name, cost, effect) {
        this.index = indCounter
        this.name = name
        this.cost = cost
        this.effect = effect
        indCounter++
      }
    get stats(){
        return this.name + ', ' + this.cost + ', ' + this.effect
    }
    buy(elem){
        if(pMoney > this.cost){
            changeMoney((-1*this.cost))
            eval(this.effect)
            elem.remove();
        }
    }
}

class Upgrades {
    constructor() {
      this.upgrade = []
    }
    newUp(name, cost, effect) {
        let n = new Upgrade(name, cost, effect)
        this.upgrade.push(n)
        return n
    }
    get numberOfUpgrades(){
        return this.upgrade.length
    }
    search(name){
        if(this.upgrade[0].name==name)
        alert(this.upgrade[0].effect)
    }
 }

 var up = new Upgrades()
 var addedUps = 0
 var milestoneM = 0
 var milestoneE = 0
 const upMenu = document.querySelector('.upgrades')


 //UPGRADES
 function checkUpgrades(ms, type) {
        if(type=='money'&& ms>=10 && milestoneM==0)
        {
            milestoneM++
            //alert('money milestone')
            up.newUp('Larger incubators', 1, 'incub.cap++')
            up.newUp('Better clicks', 2, 'Epc++')
        }
        if(type=='money'&& ms>=13 && milestoneM==1){
            milestoneM++
            up.newUp('More chickens', 3, 'addItem("chicken")')
            up.newUp('Worse clicks', 4, 'Epc--')
        }
        if(type=='egg' && ms>50 && milestoneE==0){
            milestoneE++
            //alert('egg milestone')
            up.newUp('Larger incubators', 3, 'incub.cap++')
            up.newUp('Better clicks', 4, 'Epc++')
        }
        if(indCounter>addedUps)
        {
            addUpgrades();
            alert('Upgrades: '+up.numberOfUpgrades)
        }
        
 }

 function test(){
    alert('Upgrades: '+up.numberOfUpgrades)
    //up.search('Larger incubators')
    //alert(up.upgrade.name.querySelector('Larger incubators'))
 }
 

function addUpgrades(){
    for(var i=addedUps; i<indCounter; i++){
        var nu = document.createElement("div")
        nu.id = "upp" + up.upgrade[i].index
        nu.innerHTML = up.upgrade[i].name
        nu.setAttribute("onclick","buyUpgrade("+i+")");
        upMenu.appendChild(nu)
        addedUps++;
    }
alert('All upgrades added')
}

function buyUpgrade(selected){
    let elem
    elem = document.getElementById("upp"+selected)
    up.upgrade[selected].buy(elem)
    changeCursor(Epc)
}
//#endregion

let cUpgrade = 0
function changeCursor(param){
    const object = document.querySelector('.chicken');
    cUpgrade = param
    if(cUpgrade == param)
    switch(cUpgrade){
        case 2:
            object.style.cursor = "url('/slike/cursors/cross.cur'), auto"
        break;
        case 3:
            object.style.cursor = "url('/slike/cursors/arrowheart.cur'), auto"
        break;
        case 4:
            object.style.cursor = "url('/slike/cursors/forkheart.cur'), auto"
        break;
        case 5:
            object.style.cursor = "url('/slike/cursors/cards.cur'), auto"
        break;
        case 6:
            object.style.cursor = "url('/slike/cursors/red_pen.cur'), auto"
        break;
        case 7:
            object.style.cursor = "url('/slike/cursors/WIB.cur'), auto"
        break;
        case 8:
            object.style.cursor = "url('/slike/cursors/lightsaberblue.cur'), auto"
        break;
        case 9:
            object.style.cursor = "url('/slike/cursors/red_pen.cur'), auto"
        break;
        case 10:
            object.style.cursor = "url('/slike/cursors/red_pen.cur'), auto"
        break;
        default:
            PointerEvent;
    }
}
