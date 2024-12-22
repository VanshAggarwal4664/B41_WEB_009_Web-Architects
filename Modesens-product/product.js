// Filter Sidebar Functionality
const filterTitles = document.querySelectorAll(".filter-title");
filterTitles.forEach((title) => {
  title.addEventListener("click", () => {
    const parent = title.parentElement;
    parent.classList.toggle("active");
  });
});

// Header Side Menu
const hamburger = document.querySelector(".hamburger");
const cross = document.querySelector(".side-menu-cross");
const sideMenu = document.querySelector(".side-menu");

hamburger.addEventListener("click", () => CloseAndOpenSideMenu(true));
cross.addEventListener("click", () => CloseAndOpenSideMenu(false));

function CloseAndOpenSideMenu(open) {
  sideMenu.classList.toggle("hidden", !open);
}

// Product Sidebar Mobile Menu
const Producthamburger = document.querySelector("#product-sidebar-mobile");
const Productcross = document.querySelector(".product-mobile-sidebar-cross");
const ProductsideMenu = document.querySelector(".product-mobile-sidebar");

Producthamburger.addEventListener("click", () => CloseAndOpenProductSideMenu(true));
Productcross.addEventListener("click", () => CloseAndOpenProductSideMenu(false));

function CloseAndOpenProductSideMenu(open) {
  ProductsideMenu.classList.toggle("hidden-mobile-sidebar", !open);
}

// Variables
let productData = [];
const productGrid = document.querySelector(".product-grid");
const paginationDiv = document.querySelector(".pagination-links");
const searchInput = document.querySelector("#search");
const urlParams = new URLSearchParams(window.location.search);
const Pricesort = document.querySelector("#price-sort");
const menCheckBox = document.querySelector("#men");
const womenCheckBox = document.querySelector("#women");
const productTypeSelect = document.querySelector("#product-type");
let pageName=document.querySelector("#pageName")
let pageHeading=document.querySelector("#page-heading")
let currPage = parseInt(urlParams.get("page")) || 1;
let productPerPage = 8;

// Debouncing Search
let timer;
searchInput.addEventListener("keyup", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    urlParams.set("search", searchInput.value.trim().toLowerCase());
    urlParams.set("page", 1); // Reset to page 1 for new search
    updateURL();
    applyFilters();
  }, 500);
});

Pricesort.addEventListener("change", () => {
  urlParams.set("sort", Pricesort.value);
  urlParams.set("page", 1); // Reset to page 1 for new sort order
  updateURL();
  applyFilters();
});

// Update Category Based on Checkbox Selection
function updateCategory() {
  const category = menCheckBox.checked ? "men" : "women";
  pageName.textContent=`MODESENS /${category.toUpperCase()}`
  pageHeading.innerHTML=`<h3>${category.toUpperCase()}'s Fashion & Designer Products</h3><br>
      <p>Shop ${category}'s fashion from 600+ stores. Get the best deals and compare prices. Discover new arrivals for
        designer fashion for ${category}.</p><br>`
  urlParams.set("category", category);
  urlParams.set("page", 1); // Reset to page 1 for new category
  updateURL();
  initializeCategories(category)
  fetchProducts(); // Fetch products for the selected category
}

// Event Listeners for Men and Women Checkboxes
menCheckBox.addEventListener("change", updateCategory);
womenCheckBox.addEventListener("change", updateCategory);

// Fetch Products Based on Selected Category
async function fetchProducts() {
  try {
    const category = urlParams.get("category") || "men"; // Default to men
    const response = await fetch(
      `https://web-architects-ddd98-default-rtdb.firebaseio.com/products/${category}.json`
    );
    const data = await response.json();
    productData = Object.entries(data);
    applyFilters(); // Apply filters to the fetched data
  } catch (error) {
    console.error("Error fetching products:", error);
    productGrid.innerHTML = "<p>Error loading products. Please try again later.</p>";
  }
}

// Create Pagination Links
function createPagination(filteredData) {
  paginationDiv.innerHTML = "";
  const totalPage = Math.ceil(filteredData.length / productPerPage);

  for (let i = 1; i <= totalPage; i++) {
    const a = document.createElement("a");
    a.id = `page${i}`;
    a.href = `?${urlParams.toString().replace(/page=\d+/, `page=${i}`)}`;
    a.textContent = i;
    a.classList.toggle("active-link", i === currPage);
    a.addEventListener("click", (e) => {
      e.preventDefault();
      currPage = i;
      urlParams.set("page", currPage);
      updateURL();
      applyFilters();
    });
    paginationDiv.append(a);
  }
}

