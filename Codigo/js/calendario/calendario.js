let mesesDelAno = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let eventos = [
    { date: new Date(2024, 4, 27), title: 'Examen de Programación' },
    { date: new Date(2024, 5, 6), title: 'Examen de Sistema Informática' },
    { date: new Date(2024, 5, 10), title: 'Presentación del Trabajo Final' }
];

let fechaHoy = new Date();
let diaHoy = fechaHoy.getDate();
let mesHoy = fechaHoy.getMonth();
let anoHoy = fechaHoy.getFullYear();

let fechaActual = new Date();
let diaActual = fechaActual.getDate();
let mesActual = fechaActual.getMonth();
let anoActual = fechaActual.getFullYear();

let elementosDias = document.getElementById('dias_mes');
let elementoMes = document.getElementById('mes');
let elementoAno = document.getElementById('ano');
let botonMesAnterior = document.getElementById('anterior');
let botonMesProximo = document.getElementById('proximo');

elementoMes.textContent = mesesDelAno[mesHoy];
elementoAno.textContent = anoHoy;
escribirDias(mesHoy);

botonMesAnterior.addEventListener('click', () => mesAnterior());
botonMesProximo.addEventListener('click', () => mesProximo());

function escribirDias(mes) {
    elementosDias.innerHTML = ''; 
    for (let i = primerDiaDelMes(); i > 0; i--) {
        if (mes > 0) {
            elementosDias.innerHTML += `<li class="dia_item dias_finales">${diasEnMes(mes - 1) - (i - 1)}</li>`;
        } else {
            elementosDias.innerHTML += `<li class="dia_item dias_finales">${diasEnMes(11) - (i - 1)}</li>`;
        }
    }
    for (let i = 1; i <= diasEnMes(mes); i++) {
        let diaClase = "dia_item";
        let diaContenido = i;

        if (i === diaActual && mesHoy === mesActual && anoHoy === anoActual) {
            diaClase += " dia_actual"; 
        } else {
            for (let k = 0; k < eventos.length; k++) {
                if (eventos[k].date.getFullYear() == anoHoy &&
                    eventos[k].date.getMonth() == mesHoy &&
                    eventos[k].date.getDate() == i) {
                    diaClase += " dia_evento";
                    break;
                }
            }
        }
        
        elementosDias.innerHTML += `<li class="${diaClase}" data-dia="${i}">${diaContenido}</li>`;
    }

    manejarEventos();
}

function manejarEventos() {
    document.querySelectorAll('.dia_evento').forEach(el => {
        el.addEventListener('click', evento => {
            let dia = evento.target.dataset.dia;
            let eventoEncontrado = eventos.find(ev => ev.date.getDate() == dia);
            if (eventoEncontrado) {
                alert(`Evento: ${eventoEncontrado.title}`);
            }
        });
    });
}

function diasEnMes(mes) {
    if (mes === 0 || mes === 2 || mes === 4 || mes === 6 || mes === 7 || mes === 9 || mes === 11) {
        return 31;
    } else if (mes === 3 || mes === 5 || mes === 8 || mes === 10) {
        return 30;
    } else {
        return esAnoBisiesto() ? 29 : 28;
    }
}

function esAnoBisiesto() {
    return (anoHoy % 4 === 0 && anoHoy % 100 !== 0) || anoHoy % 400 === 0;
}

function primerDiaDelMes() {
    let primerDia = new Date(anoHoy, mesHoy, 1);
    return (primerDia.getDay() - 1 + 7) % 7;
}

function mesAnterior() {
    if (mesHoy > 0) {
        mesHoy--;
    } else {
        anoHoy--;
        mesHoy = 11;
    }
    actualizarFecha();
}

function mesProximo() {
    if (mesHoy < 11) {
        mesHoy++;
    } else {
        anoHoy++;
        mesHoy = 0;
    }
    actualizarFecha();
}

function actualizarFecha() {
    elementoMes.textContent = mesesDelAno[mesHoy];
    elementoAno.textContent = anoHoy.toString();
    elementosDias.textContent = '';
    escribirDias(mesHoy);
}
