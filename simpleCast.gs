const simpleCast_api_key = 'eyJhcGlfa2V5IjoieUZiSUdhbEFzWUlCL29NU3dqMjFXd3pPdnptRTZyMTFJL2g2Umo0VEowMD0ifQ==';

function simpleCastGetAllComboQuery() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true
  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        var response = JSON.parse(UrlFetchApp.fetch(url + httpResponse.collection[i].id + '/episodes', requestOptions).getContentText());
        var isThereMoreEpisodePages = true;
        while(isThereMoreEpisodePages) { 
          for (var j = 0; j < response.collection.length; j++){
            data.push([httpResponse.collection[i].id, response.collection[j], JSON.parse(UrlFetchApp.fetch(response.collection[i].analytics.href + '/episodes', requestOptions).getContentText())]);
          }
          if (response.pages.next != null) {
            console.log("ANOTHER EPISODE PAGE " + response.pages.current + "/" + response.pages.total);
            if (response.pages.current % 5 == 0) {
              console.log("WAIT");
              Utilities.sleep(15000);
              console.log("CONTINUE");
            }
            response = JSON.parse(UrlFetchApp.fetch(response.pages.next.href, requestOptions).getContentText());
            if (response.pages.current > response.pages.total) {
              isThereMoreEpisodePages = false;
            }
          } else {
            console.log("END OF EPISODE PAGES");
            isThereMoreEpisodePages = false;
          }
        }
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
              isThereMorePodcastPages = false;
            }
      } else {
        console.log("END OF PODCAST PAGES");
        isThereMorePodcastPages = false;
      }
    }
    console.log(data[1]);
    return data;
  } catch (e) {
    console.log("error:" + e);
    if (data != null) {
      return data;
    }
    return "error";
  }
}

function simpleCastGetAllEpisodes() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true
  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        var response = JSON.parse(UrlFetchApp.fetch(url + httpResponse.collection[i].id + '/episodes', requestOptions).getContentText());
        var isThereMoreEpisodePages = true;
        while(isThereMoreEpisodePages) { 
          for (var j = 0; j < response.collection.length; j++){
            data.push([httpResponse.collection[i], response.collection[j]]);
          }
          if (response.pages.next != null) {
            console.log("ANOTHER EPISODE PAGE " + response.pages.current + "/" + response.pages.total);
            response = JSON.parse(UrlFetchApp.fetch(response.pages.next.href, requestOptions).getContentText());
            if (response.pages.current > response.pages.total) {
              isThereMoreEpisodePages = false;
            }
          } else {
            console.log("END OF EPISODE PAGES");
            isThereMoreEpisodePages = false;
          }
        }
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
              isThereMorePodcastPages = false;
          }
      } else {
        console.log("END OF PODCAST PAGES");
        isThereMorePodcastPages = false;
      }
    }
    return data;
  } catch (e) {
    console.log(e)
    return "error";
  }
}

function simpleCastGetAllListeners() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true
  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        var limit = 25;
        var offset = 0;
        var episodeUrl = "https://api.simplecast.com/analytics/episodes/listeners?limit="+limit+"&listeners=true&offset="+offset+"&podcast="+httpResponse.collection[i].id;
        var res = JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/episodes/hours_listened?podcast=' + httpResponse.collection[i].id, requestOptions).getContentText());
        var response = JSON.parse(UrlFetchApp.fetch(episodeUrl, requestOptions).getContentText());
        console.log("EPISODE PAGE " + response.pages.current + "/" + response.pages.total + " " + response.pages.next.href);
        var isThereMoreEpisodePages = true;
        while(isThereMoreEpisodePages) { 
          for (var j = 0; j < response.collection.length; j++){
            data.push([
              response.collection[j],
              res
            ]);
          }
          if (response.pages.next != null) {
            response = JSON.parse(UrlFetchApp.fetch(response.pages.next.href, requestOptions).getContentText());
            console.log("EPISODE PAGE " + response.pages.current + "/" + response.pages.total + " " + response.pages.next.href);
            if (response.total < limit) {
              isThereMoreEpisodePages = false;
            }
          } else {
            isThereMoreEpisodePages = false;
          }
        }
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
              isThereMorePodcastPages = false;
        }
      } else {
        console.log("END OF PODCAST PAGES");
        isThereMorePodcastPages = false;
      }
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

function simpleCastGetAllPodcastData() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true

  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        data.push([httpResponse.collection[i],
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/downloads?podcast=' + httpResponse.collection[i].id, requestOptions)),
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/episodes/hours_listened?podcast=' + httpResponse.collection[i].id, requestOptions)),
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/episodes/listeners?podcast=' + httpResponse.collection[i].id, requestOptions)),
                  ]);
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total + " " + httpResponse.pages.next.href);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
          isThereMorePodcastPages = false;
        }
      } else {
        isThereMorePodcastPages = false;
      }
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

