let products = JSON.parse(localStorage.getItem("ls_products") || "null") || defaultProducts;
let cart = JSON.parse(localStorage.getItem("ls_cart") || "[]");
let selectedCategory = "Todos";

function money(n){ return n ? "$" + Number(n).toLocaleString("es-AR") : "A consultar"; }
function escHtml(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}
function renderChips(){
 const cats=["Todos",...new Set(products.map(p=>p.category))];
 document.getElementById("chips").innerHTML=cats.map(c=>`<button class="chip ${c===selectedCategory?"active":""}" onclick="selectedCategory='${String(c).replaceAll("'","\\'")}';renderChips();renderProducts()">${escHtml(c)}</button>`).join("");
}
function renderProducts(){
 const q=(document.getElementById("search")?.value||"").toLowerCase().trim();
 const list=products.filter(p=>{
  if(selectedCategory!=="Todos"&&p.category!==selectedCategory) return false;
  if(!q) return true;
  const searchText=[
   p.name,p.brand,p.marca,p.modelo,p.version,p.rodado,p.anios,p.acabado,
   p.oem,p.pcd,p.et,p.neumaticoMedida,p.neumaticoModelo,p.category
  ].filter(Boolean).join(" ").toLowerCase();
  return searchText.includes(q);
 });
 document.getElementById("products").innerHTML=list.map(p=>{
  const img=p.imagen||p.image;
  const imageHtml=img
   ? `<img src="${escHtml(img)}" alt="${escHtml(p.name)}" class="product-photo" loading="lazy" onerror="this.onerror=null;this.parentElement.classList.remove('has-image');this.parentElement.innerHTML='<span class="fallback-mark">LS</span>';">`
   : '<span class="fallback-mark">LS</span>';
  const badges=[];
  if(p.rodado) badges.push(`<span class="spec-pill rodado">R${escHtml(p.rodado)}</span>`);
  if(p.version) badges.push(`<span class="spec-pill version">${escHtml(p.version)}</span>`);
  if(p.anios) badges.push(`<span class="spec-pill anios">${escHtml(p.anios)}</span>`);
  if(p.estadoVerificacion==="Confirmado") badges.push('<span class="spec-pill verif-ok">✓ Verificado</span>');
  const tech=[];
  if(p.rodado) tech.push(["Rodado",p.rodado]);
  if(p.oem) tech.push(["OEM",p.oem]);
  if(p.ancho) tech.push(["Ancho",p.ancho]);
  if(p.et) tech.push(["ET",p.et]);
  if(p.pcd) tech.push(["PCD",p.pcd]);
  if(p.centroMaza) tech.push(["Centro de maza",p.centroMaza]);
  if(p.neumaticoMedida) tech.push(["Neumático",p.neumaticoMedida]);
  if(p.neumaticoModelo) tech.push(["Modelo neumático",p.neumaticoModelo]);
  const techBlock=tech.length
   ? `<details class="tech-details"><summary>Ver ficha técnica</summary><div class="tech-grid">${tech.map(([k,v])=>`<div><b>${escHtml(k)}</b><span>${escHtml(v)}</span></div>`).join("")}</div>${p.fuenteVerificacion?`<small class="tech-source">Fuente: ${escHtml(p.fuenteVerificacion)}</small>`:""}</details>`
   : "";
  return `<article class="product">
   <div class="product-img ${img?"has-image":""}">${imageHtml}</div>
   <div class="product-body">
    <span class="tag">${escHtml(p.category)}</span>
    <h3>${escHtml(p.name)}</h3>
    ${badges.length?`<div class="product-tags">${badges.join("")}</div>`:""}
    <p>${escHtml(p.description||"")}</p>
    ${techBlock}
    <div class="price">${money(p.price)}</div>
    <small>Stock: A consultar</small>
    <button class="btn dark full" onclick="addToCart(${Number(p.id)})">Agregar al carrito</button>
   </div>
  </article>`;
 }).join("") || '<div class="empty">No encontramos productos con esa búsqueda.</div>';
}
function addToCart(id){const p=products.find(x=>x.id===id); if(!p)return; cart.push({...p,qty:1}); saveCart(); openCart();}
function saveCart(){localStorage.setItem("ls_cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length;}
function openCart(){document.getElementById("cartModal").classList.add("show");renderCart();}
function closeCart(){document.getElementById("cartModal").classList.remove("show");}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p>Tu carrito está vacío.</p>";document.getElementById("cartTotal").textContent="$0";return;}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${escHtml(p.name)}</span><b>${money(p.price)}</b><button onclick="cart.splice(${i},1);saveCart();renderCart()">×</button></div>`).join("");
 const total=cart.reduce((s,p)=>s+(Number(p.price)||0),0);document.getElementById("cartTotal").textContent=total?money(total):"A consultar";
}
function checkoutWhatsApp(){
 if(!cart.length)return;
 const lines=cart.map(p=>`- ${p.name} | ${money(p.price)} | Stock: A consultar`).join("%0A");
 const msg=`Hola LS Neumáticos, quiero consultar/pedir:%0A${lines}%0A%0A¿Me confirman disponibilidad, precio final y envío?`;
 window.open("https://wa.me/541132598895?text="+msg,"_blank");
}
saveCart();renderChips();renderProducts();