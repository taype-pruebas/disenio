function lowerCaseObject(objeto) {
  // Obtiene las claves del objeto
  var claves = Object.keys(objeto);

  // Itera sobre las claves
  claves.forEach(function (clave) {
    // Verifica si el valor es una cadena de texto
    if (typeof objeto[clave] === "string") {
      // Convierte el valor a minúsculas
      objeto[clave] = objeto[clave].toLowerCase();
    }
  });

  return objeto;
}

export default lowerCaseObject;