function simpleCastGetPlatformData() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true

  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        data.push([
          httpResponse.collection[i].id,
          JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/technology/applications?podcast=' + httpResponse.collection[i].id, requestOptions)),
          JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/technology/browsers?podcast=' + httpResponse.collection[i].id, requestOptions)),
          JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/technology/device_class?podcast=' + httpResponse.collection[i].id, requestOptions)),
          JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/technology/devices?podcast=' + httpResponse.collection[i].id, requestOptions))
        ]);
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
              isThereMorePodcastPages = false;
        }
      } else {
        console.log("END OF PODCAST PAGES");
        isThereMorePodcastPages = false;
      }
    }
    console.log(data);
    return data;
  } catch (e) {
    console.log("error:" + e);
    if (data != null) {
      return data;
    }
    return "error";
  }
}

function simpleCastGetAllDownloads() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true

  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        var response = JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/episodes?podcast=' + httpResponse.collection[i].id, requestOptions).getContentText());
        var isThereMoreEpisodePages = true;
        while(isThereMoreEpisodePages) { 
          for (var j = 0; j < response.collection.length; j++){
            data.push([
              httpResponse.collection[i].id,
              response.collection[j]
            ]);
          }
          if (response.pages.next != null) {
            console.log("EPISODE PAGE " + response.pages.current + "/" + response.pages.total + " " + response.pages.next.href);
            response = JSON.parse(UrlFetchApp.fetch(response.pages.next.href, requestOptions).getContentText());
            if (response.pages.current > response.pages.total) {
              isThereMoreEpisodePages = false;
            }
          } else {
            isThereMoreEpisodePages = false;
          }
        }
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total + " " + httpResponse.pages.next.href);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
          isThereMoreEpisodePages = false;
        }
      } else {
        isThereMorePodcastPages = false;
      }
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

function simpleCastGetAllPlatforms() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true

  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        //var response = JSON.parse(UrlFetchApp.fetch(url + httpResponse.collection[i].id + '/episodes', requestOptions).getContentText());
        data.push([ httpResponse.collection[i].id, UrlFetchApp.fetch('https://api.simplecast.com/analytics/technology/applications?podcast=' + httpResponse.collection[i].id, requestOptions).getContentText()]);
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total + " " + httpResponse.pages.next.href);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
          isThereMoreEpisodePages = false;
        }
      } else {
        isThereMorePodcastPages = false;
      }
    }
    console.log(data);
    return data;
  } catch (e) {
    console.log("error:" + e);
    if (data != null) {
      return data;
    }
    return "error";
  }
}

function simpleCastGetListenersPodcastData() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true

  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        data.push([
                  httpResponse.collection[i],
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/podcasts/listeners?podcast=' + httpResponse.collection[i].id, requestOptions))
                  ]);
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total + " " + httpResponse.pages.next.href);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
          isThereMorePodcastPages = false;
        }
      } else {
        isThereMorePodcastPages = false;
      }
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

function simpleCastGeWoWPodcastData() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true

  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        data.push([
                  httpResponse.collection[i],
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/downloads?podcast=' + httpResponse.collection[i].id, requestOptions)),
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/podcasts/listeners?podcast=' + httpResponse.collection[i].id, requestOptions))
                  ]);
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total + " " + httpResponse.pages.next.href);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
          isThereMorePodcastPages = false;
        }
      } else {
        isThereMorePodcastPages = false;
      }
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

function simpleCastGeWoWPodcastData2() {
  var url = `https://api.simplecast.com/podcasts/`;
  var myHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + simpleCast_api_key
  };

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const data = [];
  var isThereMorePodcastPages = true
  try {
    while(isThereMorePodcastPages) { 
      var httpResponse = JSON.parse(UrlFetchApp.fetch(url, requestOptions).getContentText());
      for (var i = 0; i < httpResponse.collection.length; i++){
        data.push([
                  httpResponse.collection[i],
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/downloads?podcast=' + httpResponse.collection[i].id, requestOptions)).total,
                  JSON.parse(UrlFetchApp.fetch('https://api.simplecast.com/analytics/podcasts/listeners?podcast=' + httpResponse.collection[i].id, requestOptions)).total,
                  Utilities.formatDate(new Date(), "PST", "yyyy-MM-dd")
                  ]);
      }
      if (httpResponse.pages.next != null) {
        console.log("ANOTHER PODCAST PAGE " + httpResponse.pages.current + "/" + httpResponse.pages.total + " " + httpResponse.pages.next.href);
        httpResponse = JSON.parse(UrlFetchApp.fetch(httpResponse.pages.next.href, requestOptions).getContentText());
        if (httpResponse.pages.current > httpResponse.pages.total) {
          isThereMorePodcastPages = false;
        }
      } else {
        isThereMorePodcastPages = false;
      }
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
