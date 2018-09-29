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
    '<header id="top">'+
      '<a href="https://github.com/floriancourgey/tools" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>'+
      '<nav>'+
        '<ul>'+
        '<li><a :href="url()">Home</a></li>'+
        '<li><a :href="url(\'string\')">String tools</a></li>'+
        '<li><a :href="url(\'unix\')">UNIX tools</a></li>'+
        '<li><a :href="url(\'seo\')">SEO tools</a></li>'+
        '<li><a :href="url(\'crack\')">Crack & Hack</a></li>'+
        '<li><a :href="url(\'mpg\')">MPG</a></li>'+
        '<li><a :href="url(\'xml2csv\')">XML 2 CSV</a></li>'+
        '<li>Language: <span onclick="app.language=\'en\'">🇬🇧</span> <span onclick="app.language=\'fr\'">🇫🇷</span></li>'+
        '</ul>'+
      '</nav>'+
      '<hr/>'+
    '</header>',
  methods: {url: function(x){return url(x)}}
}

// footer
var appFooter = {
  template:
    '<footer>'+
      '<hr/>'+
      '<a href="https://github.com/floriancourgey/tools" target="_blank">Github project home</a>'+
      '<nav>'+
        '<ul>'+
          '<li><a :href="url()">Home</a></li>'+
          '<li><a :href="url(\'string\')">String tools</a></li>'+
          '<li><a :href="url(\'unix\')">UNIX tools</a></li>'+
          '<li><a :href="url(\'seo\')">SEO tools</a></li>'+
          '<li><a :href="url(\'crack\')">Crack & Hack</a></li>'+
          '<li><a :href="url(\'mpg\')">MPG</a></li>'+
          '<li><a :href="url(\'xml2csv\')">XML 2 CSV</a></li>'+
          '<li>Language: <span onclick="app.language=\'en\'">🇬🇧</span> <span onclick="app.language=\'fr\'">🇫🇷</span></li>\
          <li><a href="#top">Back to top</a></li>\
        </ul>'+
      '</nav>'+
      'Visit <a href="https://floriancourgey.com?ref=floriancourgey.tools" target="_blank">floriancourgey.com</a>'+
    '</footer>',
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
