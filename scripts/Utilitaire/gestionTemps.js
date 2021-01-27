// avoir un tableau avec les jours a partire de joure au je suis moi 
const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date(); // nos donnée la date de jour 
//passé a une méthod toLocaleDateString pour avoir jour actuelle en francais 
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
//console.log(jourActuel, ajd);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1); //toUpperCase:Mettre la premier lettre en majouscul .slice(1)pour ecrire le reste de normal

//pour mettre on order du jour acuielle 
let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;
