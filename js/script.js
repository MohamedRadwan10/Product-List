// DOM Elements
let allProducts = document.querySelector(".items");
let cartCount = document.querySelector(".title-cart");
let result = document.querySelector(".result");
let res = document.querySelector("#res");
let CartItems = document.querySelector(".get-cart");
let CartEmpty = document.querySelector(".cart-empty");
let delivery = document.querySelector(".delivery");
let confirmOrderBtn = document.querySelector("#btn");
let displayOrder = document.querySelector("#orderItem");
let allOrderOverlay = document.querySelector(".overlay");
let startOrderBtn = document.querySelector("#StartOrderBtn");
let btnIcon2 = document.querySelector("#btnP");
let btnIcon = document.querySelector("#btnIcon");

// ^------------------------------------------------------------------------------------------------------------------
// Product Data
let products = [
  {
    id: 1,
    image: {
      thumbnail: "./images/image-waffle-thumbnail.jpg",
      mobile: "./images/image-waffle-mobile.jpg",
      tablet: "./images/image-waffle-tablet.jpg",
      desktop: "./images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    quantity: 1,
  },
  {
    id: 2,
    image: {
      thumbnail: "./images/image-creme-brulee-thumbnail.jpg",
      mobile: "./images/image-creme-brulee-mobile.jpg",
      tablet: "./images/image-creme-brulee-tablet.jpg",
      desktop: "./images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
    quantity: 1,
  },
  {
    id: 3,
    image: {
      thumbnail: "./images/image-macaron-thumbnail.jpg",
      mobile: "./images/image-macaron-mobile.jpg",
      tablet: "./images/image-macaron-tablet.jpg",
      desktop: "./images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
    quantity: 1,
  },
  {
    id: 4,
    image: {
      thumbnail: "./images/image-tiramisu-thumbnail.jpg",
      mobile: "./images/image-tiramisu-mobile.jpg",
      tablet: "./images/image-tiramisu-tablet.jpg",
      desktop: "./images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    quantity: 1,
  },
  {
    id: 5,
    image: {
      thumbnail: "./images/image-baklava-thumbnail.jpg",
      mobile: "./images/image-baklava-mobile.jpg",
      tablet: "./images/image-baklava-tablet.jpg",
      desktop: "./images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
    quantity: 1,
  },
  {
    id: 6,
    image: {
      thumbnail: "./images/image-meringue-thumbnail.jpg",
      mobile: "./images/image-meringue-mobile.jpg",
      tablet: "./images/image-meringue-tablet.jpg",
      desktop: "./images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
    quantity: 1,
  },
  {
    id: 7,
    image: {
      thumbnail: "./images/image-cake-thumbnail.jpg",
      mobile: "./images/image-cake-mobile.jpg",
      tablet: "./images/image-cake-tablet.jpg",
      desktop: "./images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
    quantity: 1,
  },
  {
    id: 8,
    image: {
      thumbnail: "./images/image-brownie-thumbnail.jpg",
      mobile: "./images/image-brownie-mobile.jpg",
      tablet: "./images/image-brownie-tablet.jpg",
      desktop: "./images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
    quantity: 1,
  },
  {
    id: 9,
    image: {
      thumbnail: "./images/image-panna-cotta-thumbnail.jpg",
      mobile: "./images/image-panna-cotta-mobile.jpg",
      tablet: "./images/image-panna-cotta-tablet.jpg",
      desktop: "./images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
    quantity: 1,
  },
];

// ^------------------------------------------------------------------------------------------------------------------

let cartProducts = localStorage.getItem("cartProducts")
  ? JSON.parse(localStorage.getItem("cartProducts"))
  : [];

// ^------------------------------------------------------------------------------------------------------------------

function updateCartDisplay() {
  let count = cartProducts.reduce((total, item) => total + item.quantity, 0);

  let totalPrice = cartProducts
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2); // Calculate total price

  let box = cartProducts
    .map((item) => {
      return `
      <div class="cart-item">
        <div class="cart-info">
          <p>${item.productName}</p>
          <span class="quantity">${item.quantity}x</span>
          <span class="single-price">@ $${item.price.toFixed(2)}</span>
          <span class="all-price">$${(item.price * item.quantity).toFixed(
            2
          )}</span>
        </div>
        <svg
          onclick="removeFromCart(${item.id})"  // Corrected to use item.id
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill="#CAAFA7"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </div>
    `;
    })
    .join(" ");

  let res = `<div class="res">
                        <p>Order Total</p>
                        <h3>$${totalPrice}</h3>
                     </div>`;

  if (cartProducts.length === 0) {
    CartEmpty.style.display = "block";
    delivery.style.display = "none";
    confirmOrderBtn.style.display = "none";
    cartCount.innerHTML = `Your Cart (${count})`; 
    CartItems.innerHTML = "";
    result.innerHTML = ""; 
    return; 
  } else {
    CartEmpty.style.display = "none"; 
    delivery.style.display = "block";
    confirmOrderBtn.style.display = "block";
    result.innerHTML = res;
    CartItems.innerHTML = box;

    
    cartCount.innerHTML = `Your Cart (${count})`;
  }
}


updateCartDisplay();

// ^------------------------------------------------------------------------------------------------------------------
function removeFromCart(id) {
 
  let index = cartProducts.findIndex((item) => item.id == id);


  if (index !== -1) {
   
    cartProducts.splice(index, 1);

    
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    
    updateCartDisplay();
  }
}

// ^------------------------------------------------------------------------------------------------------------------
function addToCart(id) {
  let chooseItem = products.find((item) => item.id == id);
  let flag = false;

 
  cartProducts.forEach((product) => {
    if (product.productName === chooseItem.name) {
      product.quantity++;
      flag = true;
    }
  });


  if (!flag) {
    cartProducts.push({
      productName: chooseItem.name,
      quantity: 1,
      price: chooseItem.price,
      id: chooseItem.id,
      imageThumbnail: chooseItem.image.thumbnail,
      imageDesktop: chooseItem.image.desktop,
      imageMobile: chooseItem.image.mobile,
      imageTablet: chooseItem.image.tablet,
      category: chooseItem.category,
    });
  }

  
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));


  updateCartDisplay();
}

// ^------------------------------------------------------------------------------------------------------------------
function getProducts() {

  let y = products
    .map((ele) => {
      return `  
            <div class="item">
              <div class="item-img">
                <img
                  class="img"
                  src=${ele.image.desktop}
                  alt=${ele.category}
                />
                <button onclick="addToCart(${ele.id})" id="btnP" class="add">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                    <g fill="#C73B0F" clip-path="url(#a)">
                      <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                      <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M.333 0h20v20h-20z"/>
                      </clipPath>
                    </defs>
                  </svg>
                  Add To Cart
                </button>
              </div>
              <div class="info">
                <span class="category">${ele.category}</span>
                <p class="name">${ele.name}</p>
                <p class="price">$ ${ele.price.toFixed(2)}</p>
              </div>
            </div>
          `;
    })
    .join(" ");


  allProducts.innerHTML = y;
}


getProducts();

// ^------------------------------------------------------------------------------------------------------------------
confirmOrderBtn.addEventListener("click", confirm);

function confirm() {
  let totalPrice = cartProducts
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2); 

  let order = cartProducts
    .map((item) => {
      return `<div class="order-items-content">
                  <div class="order-items-content-info">
                    <div class="order-items-content-img">
                      <img src=${item.imageThumbnail} alt=${
        item.category
      } draggable="false" />
                    </div>
                    <div class="order-items-content-text">
                      <p>${item.productName}</p>
                      <span class="quantity">${item.quantity}x</span>
                      <span class="single-price">@ $${item.price.toFixed(
                        2
                      )}</span>
                    </div>
                  </div>
                  <p class="all-price">$${(item.price * item.quantity).toFixed(
                    2
                  )}</p>
                </div>`;
    })
    .join(" ");

  let result = `<div class="res">
                    <p>Order Total</p>
                    <h3>$${totalPrice}</h3>
                  </div>`;

  res.innerHTML = result;
  displayOrder.innerHTML = order;
  allOrderOverlay.style.display = "block";
}

//   ^-----------------------------------------------------------------------------------------------------------------

startOrderBtn.addEventListener("click", startOrder);

function startOrder() {

  cartProducts = []; 
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts)); 
  allOrderOverlay.style.display = "none";

  updateCartDisplay();
}

//   ^-----------------------------------------------------------------------------------------------------------------
