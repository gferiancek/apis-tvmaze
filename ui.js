import { getShowsByTerm, getEpisodesByShowId } from "./tvmaze.js";

const $showsList = document.querySelector("#showsList");
const $episodesArea = document.querySelector("#episodesArea");
const $searchForm = document.querySelector("#searchForm");

/** Given list of shows, create markup for each and append to DOM.
 *
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

  const episodes = await getEpisodesByShowId(id);
}

/** Write a clear docstring for this function... */

// function displayEpisodes(episodes) { }

// add other functions that will be useful / match our structure & design
// and udpate start as necessary


/** Attach event listeners to show search form and show list  */

function start() {
  $searchForm.addEventListener("submit", async function handleSearchForm(evt) {
    evt.preventDefault();
    await searchShowsAndDisplay();
  });

  $showsList.addEventListener("click", handleClick(evt));
}
//TODO: add in the handleClick function for listening on the shows area


export {
  displayShows,
  searchShowsAndDisplay,
  start,
};