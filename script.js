//GAME PARAMETERS
//#region
let tEggs = document.querySelector('.totalEggs')
let pEggs = 50

let Beps = 0
let Teps = 0
let Epc = 1


//#endregion

//MONEY
//#region 

class Currency{
    constructor() {
        this.amount = 0
        this.bMps = 0
        this.tMps = 0
    }
    addMoney(value) {
        this.amount += value;
    }
    subMoney(value){
        if(this.amount> value){
        pMoney -= parseFloat(value)
        document.querySelector('.disp').innerHTML = Math.round(parseInt(pMoney)) 
        }
    }
}

let pMoney = 0
let Bmps = 0
let Tmps = 0 
function getMoney(pack){                        //pack = animal.packer
    if(pEggs>=packet.reqEggs){                  //change: packet -> pack.reqRes
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

class Resource{
    constructor(name) {
        this.name = name
        
        this.amount = 0
        this.Rpc = 1
        this.bRps = 0 //base resource per second
        this.Rps = 0 //total rps = base*multiplier
        this.mul = 1;
    }
    changebRps(add){
        this.bRps
        this.changeRps()
    }
    changeRps(){
        this.Rps = this.bRps*this.mul
    }
}

//VARIABLES
//#region 

class Animal{
    constructor(name, resource, harvester) {
        this.unit = new Unit(name)
        this.resource = new Resource(resource)
        this.packer = new Packer('pack of '+resource, this.resource) 
        this.harvester = new Harvester(harvester, resource)
    }
    get Names(){
        return 'Unit: ' + this.unit.name + ', Resource: ' + this.resource.name + ', Harvester: ' + this.harvester
    }
    buy(elem){
        if(pMoney > this.cost){
            changeMoney((-1*this.cost))
            
            /* ADD EFFECT*/ 
        }
    }
    changebRps(){
        const harv = this.harvester
        const un = this.unit
        const res = this.resource

        if(un.count>harv.count*harv.cap){
        res.bRps = harv.count*harv.cap*harv.Rps
        //beps = c.count*c.eps + i.count*i.cap*i.eps
        }
        else{
        bRps = un.count*harv.Rps
        }
        changeRps();
    }
    changeRps(){
        Rps = bRps * mul;
    }
    updateRes(value){
        this.resource.amount += parseFloat(value) 
        //tEggs.innerHTML = parseInt(Math.round(pEggs))
    }
    sellForMoney(){                       
        if(this.resource.amount>=this.packer.reqRes){                
            updateRes(-10);
            Money.amount += parseFloat(this.packer.sellP) 
        }
        if(pMoney>=10){
            checkUpgrades(10, 'money')
            checkUpgrades(13, 'money')
            //checkUpgrades(parseInt(pEggs), 'egg')
        }
    }
}/*
var chickens = new Animal('chick', 'egg', 'incubator')
chickens.unit.changeParam(4, 1, 1)
alert(chickens.Names())*/

                                //UNIT
class Unit{
    constructor(name, maxCount, cost, cadd, cmul) {
        this.name = name
        this.maxCount = maxCount
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul

        this.count = 1
    }
    constructor(name) {
        this.name = name

        this.maxCount = 10
        this.cost = 10
        this.cadd = 1
        this.cmul = 1

        this.count = 1
    }
    changeMax(value){
        this.maxCount = value
    }
    changeParam(cost, cadd, cmul){
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
    }
    checkDefault(){
        if(this.cost == 10 && this.cadd == 1 && this.cmul == 1)
        alert("Default values for " + this.name)
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
//var chick = new Unit('chicken', 'egg', 10, 4, 1, 1)
var chig = new Unit('chig', 'fat', 10, 10, 1, 1.05)

                                //PACKER
class Packer{
    constructor(name, reqRes, sellP, cost, cadd, cmul) {
        this.name = name
        this.reqRes = reqRes
        this.sellP = sellP
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul

        this.time = 10
        this.count = 0
    }
    //konstruktor za pojedinacno upisivanje parametara
    constructor(name, reqRes){
        this.name = name
        this.reqRes = reqRes
        //default parameters
        this.sellP = 10 
        this.cost = 10
        this.cadd = 1
        this.cmul = 1
    }
    changeParam(sellP, cost, cadd, cmul){
        this.sellP = sellP
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
    }
    changeSellP(sellP){
        this.sellP = sellP
    }
    changeCost(cost){
        this.cost = cost
    }
    changeCaddCmul(cadd, cmul){
        this.cadd = cadd
        this.cmul = cmul
    }
    checkDefault(){
        if(this.cost == 10 && this.cadd == 1 && this.cmul == 1)
        alert("Default values for " + this.name)
    }
    get pCount(){
        return this.name + ': ' + this.count
    }
    buy(){
        if(pMoney > this.cost){
            changeMoney((-1*this.cost))
            
            /* ADD EFFECT*/ 
        }
    }
}
//var eggPacker = new Packer('egg carton', 'egg', 8, 2, 1)
//var fatPacker = new Packer('jar of fat', 'fat', 12, 3, 1)
//var smallPacker = new Packer('jar of small', 'smh')

                                //HARVESTER
class Harvester{
    constructor(name, resource, cost, cadd, cmul){
        this.name = name
        this.resource = resource
        
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul

        this.count = 0
        this.cap = 1
        this.Rps = 1
    }
    constructor(name, resource){
        this.name = name
        this.resource = resource
        
        this.cost = 1
        this.cadd = 1
        this.cmul = 1

        this.count = 0
        this.cap = 1
        this.Rps = 1
    }
    changeCost(cost, cadd, cmul){
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
    }
    
    checkDefault(){
        if(this.cost == 10 && this.cadd == 1 && this.cmul == 1)
        alert("Default values for " + this.name)
    }
}
//uncomment this when you change incub in code
var incub = new Harvester('incubator', 0, 1, 1, 10, 0, 1.2)

var chick = {
    'count':1,
    'cap':10,
    'eps':0,
    'cost':4,
    'cadd':1,
    'cmul':1
}
//remove in code with packer sellP and reqRes
var packet = {
    'sellPrice':4,
    'reqEggs':10
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

    changebRps(item)
}
//#endregion


//RESOURCE
//#region 
function animClick(res){
    updateResource(res);
}

function chickenClick(){
    updateEggs(Epc);
}



function updateEggs(amount){
    pEggs = pEggs + amount
    tEggs.innerHTML = parseInt(Math.round(pEggs))
}

setInterval(() => {
    pEggs += Teps /2
    tEggs.innerHTML = parseInt(Math.round(pEggs))
},500)
//#endregion



//UPGRADES
//#region

//KLASE I KONSTRUKTORI ZA APGREJDE
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
