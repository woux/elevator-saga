{
  init: function(elevators, floors) {
      let elevator = elevators[0]

      elevators.forEach(elevator => {
        
      })

      elevator.on("idle", function() {
        for (let floor = 0; floor < floors.length; floor++) {
          elevator.goToFloor(floor)
        }
      })
  },
  update: function(dt, elevators, floors) {
  }
}

