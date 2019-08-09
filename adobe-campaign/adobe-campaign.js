var xml, $xml;
var app = new App({
  el: '#adobe-campaign',
  data:{
    message: '',
    schemas: [],
  },
  methods: {
    generate: function() {
      xml = $.parseXML(this.message);
      $xml = $(xml);
      // check package has entities with [schema="xtk:schema"]
      if($xml.children('package').length != 1 || $xml.children('package').children('entities[schema="xtk:schema"]').length != 1){
        console.warn('Invalid XML: root must be a package with 1 <entities schema="xtk:schema"> child.');
        return;
      }
      // reset schemas
      this.schemas = [];
      // for each schema
      var schemas = $xml.children('package').children('entities[schema="xtk:schema"]').children('schema');
      for(var schema of schemas){
        var $schema = $(schema);
        var mainElement = $schema.children('element[sqltable]')[0];
        var schema = {
          root: getAttributes(schema),
          mainElement: getAttributes(mainElement),
          columns: [],
        };
        for(var attribute of $schema.find('attribute')){
          schema.columns.push(getAttributes(attribute));
        }
        this.schemas.push(schema);
      }
    }
  },
});

function getAttributes(element){
  var attributes = {};
  for(var i=0; i<element.attributes.length; i++){
      attributes[element.attributes[i].name] = element.attributes[i].value;
  }
  return attributes;
}
