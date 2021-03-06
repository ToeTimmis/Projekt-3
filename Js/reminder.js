"use strict";

const LOCAL_STORAGE_KEY_REMINDERS = "app.reminders.advanced";

let reminders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_REMINDERS)) || [];

let listRoot = document.querySelector("#list-root");
let listForm = document.querySelector("[data-list-form]");
let listInput = document.querySelector("[data-list-input]");
let timeInput = document.querySelector("[time-input]");

let reminderSound = new Audio("Js/Alarm.mp3");

listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (listInput.value.trim() === ""){
        return;
    }
    reminders.push(CreateReminder(listInput.value.trim(), timeInput.value));
    UpdateReminders();
    listInput.value = "";
    timeInput.value = "";
});

function CreateReminder(name, time) {
    return {
      id: Date.now().toString(),
      name: name,
      time: time,
      bold: false,
    };
  }

function Reminderlist(items){
    let list = document.createElement("ul");
    items.forEach((item) => {
        let reminderlistItem = document.createElement("li");
        if (item.bold == true){
            reminderlistItem.innerHTML = item.name.bold() + " " + item.time.bold();
        }
        else {
            reminderlistItem.innerHTML = item.name + " " + item.time;
        }
        reminderlistItem.setAttribute("data-id", item.id);
        reminderlistItem.classList.add("reminder-list-item");
        reminderlistItem.addEventListener("click", removeItem);
        list.append(reminderlistItem);
    });
    return list;
}

function removeItem(event){
    let removeItem = event.target.getAttribute("data-id");
    reminders = reminders.filter((item) => item.id !== removeItem);
    UpdateReminders();
}

function UpdateReminders(){ 
    SaveList();
    listRoot.innerHTML = "";
    listRoot.append(Reminderlist(reminders));
}

function SaveList(){
    localStorage.setItem(LOCAL_STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
}

function clockTime(item){
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    let currentSecond = currentTime.getSeconds();


    currentHour = (currentHour < 10 ? "0" : "") + currentHour;
    currentMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
    currentSecond = (currentSecond < 10 ? "0" : "") + currentSecond;

    let currentTimeDetector = currentHour.toString() + ":" + currentMinute.toString();

    for (let i = 0; i < item.length; i++){
        if(currentTimeDetector == item[i].time){
            reminderSound.play();
            item[i].bold = true;
            UpdateReminders();
        }
    }
    

    let timeDisplayed = currentHour + ":" + currentMinute + ":" + currentSecond;
    document.getElementById("clock").firstChild.nodeValue = timeDisplayed;
}

clockTime(reminders);
setInterval("clockTime(reminders)", 1000);

UpdateReminders();