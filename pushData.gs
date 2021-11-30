const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1eVq2kV1B4SArYxen6z6zqrppJcmpo_ghUq9k6hwUrSA/edit#gid=0';

function simpleCastListeners() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('SimpleCast Listeners'))
      spreadsheet.insertSheet('SimpleCast Listeners');
    var sheetSimpleCast = spreadsheet.getSheetByName('SimpleCast Listeners');

    var resultsSimpleCastListeners = simpleCastGetAllListeners();
    if (resultsSimpleCastListeners != "error") {
      sheetSimpleCast.clearContents();
      sheetSimpleCast.appendRow([
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      sheetSimpleCast.appendRow([
        "episode_id",
        "type",
        "title",
        "season_href",
        "season_number",
        "episode_number",
        "total_listeners",
        "analytics_href",

        "total_hours_listened_to_podcast"
      ]);

      var data = [];
      for (var i = 0; i < resultsSimpleCastListeners.length; i++) {
        var temp = [];
        temp[0] = checkIfUndefined(resultsSimpleCastListeners[i][0].id);
        temp[1] = checkIfUndefined(resultsSimpleCastListeners[i][0].type);
        temp[2] = checkIfUndefined(resultsSimpleCastListeners[i][0].title);
        if (resultsSimpleCastListeners[i][0].season == null) {
          temp[3] = "undefined";
          temp[4] = "undefined";
        } else {
          temp[3] = checkIfUndefined(resultsSimpleCastListeners[i][0].season.href);
          temp[4] = checkIfUndefined(resultsSimpleCastListeners[i][0].season.number);
        }
        temp[5] = checkIfUndefined(resultsSimpleCastListeners[i][0].number);
        if (resultsSimpleCastListeners[i][0].listeners == null) {
          temp[6] = "undefined";
        } else {
          temp[6] = checkIfUndefined(resultsSimpleCastListeners[i][0].listeners.total);
        }
        temp[7] = checkIfUndefined(resultsSimpleCastListeners[i][0].href);
        temp[8] = checkIfUndefined(resultsSimpleCastListeners[i][1].total);
        
        data.push(temp);
      }
      sheetSimpleCast.getRange(3, 1, data.length, data[0].length).setValues(data);
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
    } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  }
}

function simpleCastEpisodes() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('SimpleCast Episodes'))
      spreadsheet.insertSheet('SimpleCast Episodes');
    var sheetSimpleCast = spreadsheet.getSheetByName('SimpleCast Episodes');
    
    var resultsSimpleCast = simpleCastGetAllEpisodes();
    console.log("TRANSFORMING EPISODE DATA");
    if (resultsSimpleCast != "error") {
      sheetSimpleCast.clearContents();
      sheetSimpleCast.appendRow([
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      sheetSimpleCast.appendRow([
        "podcast_id",
        "podcast_title",
        "episode_id",
        "episode_title",
        "episode_updated_at",
        
        "episode_status",
        "episode_slug",
        "episode_published_at",
        "episode_number",
        
        "episode_href",
        "episode_guid",
        "episode_duration",
        "epsiode_description",
        "days_since_episode_release",
        "analytics_href",

        "podcast_status",
        "podcast_href",
        "episode_count"
      ]);
      var data = [];
      for (var i = 0; i < resultsSimpleCast.length; i++) {
        var temp = [];
        temp[0] = checkIfUndefined(resultsSimpleCast[i][0].id);
        temp[1] = checkIfUndefined(resultsSimpleCast[i][0].title);
        temp[2] = checkIfUndefined(resultsSimpleCast[i][1].id);
        temp[3] = checkIfUndefined(resultsSimpleCast[i][1].title);
        temp[4] = checkIfUndefined(resultsSimpleCast[i][1].updated_at);
        
        temp[5] = checkIfUndefined(resultsSimpleCast[i][1].status);
        temp[6] = checkIfUndefined(resultsSimpleCast[i][1].slug);
        temp[7] = checkIfUndefined(resultsSimpleCast[i][1].published_at);
        temp[8] = checkIfUndefined(resultsSimpleCast[i][1].number);
        
        temp[9] = checkIfUndefined(resultsSimpleCast[i][1].href);
        temp[10] = checkIfUndefined(resultsSimpleCast[i][1].guid);
        temp[11] = checkIfUndefined(resultsSimpleCast[i][1].duration);
        temp[12] = checkIfUndefined(resultsSimpleCast[i][1].description);
        temp[13] = checkIfUndefined(resultsSimpleCast[i][1].days_since_release);
        temp[14] = checkIfUndefined(resultsSimpleCast[i][1].analytics.href);
        temp[15] = checkIfUndefined(resultsSimpleCast[i][0].status);
        temp[16] = checkIfUndefined(resultsSimpleCast[i][0].href);
        if (resultsSimpleCast[i][0].episodes == null) {
          temp[17] = "undefined";
        } else {
          temp[17] = checkIfUndefined(resultsSimpleCast[i][0].episodes.count);
        }
        data.push(temp);
      }
      sheetSimpleCast.getRange(3, 1, data.length, data[0].length).setValues(data);
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
    } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  } 
}

