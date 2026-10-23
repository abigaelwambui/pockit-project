//Get products from the API
async function getData() {
    try{
        const response = await fetch("https://abigaelwambui.github.io/pockit-project/db.json");

        if(!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json()
        return data
        
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}    
getData()

function groupProducts (info) {
    const products = info.products

    //Group products according to product name
        const groupedProducts = comparePrices(products)
        displayProduct(groupedProducts)
}

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
        productCard.classList.add("shadow-lg")
        

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




function displayStores (data) {
    const retailers =  data.retailers
    const products = data.retailers
    const stores = document.querySelector("#retailers")

    retailers.forEach(retailer => {
        

        const storeContainer = document.createElement("div")
        storeContainer.className = "card "
        storeContainer.setAttribute("style", "width: 18rem;")

        const storeCard = document.createElement("div")
        storeCard.className = "card-body"
        storeCard.classList.add("shadow-lg")
        

        storeCard.innerHTML = `
            <img src="${retailer.imageUrl}" class="card-img" alt="image of ${retailer.name}">
            <h5 class="mt-2 mb-0">${retailer.name}</h5>
            <p class="card-text fg-2">Store Type: - ${retailer.type}</p>
        `
        storeContainer.appendChild(storeCard)
        stores.appendChild(storeContainer)
    })

    stores.
 
}

async function displayAll() {
    const data = await getData()

    groupProducts(data)
    displayStores(data)
}

displayAll()


