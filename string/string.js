var app = new App({
  el: '#app-string',
  data: {
    message: '',
    alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    length: 20,
    replaceX: '\\s+',
    byY: '-',
    flags: 'gim',
    dontRemoveX: '[0-9]',
    alphabetaz: true,
    alphabetAZ: true,
    alphabet09: true,
    alphabetSym: false,
  },
  methods: {
    clear: function (){ this.message = '' },
    load: function(x){ this.message = x },
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
    alphabetazAZ09: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
    alphabetazAZ09Sym: function(){ this.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*+-=?@^_.' },
    updateAlphabet: function(){
      this.alphabet = '';
      if(this.alphabetaz) this.alphabet += 'abcdefghijklmnopqrstuvwxyz';
      if(!this.alphabetaz) this.alphabet = this.alphabet.replace(/[a-z]/g, '');
      if(this.alphabetAZ) this.alphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if(!this.alphabetAZ) this.alphabet = this.alphabet.replace(/[A-Z]/g, '');
      if(this.alphabet09) this.alphabet += '0123456789';
      if(!this.alphabet09) this.alphabet = this.alphabet.replace(/[0-9]/g, '');
      if(this.alphabetSym) this.alphabet += '!#$%&*+-=?@^_.';
      if(!this.alphabetSym) this.alphabet = this.alphabet.replace(/[!#$%&*+\-=?@^_\.]/g, '');
    },
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