function simpleCastDownloads() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('SimpleCast Downloads'))
      spreadsheet.insertSheet('SimpleCast Downloads');
    var sheetSimpleCast = spreadsheet.getSheetByName('SimpleCast Downloads');
    var resultsSimpleCast = simpleCastGetAllDownloads();
    
    var data = [];
    if (resultsSimpleCast[i] != "error") {
      sheetSimpleCast.clearContents();
      sheetSimpleCast.appendRow([
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      sheetSimpleCast.appendRow([
        "episode_id",
        "title",
        "href", 
        "type",
        "published_at",
        "episode_number",
        "downloads",

        "podcast_id"
      ]);
      console.log("TRANSFORMING DOWNLOADS DATA");
      for (var i = 0; i < resultsSimpleCast.length; i++) {
        var temp = [];
        temp[0] = checkIfUndefined(resultsSimpleCast[i][1].id);
        temp[1] = checkIfUndefined(resultsSimpleCast[i][1].title);
        temp[2] = checkIfUndefined(resultsSimpleCast[i][1].href);
        temp[3] = checkIfUndefined(resultsSimpleCast[i][1].type);
        temp[4] = checkIfUndefined(resultsSimpleCast[i][1].published_at);    
        temp[5] = checkIfUndefined(resultsSimpleCast[i][1].number);
        
        if (checkIfUndefined(resultsSimpleCast[i][1].downloads) == null) {
          temp[6] = "undefined"
        } else {
          temp[6] = checkIfUndefined(resultsSimpleCast[i][1].downloads.total);
        }
        temp[7] = checkIfUndefined(resultsSimpleCast[i][0]);
        data.push(temp);
        
        console.log((i+1) + "/" + resultsSimpleCast.length);
      }
      sheetSimpleCast.getRange(3, 1, data.length, data[0].length).setValues(data);
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
    } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  } 

}

function simpleCastPlatforms() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('SimpleCast Platforms'))
      spreadsheet.insertSheet('SimpleCast Platforms');
    var sheetSimpleCast = spreadsheet.getSheetByName('SimpleCast Platforms');

    var resultsSimpleCast = simpleCastGetPlatformData();
    console.log("query done")
    if (resultsSimpleCast != "error") {
      sheetSimpleCast.clearContents();
      sheetSimpleCast.appendRow([
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      sheetSimpleCast.appendRow([      
        "podcast_id",
        "type",
        "rank",
        "name",
        "downloads_total",
        "downloads_percent",
      ]);
      var data = [];
      for (var i = 0; i < resultsSimpleCast.length; i++) {
        for (var j = 0; j < resultsSimpleCast[i][1].collection.length; j++) {
          var temp = [];
          temp[0] = resultsSimpleCast[i][0];
          temp[1] = "applications";
          temp[2] = resultsSimpleCast[i][1].collection[j].rank;
          temp[3] = resultsSimpleCast[i][1].collection[j].name;
          temp[4] = resultsSimpleCast[i][1].collection[j].downloads_total;
          temp[5] = resultsSimpleCast[i][1].collection[j].downloads_percent;
          data.push(temp);
        }
        console.log("applications done")
        for (var j = 0; j < resultsSimpleCast[i][2].collection.length; j++) {
          var temp = [];
          temp[0] = resultsSimpleCast[i][0];
          temp[1] = "browsers";
          temp[2] = resultsSimpleCast[i][2].collection[j].rank;
          temp[3] = resultsSimpleCast[i][2].collection[j].name;
          temp[4] = resultsSimpleCast[i][2].collection[j].downloads_total;
          temp[5] = resultsSimpleCast[i][2].collection[j].downloads_percent;
          data.push(temp);
        }
        console.log("browsers done")
        for (var j = 0; j < resultsSimpleCast[i][3].collection.length; j++) {
          var temp = [];
          temp[0] = resultsSimpleCast[i][0];
          temp[1] = "device_class";
          temp[2] = resultsSimpleCast[i][3].collection[j].rank;
          temp[3] = resultsSimpleCast[i][3].collection[j].name;
          temp[4] = resultsSimpleCast[i][3].collection[j].downloads_total;
          temp[5] = resultsSimpleCast[i][3].collection[j].downloads_percent;
          data.push(temp);
        }
        console.log("device_class done")
        for (var j = 0; j < resultsSimpleCast[i][4].collection.length; j++) {
          var temp = [];
          temp[0] = resultsSimpleCast[i][0];
          temp[1] = "devices";
          temp[2] = resultsSimpleCast[i][4].collection[j].rank;
          temp[3] = resultsSimpleCast[i][4].collection[j].name;
          temp[4] = resultsSimpleCast[i][4].collection[j].downloads_total;
          temp[5] = resultsSimpleCast[i][4].collection[j].downloads_percent;
          data.push(temp);
        }
        console.log("devices done")
      }
      sheetSimpleCast.getRange(3, 1, data.length, data[0].length).setValues(data);
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
    } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  }
}

