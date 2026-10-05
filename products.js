/**
 * Estructura preparada para futuras llantas originales Fiat Cronos.
 * No contiene todavía ninguna llanta Cronos en el catálogo activo.
 */
function crearLlantaCronos(datos={}){
 return {
  id: datos.id ?? null,
  name: datos.name ?? "Llanta Fiat Cronos",
  brand: "Fiat",
  category: "Llantas Fiat Cronos",
  model: "Cronos",
  marca: "Fiat",
  modelo: "Cronos",
  anios: datos.anios ?? null,
  version: datos.version ?? null,
  rodado: datos.rodado ?? null,
  acabado: datos.acabado ?? null,
  oem: datos.oem ?? null,
  ancho: datos.ancho ?? null,
  et: datos.et ?? null,
  pcd: datos.pcd ?? null,
  centroMaza: datos.centroMaza ?? null,
  neumaticoMedida: datos.neumaticoMedida ?? null,
  neumaticoModelo: datos.neumaticoModelo ?? null,
  descripcion: datos.descripcion ?? "Llanta original Fiat Cronos.",
  imagen: datos.imagen ?? null,
  fuenteVerificacion: datos.fuenteVerificacion ?? null,
  estadoVerificacion: datos.estadoVerificacion ?? "Pendiente",
  price: datos.price ?? 0
 };
}

const defaultProducts = [
 {id:1,name:"Neumático 175/65 R14",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:2,name:"Neumático 185/65 R15",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:3,name:"Neumático 195/65 R15",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:4,name:"Neumático 205/55 R16",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:5,name:"Rueda de auxilio para vehículos chinos",brand:"LS Neumáticos",category:"Ruedas de auxilio",price:0,description:"Opciones para BYD, Haval, Link & Co y otros modelos. Consultar compatibilidad."},
 {id:6,name:"Rueda de auxilio temporal",brand:"LS Neumáticos",category:"Ruedas de auxilio",price:0,description:"Consultar medida y compatibilidad."}
];