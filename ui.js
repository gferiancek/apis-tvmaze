import { getShowsByTerm, getEpisodesByShowId } from "./tvmaze.js";

const $showsList = document.querySelector("#showsList");
const $episodesArea = document.querySelector("#episodesArea");
const $searchForm = document.querySelector("#searchForm");
const $episodesList = document.querySelector("#episodesList");

/** Given list of shows, create markup for each and append to DOM.
 * A show is {id, name, summary, image}
 * */

function displayShows(shows) {
  $showsList.innerHTML = '';

  for (const show of shows) {
    const { id, name, summary, image } = show;
    const $show = document.createElement("div");
    $show.dataset.showId = id;
    $show.className = "Show col-md-12 col-lg-6 mb-4";

    $show.innerHTML = `
         <div class="media">
           <img
              src="${image}"
              alt="${name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${name}</h5>
             <div><small>${summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
      `;

    $showsList.appendChild($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = document.querySelector("#searchForm-term").value;
  const shows = await getShowsByTerm(term);

  $episodesArea.style.display = "none";
  displayShows(shows);
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  console.log("getEpisodeOfShow");

  const episodes = await getEpisodesByShowId(id);
  console.log({ episodes });
  return episodes;
}

/** displays episodes in the DOM
 * Results in a list of episodes appended to the bottom of the page
 * An episode is {name, season, number}
 */

function displayEpisodes(episodes) {
  console.log("displayEpisodes");

  //changing to "block" because $episodesArea is hidden by default
  $episodesArea.style.display = "block";
  $episodesList.innerHTML = "";

  for (const episode of episodes) {
    const { name, season, number } = episode;
    const $liEpisode = document.createElement("li");
    $liEpisode.innerText = `${name}, ${season}, ${number}`;

    $episodesList.append($liEpisode);
  }
}

/** Attach event listeners to show search form and show list  */

function start() {
  $searchForm.addEventListener("submit", async function handleSearchForm(evt) {
    evt.preventDefault();
    await searchShowsAndDisplay();
  });

  $showsList.addEventListener("click", handleEpisodeClick);
}

/** Handles click of Episodes button to fetch episodes */

async function handleEpisodeClick(evt) {
  if (!evt.target.matches(".Show-getEpisodes")) return;

  const $show = evt.target.closest(".Show");
  const showId = $show.dataset.showId;
  const episodes = await getEpisodesOfShow(showId);

  displayEpisodes(episodes);
}

export {
  displayShows,
  searchShowsAndDisplay,
  start,
};