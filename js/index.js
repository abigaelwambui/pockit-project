const searchInput = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")
const featuredContainer = document.querySelector("#featured-products")
const container = document.querySelector("#retailers")

let products;
let retailers;

//Get data from the API
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


//group products from data by name
function groupProducts (allProducts) {
    //Group products according to product name
        const groupedProducts = groupByName(allProducts)

        displayProduct(groupedProducts)
}

function groupByName (data) {
    //Returns an object of products with similar names
    const groupProducts = Object.groupBy(data, product => product.name)
    
    return groupProducts
}

function displayProduct (group) {

    //Sorts from lowest value to highest
    Object.values(group).forEach(items => {
        items.sort ((a, b) => a.price - b.price)

        const item = items[0]
        

        const cardContainer = document.createElement("div")
        cardContainer.className = "card "
        cardContainer.setAttribute("style", "width: 20rem;")

        const productCard = document.createElement("div")
        productCard.className = "card-body"
        productCard.classList.add("shadow-lg")
        
        //Add content to the product card
        productCard.innerHTML = `
            <img src="${item.imageUrl}" class="card-img" alt="image of ${item.name}">
            <h5 class="mt-2 mb-0">${item.name}  ${item.size}</h5>
            <p class="card-text fg-2">Brand: - ${item.brand}</p>
            <p class="card-text fg-2">Price: - ${item.price}</p>
            <small class="fg-3">Original Price - ${item.originalPrice}</small>
        `
        cardContainer.appendChild(productCard)
        featuredContainer.appendChild(cardContainer)

    })
 
}



function displayRetailerProducts(products, retailers) {

    //Clear the container
    container.innerHTML = ""

    retailers.forEach(retailer =>{
        //Create a section for the retailer
        const retailerSection = document.createElement("section")
        retailerSection.className = "retailer-section container contains-inline p-3"

        const retailerLink = document.createElement("a")
        retailerLink.setAttribute("href", `${retailer.website}`)
        retailerLink.className = "theme-inverse underline-offset-2 underline-20 hover:underline-100"
        const retailerName = document.createElement("h3")
       
        retailerName.textContent = `${retailer.name}`
        retailerLink.appendChild(retailerName)
        retailerSection.appendChild(retailerLink)

        const productList = document.createElement ("div")
        productList.className = "product-list card-group "

        const retailerProducts = products.filter(product =>
            product.retailerId === retailer.id
        );

        //Create a product card for each of the retailer products
        retailerProducts.forEach(product => {
            const productContainer = document.createElement("div")
            productContainer.className = "card"
            // productContainer.setAttribute("style", "width: 18rem;")

            const productCard = document.createElement("div")
            productCard.className = "card h-100"
            
            productCard.innerHTML = `<img src="${product.imageUrl}" class="card-img-top" alt="image of ${product.name}">`

            const cardBody = document.createElement("div")
            cardBody.className = "card-body"

            cardBody.innerHTML = `
                
                <h4 class="card-title">${product.name}, ${product.size}</h5>
                <p class="card-text fg-2">Price: - ${product.price}</p>
            `
            
            productCard.appendChild(cardBody)
            productContainer.appendChild(productCard)
            productList.appendChild(productContainer)
            retailerSection.appendChild(productList)
            container.appendChild(retailerSection)

        })

    })
    
}

//Implement search input
function searchProducts() {
    const searchedItems = searchInput.value.trim().toLowerCase();
    console.log(searchedItems)

    // Find matching products
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchedItems)
    );

   

    // Display only matching products in retailers
    displayRetailerProducts(filteredProducts, retailers);

    if (searchedItems === ""){
        container.classList.remove("search-results")
    } else {
        container.classList.add("search-results")
    }
    

    // Scroll to the results
    container.scrollIntoView({
        behavior: "smooth"
    });
}



async function displayAll() {
    const data = await getData()

    if(!data)return;

    products = data.products
    retailers = data.retailers
    
    displayRetailerProducts(products, retailers)
    groupProducts(products)
}

displayAll()

searchButton.addEventListener("click", searchProducts);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") searchProducts();
});


