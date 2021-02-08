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

function UpdateReminders(){ //inte klar ännu
    SaveList();
    listRoot.innerHTML = "";

}

function SaveList(){
    localStorage.setItem(LOCAL_STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
}
