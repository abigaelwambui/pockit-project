//Get products from the API


async function getProducts() {
    const response = await fetch("http://localhost:3001/products");
    const products = await response.json()
    
    //Grouping products with similar names
    const groupedProducts = Object.groupBy(products, product => product.name)
    console.log(groupedProducts) 

    const productGroup = Object.values(groupedProducts)
    console.log(productGroup)
    
}
getProducts()


// function comparePrices (group) {

//     //Check for the cheaper option
//     group.forEach(items=> {
//         items.sort((a, b)=> a.price - b.price)

//         const displayedProduct = items[0];

//         //Get the compare prices section from HTML
//         const comparedProducts = document.querySelector("price-compare");

//     })


    
    


//     // comparedProducts.innerHTML = "";

//     // //Add the product cards to the compare prices section
//     // displayedProduct.forEach(item => {

//     //     const card = document.querySelector(".card");
//     //     const cardItem = document.createElement("div")
//     //     cardItem.classList.add("card-body");

//     //     cardItem.innerHTML = `
//     //         <img src="${item.imageUrl}" class= "card-img" alt="image of ${item.name}">
//     //         <h5 class="mt-2 mb-0">${item.name} - ${item.size}</h5>
//     //         <p class="card-text fg-2">Price: ${item.price}</p>
//     //     `
//     //     card.appendChild(cardItem)
//     //     comparedProducts.appendChild(card)
//     // })

// }