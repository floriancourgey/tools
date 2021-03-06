var app = new App({
  el: '#app-string',
  data: {
    message: '',
    alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@éèôöâä}{&,§%*$£',
    length: 20,
    replaceX: '\\s+',
    byY: '-',
    flags: 'gim',
    dontRemoveX: '[0-9]',
    alphabetaz: true,
    alphabetAZ: true,
    alphabet09: true,
    alphabetSym: false,
    caesarOffset: 13,
  },
  methods: {
    clear: function (){ this.message = '' },
    load: function(x){ this.message = x },
    upper: function () { this.message = _(this.message).toUpper() },
    lower: function () { this.message = _(this.message).toLower() },
    capitalize: function() {
      // from https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
      this.message = this.message.replace(
        /\w\S*/g,
        function(txt) {
          return _(txt.charAt(0)).toUpper() + _(txt.substr(1)).toLower();
        }
      );
    },
    camelCase: function () { this.message = _(this.message).camelCase() },
    snakeCase: function () { this.message = _(this.message).snakeCase() },
    reverse: function () { this.message = this.message.split('').reverse().join('') },
    reverseLines: function () { this.message = this.message.split('\n').reverse().join('\n') },
    base64encode: function () { this.message = btoa(this.message) },
    base64decode: function () { this.message = atob(this.message) },
    urlEncode: function(){ this.message = encodeURIComponent(this.message)},
    urlDecode: function(){ this.message = decodeURIComponent(this.message)},
    caesar: function(s, offset){
      return s.replace(/[a-zA-Z]/g,function(c){
        var start = (c <= 'Z') ? 65 : 97;
        return String.fromCharCode(start + (c.charCodeAt(0) - start + offset) % 26);
      });
    },
    caesarBruteforce: function(){
      var string = this.message;
      newMessage = '';
      for(var i=0 ; i<26; i++){
        newMessage += i+'. '+this.caesar(string, i)+'\n';
      }
      app.message = newMessage;
    },
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
    xml2Jxon: function(){
      this.message = JSON.stringify(JXON.stringToJs(this.message), null, 2);
    },
    adobeCampaignLog: function(){
      this.message = this.message.replace(/.+\t/g, ''); // remove everything until last tabulation
      this.reverseLines();
    },
    updateAlphabet: function(){
      this.alphabet = '';
      if(this.alphabetaz) this.alphabet += 'abcdefghijklmnopqrstuvwxyz';
      if(!this.alphabetaz) this.alphabet = this.alphabet.replace(/[a-z]/g, '');
      if(this.alphabetAZ) this.alphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if(!this.alphabetAZ) this.alphabet = this.alphabet.replace(/[A-Z]/g, '');
      if(this.alphabet09) this.alphabet += '0123456789';
      if(!this.alphabet09) this.alphabet = this.alphabet.replace(/[0-9]/g, '');
      if(this.alphabetSym) this.alphabet += '!#$%&*+-=?@^_.éèôöâä}{,§£';
      if(!this.alphabetSym) this.alphabet = this.alphabet.replace(/[!#$%&*+\-=?@^_\.éèôöâä}{,§£]/g, '');
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
      this.message = _(this.message.replace(/[ \n\s\t]/gi, '-').replace(/-+/gi, '-')).toLower();
    },
  },
  computed: {
    nbChar: function () { return this.message.length },
    nbSpace: function () { return (this.message.match(/ /g) || []).length },
    nbLine: function () { return (this.message.match(/\n/g) || []).length+1 },
  }
});
