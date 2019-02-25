{
  init: function(elevators, floors) {
    let up_pressed = floors.map(() => false)
    let down_pressed = floors.map(() => false)
    
    floors.forEach(floor => {
      floor.on("up_button_pressed", () => {
        up_pressed[floor.floorNum()] = true
      })
      floor.on("down_button_pressed", () => {
        down_pressed[floor.floorNum()] = true
      })
    })
    elevators.forEach(elevator => {
      elevator.on("passing_floor", (floorNum, direction) => {
        if (elevator.getPressedFloors().includes(floorNum)){
          elevator.goToFloor(floorNum, true)
        }
      })
      elevator.on("idle", () => {
        if (elevator.getPressedFloors().length) {
          elevator.goToFloor(elevator.getPressedFloors()[0])
        } else {
          let floor = up_pressed.indexOf(true) 
          if (floor < 0) {
            floor = down_pressed.indexOf(true)
          }
          if (floor < 0){
            floor = 0
          }
          elevator.goToFloor(floor)
        }
      })
      elevator.on("stopped_at_floor", floorNum => {
        up_pressed[floorNum] = false
        down_pressed[floorNum] = false
      })
    })
  },
  update: function(dt, elevators, floors) {
  }
}

