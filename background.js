browser.runtime.onInstalled.addListener(()=>{
    browser.storage.sync.set({"on": true});
});