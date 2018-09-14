require('babel-polyfill')

let display_horas    = document.getElementById('display_horas')
let display_minutos  = document.getElementById('display_minutos')
let display_segundos = document.getElementById('display_segundos')
let playStop = document.getElementById('playStop')
let botonReset = document.getElementById('botonReset')
var confirmarReset = document.getElementById('confirmarReset')
let botonConfirmar = document.getElementById('botonConfirmar')
let botonDescartar = document.getElementById('botonDescartar')

localStorage.setItem('estado', 'stop')


if(localStorage.getItem('total') == null) // Si nunca se ha ejecutado el programa, dale el valor de 0
{
	localStorage.setItem('total', 0)

	display_horas.innerHTML    = '0'
	display_minutos.innerHTML  = '0'
	display_segundos.innerHTML = '0'
}




function iniciar()
{
	let pausa = setTimeout(function()
	{
		// Recoge la cifra, le incrementa 1 y la guarda de nuevo
		// ============================================================
		   let total_segundos = parseInt(localStorage.getItem('total'))
		   let incremento = total_segundos + 1
		   localStorage.setItem('total', incremento)
		// ============================================================

		calcular()


		if(localStorage.getItem('estado') == 'play')
		iniciar()

		if(localStorage.getItem('estado') == 'stop')
		clearTimeout(pausa)

	}, 1000)
}




playStop.addEventListener('click', function()
{
	if(localStorage.getItem('estado') == 'stop')
	{
		localStorage.setItem('estado', 'play')
		ponerClases()
		iniciar()
	}
	else
	{
		localStorage.setItem('estado', 'stop')
		quitarClases()
		iniciar()
	}
})




function ponerClases()
{
	playStop.children[0].classList.add('iconPause__line--1')
	playStop.children[1].classList.add('iconPause__line--2')
	playStop.children[2].classList.add('iconPause__line--3')
}


function quitarClases()
{
	playStop.children[0].classList.remove('iconPause__line--1')
	playStop.children[1].classList.remove('iconPause__line--2')
	playStop.children[2].classList.remove('iconPause__line--3')
}





function calcular()
{
	let total_segundos  = parseInt(localStorage.getItem('total'))
	let total_horas     = total_segundos / 3600
	let total_minutos   = total_segundos / 60
	let sesentaSegundos = total_segundos - (60 * Math.trunc(total_minutos))
	let sesentaMinutos  = total_minutos - (60 * Math.trunc(total_horas))


	display_horas.innerHTML    = Math.trunc(total_horas)
	display_minutos.innerHTML  = Math.trunc(sesentaMinutos)
	display_segundos.innerHTML = sesentaSegundos
}
window.addEventListener('load', calcular)








// RESET
// =================================================================================
botonReset.addEventListener('click', function()
{
	// Fade
	// ................................................................
	   confirmarReset.style.display = 'flex'
	   setTimeout(function(){ confirmarReset.style.opacity = '1' }, 10)
	// ................................................................



	// DESCARTAR RESET
	// ================================================
	botonDescartar.addEventListener('click', function()
	{
		// Fade
		// ....................................................................
		   confirmarReset.style.opacity = '0'
		   setTimeout(function(){ confirmarReset.style.display = 'none' }, 300)
		// ....................................................................
	})


	// CONFIRMAR RESET
	// ===============================================
	botonConfirmar.addEventListener('click', resetear)



	// RESETEAR
	// ================
	function resetear()
	{
		localStorage.setItem('total', 0)
		display_horas.innerHTML    = 0
		display_minutos.innerHTML  = 0
		display_segundos.innerHTML = 0


		// Fade
		// ....................................................................
		   confirmarReset.style.opacity = '0'
		   setTimeout(function(){ confirmarReset.style.display = 'none' }, 300)
		// ....................................................................
	}
}) // =============================================================================