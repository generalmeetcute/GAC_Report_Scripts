/**
 * Resource: 
 * https://developers.notion.com/docs/working-with-databases
 * https://developers.notion.com/reference/intro
 * 
 * TODO:
 *  - Handle paginated data for the notionGetPagesFromDatabase() function
 *  - Display desired page data
 *  - You may want to include "block" data. There is documentation for this, but I am uncertain what it is
 * 
 * If you want to connect to additional databases via API, you must connect the API to the specific database within Notion itself. This action cannot be done externally.
 */

const NOTION_DB_EPISODES_ID = 'e7bf6d32f4264ab8bc91f8dd68aa3854';
const NOTION_DB_THEMATIC_TAG_ID = 'e82164423d234e6a93365697025cc6c6';
const NOTION_DB_FEELINGS_ID = 'c854ce51559d49559a7a9aa581596704';
const NOTION_DB_SYNOPSIS_ID = '791a5036b1ac40a4a1d8c8caa43a69c9';
const NOTION_DB_TECHNICAL_TAGS = 'fbe03a3aaa154740a047b2c200a33c77';
//# of writers, # of producers, # of voice actors and # of characters
//FOR WRITERS
const NOTION_DB_WRITERS = 'b05c185799fa495cb207c61a9381b22e';
const NOTION_DB_PEOPLE = '2fcb2c8a458e4ccb9a491afc75aecb86'
//FOR PRODUCERS
const NOTION_DB_PRODUCERS = 'aa2adea5108e453aacee9687edea6598';
// Acquired, Produced and Published
const NOTION_DB_STORY_SCRIPTS = 'b05c185799fa495cb207c61a9381b22e';
const NOTION_DB_STORY_ACQUIRED = '08687dd3fef648a69976e0a3c2dc5ba6';
const NOTION_DB_STORY_PRODUCED = 'aa2adea5108e453aacee9687edea6598';
const NOTION_DB_STORY_PUBLISHED = 'a63439f934994d6191261ec4eb1a3fac';
const notion_api_key = 'secret_sOQbcuRJbD9k7fDDJvIY6AJKPFar2umPgQbkN10heTW';

function notionGetAllEpsiodesFromDatabase()  {
  return(getAllPages(NOTION_DB_EPISODES_ID));
}

function notionGetAllThemesFromDatabase() {
  return(getAllPages(NOTION_DB_THEMATIC_TAG_ID));
}

function notionGetAllFeelingsFromDatabase() {
  return(getAllPages(NOTION_DB_FEELINGS_ID));
}

function notionGetAllSynopsisFromDatabase() {
  return(getAllPages(NOTION_DB_SYNOPSIS_ID));
}

function notionGetAllTechTagsFromDatabase() {
  return(getAllPages(NOTION_DB_TECHNICAL_TAGS));
}

function notionGetAllPeopleFromDatabase() {
  return(getAllPages(NOTION_DB_PEOPLE));
}

function notionGetAcquiredProducedAndPublishedCountsFromDatabase() {
  return([getAllPages(NOTION_DB_STORY_ACQUIRED), getAllPages(NOTION_DB_STORY_PRODUCED), getAllPages(NOTION_DB_STORY_PUBLISHED)]);
}

function notionGetAllProducersAndWritersFromDatabase() {
  return([getAllPages(NOTION_DB_WRITERS), getAllPages(NOTION_DB_PRODUCERS)]);
}

function notionGetAcquiredProducedAndPublishedFromDatabase() {
  // ADD IN getAllPages(NOTION_DB_STORY_PUBLISHED) once discussed.
  return([getAllPages(NOTION_DB_STORY_ACQUIRED), getAllPages(NOTION_DB_STORY_PRODUCED)]);
}

function getAllPages(db) {
  var url = `https://api.notion.com/v1/databases/${db}/query`;
  var myHeaders = {
    "Notion-Version": "2021-08-16",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + notion_api_key
  };

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };
  try {
    const data = [];
    var counter = 0;
    var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
    
    for (var i = 0; i < httpResponse.results.length; i++){
      counter++;
      data.push(httpResponse.results[i]);
    }
    var has_more_pages = httpResponse.has_more;
    
    while(has_more_pages) {
      var start_cursor = httpResponse.next_cursor;
      var raw = JSON.stringify({
        "start_cursor": start_cursor
      });
      requestOptions = {
        method: 'POST',
        headers: myHeaders,
        payload: raw,
      }; 
      httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.results.length; i++){
        counter++;
        data.push(httpResponse.results[i]);
      }
      has_more_pages = httpResponse.has_more;
    }
    return data;
  } catch (e) {
    console.log("error:" + e);
    if (data != null) {
      return data;
    }
    return "error";
  }
}
