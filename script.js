
//MONEY
//#region 

class Currency{
    constructor() {
        this.amount = 0
        this.bMps = 0
        this.tMps = 0
    }
    update(value){
        if(value == 0){
            value = parseFloat(this.tmps)/10
        }
        if(this.amount >= (-1)*(value)){
            this.amount += parseFloat(value)
            displayMoney.innerHTML = parseInt(Math.round(this.amount)) 
            console.log("new balance: "+ this.amount)
            return 1
        }
        else return 0
    }
}
var Money = new Currency()
const displayMoney = document.getElementById('dispMoney')

function packSold(anim){
    eval(anim).sellForMoney()
}

//#endregion


class Resource{
    constructor(name) {
        this.name = name
        this.elem = document.getElementById(this.name+'Count')
        this.amount = 0
        this.Rpc = 1
        this.bRps = 1 //base resource per second
        this.Rps = 0 //total rps = base*multiplier
        this.resMul = 1;
    }
    calRps(){
        this.Rps = this.bRps* this.resMul
    }
    update(value){
        if(value == 0)
            value = this.Rpc
        this.amount += value
        this.elem.innerHTML = parseInt(Math.round(this.amount))
        //console.log(this.name + " amount updated: " + this.amount)
    }
    doRps(){
        let value = parseFloat(this.Rps)
        if(isNaN(value))
            value = 0
        //console.log("new value: " + value)

        this.amount += value
        this.elem.innerHTML = parseInt(Math.round(this.amount))
        //console.log("elem: " + this.elem+ ", inner:" + this.elem.innerHTML)
        //this.elem.innerHTML = parseInt(Math.round(this.amount)) //ovo iz nekog razloga ne radi, a isto je sto i prethodna linija?
        //console.log(this.name + " amount updated: " + this.amount)
    }
}
                                //UNIT
class Unit{
    constructor(name) {
        this.name = name

        this.cost = 10
        this.cadd = 1
        this.cmul = 1

        this.maxAmount = 10
        this.amount = 1
    }

    changeParam(cost, cadd, cmul){
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
    }
    incMax(value){
        this.maxCount += value
    }
    checkDefault(){
        if(this.cost == 10 && this.cadd == 1 && this.cmul == 1)
        alert("Default values for " + this.name)
    }
    dispAmount(){
        return this.name + ' amount: ' + this.amount
    }
    buy(count){
        if(Money.amount >= this.cost*count){
            if(Money.update(-1*(this.cost)*count)){
                for(var i = 0; i < count; i ++){
                    this.cost = (this.cost+this.cadd)*this.cmul
                }
                this.amount += count
                // change price
                console.log("Price: " + document.getElementById(this.name+'Cost').innerHTML + ", amount:  " + Math.round(this.cost))
                document.getElementById(this.name+'Cost').innerHTML = Math.round(this.cost)
                /* ADD EFFECT*/ 
            }
        }
    }
}
                                //PACKER
class Packer{
    //konstruktor za pojedinacno upisivanje parametara
    constructor(name){
        this.name = name
        //default parameters
        this.reqRes = 10
        this.sellP = 10 
        this.cost = 10
        this.cadd = 1
        this.cmul = 1.02
        this.pps = 0.05 //pack per secon
        this.amount = 0
    }
    changeParam(sellP, cost, cadd, cmul){
        this.sellP = sellP
        this.cost = cost
        this.cadd = cadd
        this.cmul = cmul
    }
    incSellP(value){
        this.sellP += value
    }
    checkDefault(){
        if(this.cost == 10 && this.cadd == 1 && this.cmul == 1)
        alert("Default values for " + this.name)
    }
    pCount(){
        return this.name + ': ' + this.count
    }
    buy(count){
        if(Money.amount >= this.cost*count){
            if(Money.update(-1*(this.cost)*count)){
                for(var i = 0; i < count; i ++){
                    this.cost = (this.cost+this.cadd)*this.cmul
                }
                this.amount += count
                // change price
                console.log("Price: " + document.getElementById(this.name+'Cost').innerHTML + ", amount:  " + Math.round(this.cost))
                document.getElementById(this.name+'Cost').innerHTML = Math.round(this.cost)
                /* ADD EFFECT*/ 
            }
        }
    }
}

                                //HARVESTER
class Harvester{
    constructor(name, resource){
        this.name = name
        this.resource = resource
        
        this.cost = 1
        this.cadd = 1
        this.cmul = 1

        this.amount = 0
        this.cap = 1
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
    buy(count){
        if(Money.amount >= this.cost*count){
            if(Money.update(-1*(this.cost)*count)){
                for(var i = 0; i < count; i ++){
                    this.cost = (this.cost+this.cadd)*this.cmul
                }
                this.amount += count
                // change price
                console.log("Price: " + document.getElementById(this.name+'Cost').innerHTML + ", amount:  " + Math.round(this.cost))
                document.getElementById(this.name+'Cost').innerHTML = Math.round(this.cost)
                /* ADD EFFECT*/ 
            }
        }
    }
}

class Animal{
    constructor(name, resource, harvester) {
        this.unit = new Unit(name)
        this.resource = new Resource(resource)
        this.packer = new Packer(resource+'Packer') 
        this.harvester = new Harvester(harvester, resource)
        this.tRps = 0
    }
    Names(){
        return 'Unit: ' + this.unit.name + ', Resource: ' + this.resource.name + ', Harvester: ' + this.harvester
    }
    
