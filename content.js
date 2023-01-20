let path = browser.runtime.getURL("./dict.json");
let dict = undefined;
let ready = false;

fetch(path).then((file) => {
    file.json().then((json) => {
        dict = json;

        let configuration = {
            "attributes": true,
            "childList": true,
            "subtree": true
        };
        
        if (document.innerHTML != null){
            replace(document);
        }

        let observer = new MutationObserver((mutations, observer) => {
            for (let mutation of mutations){
                if (!mutation.target.classList.contains("translated")){
                    replace(mutation.target);
                    mutation.target.classList.add("translated");
                }
            }
        });
        
        observer.observe(document, configuration);
    });
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
    element.innerHTML = replaceMatches(element.innerHTML);
}