"use strict";

function genshinCheckIn() {
  let windowAsync = chrome.windows.create({
    url: "https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=e202102251931481&lang=en-us",
    allowScriptsToClose: true,
    type: "popup",
    width: 1,
    height: 1
  });
  // then execute a script in the tab to click every button
  windowAsync.then((w) => {
    setTimeout(() => {
      chrome.tabs.executeScript(w.tabs[0].id, { file: "genshinCheckIn.js" });
      chrome.notifications.create("genshin-hoyolab", {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icons/primogem.png"),
        title: "HoYoLab Check-In",
        message: "Successfully checked in to HoYoLab",
      });
      chrome.storage.local.set({genshinCheckIn: Math.floor(Date.now() / 1000)});
    }, 1500);
  })
}

let timeGenshin = 0;
let createdInterval = false
function checkGenshin() {
  if (!timeGenshin || ((Date.now() / 1000) - timeGenshin) > 86400000) {
    genshinCheckIn();
  }
}
chrome.runtime.onStartup.addListener(() => {
  console.log("Genshin Impact Check In extension installed");
  chrome.storage.local.get("genshinCheckIn").then((result) => {
    timeGenshin = result.genshinCheckIn || 0;
  })

  if (!createdInterval) {
    createdInterval = true;
    checkGenshin();
    setInterval(checkGenshin, 2000)
  }

});