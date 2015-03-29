/* Utility Functions */

function padNum(num) {
  // Pads score 
  // TODO: Make this better
  if (num < 10) {
     return "00" + num;
  }
  else {
    if (num < 100) {
      return ("0") + num;
    }
    else return num;
  }
} // end padNum

function randNum(max) {
  return game.rnd.integerInRange(0,max);
} // end randNum