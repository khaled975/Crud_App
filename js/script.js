// variables
let title = document.getElementById("title-input");
let price = document.getElementById("price-input");
let advs = document.getElementById("advs-input");
let taxes = document.getElementById("taxes-input");
let discount = document.getElementById("discount-input");
let total = document.getElementById("total-price");
let count = document.getElementById("count-input");
let category = document.getElementById("category-input");
let create = document.getElementById("create-btn");
let tbody = document.querySelector("table tbody");
let table = document.querySelector("table");
let deleteAll = document.getElementById("delete-btn");
let search= document.getElementById("search-input")
let titleSearch=document.getElementById("search-by-title-btn")
let categorySearch=document.getElementById("search-by-category-btn")
let mood = "create";
let temp;

// get total price
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +advs.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    // total.style.background = "none";
  }
}
let productsData;
if (localStorage.products != null) {
  productsData = JSON.parse(localStorage.products);
} else {
  productsData = [];
}
// create product
function createProduct() {
  let newProduct = {
    title: title.value,
    price: price.value,
    advs: advs.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if(title.value!="" && price.value!=""&&category.value!=""&&count.value<=100){
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productsData.push(newProduct);
        }
      } else {
        productsData.push(newProduct);
      }
    } else {
      productsData[temp] = newProduct;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
    cleanData();
  }
  localStorage.setItem("products", JSON.stringify(productsData));
  // cleanData();
  drawData();
  deleteAll.innerHTML = `Delete All(${productsData.length})`;
}
create.addEventListener("click", createProduct);

// clean inputs data
function cleanData() {
  (title.value = ""),
    (price.value = ""),
    (advs.value = ""),
    (taxes.value = ""),
    (discount.value = ""),
    (total.innerHTML = ""),
    (count.value = ""),
    (category.value = "");
}
// read Data
function drawData() {
  let newRaw = "";
  for (let i = 0; i < productsData.length; i++) {
    newRaw += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].advs}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button id="item-update-btn" onclick="updateProduct(${i})">UPDATE</button></td>
                        <td><BUtton id="item-delete-btn" onclick="deleteProduct(${i})">DELETE</BUtton></td>
                    
                    </tr>
                 `;
  }
  tbody.innerHTML = newRaw;
}
drawData();
// delete product
function deleteProduct(e) {
  productsData.splice(e, 1);
  localStorage.products = JSON.stringify(productsData);
  drawData();
  deleteAll.innerHTML = `Delete All(${productsData.length})`;
}
// delete all product
function deleteAllProduct() {
  localStorage.clear();
  productsData.splice(0);
  drawData();
  deleteAll.innerHTML = `Delete All(${productsData.length})`;
}
deleteAll.addEventListener("click", deleteAllProduct);
deleteAll.innerHTML = `Delete All(${productsData.length})`;

// Update product
function updateProduct(e) {
  title.value = productsData[e].title;
  price.value = productsData[e].price;
  advs.value = productsData[e].advs;
  taxes.value = productsData[e].taxes;
  discount.value = productsData[e].discount;
  getTotal();
  category.value = productsData[e].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  temp = e;
  scroll({
    top:"0",
    behavior:"smooth"
  })
}
search.addEventListener("keyup",searcht)
function searcht(){
    let newRaw = "";
    for(let i=0;i<productsData.length;i++){
        if(productsData[i].title.includes(search.value)){
          newRaw += `
                      <tr>
                          <td>${i + 1}</td>
                          <td>${productsData[i].title}</td>
                          <td>${productsData[i].price}</td>
                          <td>${productsData[i].advs}</td>
                          <td>${productsData[i].taxes}</td>
                          <td>${productsData[i].discount}</td>
                          <td>${productsData[i].total}</td>
                          <td>${productsData[i].category}</td>
                          <td><button id="item-update-btn" onclick="updateProduct(${i})">UPDATE</button></td>
                          <td><BUtton id="item-delete-btn" onclick="deleteProduct(${i})">DELETE</BUtton></td>
                      </tr>
                   `;
        }
    }
  tbody.innerHTML = newRaw;
  }

