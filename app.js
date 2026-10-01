let products=JSON.parse(localStorage.getItem("ls_products")||"null")||defaultProducts;
let cart=JSON.parse(localStorage.getItem("ls_cart")||"[]");
let selectedCategory="Todos", searchMode="vehiculo";
const vehicleData={
 Toyota:{Corolla:["2020","2021","2022","2023","2024"],Yaris:["2018","2019","2020","2021","2022","2023"]},
 Volkswagen:{Polo:["2018","2019","2020","2021","2022","2023","2024"],Virtus:["2018","2019","2020","2021","2022","2023","2024"]},
 Ford:{Fiesta:["2015","2016","2017","2018","2019","2020"],Focus:["2015","2016","2017","2018","2019"]},
 Chevrolet:{Onix:["2020","2021","2022","2023","2024"],Cruze:["2016","2017","2018","2019","2020"]},
 BYD:{Dolphin:["2024","2025","2026"],Song:["2023","2024","2025","2026"]},
 Haval:{H6:["2021","2022","2023","2024","2025"],Jolion:["2021","2022","2023","2024","2025"]},
 "Link & Co":{01:["2023","2024","2025"],05:["2023","2024","2025"]}
};
function money(n){return n?"$"+Number(n).toLocaleString("es-AR"):"A consultar"}
function renderChips(){const cats=["Todos",...new Set(products.map(p=>p.category))];document.getElementById("chips").innerHTML=cats.map(c=>`<button class="chip ${c===selectedCategory?"active":""}" onclick="filterCategory('${c.replace(/'/g,"\\'")}')">${c}</button>`).join("")}
function filterCategory(c){selectedCategory=c;renderChips();renderProducts();document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth"})}
function renderProducts(){
 const q=(document.getElementById("search")?.value||"").toLowerCase();
 const list=products.filter(p=>(selectedCategory==="Todos"||p.category===selectedCategory)&&(`${p.name} ${p.brand} ${p.category} ${p.oem||""} ${p.description||""}`.toLowerCase().includes(q)));
 document.getElementById("products").innerHTML=list.map(p=>`<article class="product"><div class="product-img">${p.category==="Llantas originales"?"◈":p.category==="Neumáticos"?"◉":"LS"}</div><div class="product-body"><span class="tag">${p.category}</span><h3>${p.name}</h3><p>${p.description||""}</p>${p.oem!==undefined&&p.oem?`<small><b>OEM:</b> ${p.oem}</small>`:""}<div class="price">${money(p.price)}</div><small>Stock: A consultar</small><button class="btn dark full" onclick="addToCart(${p.id})">Agregar al carrito</button></div></article>`).join("")||`<div class="empty">No encontramos productos con esa búsqueda.</div>`;
}
function setSearchMode(mode,btn){searchMode=mode;document.querySelectorAll(".search-mode").forEach(x=>x.classList.add("hidden"));document.getElementById("searchMode"+mode.charAt(0).toUpperCase()+mode.slice(1)).classList.remove("hidden");document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));if(btn)btn.classList.add("active")}
function updateVehicleModels(){const b=document.getElementById("vehicleBrand").value,m=document.getElementById("vehicleModel");m.innerHTML='<option value="">Modelo</option>';document.getElementById("vehicleYear").innerHTML='<option value="">Año</option>';document.getElementById("vehicleYear").disabled=true;if(b&&vehicleData[b]){Object.keys(vehicleData[b]).forEach(x=>m.add(new Option(x,x)));m.disabled=false}else m.disabled=true}
function updateVehicleYears(){const b=document.getElementById("vehicleBrand").value,m=document.getElementById("vehicleModel").value,y=document.getElementById("vehicleYear");y.innerHTML='<option value="">Año</option>';if(b&&m&&vehicleData[b]?.[m]){vehicleData[b][m].forEach(x=>y.add(new Option(x,x)));y.disabled=false}else y.disabled=true}
function searchByVehicle(){const b=document.getElementById("vehicleBrand").value,m=document.getElementById("vehicleModel").value,y=document.getElementById("vehicleYear").value;if(!b||!m||!y){alert("Seleccioná marca, modelo y año.");return}document.getElementById("search").value=`${b} ${m} ${y}`;selectedCategory="Todos";renderChips();renderProducts();document.getElementById("catalogo").scrollIntoView({behavior:"smooth"})}
function searchBySize(){const w=document.getElementById("sizeWidth").value,p=document.getElementById("sizeProfile").value,r=document.getElementById("sizeRim").value;document.getElementById("search").value=[w,p,r].filter(Boolean).join(" ");selectedCategory="Todos";renderChips();renderProducts();document.getElementById("catalogo").scrollIntoView({behavior:"smooth"})}
function searchByOEM(){const o=document.getElementById("oemSearch").value.trim();document.getElementById("search").value=o;selectedCategory="Llantas originales";renderChips();renderProducts();document.getElementById("catalogo").scrollIntoView({behavior:"smooth"})}
function initVehicleBrands(){const s=document.getElementById("vehicleBrand");Object.keys(vehicleData).forEach(x=>s.add(new Option(x,x)))}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;cart.push({...p,qty:1});saveCart();openCart()}
function saveCart(){localStorage.setItem("ls_cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
function openCart(){document.getElementById("cartModal").classList.add("show");renderCart()}
function closeCart(){document.getElementById("cartModal").classList.remove("show")}
function renderCart(){const box=document.getElementById("cartItems");if(!cart.length){box.innerHTML="<p>Tu carrito está vacío.</p>";document.getElementById("cartTotal").textContent="$0";return}box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><b>${money(p.price)}</b><button onclick="cart.splice(${i},1);saveCart();renderCart()">×</button></div>`).join("");const total=cart.reduce((s,p)=>s+(Number(p.price)||0),0);document.getElementById("cartTotal").textContent=total?money(total):"A consultar"}
function checkoutWhatsApp(){if(!cart.length)return;const lines=cart.map(p=>`- ${p.name} | ${money(p.price)} | Stock: A consultar`).join("%0A");window.open("https://wa.me/541132598895?text="+`Hola LS Neumáticos, quiero consultar/pedir:%0A${lines}%0A%0A¿Me confirman disponibilidad, precio final y envío?`,"_blank")}
initVehicleBrands();saveCart();renderChips();renderProducts();