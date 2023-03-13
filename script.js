const productList = [
    {
        name: 'Гамбургер простой',
        price: 10000,
        kkal: 500,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    },
    {
        name: 'Гамбургер FRESH',
        price: 20500,
        kkal: 700,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    },
    {
        name: 'FRESH Combo',
        price: 31900,
        kkal: 1200,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    }
]



const extraProduct = {
    doubleMayonnaise: {
        price: 2000,
        name: 'Двойной майонез',
        kkal: 300
    },
    lettuce: {
        price: 1000,
        name: 'Салатный лист',
        kkal: 30
    },
    cheese: {
        price: 3000,
        name: 'Сыр',
        kkal: 350
    }
}

const   products        = [...document.querySelectorAll('.main__product')],
        btnPlusMinus    = [...document.querySelectorAll('.main__product-btn')],
        checkExtra      = [...document.querySelectorAll('.main__product-checkbox')]

btnPlusMinus.forEach(btn => {
    btn.addEventListener('click', plusMinus)
})

function plusMinus(){
    const   parent      = this.closest('.main__product'),
            parentIndex = products.indexOf(parent), // 1
            outAmount   = parent.querySelector('.main__product-num'), 
            outPrice    = parent.querySelector('.main__product-price span'),
            outKkal     = parent.querySelector('.main__product-call'),
            btnSymbol   = this.getAttribute('data-symbol');
    
    if(btnSymbol === '+' && productList[parentIndex].amount < 15){
        productList[parentIndex].amount++;
    }
    else if(btnSymbol === '-' && productList[parentIndex].amount > 0){
        productList[parentIndex].amount--;
    }
    
    const {amount, Kkal, Summa} = productList[parentIndex];
    
    outAmount.innerHTML = amount;
    outPrice.innerHTML = Summa.toLocaleString();
    outKkal.innerHTML = Kkal.toLocaleString();
}

checkExtra.forEach(checkbox => {
    checkbox.addEventListener('input', check)
})

function check(){
    const   parent      = this.closest('.main__product'),
            parentIndex = products.indexOf(parent),
            outPrice    = parent.querySelector('.main__product-price span'),
            outKkal     = parent.querySelector('.main__product-call'),
            attr        = this.getAttribute('data-extra');
    
    
    productList[parentIndex][attr] = this.checked;
    
    if(this.checked){
        productList[parentIndex].price += extraProduct[attr].price;
        productList[parentIndex].kkal += extraProduct[attr].kkal;
    }
    else{
        productList[parentIndex].price -= extraProduct[attr].price;
        productList[parentIndex].kkal -= extraProduct[attr].kkal;
    }
    
    const {Summa, Kkal} = productList[parentIndex];
    outPrice.innerHTML = Summa.toLocaleString();
    outKkal.innerHTML = Kkal.toLocaleString();



}





const flintBody = document.querySelector('.print__body_item'),
      flintChek = document.querySelector('.addCart'),
      flintFooter = document.querySelector('.print__footer');


      flintChek.addEventListener('click', () => {
        flintBody.innerHTML = ''


  for (const key in productList) {
    const {name, Summa, kkal, amount} = productList[key]

        if (amount) {
            flintBody.innerHTML +=`        
            <div class="print__body">
                <div class="print__body_item">
                    <span class="name">Название: ${name}</span>
                    <span class="Summ">Стоимость: ${Summa}</span>
                    <span class="kall">Калорий: ${kkal}</span>
                    <span class="caunt">шт: ${amount}</span>
                </div>
            </div>`
    }
    if (amount) {
        flintFooter.innerHTML = `<div class="print__footer">${totalSum()}</div>`
    }

    flintFooter.innerHTML = 'Всего: ' + totalSum()
    
    function totalSum() {
    let flintFooter = 0;

    for (const key in productList) {
        flintFooter += productList[key].Summa
    }

    return flintFooter;
}
  }
    window.print()
})