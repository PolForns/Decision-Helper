var defaultTitol = 'Decision Helper';
var idioma = 0;

// CARREGA LES LLISTES DEL LOCALSTORAGE
function load (lang) {
	idioma = lang;
	var titol = localStorage.getItem("titol");
	var arrMotiusFavor = JSON.parse(localStorage.getItem("motiusFavorLocal"));
	var arrMotiusContra = JSON.parse(localStorage.getItem("motiusContraLocal"));
	localStorage.setItem('idioma', idioma);

	if (titol) {
		$('.titol').html(titol);
		$('.formTitol').addClass('hidden');
		$('.formularis').removeClass('hidden');
	} else {
		$(".titol").html(defaultTitol);
		$('.inputTitol').val('');
		$('.formTitol').removeClass('hidden');
		$('.formularis').addClass('hidden');
	}

	$('.h1Titol').hover(
		function () {
			$('.editTitelIcon').removeClass('noVisible');
		}, function () {
			$('.editTitelIcon').addClass('noVisible');
		}
	);

	$('.llistaElements').hover(
		function () {
			$('.eliminarMotiusIcona').removeClass('noVisible');
		}, function () {
			$('.eliminarMotiusIcona').addClass('noVisible');
		}
	);


	if (!arrMotiusFavor && !arrMotiusContra) {
		$('.llista').addClass('hidden');
		$('.resultats').addClass('hidden');
		$('.botoResultats').addClass('hidden');
	} else {
		llistes(3);
	}

	listeners();
}

// QUANT CARREGA LA PAGINA ELS LISTENERS S'ACTIVEN A LA ESPERA D'UN INPUT
function listeners () {
	var rangeFavor = document.getElementById('rangeFavor');
	var numberFavor = document.getElementById('valorMotiuFavor');
	var rangeContra = document.getElementById('rangeContra');
	var numberContra = document.getElementById('valorMotiuContra');

	rangeFavor.addEventListener("input", function() {
	    numberFavor.value = rangeFavor.value;
	}, false);

	numberFavor.addEventListener("input", function() {
	    rangeFavor.value = numberFavor.value;
	}, false);

	rangeContra.addEventListener("input", function() {
	    numberContra.value = rangeContra.value;
	}, false);

	numberContra.addEventListener("input", function() {
	    rangeContra.value = numberContra.value;
	}, false);

	var inputTitol = document.getElementById('inputTitol');
	var titol = document.getElementById('titol');

	inputTitol.addEventListener("input", function() {
		if (inputTitol.value) {
			titol.innerHTML = inputTitol.value;
		} else {
			titol.innerHTML = defaultTitol;
		}
	}, false);
}

// SI NO HI HA TITOL ESTABLERT, AGAFA EL QUE L'USUARI LI DONA I L'APLICA.
function titol () {
	var titol = $('.inputTitol').val();

	if (titol === '' || titol === ' ') {
		$('.titol').html(defaultTitol);
	} else {
		$('.titol').html(titol);

		localStorage.setItem("titol", titol);

		$('.formTitol').addClass('hidden');
		$('.formularis').removeClass('hidden');
	}
}

// EDITA EL TITOL
function editTitol () {
	var titol = $('.titol').val();

	$('.inputTitol').val(titol); // NO FUNCIONA, ¿?
	$('.formTitol').removeClass('hidden');
}

// ACTIVACIO DELS FORMULARIS SEGONS EL BOTO QUE ES CLICKA
function formularis (f) {
	$('.botonsMotius').addClass('hidden');

	if (f == 1) {
		$('.formFavor').removeClass('hidden');
		$('.formContra').addClass('hidden');			
	} else {
		$('.formContra').removeClass('hidden');
		$('.formFavor').addClass('hidden');
	}
}

// REP ELS MOTIUS DELS FORMULARIS I ELS PUJA AL LOCALSTORAGE
function motius (m) {
	if (localStorage.getItem("valor")) {
		valorTotal = parseInt(localStorage.getItem("valor"));
	} else {
		var valorTotal = 0;
	}
	
	if (m == 1) {
		var motiu = $('.textMotiuFavor').val();
		var valor = parseInt($('.valorMotiuFavor').val());

		valorTotal = valorTotal + valor;

		var motiusFavor = {
			[motiu]: valor
		};

		var arrMotiusFavor = JSON.parse(localStorage.getItem("motiusFavorLocal"));

		if (!arrMotiusFavor) {
			var arrMotiusFavor = [];
		}

		arrMotiusFavor.push(motiusFavor);

		localStorage.setItem("motiusFavorLocal", JSON.stringify(arrMotiusFavor));

	} else if (m == 2) {
		var motiu = $('.textMotiuContra').val();
		var valor = parseInt($('.valorMotiuContra').val());

		valorTotal = valorTotal - valor;
		var motiusContra = {
			[motiu]: valor
		};

		var arrMotiusContra = JSON.parse(localStorage.getItem("motiusContraLocal"));

		if (!arrMotiusContra) {
			var arrMotiusContra = [];
		}

		arrMotiusContra.push(motiusContra);

		localStorage.setItem("motiusContraLocal", JSON.stringify(arrMotiusContra));

	}

	llistes(m);
}

