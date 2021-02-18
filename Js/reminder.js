"use strict";

const LOCAL_STORAGE_KEY_REMINDERS = "app.reminders.advanced";

let reminders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_REMINDERS)) || [];

let listRoot = document.querySelector("#list-root");
let listForm = document.querySelector("[data-list-form]");
let listInput = document.querySelector("[data-list-input]");

listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (listInput.Value.trim() === ""){
        return;
    }
    reminders.push(CreateReminder(listInput.Value.trim()));
    UpdateReminders();
    listInput.value = "";
});

function CreateReminder(name) {
    return {
      id: Date.now().toString(),
      name: name,
    };
  }

function ReminderBox(items){
    let box = document.createElement("ul");
    items.foreach((item) => {
        let reminderBoxItem = document.createElement("li");
        reminderBoxItem.innerText = item.name;
        reminderBoxItem.setAttribute("data-id", item.id)
        reminderBoxItem.classList.add("Reminder-Box-Item");
        reminderBoxItem.addEventListener("Click", removeItem);
        box.append(reminderBoxItem);
    });
    return box;
}

function removeItem(event){
    let removeItem = event.target.getAttribute("data-id");
    reminders = reminders.filter((item) => item.id !== removeItem);
    UpdateReminders();
}

function UpdateReminders(){ 
    SaveList();
    listRoot.innerHTML = "";
    listRoot.append(ReminderBox(reminders));
}

function SaveList(){
    localStorage.setItem(LOCAL_STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
}

UpdateReminders();