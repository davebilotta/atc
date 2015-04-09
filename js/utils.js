/* Utility Functions */

function pad(num) {
  // Pads score to 3 digits - probably a better way to do this

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

function log(msg) {
  if (logMessages) {
    console.log(msg);
  }
}