// CARREGA L'ULTIM MOTIU DEL LOCALSTORAGE
function llistes (mot) {
	var arrMotiusFavor = JSON.parse(localStorage.getItem("motiusFavorLocal"));
	var arrMotiusContra = JSON.parse(localStorage.getItem("motiusContraLocal"));

	$('.elementsLlistaFavor').html('');
	$('.elementsLlistaContra').html('');
	$('.botoResultats').removeClass('hidden');

	if (arrMotiusFavor) {
		for (var m in arrMotiusFavor) {
			var motiu = Object.keys(arrMotiusFavor[m])[0];
			var element = $('<li />', {"class": 'elementsLlista', "data-content": motiu})
			var text = $('<span />', {"class": 'textLlistaFavor'}).text(motiu);
			var botoDelete = $('<span />', {"class": 'fas fa-times eliminarMotiusIcona noVisible', "onclick": 'eliminarMotiu("' + motiu + '")'});

			element.append(text);
			element.append(botoDelete)
			$('.elementsLlistaFavor').append(element);
		}
	}

	if (arrMotiusContra) {
		for (var m in arrMotiusContra) {
			var motiu = Object.keys(arrMotiusContra[m])[0];
			var element = $('<li />', {"class": 'elementsLlista' ,"data-content": motiu});
			var text = $('<span />', {"class": 'textLlistaContra'}).text(motiu);
			var botoDelete = $('<span />', {"class": 'fas fa-times eliminarMotiusIcona noVisible', "onclick": 'eliminarMotiu("' + motiu + '")'});
			element.append(text);
			element.append(botoDelete);
			$('.elementsLlistaContra').append(element);
		}
	}

	$('.llista').removeClass('hidden');

	reset(mot);
}

// ELIMINAR MOTIU
function eliminarMotiu (mot) {
	var arrMotiusFavorOriginal = JSON.parse(localStorage.getItem("motiusFavorLocal"));
	var arrMotiusContraOriginal = JSON.parse(localStorage.getItem("motiusContraLocal"));

	var arrMotiusFavor = [];
	var arrMotiusContra = [];

	if (localStorage.getItem("valor")) {
		valorTotal = parseInt(localStorage.getItem("valor"));
	} else {
		var valorTotal = 0;
	}

	for (var m in arrMotiusFavorOriginal) {
		if (Object.keys(arrMotiusFavorOriginal[m])[0] === mot) {
			localStorage.removeItem('motiusFavorLocal');

			for (var n in arrMotiusFavorOriginal) {
				if(Object.keys(arrMotiusFavorOriginal[n])[0] != mot) {

					var motiu = Object.keys(arrMotiusFavorOriginal[n])[0];
					var valor = Object.values(arrMotiusFavorOriginal[n])[0];

					valorTotal = valorTotal + valor;

					var motiusFavor = {
						[motiu]: valor
					};

					arrMotiusFavor.push(motiusFavor);

					localStorage.setItem("motiusFavorLocal", JSON.stringify(arrMotiusFavor));

				}
			}
		}
	}

	for (var m in arrMotiusContraOriginal) {
		if (Object.keys(arrMotiusContraOriginal[m])[0] === mot) {
			localStorage.removeItem('motiusContraLocal');

			for (var n in arrMotiusContraOriginal) {
				if(Object.keys(arrMotiusContraOriginal[n])[0] != mot) {

					var motiu = Object.keys(arrMotiusContraOriginal[n])[0];
					var valor = Object.values(arrMotiusContraOriginal[n])[0];

					valorTotal = valorTotal + valor;

					var motiusContra = {
						[motiu]: valor
					};

					arrMotiusContra.push(motiusContra);

					localStorage.setItem("motiusContraLocal", JSON.stringify(arrMotiusContra));

				}
			}
			//break
		}
	}

	llistes(3);
}