function simpleCastUniqueListenersOverTime() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    var sheetSimpleCast;
    var headers = [
      "date",
      "podcast_id",
      "podcast_title",
      "unique_listeners"
    ];
    if (!spreadsheet.getSheetByName('SimpleCast Podcast Listeners Over Time')) {
      spreadsheet.insertSheet('SimpleCast Podcast Listeners Over Time');
      sheetSimpleCast = spreadsheet.getSheetByName('SimpleCast Podcast Listeners Over Time');
      sheetSimpleCast.getRange(2, 1, 1, headers.length).setValues([headers]);
    } {
      sheetSimpleCast = spreadsheet.getSheetByName('SimpleCast Podcast Listeners Over Time');
    }

    var resultsSimpleCast = simpleCastGetListenersPodcastData();
    if (resultsSimpleCast != "error") {
      sheetSimpleCast.getRange(1,1,1,3).setValues([[
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]]);
      
      var data = [];
      for (var i = 0; i < resultsSimpleCast.length; i++) {
        var temp = [];
        temp[0] = Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd HH:mm");
        temp[1] = checkIfUndefined(resultsSimpleCast[i][0].id);
        temp[2] = checkIfUndefined(resultsSimpleCast[i][0].title);
        temp[3] = checkIfUndefined(resultsSimpleCast[i][1].total);
        sheetSimpleCast.appendRow(temp);
      }
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
    } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  }
}

function notionEpisode() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('Notion Episodes'))
      spreadsheet.insertSheet('Notion Episodes');
    var sheetEpisodesNotion = spreadsheet.getSheetByName('Notion Episodes');
    var resultsNotion = notionGetAllEpsiodesFromDatabase();
    var writersAndProducers = notionWritersAndProducers();
    if( resultsNotion != "error") {
      sheetEpisodesNotion.clearContents();
      sheetEpisodesNotion.appendRow([
          "REPORT UPDATED:",
          Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      sheetEpisodesNotion.appendRow([ 
        "Series_Title",
        "Story_Title",
        "created_time",
        "last_edited_time",
        "Series [Y/N]?",
        "NOTES",
        "id",
        "Tagline",
        "Date Added",
        "Recommend?",
        "Character_Breakdown",
        "Sponsored_Content",
        
        "url",
        "Thematic_Tags_to_Text",
        "Setting/Tone",
        "Seasonal",
        "Editors_id_list",
        "number_of_characters",

        "Writer (Text) string",
        "Writer 1",
        "Writer 2",
        "Producer name",
        "Producer id",

        "Story type"
      ]);

      //EPISODES DATA
      var data = [];
      for (var i = 0; i < resultsNotion.length; i++) {
        var temp = [];
        if (resultsNotion[i].properties["Story Title"].title[0] != null) {
          if (resultsNotion[i].properties["Series Title"].select == null) {
            temp[0] = "undefined";
          }  else {
            temp[0] = checkIfUndefined(resultsNotion[i].properties["Series Title"].select.name);
          }
          temp[1] = resultsNotion[i].properties["Story Title"].title[0].plain_text;
          
          temp[2] = checkIfUndefined(resultsNotion[i].created_time);
          temp[3] = checkIfUndefined(resultsNotion[i].last_edited_time);
          temp[4] = checkIfUndefined(resultsNotion[i].properties["Series [Y/N]?"].checkbox);
          if (resultsNotion[i].properties.NOTES.rich_text[0] == null) {
            temp[5] = "undefined";
          } else {
            temp[5] = resultsNotion[i].properties.NOTES.rich_text[0].text.content;
          }
          temp[6] = checkIfUndefined(resultsNotion[i].id)
          if (resultsNotion[i].properties.Tagline.rich_text[0] == null) {
            temp[7] = "undefined";
          } else {
            temp[7] = resultsNotion[i].properties.Tagline.rich_text[0].plain_text;
          }
          if (resultsNotion[i].properties["Date Added"].date == null) {
            temp[8] = "undefined";
          } else {
            if (resultsNotion[i].properties["Date Added"].date.start == null) {
              temp[8] = "null";
            } else {
              temp[8] = resultsNotion[i].properties["Date Added"].date.start;
            }
          }
          if (resultsNotion[i].properties["Recommend?"].select == null) {
            temp[9] = "undefined";
          } else {
            temp[9] = resultsNotion[i].properties["Recommend?"].select.name;
          }
          if (resultsNotion[i].properties["Character Breakdown"].rich_text[0] == null) {
            temp[10] = "undefined";
          } else {
            temp[10] = resultsNotion[i].properties["Character Breakdown"].rich_text[0].text.content;
          }
          temp[11] = checkIfUndefined(resultsNotion[i].properties["Sponsored Content (See Notes)"].checkbox);
          temp[12] = checkIfUndefined(resultsNotion[i].url);
          temp[13] = checkIfUndefined(resultsNotion[i].properties["[Thematic Tag to Text]"].formula.string);
          var temp1 = "";
          temp1 = "";
          for(var j = 0; j < resultsNotion[i].properties["Setting/Tone"].multi_select.length; j++) {
            var temp2 = checkIfUndefined(resultsNotion[i].properties["Setting/Tone"].multi_select[j].name);
            temp1 += temp2 + " ";
          }
          temp[14] = temp1;
          temp1 = "";
          for(var j = 0; j < resultsNotion[i].properties["Seasonal"].multi_select.length; j++) {
            var temp2 = checkIfUndefined(resultsNotion[i].properties["Seasonal"].multi_select[j].name);
            temp1 += temp2 + " ";
          }
          temp[15] = temp1;
          temp[16] = "";
          for (var l = 0; l < resultsNotion[i].properties.Editor.rollup.array.length; l++) {
            for (var k = 0; k < resultsNotion[i].properties.Editor.rollup.array[l].people.length; k++) {
              temp[16] += resultsNotion[i].properties.Editor.rollup.array[l].people[k].id;
              if (k+1 < resultsNotion[i].properties.Editor.rollup.array.length)
                temp[16] += ", ";
            }
          }
          temp[17] = resultsNotion[i].properties.Characters.number;

          temp[18] = "";
          temp[19] = "";
          temp[20] = "";
          temp[21] = "";
          temp[22] = "";
          for (var j = 0; j < writersAndProducers.length; j++) {
            if (writersAndProducers[j][1] == temp[1]) {
              temp[18] = writersAndProducers[j][2];
              temp[21] = writersAndProducers[j][3];
              temp[22] = writersAndProducers[j][4];
            }
          }
          
          var writerStrSplit = temp[18].split(",");
          if (writerStrSplit.length <= 2) {
            for (var j = 0; j < writerStrSplit.length; j++) {
              temp[19 + j] = writerStrSplit[j].replace(/,/g, '');
            }
          }

          if (resultsNotion[i].properties["Story Type"].rollup.array.length >= 1) {
            temp[23] = resultsNotion[i].properties["Story Type"].rollup.array[0].select.name;
          } else {
            temp[23] = "undefined";
          }
          data.push(temp);
        }
      }
      sheetEpisodesNotion.getRange(3, 1, data.length, data[0].length).setValues(data);
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
      //console.log(data);
    } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  }
}

