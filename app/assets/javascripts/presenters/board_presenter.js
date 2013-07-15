//This is the presenter used when playing a game
app.Presenters.BoardPresenter = function(options) {
  this.cells = [];
  this.boardSize = options.boardSize || 100;
  for (var i = this.boardSize -1; i >= 0; i--) {
    this.cells.push({});
  };
}

app.Presenters.BoardPresenter.prototype = {
  presenter: function(turns, deployments) {
    this.mergeDeployments(deployments);
    this.mergeTurns(turns);
    return {cells: this.cells}
  },
  //take an array of turns and uses each position to place it across the cells array
  mergeTurns: function(turns) {
    var self = this;
    _.each(turns, function(obj) {
      self.cells[obj.position].status = obj.status;
    });
  },
  //takes a nested array of ship positions, and assigns it across the cells
  mergeDeployments: function(deployments) {
    var self = this;
    _.each(deployments, function(ship, index) {
      _.each(ship.positions, function(position, index, list) {
        self.cells[position].orientation = ship.orientation;
        self.cells[position].segment = self.getSegmentType(index, list.length -1);
      })
    });
  },
  //used to detect if the index in the array is the Head, middle or tail
  getSegmentType: function(index, lastIndex) {
    var segmentType = 'middle';
    if (index === 0) segmentType = 'head';
    if (index === lastIndex) segmentType = 'tail';
    if (index === 0 && index === lastIndex ) segmentType = 'head tail';
    return segmentType;
  }
}