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
    data: players,
    dom: '<"wrapper"fitlp>',
    // columns header
    columns: [
      {searchable: false, orderable: false, render: function(data, type, player){
        return '<button class="btn btn-xs btn-default" onclick="app.addToMyTeamWithId(\''+player.id+'\')">Add</button>';
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

// create Vue app
const app = new App({
  el: '#mpg',
  data : {
    filter: {'id':'','firstname':'','lastname':''},
    teams: teams,
    players: players,
    positions: positions,
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
    getFcNote: function(player){ return fcNote(player); },
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
