// create router
regex = /tools\/?(index\.html)?$/;
var isRootPage = window.location.pathname.match(regex);
function url(id){
  if(!id){
    return isRootPage ? 'index.html' : '../index.html'
  }
  return isRootPage ? id+'/index.html' : '../'+id+'/index.html'
}

// header
Vue.component('app-header', {
  template:
    '<header>'+
      '<a href="https://github.com/floriancourgey/tools" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>'+
      '<nav>'+
        '<ul>'+
        '<li><a :href="url()">Home</a></li>'+
        '<li><a :href="url(\'string\')">String tools</a></li>'+
        '<li><a :href="url(\'unix\')">UNIX tools</a></li>'+
        '<li><a :href="url(\'seo\')">SEO tools</a></li>'+
        '<li><a :href="url(\'crack\')">Crack & Hack</a></li>'+
        '<li>Language: <span onclick="appSeo.language=\'en\'">🇬🇧</span> <span onclick="appSeo.language=\'fr\'">🇫🇷</span></li>'+
        '</ul>'+
      '</nav>'+
      '<hr/>'+
    '</header>',
  methods: {url: function(x){return url(x)}}
});
appHeader = new Vue({
  el: '#app-header',
});

// footer
Vue.component('app-footer', {
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
          '<li>Language: <span onclick="appSeo.language=\'en\'">🇬🇧</span> <span onclick="appSeo.language=\'fr\'">🇫🇷</span></li>'+
        '</ul>'+
      '</nav>'+
      'Visit <a href="https://floriancourgey.com?ref=floriancourgey.tools" target="_blank">floriancourgey.com</a>'+
    '</footer>',
  methods: {url: function(x){return url(x)}}
});
appFooter = new Vue({
  el: '#app-footer',
});
