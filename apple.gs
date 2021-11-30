/**
 * resources: 
 * https://github.com/fedoco/itc-reporter/blob/master/reporter.py
 * https://github.com/irkmag/apple-reporter/blob/master/test/index.test.js
 * https://help.apple.com/itc/podcastsreporterguide/#/apd2f1f1cfa3
 *
 * TODO:
 * Troubleshoot error that occurs when attempting any action that requires an API token
 */

//FOR REPORTER NOT
const AccessToken = 'd9456a73-dece-4fc0-9b67-0002d19ce2b3'
const APPLE_USER_ID = 'general@meetcute.com';

//KEEP UP TO DATE WITH PASSWORD
const APPLE_PW = `:SE(LB?';d"4DX(`;

const REPORT_VERSION = '2.2'
// VENDOR NUMBER 90446785
// There are only two available API endpoints
const API_ENDPOINT_SALES = 'https://reportingitc-reporter.apple.com/reportservice/sales/v1'
const API_ENDPOINT_FINANCE = 'https://reportingitc-reporter.apple.com/reportservice/finance/v1'

function applePodcastAnalytics() {
  try {
    var url = "https://meet-cute-api.herokuapp.com/apple/?username=general@meetcute.com&password="+encodeURI(APPLE_PW.normalize('NFKC'));
    var requestOptions = {
      method: 'GET'
    };
    var httpResponse = JSON.parse(UrlFetchApp.fetch(url,requestOptions).getContentText());
    return httpResponse;
  } catch (e) {
    console.log("error:" + e);
  }
}
