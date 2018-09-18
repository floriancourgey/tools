var appSeo = new Vue({
  el: '#seo',
  data: {
    title: '',
    description: '',
    type: 'article',
    message: '',
    author: '',
    image: '',
    twitterId: '',
    language: 'en',
  },
  methods: {
    l: function(code){return translations[this.language][code]}
  }
});
