let path = browser.runtime.getURL("dict.json");
let dict = undefined;
let ready = false;
browser.storage.sync.get("on").then((value) => {
    if (value["on"]) {
        fetch(path).then((file) => {
            file.json().then((json) => {
                dict = json;
        
                let configuration = {
                    "childList": true,
                    "subtree": true
                };
                
                if (document.innerHTML != null){
                    replace(document);
                }
        
                let observer = new MutationObserver((mutations, observer) => {
                    for (let mutation of mutations){
                        replace(mutation.target);
                    }
                });
                
                observer.observe(document, configuration);
            });
        });
    }
});

function replaceMatches(input){
    let array = input.split("");
    for (let i = 0; i < array.length; i++){
        let char = array[i];
        if (dict.hasOwnProperty(char)){
            array[i] = dict[char];
        }
    }
    return array.join('');
}

function replace(element){
    if (element.children.length == 0 && !element.classList.contains("translated")) {
        element.classList.add("translated");
        element.textContent = replaceMatches(element.textContent);
    } else {
        for (let child of element.children){
            replace(child);
        }
    }
}

