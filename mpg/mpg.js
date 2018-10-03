// format players for Datatable (add team name, fc.com note...)
var datasetForMercato = [];
for(var i in players){
  var player = players[i];
  // console.log(player);
}
$(function(){
  $('#mercato').DataTable( {
    data: players,
    columns: [
      {title: 'Actions', searchable: false, orderable: false, render: function(data, type, player){
        return '<button class="btn btn-xs btn-default" onclick="app.addToMyTeamWithId(\''+player.id+'\')">Add</button>';
      }},
      {title: 'Name', render:function(data, row, player){
        var f = player.firstname || '';
        var l = player.lastname || '';
        return f+' <strong>'+l+'</strong>';
      }},
      {title: 'Team', data:'teamId', render: function(data){return teams[data].name}},
      {title: 'Position', data: 'position',
        createdCell:function (td, data, rowData, row, col) { $(td).css('background', positions[data].color)},
        render: function(data){ return positions[data].name;}},
      {title: 'Avg rate /10', data: 'stats.avgRate'},
      {title: 'Selections', data: 'stats.percentageStarter'},
      {title: 'Goals', data: 'stats.sumGoals'},
      {title: 'Quotation', data: 'quotation'},
    ],
    order: [[ 7, 'desc' ]],
    pageLength: 50,
  });
});

var app = new App({
  el: '#mpg',
  data : {
    filter: {'id':'','firstname':'','lastname':''},
    teams: teams,
    players: players,
    myPlayers: getJsonFromStorage('com.floriancourgey.mpg.my_team') || [],
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
      setJsonInStorage('com.floriancourgey.mpg.my_team', this.myPlayers);
    },
    addToMyTeamWithId: function(playerId){
      var player = players.find(function(element) {
        return playerId === element.id;
      });
      return this.addToMyTeam(player);
    },
    removeFromMyTeam: function(player){
      var index = this.myPlayers.indexOf(player);
      if (index > -1) {
        this.myPlayers.splice(index, 1);
        setJsonInStorage('com.floriancourgey.mpg.my_team', this.myPlayers);
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
