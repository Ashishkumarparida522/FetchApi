var cartitems = [];
function getCartItemsCount() {
  document.getElementById("lblcount").innerHTML = cartitems.length;
}

function LoadCategories() {
  fetch("http://fakestoreapi.com/products/categories")
    .then(function (response) {
      return response.json(); 
    })
    .then(function (data) {
      data.unshift("all");
      for (var category of data) {
        var option = document.createElement("option");

        option.text = category.toUpperCase();

        option.value = category;
        document.getElementById("lstCategories").appendChild(option);
        lstCategories.style.fontSize = "12px";
        lstCategories.style.fontWeight = 600;
      }
    });
}

function loadProducts(url) {
  document.querySelector("main").innerHTML = "";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var product of data) {
        var div = document.createElement("div");
        div.className = "card m-2 p-1";
        div.style.width = "200px";
        div.style.height = "Auto";
        div.innerHTML = `
               <img src=${product.image} height="150" width="100" class="card-img-top">
               <div class="card-header" style="height:110px"> 
                    <p>${product.title}</p>
                </div>
                <div class="card-body" style="height:130px">
                    <dl>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                        <dt>Rating</dt>
                        <dd>
                            <span class="bi bi-star-fill text-success"></span>
                            ${product.rating.rate} [${product.rating.count}]
                        </dd>
                        </dl>
                        </div>
                        <div class="card-footer">
                            <buuton class="btn btn-danger w-100" onclick="addClick(${product.id})">
                                <span class="bi bi-cart4"> 
                                    </span>Add to cart
                            </button>
                            </div>
                          `;

        document.querySelector("main").appendChild(div);
      }
    });
}
function bodyload() {
  LoadCategories();
  loadProducts("http://fakestoreapi.com/products");
  getCartItemsCount();
}
function chngCategory() {
  var categoryname = document.getElementById("lstCategories").value;
  console.log(categoryname);

  if (categoryname == "all") {
    loadProducts("http://fakestoreapi.com/products");
  } else {
    loadProducts(`http://fakestoreapi.com/products/category/${categoryname}`);
  }
}
function addClick(id) {
  fetch(`http://fakestoreapi.com/products/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cartitems.push(data);
      alert(`${data.title}\nAdded to cart`);
      getCartItemsCount();
    });
  {
  }
}
function LoadCartItems() {
  document.querySelector("tbody").innerHTML = "";
  for (var item of cartitems) {
    var tr = document.createElement("tr");
    var tdTitle = document.createElement("td");
    var tdPrice = document.createElement("td");
    var tdPreview = document.createElement("td");

    tdTitle.innerHTML = item.title;
    tdPrice.innerHTML = item.price;
    tdPreview.innerHTML = `
        <img src=${item.image} width="50" height="50"/>
        `;
    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tr.appendChild(tdPreview);

    document.querySelector("tbody").appendChild(tr);
  }
}
