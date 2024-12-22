let urlParams=new URLSearchParams(window.location.search)
let category=urlParams.get("category")
let id=urlParams.get("id")
async function fetchProduct(){
 let url=`https://web-architects-ddd98-default-rtdb.firebaseio.com//products/${category}/${id}.json`
 try {
    let response=await fetch(url)
    let data= await response.json()
    displayProductDetails(data)
 } catch (error) {
    console.log(error)
 }
}
function displayProductDetails(product){
    console.log(product)
    let productContainer=document.querySelector(".product-container")
    productContainer.innerHTML=`
         <div class="product-image">
        <img src="${product.product_img}" alt="Sample Shirt" />
      </div>

      <!-- Product Details -->
      <div class="product-details">
        <h1>${product.product_name}</h1>
        <p class="item-price">${product.product_cost}</p>
        <p class="product-description">
          ${product.description}
        </p>
        <p class="item-size">Size: ${product.size}</p>
        <!-- insert ID in item number-->
        <p class="item-number">Item Number: ${product.id}</p>
        <button id="add-to-cart">Add to Bag</button>
      </div>
    
    
    `
}

fetchProduct()