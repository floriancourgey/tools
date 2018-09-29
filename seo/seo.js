var app = new App({
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
  computed: {
    nbChar: function () { return this.message.length },
  }
});
