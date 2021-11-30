
const log = (str) => {
  Logger.log(str);
}


/**
 * Make HTTP request
 * 
 * Returning the data as an object simplifies the script making it easier to take any of the commonly used actions
 * 
 * @param {string} url The URL to fetch
 * @param {object} userOptions Object containing HTTP request options
 * @return {object} HTTP response
 */
const httpRequest = (url, userOptions) => {
  // Default options
  const defaultOptions = {
    method: 'GET',
    muteHttpExceptions: true
  };

  // combine user options and default options. If duplicates exist, the userOptions take priority
  const options = {...defaultOptions,...userOptions};

  // HTTP request
  const response = UrlFetchApp.fetch(url, options);

  // Parse JSON response
  const json = () => JSON.parse(response);

  // Get response headers
  const headers = () => response.getAllHeaders();

  // Get response text
  const text = () => response.getContentText();

  // Parse XML
  const xml = ()=> XmlService.parse(text());

  // Return object
  return {
    parseJson: json,
    parseXML: xml,
    headers: headers,
    text: text,
    response,response,
  }
};