    buy(item, count){
        if(Money.amount >= eval('this.'+item+'.cost')*count){
            console.log("Ovo kosta: " + eval('this.'+item+'.cost')*count)
            eval('this.'+item+'.buy('+ count + ')')
            this.changeRps()
        }
    }
    changebRps(amount){
        this.resource.bRps += amount
        this.changeRps()
    }
    changeRps(){
        var fromHarv = 0
        if(this.unit.count>this.harvester.amount*this.harvester.cap){
            console.log("1. petlja")
            fromHarv = this.harvester.amount*this.harvester.cap*this.resource.bRps
        //beps = c.count*c.eps + i.count*i.cap*i.eps
        }
        else{
            console.log("2. petlja")
            fromHarv = this.unit.amount*this.resource.bRps
        }
        this.resource.Rps = fromHarv*this.resource.resMul
        this.tRps = this.resource.Rps*1
        /*
        console.log("Harv cap: " + this.harvester.cap)
        console.log("Harv count: " + this.harvester.count)
        console.log("changed fromHarv: " + fromHarv)
        console.log("changed bRps: " + this.resource.bRps)
        console.log("mul: " + this.resource.resMul)*/
        console.log("changed Rps: " + this.resource.Rps)
    }
    clicked(){
        this.resource.update(0)
        //document.getElementById(this.unit.name+'Res').innerHTML= parseInt(Math.round(this.resource.amount))
    }
    persec(){
        this.resource.doRps()
    }
    sellForMoney(){         
        if(this.resource.amount>=this.packer.reqRes){    
            //this.updateRes(-1*(this.packer.reqRes));
            this.resource.update(-1*(this.packer.reqRes))
            Money.update(parseFloat(this.packer.sellP))
        }
        if(Money.amount>=10){
            checkUpgrades(10, 'money')
            checkUpgrades(13, 'money')
            //checkUpgrades(parseInt(pEggs), 'egg')
        }
    }
    updateRes(value){
        this.resource.amount += parseFloat(value) 
        console.log("new res: " + this.resource.amount)
        //tEggs.innerHTML = parseInt(Math.round(this.resource.amount))
    }
}
var chickens = new Animal('chick', 'egg', 'incubator')
chickens.unit.changeParam(4, 2, 1)
chickens.packer.changeParam(4, 8, 2, 1.05)
chickens.harvester.changeParam(10, 1, 1.1)
var chigs = new Animal('chig', 'fat', 'chigubator')
chigs.unit.changeParam(12, 1, 1.05)
chigs.packer.changeParam(4, 8, 3, 1.05)
chigs.harvester.changeParam(10, 4, 1.1)


// 10 times per second update resources
setInterval(() => {
    Money.update(0)
    chickens.persec()
    chigs.persec()
},1000)



//#region BUY ITEMS
let itemC = 0
function buy(animal, item, count){
    eval(animal).buy(item, count)
    //alert(chickens.resource.name + ": " + chickens.resource.amount)
    
}

//#endregion


//#region RESOURCES
function animClick(anim){
    eval(anim).clicked()
}


//#endregion


//#region UPGRADES

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
    stats(){
        return this.name + ', ' + this.cost + ', ' + this.effect
    }
    buy(elem){
        if(Money.amount >= this.cost){
            Money.update((-1*this.cost))
            eval(this.effect)
            alert(this.effect)
            ups.bought.push(elem)
            elem.remove();
        }
    }
}

class Upgrades {
    constructor() {
      this.upgrade = []
      this.bought = []
    }
    get numberOfUpgrades(){
        return this.upgrade.length
    }
    newUp(name, cost, effect) {
        let n = new Upgrade(name, cost, effect)
        this.upgrade.push(n)
        return n
    }
    search(name){
        upgrade.forEach(element => { //popravi
            if(element.name == name)
                console.log(element.effect)

        });
        /*
        if(this.upgrade[0].name==name)
        alert(this.upgrade[0].effect)*/
    }
 }

 var ups = new Upgrades()
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
            ups.newUp('Larger incubators', 1, 'chickens.harvester.cap++')
            ups.newUp('Better clicks', 2, 'chickens.resource.Rpc++')
        }
        if(type=='money'&& ms>=13 && milestoneM==1){
            milestoneM++
            ups.newUp('More chickens', 3, 'chickens.unit.amount++')
            ups.newUp('Worse clicks', 4, 'chickens.resource.Rpc--')
        }
        if(type=='egg' && ms>50 && milestoneE==0){
            milestoneE++
            //alert('egg milestone')
            ups.newUp('Larger incubators', 3, 'chickens.harvester.cap++')
            ups.newUp('Better clicks', 4, 'chickens.unit.amount++')
        }
        if(indCounter>addedUps)
        {
            addUpgrades();
            console.log('Upgrades: '+ups.numberOfUpgrades)
        }
        
 }


 

function addUpgrades(){
    for(var i=addedUps; i<indCounter; i++){
        var nu = document.createElement("div")
        nu.id = "upp" + ups.upgrade[i].index
        nu.innerHTML = ups.upgrade[i].name
        nu.setAttribute("onclick","buyUpgrade("+i+")");
        upMenu.appendChild(nu)
        addedUps++;
    }
alert('All upgrades added')
}

function buyUpgrade(selected){
    let elem
    elem = document.getElementById("upp"+selected)
    ups.upgrade[selected].buy(elem)
}
//#endregion

//NE POZIVA SE NIGDE
let cUpgrade = 0
function changeCursor(){
    const object = document.querySelector('.chicken');
    cUpgrade++
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

function test(){
    alert('Upgrades: '+ups.numberOfUpgrades)
    ups.search('Larger incubators')
    //alert(ups.upgrade.name.querySelector('Larger incubators'))
 }