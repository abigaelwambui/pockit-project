//Get products from the API
async function getProducts() {
    try{
        const response = await fetch("http://localhost:3000/products");

        if(!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json()

        //Group products according to product name
        const groupedProducts = comparePrices(products)
        displayProduct(groupedProducts)
    } catch {}
}    
getProducts()

function comparePrices (data) {
    const groupProducts = Object.groupBy(data, product => product.name)
    
    return groupProducts
}

function displayProduct (group) {

    Object.values(group).forEach(items => {
        items.sort ((a, b) => a.price - b.price)

        const item = items[0]
        const container = document.querySelector("#featured-products")

        const cardContainer = document.createElement("div")
        cardContainer.className = "card "
        cardContainer.setAttribute("style", "width: 18rem;")

        const productCard = document.createElement("div")
        productCard.className = "card-body"
        

        productCard.innerHTML = `
            <img src="${item.imageUrl}" class="card-img" alt="image of ${item.name}">
            <h5 class="mt-2 mb-0">${item.name}</h5>
            <p class="card-text fg-2">Brand: - ${item.brand}</p>
            <p class="card-text fg-2">Size: - ${item.size}</p>
            <p class="card-text fg-2">Price: - ${item.price}</p>
            <small class="fg-3">Original Price - ${item.originalPrice}</small>
        `
        cardContainer.appendChild(productCard)
        container.appendChild(cardContainer)

    })

    
}

displayProduct(groupProducts)



    // const groupedProducts = Object.groupBy(products, product => product.name)
    // const productGroup = Object.values(groupedProducts)

    


