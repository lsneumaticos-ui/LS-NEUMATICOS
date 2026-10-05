/**
 * Estructura estandarizada para llantas originales Fiat Cronos.
 * Los datos no confirmados se mantienen nulos para evitar inventarlos.
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
  description: datos.description ?? datos.descripcion ?? "Llanta original Fiat Cronos.",
  imagen: datos.imagen ?? null,
  fuenteVerificacion: datos.fuenteVerificacion ?? null,
  estadoVerificacion: datos.estadoVerificacion ?? "Pendiente",
  price: datos.price ?? 0
 };
}

// Primera llanta aportada por LS Neumáticos.
// La imagen es la fotografía del usuario. La equivalencia exacta de diseño/año se mantiene separada
// de los datos técnicos publicados por fuentes externas para no presentar una coincidencia visual como certeza.
const cronosLlanta01 = crearLlantaCronos({
 id:101,
 name:"Llanta original Fiat Cronos — Diseño 01",
 anios:null,
 version:null,
 rodado:"15",
 acabado:"Gris plata / Gris Visón",
 oem:"100275508",
 ancho:"6.0J",
 et:"ET40",
 pcd:"4x98",
 centroMaza:"58.1 mm",
 neumaticoMedida:"185/60 R15",
 descripcion:"Llanta de aleación original Fiat Cronos. Diseño 01 según imagen aportada por LS Neumáticos, disponible en gris plata y gris visón. La identificación exacta por año/versión queda pendiente de coincidencia visual final.",
 description:"Llanta de aleación original Fiat Cronos. Diseño 01 según imagen aportada por LS Neumáticos, disponible en gris plata y gris visón. La identificación exacta por año/versión queda pendiente de coincidencia visual final.",
 imagen:"images/llantas-cronos/cronos-diseno-01.webp",
 fuenteVerificacion:"Fuentes de repuestos FIAT/MOPAR y registros de homologación consultados (OEM 100275508; 15 x 6; ET40; 4x98). Coincidencia visual del diseño: pendiente.",
 estadoVerificacion:"Pendiente",
 price:0
});

const defaultProducts = [
 {id:1,name:"Neumático 175/65 R14",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:2,name:"Neumático 185/65 R15",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:3,name:"Neumático 195/65 R15",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:4,name:"Neumático 205/55 R16",brand:"Multimarca",category:"Neumáticos",price:0,description:"Consultar disponibilidad y precio."},
 {id:5,name:"Rueda de auxilio para vehículos chinos",brand:"LS Neumáticos",category:"Ruedas de auxilio",price:0,description:"Opciones para BYD, Haval, Link & Co y otros modelos. Consultar compatibilidad."},
 {id:6,name:"Rueda de auxilio temporal",brand:"LS Neumáticos",category:"Ruedas de auxilio",price:0,description:"Consultar medida y compatibilidad."},
 cronosLlanta01
];