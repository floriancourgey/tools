var xml, $xml;
var app = new App({
  el: '#adobe-campaign',
  data:{
    message: '',
    schemas: [],
    dbEngine: 'postgresql',
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
        // main data
        var $schema = $(schema);
        var mainElement = $schema.children('element[sqltable]')[0];
        var schema = {
          root: getAttributes(schema),
          mainElement: getAttributes(mainElement),
          columns: [],
          enumerations: [],
          links: [],
          keys: [],
          indexes: [],
        };
        // columns
        for(var column of $schema.find('attribute')){
          schema.columns.push(getAttributes(column));
        }
        // links
        for(var l of $schema.find('element[type="link"]')){
          var link = getAttributes(l);
          link.cardinality = (link.unbound && link.unbound=='true') ? '1:N' : '1:1';
          schema.links.push(link);
        }
        // enums
        for(var e of $schema.find('enumeration')){
          var enumeration = getAttributes(e);
          enumeration.values = [];
          for(var value of $(e).children('value')){
            enumeration.values.push(value.attributes.name.value+': '+value.attributes.label.value);
          }
          schema.enumerations.push(enumeration);
        }
        // keys
        for(var key of $schema.find('key')){
          schema.keys.push(getAttributes(key))
        }
        // indexes
        for(var index of $schema.find('dbindex')){
          schema.indexes.push(getAttributes(index))
        }
        // final push
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