function notionTags() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    //FEELINGS
    if (!spreadsheet.getSheetByName('Notion Tags'))
      spreadsheet.insertSheet('Notion Tags');
    var sheetTagsNotion = spreadsheet.getSheetByName('Notion Tags');
    var resultsNotion = notionGetAllEpsiodesFromDatabase();
    var resultsNotionFeelings = notionGetAllFeelingsFromDatabase();
    var resultsNotionThemes = notionGetAllThemesFromDatabase();
    var resultsNotionProdTags = notionGetAllTechTagsFromDatabase();
    if (resultsNotionFeelings != "error" || resultsNotionThemes != "error" || resultsNotionProdTags != "error") {
      sheetTagsNotion.clearContents();
      sheetTagsNotion.appendRow([
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      sheetTagsNotion.appendRow([ 
        "id",
        "created_time",
        "last_edited_time",
        "episode_id",
        "feeling",
        "url",
        "tag_type",
        "story_title",
        "series_title",
        "script_count"
      ]);
      var data = [];
      //FEELINGS
      
      for (var i = 0; i < resultsNotionFeelings.length; i++) {
        if (resultsNotionFeelings[i].properties != null) {
          for (var j = 0; j < resultsNotionFeelings[i].properties["Related to Script Library (Feelings)"].relation.length; j++) {
            var temp2 = []; 
            temp2[0] = checkIfUndefined(resultsNotionFeelings[i].id);
            temp2[1] = checkIfUndefined(resultsNotionFeelings[i].created_time);
            temp2[2] = checkIfUndefined(resultsNotionFeelings[i].last_edited_time);
            temp2[3] = resultsNotionFeelings[i].properties["Related to Script Library (Feelings)"].relation[j].id;
            if (resultsNotionFeelings[i].properties.Tag.title != null) {
              if (resultsNotionFeelings[i].properties.Tag.title[0] == null) {
                temp2[4] = "undefined";
              } else {
                temp2[4] = checkIfUndefined(resultsNotionFeelings[i].properties.Tag.title[0].plain_text);
              }
            } else {
              temp2[4] = "undefined";
            }
            temp2[5] = checkIfUndefined(resultsNotionFeelings[i].url);
            temp2[6] = "FEELINGS_TAGS"
            temp2[7] = "";
            for(var k = 0; k < resultsNotion.length; k++) {
              if (checkIfUndefined(resultsNotion[k].id) == temp2[3]) {
                if (resultsNotion[k].properties["Story Title"] != null) {
                  if (resultsNotion[k].properties["Story Title"].title[0] != null) {
                    temp2[7] = resultsNotion[k].properties["Story Title"].title[0].plain_text;
                  }
                }
                if (resultsNotion[k].properties["Series Title"].select == null) {
                  temp2[8] = "undefined";
                }  else {
                  temp2[8] = checkIfUndefined(resultsNotion[k].properties["Series Title"].select.name);
                }
              }
            }
            temp2[9] = resultsNotionFeelings[i].properties["Related to Script Library (Feelings)"].relation.length;
            if (resultsNotionFeelings[i].properties["To Number"] != null) {
              if (resultsNotionFeelings[i].properties["To Number"].formula != null) {
                temp2[9] = checkIfUndefined(resultsNotionFeelings[i].properties["To Number"].formula.number);
              }
            }
            data.push(temp2);
          }
        }
      }
      
      //THEMES
      for (var i = 0; i < resultsNotionThemes.length; i++) {
        if (resultsNotionThemes[i].properties != null) {
          if (resultsNotionThemes[i].properties["Tags"].title != null) {
            for (var j = 0; j < resultsNotionThemes[i].properties["Related to Script Library (Thematic Tags)"].relation.length; j++) {
              var temp2 = []; 
              temp2[0] = checkIfUndefined(resultsNotionThemes[i].id);
              temp2[1] = checkIfUndefined(resultsNotionThemes[i].created_time);
              temp2[2] = checkIfUndefined(resultsNotionThemes[i].last_edited_time);
              temp2[3] = resultsNotionThemes[i].properties["Related to Script Library (Thematic Tags)"].relation[j].id;
              if (resultsNotionThemes[i].properties["Tags"].title != null) {
                if (resultsNotionThemes[i].properties["Tags"].title[0] == null) {
                  temp2[4] = "undefined";
                } else {
                  temp2[4] = checkIfUndefined(resultsNotionThemes[i].properties["Tags"].title[0].plain_text);
                }
              } else {
                temp2[4] = "undefined";
              }
              temp2[5] = checkIfUndefined(resultsNotionThemes[i].url);
              temp2[6] = "THEME_TAGS";

              temp2[7] = "";
              for(var k = 0; k < resultsNotion.length; k++) {
                if (checkIfUndefined(resultsNotion[k].id) == temp2[3]) {
                  if (resultsNotion[k].properties["Story Title"] != null) {
                    if (resultsNotion[k].properties["Story Title"].title[0] != null) {
                      temp2[7] = resultsNotion[k].properties["Story Title"].title[0].plain_text;
                    }
                  }
                  if (resultsNotion[k].properties["Series Title"].select == null) {
                    temp2[8] = "undefined";
                  }  else {
                    temp2[8] = checkIfUndefined(resultsNotion[k].properties["Series Title"].select.name);
                  }
                }
              }
              temp2[9] = resultsNotionThemes[i].properties["Related to Script Library (Thematic Tags)"].relation.length;
              if (resultsNotionThemes[i].properties["Script Count"] != null) {
                if (resultsNotionThemes[i].properties["Script Count"].rollup != null) {
                  temp2[9] = checkIfUndefined(resultsNotionThemes[i].properties["Script Count"].rollup.number);
                }
              }
              data.push(temp2);
            }
          }
        }
      }

      //PRODUCTION  
      for (var i = 0; i < resultsNotionProdTags.length; i++) {
        if (resultsNotionProdTags[i].properties != null) {
          for (var j = 0; j < resultsNotionProdTags[i].properties["Tagged Scripts"].relation.length; j++) {
            var temp2 = []; 
            temp2[0] = checkIfUndefined(resultsNotionProdTags[i].id);
            temp2[1] = checkIfUndefined(resultsNotionProdTags[i].created_time);
            temp2[2] = checkIfUndefined(resultsNotionProdTags[i].last_edited_time);
            temp2[3] = resultsNotionProdTags[i].properties["Tagged Scripts"].relation[j].id;
            if (resultsNotionProdTags[i].properties.Tag.title != null) {
              if (resultsNotionProdTags[i].properties.Tag.title[0] == null) {
                temp2[4] = "undefined";
              } else {
                temp2[4] = checkIfUndefined(resultsNotionProdTags[i].properties.Tag.title[0].plain_text);
              }
            } else {
              temp2[4] = "undefined";
            }
            temp2[5] = checkIfUndefined(resultsNotionProdTags[i].url);
            temp2[6] = "PROC_TAGS";

            temp2[7] = "";
            for(var k = 0; k < resultsNotion.length; k++) {
              if (checkIfUndefined(resultsNotion[k].id) == temp2[3]) {
                if (resultsNotion[k].properties["Story Title"] != null) {
                  if (resultsNotion[k].properties["Story Title"].title[0] != null) {
                    temp2[7] = resultsNotion[k].properties["Story Title"].title[0].plain_text;
                  }
                }
                if (resultsNotion[k].properties["Series Title"].select == null) {
                  temp2[8] = "undefined";
                }  else {
                  temp2[8] = checkIfUndefined(resultsNotion[k].properties["Series Title"].select.name);
                }
              }
            }
            temp2[9] = resultsNotionProdTags[i].properties["Tagged Scripts"].relation.length;
            if (resultsNotionProdTags[i].properties["To Number"] != null) {
              if (resultsNotionProdTags[i].properties["To Number"].formula != null) {
                temp2[9] = checkIfUndefined(resultsNotionProdTags[i].properties["To Number"].formula.number);
              }
            }
            data.push(temp2);
          }
        }
      }
      
      sheetTagsNotion.getRange(3, 1, data.length, data[0].length).setValues(data);
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
    }
  } catch (e) {
    console.log(e);
  }
}

