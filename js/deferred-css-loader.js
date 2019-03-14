function loadCss(cssPath){
    const stylesheet = document.createElement('link');
    stylesheet.href = cssPath;
    stylesheet.rel = 'stylesheet';
    if(cssPath.endsWith(".css")){
        stylesheet.type = 'text/css';
    }
    document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

/* Load common before specific so override will work properly */
loadCss("https://fonts.googleapis.com/css?family=Roboto:300,400");
loadCss("css/common.css");
loadCss("css/main-card.css");
loadCss("css/secondary-card.css");
