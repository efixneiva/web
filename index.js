const btnCart = document.querySelector(".container-cart-icon")
const containerCartProducts = document.querySelector(".container-cart-products")

btnCart.addEventListener("click", () => {
    containerCartProducts.classList.toggle("hidden-cart")
})

/*===========================================================*/
const cartInfo=document.querySelector(".cart-product")
const rowProduct = document.querySelector(".row-product")

/*=================================================================*/

const productsList = document.querySelector(".container-items")

/*==========================================================*/

let allProducts = []

const valorTotal = document.querySelector(".total-pagar")

const countProducts = document.querySelector("#contador-productos")

productsList.addEventListener("click", e => {
    if(e.target.classList.contains("btn-add-cart")){
        const product = e.target.parentElement

        const infoProduct = {
            quantify: 1,
            title: product.querySelector("h2").textContent,
            price: product.querySelector("p").textContent,
            
        }
        const exits = allProducts.some(product => product.title === infoProduct.title)

        if (exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantify++;
                    return product
                }else{
                    return product
                }
            })
            allProducts = [...products]
        }else{
            allProducts = [...allProducts, infoProduct]
        }
        

        showHTML()
    }
});

rowProduct.addEventListener("click" , e => {
    if(e.target.classList.contains("icon-close")){
        const product = e.target.parentElement;
        const title = product.querySelector("p").textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );
        console.log(allProducts)
        showHTML()
    }
});


//funcion para mostrar en html*/
const showHTML = () => {

    if (!allProducts.length){
        containerCartProducts.innerHTML=`
            <p class="cart-empty"> el carrito esta vacio </p>
        `
    }

    let total = 0;
    let totalOfProducts = 0;

    rowProduct.innerHTML = "";

    allProducts.forEach(product => {
        const containerProduct = document.createElement("div");
        containerProduct.classList.add("cart-product");

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantify}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-close" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
        `;
        
        rowProduct.append(containerProduct );
        
        total =
            total + parseInt(product.quantify * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantify;
    });

    valorTotal.innerText =`$${total}`;
    countProducts.innerText = totalOfProducts;
}

