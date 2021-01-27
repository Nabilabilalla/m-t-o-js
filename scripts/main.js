import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';
console.log("DEPUIS MAIN JS:" + tabJoursEnOrdre);

const CLEFAPI = 'ca8f043e7e9516958fcb7fa8d9c316d3';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);
    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner,
         veuillez l'activer. !`)
    })
}
function AppelAPI(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
       .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        // console.log(data);

        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`//math.trunc c'est pour enlever la , et tt ce qui a apres 
        localisation.innerText = resultatsAPI.timezone;//timezone : ou on ce titu la place


        // les heures, par tranche de trois, avec leur temperature.

        let heureActuelle = new Date().getHours();//avoir l'heure actuelle

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;
            //pour passer a autre jour
            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if(heureIncr === 24) {
                heure[i].innerText = "00 h"
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }

        }
         // temp pour 3h
         for(let j =0; j < tempPourH.length; j++){ // le tableu avec tout les élément de dome pour la tompirateur par heure 
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°` //hourly tompirateur par heure //Math.trunc pour enlever les vérgule aprés la tompérateure

         }
          // trois premieres lettres des jours 
          for(let l = 0; l < tabJoursEnOrdre.length; l++){ //tabJoursEnOrdre c'est le tableu qu'on a importer
          joursDiv[l].innerText = tabJoursEnOrdre[l].slice(0,3);

          }
          // Temps par jour
          for(let m = 0; m < 7; m++){
              tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
          }
          // Icone dynamique 
          if(heureActuelle >= 6 && heureActuelle < 21){ // heure Actuelle +6H et -21
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
          }else{
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
          }

        })

}