const searchInput = document.querySelector("#search-input")
const searchButton = document.querySelector("#search-button")

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

function getProducts (info) {
    const products = info.products

    searchInput.addEventListener ("input", (event)=> {
        const value = event.target.value.toLowerCase().trim()
        const searchedProduct = products.filter(product => {
            return product.name.includes(value)
        })
        
        displayRetailerProducts(searchedProduct)
    })
    

    groupProducts(products)
}

function groupProducts (allProducts) {
    //Group products according to product name
        const groupedProducts = comparePrices(allProducts)

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
        cardContainer.setAttribute("style", "width: 20rem;")

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

function getRetailerProduct(data) {
    const retailers = data.retailers
    const products = data.products

    displayRetailerProducts(products, retailers)
}



function displayRetailerProducts(products, retailers) {

    const container = document.querySelector("#retailers")
    

    container.innerHTML = ""

    retailers.forEach(retailer =>{
        //Create a section for the retailer
        const retailerSection = document.createElement("section")
        retailerSection.className = "retailer-section"


        const retailerName = document.createElement("h3")
        retailerName.textContent = `${retailer.name}`
        retailerSection.appendChild(retailerName)

        const productList = document.createElement ("div")
        productList.className = "d-flex flex-wrap flex-row gap-9"

        const retailerProducts = products.filter(product =>
            product.retailerId === retailer.id
        );


        retailerProducts.forEach(product => {
            const productContainer = document.createElement("div")
            productContainer.className = "card m-5"
            productContainer.setAttribute("style", "width: 20rem;")

            const productCard = document.createElement("div")
            productCard.className = "card h-100 shadow-lg"
            
            productCard.innerHTML = `<img src="${product.imageUrl}" class="card-img-top" alt="image of ${product.name}">`

            const cardBody = document.createElement("div")
            cardBody.className = "card-body"

            cardBody.innerHTML = `
                
                <h4 class="card-title">${product.name}</h5>
                <p class="card-text fg-2">Brand: - ${product.brand}</p>
                <p class="card-text fg-2">Size: - ${product.size}</p>
                <p class="card-text fg-2">Price: - ${product.price}</p>
                <small class="fg-3">Store: - ${retailer.name}</small>
            `
            
            productCard.appendChild(cardBody)
            productContainer.appendChild(productCard)
            productList.appendChild(productContainer)
            retailerSection.appendChild(productList)
            container.appendChild(retailerSection)

        })

    })
    
}


async function displayAll() {
    const data = await getData()

    getAllProducts(data)
    getRetailerProduct(data)
}

displayAll()


