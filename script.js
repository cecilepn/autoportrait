var analogiesContainer = document.getElementById('analogies-container')

function ajouteAnalogie(analogy) {
    var sectionElement = document.createElement('section')
    sectionElement.setAttribute('class', 'section')

    var descriptionElement = document.createElement('p')
    var imgElement = document.createElement('img')
    var titleElement = document.createElement('h2')
    var lienElement = document.createElement('a')

    descriptionElement.innerHTML = analogy.description
    imgElement.setAttribute('src', analogy.img)
    imgElement.setAttribute('class', 'filter')
    descriptionElement.setAttribute('class', 'description')

    titleElement.innerHTML = '<span class="phrase">' + "Si j'étais " + '</span>' + '<span class="stylized-title">' + analogy.analogie + '</span>' + ',' + '<span class="phrase">' + " je serais " + '</span>' + '<span class="stylized-valor">' + analogy.valeurAnalogie + '</span>'

    sectionElement.appendChild(imgElement)
    sectionElement.appendChild(titleElement)
    sectionElement.appendChild(descriptionElement)
    sectionElement.appendChild(lienElement)

    analogiesContainer.appendChild(sectionElement)

}

//sélection des données du tableau dans data.json 

fetch('data.json').then(function (response) {
    response.json().then(function (data) {
        data.analogies.forEach(function (analogy) {
            ajouteAnalogie(analogy)

        })

    })
})


// Fond animé (codepen)

document.querySelector('.heading').addEventListener("pointermove", (e) => {
    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();

    el.style.setProperty('--posX', x - l - w / 2);
    el.style.setProperty('--posY', y - t - h / 2);
})


// pop up 

var popupBtn = document.querySelector(".pop-up-button")
var popupMentionLegales = document.querySelector(".pop-up")
var popupCloseBtn = document.querySelector('.close-pop-up')

popupBtn.addEventListener('click', onPopupBtnClick)
popupCloseBtn.addEventListener('click', onClosePopup)

function onPopupBtnClick(event) {
    popupMentionLegales.classList.add('pop-up-visible')
}

function onClosePopup(event) {
    popupMentionLegales.classList.remove('pop-up-visible')
}



// //API

fetch("http://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=cecile.phan-nguyen&courriel=" + document.getElementById("mail").value + "&message=Si j'étais " + document.getElementById("analogie").value + ",je serais " + document.getElementById("valeurAnalogie").value + "Parce que " + document.getElementById("argAnalogie").value).then(function (response) {
    response.json().then(function (data) {
        if (data.status == "success") {
            document.getElementById("verPerso").innerHTML = "Votre message a bien été reçu";
        } else {
            document.getElementById("verPerso").innerHTML = "Problème : votre message n'a pas été reçu";
        }
    })
})
//création d'une section quand on clique sur un button 

document.getElementById('formulaire').addEventListener('submit', function (event) {
    // ne pas recharger la page quand on envoie le formulaire
    event.preventDefault();

    var userAnalogy = {
        analogie: document.getElementById("analogie").value,
        valeurAnalogie: document.getElementById("valeurAnalogie").value,
        description: document.getElementById("argAnalogie").value,
        img: document.getElementById("imgAnalogie").value
    }
    ajouteAnalogie(userAnalogy)

})