function notionWritersAndProducers() {
  try {
    var resultsNotion = notionGetAllProducersAndWritersFromDatabase();
    if( resultsNotion != "error") {
      var data = [];
      for (var i = 0; i < resultsNotion[0].length; i++) {
        var temp = [];
        temp[0] = resultsNotion[0][i].id;
        if (resultsNotion[0][i].properties.Story.title[0] != null) {
          temp[1] = checkIfUndefined(resultsNotion[0][i].properties.Story.title[0].plain_text);
        } else {
          temp[1] = "undefined";
        }
        if (resultsNotion[0][i].properties["Writer (Text)"].formula != null) {
          temp[2] = checkIfUndefined(resultsNotion[0][i].properties["Writer (Text)"].formula.string);
        } else {
          temp[2] = "undefined";
        }
        temp[3] = "";
        temp[4] = "";
        for (var j = 0; j < resultsNotion[1].length; j++) {
          if (resultsNotion[1][j].properties.Name.title[0] != null && temp[1] != "undefined") {
            if (resultsNotion[1][j].properties.Name.title[0].plain_text == temp[1]) {
              if (resultsNotion[1][j].properties["Producer(don't delete)"].select != null) {
                if (resultsNotion[1][j].properties["Producer(don't delete)"].select.name != null)
                  temp[3] += resultsNotion[1][j].properties["Producer(don't delete)"].select.name;
                if (resultsNotion[1][j].properties["Producer(don't delete)"].select.id != null)
                  temp[4] += resultsNotion[1][j].properties["Producer(don't delete)"].select.id;
              }
            }
          }
        }
        data.push(temp);
      }
      return data;
    }
  } catch (e) {
    console.log(e);
  }
}

