var hasStorage = typeof(Storage) !== "undefined";
function setItemInStorage(dataKey, data){
  if(!hasStorage) return;
  localStorage.setItem(dataKey, JSON.stringify(data));
}
function getItemFromStorage(dataKey){
  if(!hasStorage) return;
  var data = localStorage.getItem(dataKey);
  return data? JSON.parse(data): null ;
}

var app = new App({
  el: '#crack',
  data : {
    filter: {'id':'','firstname':'','lastname':''},
    teams: teams,
    players: players,
    myPlayers: getItemFromStorage('com.floriancourgey.mpg.my_team') || [],
  },
  methods:{
    isInMyTeam: function(player){
      for(var p of this.myPlayers){
        if(p.id == player.id) return true;
      }
      return false;
    },
    addToMyTeam: function(player){
      this.myPlayers.push(player);
      setItemInStorage('com.floriancourgey.mpg.my_team', this.myPlayers);
    },
    removeFromMyTeam: function(player){
      var index = this.myPlayers.indexOf(player);
      if (index > -1) {
        this.myPlayers.splice(index, 1);
        setItemInStorage('com.floriancourgey.mpg.my_team', this.myPlayers);
      }
    },
    showPlayer: function(player){
      var f = this.filter;
      return true;
    },
    getFcNote: function(player){
      var rate = parseFloat(player.stats.avgRate);
      var selection = parseFloat(player.stats.percentageStarter);
      var goals = parseFloat(player.stats.sumGoals)+1;
      if(!rate || !selection || !goals){
        return '-';
      }
      return Math.round(rate*selection*(1+goals)*100);
    },
    getDetailsFcNote: function(player){
      var rate = parseFloat(player.stats.avgRate);
      var selection = parseFloat(player.stats.percentageStarter);
      var goals = parseFloat(player.stats.sumGoals)+1;
      if(!rate || !selection || !goals){
        return '-';
      }
      return rate+'*'+selection+'*'+goals+'*100';
    },
  },
});
