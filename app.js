let products = JSON.parse(localStorage.getItem("ls_products") || "null") || defaultProducts;
let cart = JSON.parse(localStorage.getItem("ls_cart") || "[]");
let selectedCategory = "Todos";

function money(n){ return n ? "$" + Number(n).toLocaleString("es-AR") : "A consultar"; }
function renderChips(){
 const cats=["Todos",...new Set(products.map(p=>p.category))];
 document.getElementById("chips").innerHTML=cats.map(c=>`<button class="chip ${c===selectedCategory?"active":""}" onclick="selectedCategory='${c.replace(/'/g,"\\'")}';renderChips();renderProducts()">${c}</button>`).join("");
}
function renderProducts(){
 const q=(document.getElementById("search")?.value||"").toLowerCase();
 const list=products.filter(p=>(selectedCategory==="Todos"||p.category===selectedCategory)&&(`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)));
 document.getElementById("products").innerHTML=list.map(p=>`
 <article class="product">
  <div class="product-img">LS</div>
  <div class="product-body"><span class="tag">${p.category}</span><h3>${p.name}</h3><p>${p.description||""}</p>
  <div class="price">${money(p.price)}</div><small>Stock: A consultar</small>
  <button class="btn dark full" onclick="addToCart(${p.id})">Agregar al carrito</button></div>
 </article>`).join("") || `<div class="empty">No encontramos productos con esa búsqueda.</div>`;
}
function addToCart(id){const p=products.find(x=>x.id===id); if(!p)return; cart.push({...p,qty:1}); saveCart(); openCart();}
function saveCart(){localStorage.setItem("ls_cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length;}
function openCart(){document.getElementById("cartModal").classList.add("show");renderCart();}
function closeCart(){document.getElementById("cartModal").classList.remove("show");}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p>Tu carrito está vacío.</p>";document.getElementById("cartTotal").textContent="$0";return;}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><b>${money(p.price)}</b><button onclick="cart.splice(${i},1);saveCart();renderCart()">×</button></div>`).join("");
 const total=cart.reduce((s,p)=>s+(Number(p.price)||0),0);document.getElementById("cartTotal").textContent=total?money(total):"A consultar";
}
function checkoutWhatsApp(){
 if(!cart.length)return;
 const lines=cart.map(p=>`- ${p.name} | ${money(p.price)} | Stock: A consultar`).join("%0A");
 const msg=`Hola LS Neumáticos, quiero consultar/pedir:%0A${lines}%0A%0A¿Me confirman disponibilidad, precio final y envío?`;
 window.open("https://wa.me/541132598895?text="+msg,"_blank");
}
saveCart();renderChips();renderProducts();