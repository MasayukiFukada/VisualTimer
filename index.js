"use strict";

/**
d88888b db    db d88888b d8b   db d888888b 
88'     88    88 88'     888o  88 `~~88~~' 
88ooooo Y8    8P 88ooooo 88V8o 88    88    
88~~~~~ `8b  d8' 88~~~~~ 88 V8o88    88    
88.      `8bd8'  88.     88  V888    88    
Y88888P    YP    Y88888P VP   V8P    YP    
 */

var visualTimer = null;
$(window).on("load", function () {
  visualTimer = new VisualTimer(200, 200, 100);
})

var timerMinutes = 3;
// 左クリック
$("#timerCanvas").on("click", function () {
  isTimerActive = true;
  visualTimer.setTimer(timerMinutes);
  startTimer();
})

// 右クリック
$("#timerCanvas").on("contextmenu", function () {
  isTimerActive = false;
  $("#settings").dialog({
    modal: true,
    buttons: {
      "確認": function () {
        $(this).dialog("close");
        let setMinutes = $("#inputMinutes")[0].value;
        if (setMinutes == null || setMinutes == "") {
          timerMinutes = 3;
        } else {
          var input = Number(setMinutes);
          if (typeof input != "number") {
            timerMinutes = 3;
            return;
          }
          timerMinutes = input;
        }

      }
    }
  });
  return false;
})

/**
d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db 
88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 
88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 
88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88 
88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 
YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P 
 */

var isTimerActive = false;
var timer = null;
// 定期的に時間イベントを発生させる
function startTimer() {
  if (!isTimerActive) {
    return;
  }

  visualTimer.tickTime().then(resolve => {
    copyBufferBackToFront(resolve);
  });
  timer = setTimeout(startTimer, 100);
}

/** バックバッファのコピー */
function copyBufferBackToFront(timerCanvas) {
  let canvas = document.getElementById('timerCanvas');
  let context = canvas.getContext('2d');
  context.drawImage(timerCanvas, 0, 0);
}