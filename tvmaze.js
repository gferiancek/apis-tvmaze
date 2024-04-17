const TV_MAZE_BASE_URL = "http://api.tvmaze.com";
const TV_MAZE_PLACEHOLDER_IMG_URL = "https://tinyurl.com/tv-missing";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  console.log("getShowsByTerm", { term });

  const params = new URLSearchParams({ q: term });
  console.log(params.values());

  const resp = await fetch(`${TV_MAZE_BASE_URL}/search/shows?${params}`);
  const tvMazeData = await resp.json();

  return parseTvMazeData(tvMazeData);

}

/** Takes array of objects from TV MAZE API and parses out
 * infomation relavant to the application. Sets default
 * url image if it is null.
 *    Return [ {id, name, summary, image}, ...]
 */
function parseTvMazeData(showsData) {
  console.log("parseTvMazeData");
  //console.log(tvMazeData);

  return showsData.map(data => {
    let url = TV_MAZE_PLACEHOLDER_IMG_URL;

    if (data.show.image !== null) {
      url = data.show.image.medium;
    }

    return {
      id: data.show.id,
      name: data.show.name,
      summary: data.show.summary,
      image: url,
    };
  }
  );
}

// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };