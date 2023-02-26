const divResultat = document.querySelector('#resultat');
const spanScore = document.querySelector('#score');
const scoreFinal = document.querySelector('#scoreFinal');
const overlay = document.querySelector('.overlay');
const rejouer = document.querySelector('#rejouer');

rejouer.addEventListener('click', () => {
    window.location.reload();
});

var tabJeu = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

var tabResultat = genereTableauAleatoire();

var oldSelection = [];
var nbAffiche = 0;
var ready = true;

/* test */
var cartFind = 0;
var essai = 0;

afficherTableau();

function afficherTableau() {
    if (cartFind === 8) {
        overlay.classList.add('active');
        scoreFinal.innerHTML = "Vous venez de gagner la partie en " + essai + " coups";
    }
    var txt = ''

    for(var i=0; i < tabJeu.length; i++) {
        txt += "<div>";
        for(var j = 0; j < tabJeu[i].length; j++) {
            if (tabJeu[i][j] === 0) {
                txt += "<button class='btn btn-primary m-2' style='width:100px; height:100px' onClick='verif(\""+i+"-"+j+"\")'>Afficher</button>";
            } else {
                txt += "<img src='"+getImage(tabJeu[i][j])+"' style='width:100px;height:100px;margin:10px;border-radius:10px'>"
            }
        }
        txt += "</div>";
    }

    divResultat.innerHTML = txt;
}

function getImage(valeur) {
    var imgTxt = 'images/';
    var ext = '.png';
    switch (valeur) {
        case 1 : imgTxt += "messi" + ext
        break;
        case 2 : imgTxt += "mbappe" + ext
        break;
        case 3 : imgTxt += "griezmann" + ext
        break;
        case 4 : imgTxt += "tchouameni" + ext
        break;
        case 5 : imgTxt += "giroud" + ext
        break;
        case 6 : imgTxt += "lloris" + ext
        break;
        case 7 : imgTxt += "ronaldo" + ext
        break;
        case 8 : imgTxt += "upamecano" + ext
        break;
        default: console.log('toto')
    }
    return imgTxt
}

function verif(bouton) {
    if (ready) {
        // console.log('ready')
        nbAffiche++;

        var ligne = bouton.substr(0,1);
        var colonne = bouton.substr(2,1)

        tabJeu[ligne][colonne] = tabResultat[ligne][colonne];
        afficherTableau();

        if(nbAffiche > 1) {
            essai++;
            if (essai > 0) {
                spanScore.innerHTML = "Nombre d'essai : " + essai;
            }
            ready = false;
            setTimeout(() => {
                if (tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]) {
                    // console.log('pas la meme image')
                    tabJeu[ligne][colonne] = 0;
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                } else {
                    // console.log('bonne paire de trouvée')
                    cartFind++;
                }
                console.log(cartFind)
                afficherTableau()
                ready = true
                nbAffiche = 0;
                oldSelection = [ligne, colonne];
            }, 500)
        } else {
            oldSelection = [ligne, colonne];
        }
    }
}

function genereTableauAleatoire() {
    var tab = [];
    var nbImagePosition = [0,0,0,0,0,0,0,0];

    for (var i = 0; i < 4; i++) {
        var ligne = [];

        for (var j = 0; j < 4; j++) {
            var fin = false;
            while(!fin) {
                var randomImage = Math.floor(Math.random() * 8);
                if (nbImagePosition[randomImage] < 2) {
                    ligne.push(randomImage+1);
                    nbImagePosition[randomImage]++;
                    fin = true;
                }
            }
        }
        tab.push(ligne);
    }
    
    return tab;
}