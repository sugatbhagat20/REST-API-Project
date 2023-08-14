var form = document.querySelector("#form");

var list = document.querySelector("#list");

let data = {};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  var itemName = document.getElementById("name");
  var itemDesc = document.getElementById("desc");
  var itemPrice = document.getElementById("price");
  var itemQty = document.getElementById("qty");

  data = {
    name: itemName.value,
    desc: itemDesc.value,
    price: itemPrice.value,
    qty: itemQty.value,
  };

  var li = document.createElement("li");
  let id = "";
  li.className = "items list-group-item list-group-item-success";
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  var span3 = document.createElement("span");
  var span4 = document.createElement("span");

  span1.textContent = `${data.name} `;
  span2.textContent = `${data.desc} `;
  span3.textContent = `${data.price} `;
  span4.textContent = `${data.qty}`;
  div1.appendChild(span1);
  div1.appendChild(span2);
  div1.appendChild(span3);
  div1.appendChild(span4);
  li.appendChild(div1);

  var buy1 = document.createElement("button");
  var buy2 = document.createElement("button");
  var buy3 = document.createElement("button");
  buy1.className = "buy1";
  buy1.textContent = "buy1";
  buy2.className = "buy2";
  buy2.textContent = "buy2";
  buy3.className = "buy3";
  buy3.textContent = "buy3";
  div2.appendChild(buy1);
  div2.appendChild(buy2);
  div2.appendChild(buy3);
  li.appendChild(div2);
  list.appendChild(li);
  const res = await axios.post(
    "https://crudcrud.com/api/5acd443d6ef54ec3bb6ce76626383c4e/storeData",
    data
  );
  id = res.data._id;
  buy1.id = res.data._id;
  buy2.id = res.data._id;
  buy3.id = res.data._id;
  //   console.log(buy1.id);
  //   console.log(buy2.id);
  //   console.log(buy3.id);

  e.target["name"].value = "";
  e.target["desc"].value = "";
  e.target["price"].value = "";
  e.target["qty"].value = "";
});

window.addEventListener("DOMContentLoaded", async function renderElements() {
  const users = await axios.get(
    "https://crudcrud.com/api/5acd443d6ef54ec3bb6ce76626383c4e/storeData"
  );
  users.data.forEach((elem) => {
    var li = document.createElement("li");
    li.className = "items list-group-item list-group-item-success";
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var span1 = document.createElement("span");
    var span2 = document.createElement("span");
    var span3 = document.createElement("span");
    var span4 = document.createElement("span");

    span1.textContent = `${elem.name} `;
    span2.textContent = `${elem.desc} `;
    span3.textContent = `${elem.price} `;
    span4.textContent = `${elem.qty}`;
    div1.appendChild(span1);
    div1.appendChild(span2);
    div1.appendChild(span3);
    div1.appendChild(span4);
    li.appendChild(div1);

    var buy1 = document.createElement("button");
    var buy2 = document.createElement("button");
    var buy3 = document.createElement("button");
    buy1.className = "buy1";
    buy1.textContent = "buy1";
    buy2.className = "buy2";
    buy2.textContent = "buy2";
    buy3.className = "buy3";
    buy3.textContent = "buy3";
    buy1.id = elem._id;
    buy2.id = elem._id;
    buy3.id = elem._id;
    div2.appendChild(buy1);
    div2.appendChild(buy2);
    div2.appendChild(buy3);
    li.appendChild(div2);
    list.appendChild(li);
  });
});

list.addEventListener("click", async (e) => {
  if (
    e.target.classList.contains("buy1") ||
    e.target.classList.contains("buy2") ||
    e.target.classList.contains("buy3")
  ) {
    let buyQuantity = Number(e.target.textContent.substring(3));
    let id = e.target.id;
    console.log(buyQuantity);
    let itemData = e.target.parentElement.parentElement.firstElementChild;
    console.log(itemData);
    let itemName = itemData.getElementsByTagName("span")[0].textContent;
    let itemDesc = itemData.getElementsByTagName("span")[1].textContent;
    let itemPrice = itemData.getElementsByTagName("span")[2].textContent;
    let itemQuantity = itemData.getElementsByTagName("span")[3].textContent;
    console.log(itemName);
    console.log(itemDesc);
    console.log(itemPrice);
    console.log(itemQuantity);
    console.log(buyQuantity);

    if (buyQuantity > itemQuantity && itemQuantity != 0) {
      alert("buy quantity is greater than the available");
    } else if (itemQuantity > 0) {
      var data = {
        name: itemName,
        desc: itemDesc,
        price: itemPrice,
        qty: itemQuantity - buyQuantity,
      };

      await axios.put(
        `https://crudcrud.com/api/5acd443d6ef54ec3bb6ce76626383c4e/storeData/${id}`,
        data
      );
      itemData.getElementsByTagName("span")[3].textContent = data.qty;
    }
    // console.log(data);
    if (itemQuantity == 0) {
      alert("Out Of Stock");
    }
  }
});
