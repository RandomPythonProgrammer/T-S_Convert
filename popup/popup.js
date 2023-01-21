let button = document.createElement("button");
let body = document.getElementsByTagName("body")[0];
let on = false;
browser.storage.sync.get("on").then((value) => {
    on = value["on"];
    updateButton(button);
});

function updateButton(button){
    if (on){
        button.textContent = "Press To Turn Off";
    } else {
        button.textContent = "Press To Turn On";
    }
}

button.addEventListener("click", (event) => {
    on = !on;
    updateButton(event.target);
    browser.storage.sync.set({"on": on});
});

body.appendChild(button);