function notionCounts() {
  try {
    var resultsNotion = notionGetAcquiredProducedAndPublishedCountsFromDatabase();
    var resultsPeopleNotion = notionGetAllPeopleFromDatabase();
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('Notion Count'))
      spreadsheet.insertSheet('Notion Count');
    var sheetNotion = spreadsheet.getSheetByName('Notion Count');
    var data = [];
    if(resultsNotion != "error" || resultsPeopleNotion != "error") {
      sheetNotion.clearContents();
      sheetNotion.appendRow([
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      data.push([ 
        "ACQUIRED", "PRODUCED", "WRITER", "PRODUCER"
      ]);
      var count_ACQUIRED = 0;
      var count_PRODUCED = 0;
      var count_WRITER = 0;
      var count_PRODUCER = 0;
      for(var i = 0; i < resultsNotion[0].length; i++) {
        if (resultsNotion[0][i].properties["Payment Sent?"].checkbox)
          count_ACQUIRED++;
      }
      for(var i = 0; i < resultsNotion[1].length; i++) {
        if (resultsNotion[1][i].properties.Phase.select.name == "Finished" || resultsNotion[1][i].properties.Phase.select.name == "Published")
          count_PRODUCED++;
      }
      var count = 0;
      for(var i = 0; i < resultsPeopleNotion.length; i++) {
        if(resultsPeopleNotion[i].properties.Type != null) {
          for(var j = 0; j < resultsPeopleNotion[i].properties.Type.multi_select.length; j++) {
            count++;
            if (resultsPeopleNotion[i].properties.Type.multi_select[j].name == "Writer") {
              count_WRITER++;
            }
            if (resultsPeopleNotion[i].properties.Type.multi_select[j].name == "Producer") {
              count_PRODUCER++;
            }
          }
        }
      }
      data.push([count_ACQUIRED, count_PRODUCED, count_WRITER, count_PRODUCER]);
      sheetNotion.getRange(2, 1, data.length, data[0].length).setValues(data);
      console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
    }
  } catch (e) {
    console.log(e);
  }
}

function appleReport() {
 try { 
  var resultsApple = applePodcastAnalytics();
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  if (!spreadsheet.getSheetByName('Apple'))
    spreadsheet.insertSheet('Apple');
  var sheetApple = spreadsheet.getSheetByName('Apple')
  if(resultsApple != "error") {
    sheetApple.clearContents();
    var data = [];
    sheetApple.clearContents();
    sheetApple.appendRow([
      "REPORT UPDATED:",
      Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
      "SUCCESS"
    ]);
    
    var data = [];
    var dataHeaders = [];
    for (var i = 1; i < resultsApple[0].length; i++) {
      dataHeaders.push(resultsApple[0][i]);
    }
    sheetApple.appendRow(dataHeaders);
    for (var i = 1; i < resultsApple.length; i++) {
      var temp = [];
      for (var j = 0; j < resultsApple[i].length; j++) {
        if (j == 1 || j == 2 || j == 3 || j == 4 || j == 6 || j == 8 || j == 10) {
          temp.push(resultsApple[i][j]);
        }
      }
      data.push(temp);
    }
    //POPULATE DATA HERE
    sheetApple.getRange(3, 1, data.length, data[0].length).setValues(data);
    console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
  } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  }
}

function appleCombineReport() {
  try { 
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('Apple Combine'))
      spreadsheet.insertSheet('Apple Combine');
    var sheetApple = spreadsheet.getSheetByName('Apple Combine');
    var resultsApple = spreadsheet.getSheetByName('Apple').getDataRange().getValues();
    
    if(resultsApple != null) {
      sheetApple.clearContents();
      sheetApple.appendRow([
        "REPORT UPDATED:",
        Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
        "SUCCESS"
      ]);
      var data = [];
      data.push(resultsApple[1]);
      sheetApple.appendRow(resultsApple[1]);
      var appleNames = [];
      for (var i= 2; i < resultsApple.length; i++) {
        if (!appleNames.includes(resultsApple[i][0].normalize('NFKC'))) {
          appleNames.push(resultsApple[i][0].normalize('NFKC'));
        }
      }
      for (var i= 0; i < appleNames.length; i++) {
        var temp = [];
        for (var j = 2; j < resultsApple.length; j++) {
          if (appleNames[i].normalize('NFKC') == resultsApple[j][0].normalize('NFKC')) {
            temp.push(resultsApple[j])
          }
        }
        if (temp.length > 1) {
          var listenersSumNull = true;
          var engagedListenersSumNull = true;
          var playsSumNull = true;
          var durationMaxNull = true;
          var averageConsumptionAverageNull = true;


          var listenersSum = 0;
          var engagedListenersSum = 0;
          var playsSum = 0;
          var durationMax = 0;
          var averageConsumptionAverage = 0;
          var averageConsumptionCount = 0;

          var name = temp[0][0];
          var releaseDate = temp[0][1];          

          for (var j = 0; j < temp.length; j++) {
            if (temp[j][2] != "-") {
              durationMaxNull = false;
              if (!temp[j][2].includes("hr")) {
                let compareDurationMax = temp[j][2].replace("min", "")
                if (durationMax < parseInt(compareDurationMax)) {
                  durationMax = parseInt(compareDurationMax);
                }
              } else {
                let compareDurationMax = temp[j][2].split("hr");
                compareDurationMax[1] = compareDurationMax[1].replace("min", "")
                let numberOfMinutes = parseInt(compareDurationMax[0]) * 60 + parseInt(compareDurationMax[1]);
                if (durationMax < numberOfMinutes) {
                  durationMax = numberOfMinutes;
                }
              }
            }
            if (temp[j][3] != "-") {
              listenersSumNull = false;
              listenersSum += temp[j][3];
            }
            if (temp[j][4] != "-") {
              engagedListenersSumNull = false;
              engagedListenersSum += temp[j][4];
            }
            if (temp[j][5] != "-") {
              playsSumNull = false;
              playsSum += temp[j][5];
            }
            if (temp[j][6] != "-") {
              averageConsumptionAverageNull = false;
              averageConsumptionCount++;
              averageConsumptionAverage += parseFloat(temp[j][6]);
            }
          }
          temp2 = [];
          temp2.push(name.normalize('NFKC'));
          temp2.push(releaseDate);
          if (durationMaxNull) {
            temp2.push("-")
          } else {
            if (durationMax > 60) {
              var tempDurStr = Math.floor(durationMax / 60) + " hr"
              if (durationMax % 60 != 0) {
                tempDurStr += (" " + durationMax % 60 + " min")
              }
              temp2.push(tempDurStr);
            } else {
              temp2.push(durationMax + " min");
            }
          }
          if (listenersSumNull) {
            temp2.push("-")
          } else {
            temp2.push(listenersSum);
          }
          if (engagedListenersSumNull) {
            temp2.push("-")
          } else {
            temp2.push(engagedListenersSum);
          }
          if (playsSumNull) {
            temp2.push("-")
          } else {
            temp2.push(playsSum);
          }
          if (averageConsumptionAverageNull) {
            temp2.push("-")
          } else {
            if (averageConsumptionCount > 0) {
              temp2.push(parseFloat(averageConsumptionAverage / averageConsumptionCount).toString());
            } else {
              temp2.push("-")
            }
          }
          
          data.push(temp2)
          sheetApple.appendRow(temp2);
        } else {
          if (temp[0][6] != "-") {
            temp[0][6]=parseFloat(temp[0][6]).toString();
          }
          data.push(temp[0])
          sheetApple.appendRow(temp[0]);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function weeklySummaryPodcast() {
  try { 
    var simplecastResults = simpleCastGeWoWPodcastData();
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('SimpleCast Podcast WoW')) {
      spreadsheet.insertSheet('SimpleCast Podcast WoW');
      spreadsheet.getSheetByName('SimpleCast Podcast WoW').appendRow([
        "week_of",
        "podcast_id",
        "podcast_title",

        "total_listeners",
        "total_hours_listened_to_podcast",
        "downloads"
      ]);
    }
    var simpleCastWoWSheet = spreadsheet.getSheetByName('SimpleCast Podcast WoW');
    
    var data = [];
    for (var i= 0; i < simplecastResults.length; i++ ) {
      var temp = [];
      var downloads;
      if (spreadsheet.getSheetByName('SimpleCast Downloads') != null) {
        downloads = 0;
        var simpleCastDownloads = spreadsheet.getSheetByName('SimpleCast Downloads').getDataRange().getValues();
        for (var j= 2; j < simpleCastDownloads.length; j++ ) {
          if (simplecastResults[i][0].id == simpleCastDownloads[j][7]) {
            downloads += simpleCastDownloads[j][6];
          }
        }
      } else {
        downloads = "error";
      }
      var listens = simplecastResults[i][2].total;
      temp[0] = checkIfUndefined(Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd"));
      temp[1] = checkIfUndefined(simplecastResults[i][0].id);
      temp[2] = checkIfUndefined(simplecastResults[i][0].title);
      temp[3] = checkIfUndefined(listens);
      temp[4] = checkIfUndefined(simplecastResults[i][1].total);
      temp[5] = checkIfUndefined(downloads);
    
      data.push(temp);
    }
    var lastRow = simpleCastWoWSheet.getLastRow();
    simpleCastWoWSheet.getRange(lastRow + 1, 1, data.length, data[0].length).setValues(data);
  } catch (e) {
    console.log(e);
  }
}

function weeklySummaryPodcast2() {
  try { 
    var simplecastResults = simpleCastGeWoWPodcastData2();
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    if (!spreadsheet.getSheetByName('SimpleCast Podcast WoW 2')) {
      spreadsheet.insertSheet('SimpleCast Podcast WoW 2');
      spreadsheet.getSheetByName('SimpleCast Podcast WoW 2').appendRow([
        "day",
        "podcast_id",
        "podcast_title",

        "total_listeners",
        "downloads"
      ]);
    }
    var simpleCastWoWSheet = spreadsheet.getSheetByName('SimpleCast Podcast WoW 2');
    var data = [];
    for (var i= 0; i < simplecastResults.length; i++ ) {
      var temp = [];
      temp[0] = checkIfUndefined(simplecastResults[i][3]);
      temp[1] = checkIfUndefined(simplecastResults[i][0].id);
      temp[2] = checkIfUndefined(simplecastResults[i][0].title);
      temp[3] = checkIfUndefined(simplecastResults[i][2]);
      temp[4] = checkIfUndefined(simplecastResults[i][1]);
      data.push(temp);
    }
    var lastRow = simpleCastWoWSheet.getLastRow();
    simpleCastWoWSheet.getRange(lastRow + 1, 1, data.length, data[0].length).setValues(data);
  } catch (e) {
    console.log(e);
  }
}

function spotifyReport() {
 try { 
  var resultsSpotify = spotifyPodcastAnalytics();
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  if (!spreadsheet.getSheetByName('Spotify'))
    spreadsheet.insertSheet('Spotify');
  var sheetSpotify = spreadsheet.getSheetByName('Spotify')
  if(resultsSpotify != "error") {
    sheetSpotify.clearContents();
    var data = [];
    sheetSpotify.clearContents();
    sheetSpotify.appendRow([
      "REPORT UPDATED:",
      Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST",
      "SUCCESS"
    ]);
    
    var data = [];
    var dataHeaders = [];
    for (var i = 0; i < resultsSpotify[0].length; i++) {
      dataHeaders.push(resultsSpotify[0][i]);
    }
    sheetSpotify.appendRow(dataHeaders);
    for (var i = 1; i < resultsSpotify.length; i++) {

      data.push(resultsSpotify[i]);
    }
    //POPULATE DATA HERE
    sheetSpotify.getRange(3, 1, data.length, data[0].length).setValues(data);
    console.log("COMPLETED AT:" + Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'") + " PST");
  } else {
      console.log("ERROR AT ", Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  } catch (e) {
    console.log(e);
  }
}

function checkIfUndefined(data) {
  try {
    if (data == null) {
      return "undefined";
    }
    return data;
  } catch(error) {
    return "error";
  }
}