// RESET DELS BOTONS I FORMULARIS
function reset (mot) {
	if (mot == 1) {
		$('.textMotiuFavor').val('');
		$('.rangeFavor').val(0);
		$('.valorMotiuFavor').val(0);
		$('.formFavor').addClass('hidden');
	} else if (mot === 2) {
		$('.textMotiuContra').val('');
		$('.rangeContra').val(0);
		$('.valorMotiuContra').val(0);
		$('.formContra').addClass('hidden');
	} else {
		$('.textMotiuFavor').val('');
		$('.rangeFavor').val(0);
		$('.valorMotiuFavor').val(0);
		$('.formFavor').addClass('hidden');

		$('.textMotiuContra').val('');
		$('.rangeContra').val(0);
		$('.valorMotiuContra').val(0);
		$('.formContra').addClass('hidden');
	}

	$('.botonsMotius').removeClass('hidden');
}

// CALCULA I APLICA EL RESULTAT
function resultat (val) {
   var $fesONO = $('.fesoONO');

	if (val == 1) {
		$('.resultats').removeClass('hidden');
		$('.mainContainer').addClass('hidden');
	} else {
		$('.mainContainer').removeClass('hidden');
		$('.resultats').addClass('hidden');
		$fesONO.html('');
	}

	var valorFavor = 0;
	var valorContra = 0;
	var valorCasi = 0;
	var valorTotal;
	var arrMotiusFavor = JSON.parse(localStorage.getItem("motiusFavorLocal"));
	var arrMotiusContra = JSON.parse(localStorage.getItem("motiusContraLocal"));

	if (arrMotiusFavor) {
		for (var m in arrMotiusFavor) {
			valorFavor = valorFavor + parseInt(Object.values(arrMotiusFavor[m])[0]);
		}
	}
	if (arrMotiusContra) {
		for (var m in arrMotiusContra) {
			valorContra = valorContra + parseInt(Object.values(arrMotiusContra[m])[0]);
		}
	}

	valorTotal = valorFavor - valorContra;
	valorCasi = (valorFavor + valorContra) / 10;

	loadJSON(function(response) {
    var actual_JSON = JSON.parse(response);
    $fesONO.removeClass('fesSi fesNo fesCasiSi fesCasiNo fesNose');

    if (valorTotal > valorCasi) {
			var numFrases = actual_JSON[idioma].frasesFinals.si.length;
    	var fraseActual = actual_JSON[idioma].frasesFinals.si[parseInt(Math.random() * numFrases)];
    	$fesONO.addClass('fesSi');
    	$fesONO.html(fraseActual);
		} else if (valorTotal < -valorCasi) {
			var numFrases = actual_JSON[idioma].frasesFinals.no.length;
    	var fraseActual = actual_JSON[idioma].frasesFinals.no[parseInt(Math.random() * numFrases)];
    	$fesONO.addClass('fesNo');
    	$fesONO.html(fraseActual);
		} else if (valorTotal > 0 && valorTotal <= valorCasi) {
			var numFrases = actual_JSON[idioma].frasesFinals.casiSi.length;
    	var fraseActual = actual_JSON[idioma].frasesFinals.casiSi[parseInt(Math.random() * numFrases)];
    	$fesONO.addClass('fesCasiSi');
    	$fesONO.html(fraseActual);
		} else if (valorTotal < 0 && valorTotal >= -valorCasi) {
			var numFrases = actual_JSON[idioma].frasesFinals.casiNo.length;
    	var fraseActual = actual_JSON[idioma].frasesFinals.casiNo[parseInt(Math.random() * numFrases)];
    	$fesONO.addClass('fesCasiNo');
    	$fesONO.html(fraseActual);
		} else {
			var numFrases = actual_JSON[idioma].frasesFinals.empat.length;
    	var fraseActual = actual_JSON[idioma].frasesFinals.empat[parseInt(Math.random() * numFrases)];
    	$fesONO.addClass('fesNose');
    	$fesONO.html(fraseActual);
		}

	});

}

// ACTIVA I DESACTIVA EL POPUP D'INFO
function menu (i) {
	if (i == 1) {
		
		loadJSON(function(response) {
	    var actual_JSON = JSON.parse(response);
	    var numFrases = actual_JSON[idioma].frasesInfo.length;
	    var fraseActual = actual_JSON[idioma].frasesInfo[parseInt(Math.random() * numFrases)];
	    $('.fraseText').html(fraseActual);
		});
		$('.botoMenu').addClass('hidden');
		$('.menu').removeClass('hidden');

	} else {
		$('.menu').addClass('hidden');
		$('.botoMenu').removeClass('hidden');
		$('.fraseText').html('');
	}
}

// CARREGAR JSON FRASES
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'content.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

// RESET DE LES DADES
function resetStorage () {
	localStorage.clear();
	$('titol').val('Decision Helper');
	load ();
}