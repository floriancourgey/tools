var appSeo = new Vue({
  el: '#seo',
  data: {
    title: '',
    description: '',
    type: 'article',
    message: '',
    author: '',
    image: 'https://',
    twitterId: '@',
    showComments: true,
    language: 'en',
  },
  methods: {
    l: function(code){return translations[this.language][code]}
  },
  computed: {
    nbChar: function () { return this.message.length },
  }
});
