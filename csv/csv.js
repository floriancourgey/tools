var app = new App({
  el: '#xml2csv',
  data:{
    message: sample,
    xml: null,
    columnSep: '<|>',
    lineSep: '\\n',
    cols: [],
    results:[],
  },
  methods:{
    generate: function(){
      this.results = [];
      this.cols = [];
      // parse
      var lineSep = new RegExp(this.lineSep); // RegExp needed for special char like '\n'
      var columnSep = (this.columnSep); // RegExp needed for special char like '\n'
      var lines = this.message.split(lineSep);
      var header = lines.shift();
      for(var s of header.split(this.columnSep)){
        this.cols.push(s);
      }
      for(var line of lines){
        var values = line.split(columnSep);
        this.results.push(values);
        for(var value of values){

        }
      }
      return;
      // get root loop xpath
      var nodes = document.evaluate(this.loopXpath, this.xml, null, XPathResult.ANY_TYPE, null);
      var node;
      // reset results
      this.results = [];
      // for each node, push to results
      while(node = nodes.iterateNext()){
        console.log('node',node);
        for(var i in this.cols){
          if(!this.cols.hasOwnProperty(i))continue;
          var col = this.cols[i];
          var result = document.evaluate(col.xpath, node, null, XPathResult.STRING_TYPE, null).stringValue || '';
          console.log('result',result);
          this.cols[i].results.push(result);
        }
      }
    }
  }
});
app.generate();
