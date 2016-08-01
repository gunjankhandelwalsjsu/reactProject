var cldr = require('cldr');
var property = {
  getAll: function(req, res) {
    var allLocales = cldr.localeIds; 
    res.json(allLocales);
  },

  getOne: function(req, res) {
    var allLocales = cldr.localeIds; 
    var input = req.params.input;
    var output = "";
    var array = [];
    allLocales.forEach(function(locale) {
        var json = cldr.extractDelimiters(locale);
        var jsonProp = '';
        Object.keys(json).forEach(function (propKey) {
           jsonProp += "\n  \""+propKey+"\" : \""+json[propKey]+"\",";   
        },this);        
        var jsonStr = "{\n  \"locale\" : \""+locale +"\","+ jsonProp.slice(0,-1)+"\n}";
        array.push(JSON.parse((jsonStr)));
  }, this);
    return res.json(array);
  }
};

module.exports = property;
