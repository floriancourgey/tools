// router
regex = /tools\/?(index\.html)?$/;
var isRootPage = window.location.pathname.match(regex);
function url(id){
  if(!id){
    return isRootPage ? 'index.html' : '../index.html'
  }
  return isRootPage ? id+'/index.html' : '../'+id+'/index.html'
}

// header
var appHeader = {
  template:
    '<header id="top" class="container">\
      <nav class="navbar navbar-default">\
        <div class="container-fluid">\
          <div class="navbar-header">\
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\
              <span class="sr-only">Toggle navigation</span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
              <span class="icon-bar"></span>\
            </button>'+
            // PROJECT HOME
            '<a class="navbar-brand" href="#">Home</a>\
          </div>\
          <div id="navbar" class="navbar-collapse collapse">'+
            // NAVBAR LEFT
            '<ul class="nav navbar-nav">\
              <li><a :href="url(\'string\')">String tools</a></li>\
              <li><a :href="url(\'unix\')">UNIX tools</a></li>\
              <li><a :href="url(\'seo\')">SEO tools</a></li>\
              <li><a :href="url(\'crack\')">Crack & Hack</a></li>\
              <li><a :href="url(\'mpg\')">MPG</a></li>\
              <li><a :href="url(\'xml2csv\')">XML 2 CSV</a></li>\
            </ul>'+
            // NAVBAR RIGHT
            '<ul class="nav navbar-nav navbar-right">\
              <li><a href="#">Language: <span onclick="app.language=\'en\'">🇬🇧</span> <span onclick="app.language=\'fr\'">🇫🇷</span></a></li>\
              <li><a href="https://github.com/floriancourgey/tools" target="_blank">Github project home</a></li>\
            </ul>\
          </div><!--/.nav-collapse -->\
        </div><!--/.container-fluid -->\
      </nav>\
      <hr/>\
    </header>',
  methods: {url: function(x){return url(x)}}
}

// footer
var appFooter = {
  template:
    '<footer>\
      <div class="container">\
        <a href="https://github.com/floriancourgey/tools" target="_blank">Github project home</a>\
        <nav>\
          <ul>\
            <li><a :href="url()">Home</a></li>\
            <li><a :href="url(\'string\')">String tools</a></li>\
            <li><a :href="url(\'unix\')">UNIX tools</a></li>\
            <li><a :href="url(\'seo\')">SEO tools</a></li>\
            <li><a :href="url(\'crack\')">Crack & Hack</a></li>\
            <li><a :href="url(\'mpg\')">MPG</a></li>\
            <li><a :href="url(\'xml2csv\')">XML 2 CSV</a></li>\
            <li>Language: <span onclick="app.language=\'en\'">🇬🇧</span> <span onclick="app.language=\'fr\'">🇫🇷</span></li>\
            <li><a href="#top">Back to top</a></li>\
          </ul>\
        </nav>\
        Visit <a href="https://floriancourgey.com?ref=floriancourgey.tools" target="_blank">floriancourgey.com</a>\
      </div>\
    </footer>',
  methods: {url: function(x){return url(x)}}
}

// app-action
function glyphicon(icon){
  return 'glyphicon glyphicon-'+icon;
};
var appAction = {
  props: ['click', 'text', 'icon', 'title'],
  template:
  '<button :title="title" class="btn btn-xs btn-default" data-toggle="tooltip">\
    <span v-if="icon" :class="glyphicon(icon)"></span> {{text}}\
  </button>'
}

// app constructor
var App = Vue.extend({
  data: function(){
    return {
      language: 'en',
      languages: ['en'],
    }
  },
  methods: {
    l: function(value){
      if(!value || value.length<1) return '';
      if(!this.language) return '{VueJS this.language should be defined}';
      if(!translations) return 'The translation object doesn\'t exist';
      if(!(this.language in translations)) return 'The language "'+this.language+'" doesn\'t exist';
      if(!(value in translations[this.language])) return value;
      return translations[this.language][value];
    }
  },
  components: {
    'app-header': appHeader,
    'app-footer': appFooter,
    'app-action': appAction,
  },
})

var translations = translations || {};
