var app = new Vue({
  el: '#app',
  data: {
    message: '',
    alphabet: 'abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVW0123456789',
    length: 20,
    replaceX: '\\s+',
    byY: '-',
    flags: 'gim',
    dontRemoveX: '[0-9]',
  },
  methods: {
    clear: function () { this.message = '' },
    lorem: function () { this.message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id turpis at orci eleifend blandit. In ut interdum magna. Quisque tincidunt sagittis risus, eget varius tortor aliquam ut. Cras rhoncus, leo id pharetra lacinia, mauris lectus tincidunt arcu, ac blandit neque ex in nisi. Nunc a elit ut purus laoreet imperdiet a quis metus. Curabitur laoreet, lorem in consectetur malesuada, sem lectus malesuada urna, eget rhoncus magna arcu nec tortor. Suspendisse lacinia sit amet enim ac condimentum. Vestibulum vehicula lorem libero, quis pellentesque nulla laoreet ac.\n\nAliquam orci sapien, consectetur et orci ut, vestibulum fringilla enim. Donec eget ante odio. Fusce ornare molestie sodales. Curabitur dignissim malesuada ipsum, quis ultricies justo molestie pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi gravida a ligula vitae interdum. Aliquam elementum tortor et tortor facilisis, id feugiat risus venenatis. Mauris cursus auctor arcu at interdum.' },
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
    alphabetaz: function(){ this.alphabet = 'abcdefghijklmnopqrstuvw' },
    alphabetazAZ: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVW' },
    alphabetazAZ09: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVW0123456789' },
    alphabetazAZ09Sym: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVW0123456789!#$%&*+-=?@^_.' },
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