// Render Products Based on Pagination
function renderProducts(filteredData) {
  productGrid.innerHTML = "";
  const startIndex = (currPage - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;
  const productsToShow = filteredData.slice(startIndex, endIndex);

  if (productsToShow.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productsToShow.forEach(([id, product]) => {
    const category = urlParams.get("category") || "men";
    const div = document.createElement("div");
    div.classList.add("produt-card");
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let presentInCart = cart[id] ? true : false;
    div.id = id;
    let a=document.createElement("a")
    a.style.textDecoration="none"
    a.style.cursor="pointer"
    a.href=`../Product Page Details/pdp.html?id=${id}&category=${category}`
    div.innerHTML = `
      <span class="trending"><i class="fa-solid fa-fire"></i></span>
      <span class="heart"><i class="fa-regular fa-heart"></i></span>
      <div class="product-img">
        <img src="${product.product_img}" alt="${product.product_name}">
      </div>
      <div class="product-details">
        <h4>${product.product_name}</h4>
        <p>${product.description}</p>
        <p>${product.product_cost}</p>
        <button>${presentInCart ? "View Cart" : "Add To Cart"}</button>
      </div>
    `;
    a.appendChild(div)
    productGrid.appendChild(a);
  });
}

// Apply Filters and Maintain Sorting Across Pages
function applyFilters() {
  const searchQuery = urlParams.get("search") || "";
  const sortOrder = urlParams.get("sort") || "";

  // Filter Products by Search Query
  let filteredData = productData.filter(([id, product]) => {
    const name = product.product_name.toLowerCase();
    return name.includes(searchQuery);
  });

  // Sort Products
  if (sortOrder === "ascending") {
    filteredData.sort((a, b) => {
      return (
        Number(a[1].product_cost.replace("₹", "")) -
        Number(b[1].product_cost.replace("₹", ""))
      );
    });
  } else if (sortOrder === "descending") {
    filteredData.sort((a, b) => {
      return (
        Number(b[1].product_cost.replace("₹", "")) -
        Number(a[1].product_cost.replace("₹", ""))
      );
    });
  }

  createPagination(filteredData);
  renderProducts(filteredData);
}

// Update the Browser URL
function updateURL() {
  history.pushState(null, "", `?${urlParams.toString()}`);
}

// Navigate Pages
function movePage(dir) {
  if (dir === "prev" && currPage > 1) {
    currPage--;
  } else if (dir === "next") {
    const totalPage = Math.ceil(productData.length / productPerPage);
    if (currPage < totalPage) {
      currPage++;
    }
  }
  urlParams.set("page", currPage);
  updateURL();
  applyFilters();
}

// Event delegation to handle clicks on "Add To Cart" buttons
productGrid.addEventListener("click", (e) => {
  const button = e.target.closest("button");

  if (button && button.textContent === "Add To Cart") {
    e.preventDefault()
    e.stopPropagation()
    // Get the product card and its details
    const productCard = button.closest(".produt-card");
    const productId = productCard.id;
    // Create product object
    let productObj = productData.filter(([id, product]) => id == productId);
    let product = { ...productObj[0][1], quantity: 1 };
    // Add product to cart in localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!cart[productId]) {
      cart[productId] = product;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    // Update button text to "View Cart"
    button.textContent = "View Cart";
  } else if (button && button.textContent === "View Cart") {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = "/B41_WEB_009_Web-Architects/Cart/cart.html";
  }
});
// DOM Elements


// Function to Fetch Categories
async function fetchCategories(url) {
  try {
    const response = await fetch(url);
    const categories = await response.json();
    const categoryArr=Object.entries(categories)
    // Populate the select dropdown with categories
    populateProductTypeDropdown(categoryArr);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Populate Dropdown Dynamically
function populateProductTypeDropdown(categories) {
  // Clear existing options except the default one
  productTypeSelect.innerHTML = `<option value="">Filter Products</option>`;

  // Append new options from categories
  categories.forEach(([_,category]) => {
    const option = document.createElement("option");
    option.value = category.toLowerCase();
    option.textContent = category;
    productTypeSelect.appendChild(option);
  });
}

// Filter Products by Selected Type
function filterByProductType() {
  const selectedType = productTypeSelect.value.toLowerCase();

  const filteredData = productData.filter(([_, product]) => {
    return selectedType ? product.cat.toLowerCase() === selectedType : true;
  });

  renderProducts(filteredData);
}

// Event Listener for Product Type Dropdown
productTypeSelect.addEventListener("change", filterByProductType);

// Initialize for Men or Women Categories
async function initializeCategories(gender) {
  const categoryUrl = gender === "men"
    ? "https://web-architects-ddd98-default-rtdb.firebaseio.com/category/men.json"
    : "https://web-architects-ddd98-default-rtdb.firebaseio.com/category/women.json";

  await fetchCategories(categoryUrl);
}

// Call Initialization Based on Gender
initializeCategories("men");

// Initialize the App
menCheckBox.checked = true; // Default to men
updateCategory();

