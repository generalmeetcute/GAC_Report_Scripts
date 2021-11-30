/**
 * resources: 
 * https://github.com/fedoco/itc-reporter/blob/master/reporter.py
 * https://github.com/irkmag/apple-reporter/blob/master/test/index.test.js
 * https://help.apple.com/itc/podcastsreporterguide/#/apd2f1f1cfa3
 *
 * TODO:
 * Troubleshoot error that occurs when attempting any action that requires an API token
 */

//KEEP UP TO DATE WITH PASSWORD
const SPOTIFY_PW = `X4qo3Q4Uz5`;

function spotifyPodcastAnalytics() {
  try {
    var url = "https://meet-cute-api.herokuapp.com/spotify/?username=general@meetcute.com&password="+encodeURI(SPOTIFY_PW.normalize('NFKC'));
    var requestOptions = {
      method: 'GET'
    };
    var httpResponse = JSON.parse(UrlFetchApp.fetch(url,requestOptions).getContentText());
    return httpResponse;
  } catch (e) {
    console.log("error:" + e);
  }
}
