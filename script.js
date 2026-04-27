let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
    let existingItem = cart.find(item => item.name == name);

    if(existingItem){
        existingItem.quantity += 1;
    }else {
        cart.push({ name: name, price: price, quantity: 1});

    }

    localStorage.setItem("cart", JSON.stringify(cart));
}
function displayCart(){
    let cartlist = document.getElementById("cart-list");
    let totalElement = document.getElementById("total");

    if(!cartlist || !totalElement) return;

    if(cart.length == 0){
        cartlist.innerHTML = "";
        totalElement.textContent = "Total: $0";
        return;
    }

        let total = 0;
    cartlist.innerHTML = "";

   cart.forEach((item, index) => {
    let li = document.createElement("li");
    
    let name = document.createElement("span");
    name.textContent = item.name;

    let controls = document.createElement("span");

    let minus = document.createElement("button");
    minus.textContent = "-";
    minus.onclick = () => decreaseQty(index);

    let qty = document.createElement("span");
    qty.textContent = item.quantity;

    let plus = document.createElement("button");
    plus.textContent = "+";
    plus.classList.add("plus-btn");
    plus.onclick = () => increaseQty(index);

    controls.appendChild(minus);
    controls.appendChild(qty);
    controls.appendChild(plus);

    let price = document.createElement("span")
    let itemTotal = item.price * item.quantity;
    price.textContent = "$" + itemTotal;

    total += itemTotal;
    
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeItem(index);

    li.appendChild(name);
    li.appendChild(controls);
    li.appendChild(price);
    li.appendChild(removeBtn);

    cartlist.appendChild(li);

    totalElement.textContent = "Total: $" + total;
   })
}

function increaseQty(index){
         cart[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function decreaseQty(index){
    if(cart[index].quantity > 1){
         cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function removeItem(index){
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart))

    displayCart();
}