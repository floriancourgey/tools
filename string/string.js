function glyphicon(icon){
  return 'glyphicon glyphicon-'+icon;
};
Vue.component('app-action', {
  props: ['click', 'text', 'icon', 'title'],
  template: '<button v-bind:title="title" class="btn btn-xs btn-default" data-toggle="tooltip">'+
  '<span v-if="icon" v-bind:class="glyphicon(icon)"></span> {{text}}'+
  '</button>'
});
var appString = new Vue({
  el: '#app-string',
  data: {
    message: '',
    alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    length: 20,
    replaceX: '\\s+',
    byY: '-',
    flags: 'gim',
    dontRemoveX: '[0-9]',
  },
  methods: {
    clear: function (){ this.message = '' },
    load: function(file){
      switch(file){
        case 'sample1.txt': msg=''; break;
        default: msg = this.message;
      }
      this.message = msg;
    },
    upper: function () { this.message = this.message.toUpperCase() },
    lower: function () { this.message = this.message.toLowerCase() },
    reverse: function () { this.message = this.message.split('').reverse().join('') },
    base64encode: function () { this.message = btoa(this.message) },
    base64decode: function () { this.message = atob(this.message) },
    trimLines: function () {
      var newMessage = "";
      var lines = this.message.split('\n');
      for(var i=0 ; i<lines.length ; i++ ){
        var line = lines[i];
        newMessage += line.trim();
        if(i < lines.length-1){
          newMessage += '\n';
        }
      }
      this.message = newMessage;
    },
    alphabetaz: function(event){ this.alphabet = 'abcdefghijklmnopqrstuvwxyz' },
    alphabetazAZ: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    alphabetazAZ09: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
    alphabetazAZ09Sym: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*+-=?@^_.' },
    generate: function(){
      var generated = "";
      for (var i = 0; i < this.length; i++){
        generated += this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
      }
      if(this.nbChar > 0){
        this.message += "\n";
      }
      this.message += generated;
    },
    replaceXbyY: function(){
      var regexp = new RegExp(this.replaceX, this.flags);
      console.log('replaceXbyY: RegExp created:', regexp);
      this.message = this.message.replace(regexp, this.byY);
    },
    removeAllButX: function(){
      var regexp = new RegExp(this.dontRemoveX, this.flags);
      console.log('removeAllButX: RegExp created:', regexp);
      var matches = this.message.match(regexp) || [];
      console.log('removeAllButX: # of matches:', matches.length);
      this.message = matches.join('');
    },
    basicSlug: function(){
      this.message = this.message.replace(/[ \n\s\t]/gi, '-').replace(/-+/gi, '-').toLowerCase();
    },
  },
  computed: {
    nbChar: function () { return this.message.length },
    nbSpace: function () { return (this.message.match(/ /g) || []).length },
    nbLine: function () { return (this.message.match(/\n/g) || []).length+1 },
  }
});
