"use strict";


let reminders = JSON.parse(localStorage.getItem()) || [];

let listRoot = document.querySelector("#list-root");
let listForm = document.querySelector("[data-list-form]");
let listInput = document.querySelector("[data-list-input]");

listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (listInput.nodeValue.trim() === ""){
        return;
    }
    reminders.push(listInput.nodeValue.trim());
    UpdateReminders();
    listInput.value = "";
});

function ReminderBox(items){
    let box = document.createElement("ul");
    items.foreach((item) => {
        let reminderBoxItem = document.createElement("li");
        reminderBoxItem.innerText = item;
        reminderBoxItem.classList.add("Reminder-Box-Item");
        reminderBoxItem.addEventListener("Click", removeItem);
        box.append(reminderBoxItem);
    });
    return box;
}

function removeItem(event){
    let removeItem = event.target.innerText;
    reminders = reminders.filter((item) => item !== removeItem);
    UpdateReminders();
}

function UpdateReminders(){ //inte klar ännu
    SaveList();
    listRoot.innerHTML = "";

}

function SaveList(){
    localStorage.setItem(LOCAL_STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
}
