const TV_MAZE_BASE_URL = "http://api.tvmaze.com";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  console.log("getShowsByTerm");
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  const params = new URLSearchParams({ q: term });

  const resp = await fetch(`${TV_MAZE_BASE_URL}/shows?${params}`);
  const tvMazeData = await resp.json();

  parseTvMazeData(tvMazeData);

}

/** Takes array of objects from TV MAZE API and parses out
 * infomation relavant to the application.
 *    Return [ {id, name, summary, image}, ...]
 */
function parseTvMazeData(tvMazeData) {
  console.log("parseTvMazeData");
  //console.log(tvMazeData);

  const allShows = [];

  for (let item of tvMazeData) {

    const indiviualShow = {};
    indiviualShow.id = item.id;
    indiviualShow.name = item.name;
    indiviualShow.summary = item.summary;
    indiviualShow.image = item.image.medium;

    allShows.push(indiviualShow);
  }
  console.log({ allShows });

  return allShows;
}

// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };