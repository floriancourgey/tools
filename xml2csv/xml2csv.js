var app = new App({
  el: '#xml2csv',
  data:{
    message: sample1xml,
    xml: null,
    loopXpath: '/bookstore/book[@category="web"]',
    cols: [
      {title:'Author', xpath:'author'},
      {title:'Title', xpath:'title[@lang="en"]'},
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
        console.log(node);
        this.results.push({
          0: document.evaluate(this.cols[0].xpath, node, null, XPathResult.STRING_TYPE, null).stringValue,
          1: document.evaluate(this.cols[1].xpath, node, null, XPathResult.STRING_TYPE, null).stringValue,
        })
      }
    }
  }
});
app.generate();
