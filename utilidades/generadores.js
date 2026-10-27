const NOMBRES = ['Brandon', 'Laura', 'Carlos', 'Valentina', 'Andrés', 'Camila'];
const APELLIDOS = ['Lizcano', 'Gómez', 'Rodríguez', 'Martínez', 'Herrera', 'Castro'];

export function elementoAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

export function numeroAleatorio(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

export function generarDatosCheckout() {
  return {
    nombre: elementoAleatorio(NOMBRES),
    apellido: elementoAleatorio(APELLIDOS),
    codigoPostal: String(numeroAleatorio(10000, 99999)),
  };
}

// Fecha en formato AAAA-MM-DD sumando días a hoy
export function fechaDentroDeDias(dias) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().slice(0, 10);
}

export function generarReserva() {
  const diasHastaEntrada = numeroAleatorio(10, 60);
  return {
    firstname: elementoAleatorio(NOMBRES),
    lastname: elementoAleatorio(APELLIDOS),
    totalprice: numeroAleatorio(50, 500),
    depositpaid: true,
    bookingdates: {
      checkin: fechaDentroDeDias(diasHastaEntrada),
      checkout: fechaDentroDeDias(diasHastaEntrada + numeroAleatorio(1, 7)),
    },
    additionalneeds: 'Breakfast',
  };
}
