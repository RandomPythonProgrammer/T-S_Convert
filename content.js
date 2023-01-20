let path = browser.runtime.getURL("./dict.json");
let data = undefined;
let ready = false;

fetch(path).then((file) => {
    file.json().then((json) => {
        data = json;
    });
});

recursiveReplace(document);

function replaceMatches(input){
    let array = input.split("");
    for (let i = 0; i < array.length; i++){
        let char = array[i];
        if (dict.hasOwn(char)){
            array[i] = dict[char];
        }
    }
}

function recursiveReplace(element){
    if (element.childNodes.length == 0){
        console.log(eleemnt);
        console.log(element.innerHtml);
    }
    if (element.childNodes.length == 0 && element.innerHtml != undefined){
        console.log(element.innerHtml);
        element.innerHtml = replaceMatches(element.innerHtml);
        console.log(element.innerHtml);
        return;
    }
    for (let child of element.childNodes) {
        recursiveReplace(child);
    }
}