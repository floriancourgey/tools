function fcNote(player){
  var rate = parseFloat(player.stats.avgRate);
  var selection = parseFloat(player.stats.percentageStarter);
  var goals = parseFloat(player.stats.sumGoals)+1;
  if(!rate || !selection || !goals){
    return '-';
  }
  return Math.round(rate*selection*(1+goals)*100);
}
// create Datatable for Mercato
datatable = null;
$(function(){
  datatable = $('#mercato').DataTable( {
    data: [],//players,
    dom: 'itlp',
    // columns header
    columns: [
      {searchable: false, orderable: false, render: function(data, type, player){
        var html = '';
        html += '<button class="btn btn-xs btn-primary" onclick="app.addToMyTeamWithId(\''+player.id+'\')">Add</button>';
        html += '<button class="btn btn-xs btn-default" onclick="app.markId(this, \''+player.id+'\')">Mark</button>';
        return html;
      }},
      {render:function(data, row, player){
        var f = player.firstname || '';
        var l = player.lastname || '';
        return f+' <strong>'+l+'</strong>';
      }},
      {data:'teamId', render: function(data){return teams[data].name}},
      {data: 'position',
        createdCell:function (td, data, rowData, row, col) { $(td).css('background', positions[data].color)},
        render: function(data){ return positions[data].name;}},
      {data: 'stats.avgRate'},
      {data: 'stats.percentageStarter'},
      {data: 'stats.sumGoals'},
      {data: 'quotation'},
      {render: function(data, type, player){return fcNote(player);}},
    ],
    order: [[ 7, 'desc' ]],
    pageLength: 50,
    initComplete: function(settings, json) {
      setTimeout(function(){
        app.refreshStats();
      }, 100);
    }
  });
  // filters TODO refacto
  $('#filter-name').on('keyup change', function () {
    var col = datatable.columns(1);
    if(!this.value || this.value.length < 1){
      col.search('');
      datatable.draw();
      return;
    }
    if(datatable.search() !== this.value) {
      col.search(this.value);
      datatable.draw();
    }
  });
  $('#filter-team').on('keyup change', function () {
    var col = datatable.columns(2);
    if(!this.value || this.value.length < 1){
      col.search('');
      datatable.draw();
      return;
    }
    if(datatable.search() !== this.value) {
      col.search(this.value);
      datatable.draw();
    }
  });
  $('#filter-position').on('keyup change', function () {
    var col = datatable.columns(3);
    if(!this.value || this.value.length < 1){
      col.search('');
      datatable.draw();
      return;
    }
    if(datatable.search() !== this.value) {
      col.search(this.value);
      datatable.draw();
    }
  });
});

// update on 20181210 to add other Leagues
var myPlayersFromLigue1 = getJsonFromStorage('com.floriancourgey.mpg.my_team');
if(myPlayersFromLigue1){
  setJsonInStorage('com.floriancourgey.mpg.my_team_1', myPlayersFromLigue1);
  localStorage.removeItem('com.floriancourgey.mpg.my_team');
}

// set default championshipId = 1
var championshipId = getJsonFromStorage('com.floriancourgey.mpg.championshipId');
if(!championshipId || ![1,2,3].contains(championshipId)){
  championshipId = 1;
  setJsonInStorage('com.floriancourgey.mpg.championshipId', championshipId);
}


// create Vue app
const app = new App({
  el: '#mpg',
  data : {
    championshipId: championshipId,
    filter: {'id':'','firstname':'','lastname':''},
    teams: teams,
    players: [],//players,
    positions: positions,
    myPlayers: [],//getJsonFromStorage('com.floriancourgey.mpg.my_team') || [],
    season: 2018,
    lastStatsUpdate: null,
  },
  methods:{
    refreshStats: function(){
      var url = 'https://api.monpetitgazon.com/stats/championship/'+this.championshipId+'/'+this.season;
      $.getJSON(url, function(data){
        app.players = data;
        app.onChampionshipChange();
        app.lastStatsUpdate = moment();
      });
    },
    onChampionshipChange: function(){
      this.championshipId = parseInt(this.championshipId);
      if(this.championshipId < 1){
        return;
      }
      // update datatable mercato
      datatable.clear();
      datatable.rows.add(this.players);
      datatable.draw();
      // update vue players
      // this.players = players[this.championshipId];
      // update vue my players
      var key = 'com.floriancourgey.mpg.my_team_'+this.championshipId;
      this.myPlayers = getJsonFromStorage(key) || [];
      // update local storage championshipId
      setJsonInStorage('com.floriancourgey.mpg.championshipId', this.championshipId);
    },
    isInMyTeam: function(player){
      for(var p of this.myPlayers){
        if(p.id == player.id) return true;
      }
      return false;
    },
    addToMyTeam: function(player){
      this.myPlayers.push(player);
      var key = 'com.floriancourgey.mpg.my_team_'+this.championshipId;
      setJsonInStorage(key, this.myPlayers);
    },
    addToMyTeamWithId: function(playerId){
      var player = this.players.find(function(element) {
        return playerId === element.id;
      });
      return this.addToMyTeam(player);
    },
    removeFromMyTeam: function(player){
      var index = this.myPlayers.indexOf(player);
      if (index > -1) {
        this.myPlayers.splice(index, 1);
        var key = 'com.floriancourgey.mpg.my_team_'+this.championshipId;
        setJsonInStorage(key, this.myPlayers);
      }
    },
    showPlayer: function(player){
      var f = this.filter;
      return true;
    },
    getFcNote: function(player){ return fcNote(player); },
    markId: function(element, playerId){
      var parentRow = $(element).parents('tr');
      var className = 'marked';
      var key = 'com.floriancourgey.mpg.marked';
      var marked = getJsonFromStorage(key) || [];
      if(marked.contains(playerId)){
        var index = marked.indexOf(playerId);
        marked.splice(index, 1);
        parentRow.removeClass(className);
      } else {
        marked.push(playerId);
        parentRow.addClass(className);
      }
      setJsonInStorage(key, marked);
    }
  },
});
// update myPlayers with data from dataset
var newPlayers = [];
for(var myPlayer of app.myPlayers){
  for(var player of players){
    if(player.id == myPlayer.id){
      newPlayers.push(player);
      break;
    }
  }
}
console.log('app.myPlayers', app.myPlayers);
console.log('newPlayers', newPlayers);
app.myPlayers = newPlayers;
