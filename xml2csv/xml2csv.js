var app = new App({
  el: '#xml2csv',
  data:{
    message: sample1xml,
    xml: null,
    loopXpath: '/bookstore/book[@category="web"]',
    cols: [
      {title:'Author', xpath:'author', results:[]},
      {title:'Title (en)', xpath:'title[@lang="en"]', results:[]},
      {title:'Price', xpath:'price', results:[]},
      {title:'Year', xpath:'year', results:[]},
    ],
    results:[],
  },
  methods:{
    generate: function(){
      // parse
      this.xml = (new DOMParser()).parseFromString(app.message, 'text/xml');
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
