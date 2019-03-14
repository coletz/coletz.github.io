class GithubApi {
    constructor(){}

    onRepoDownloaded(repo){};

    initGithub(){
        this.loadRepos("coletz");
        this.loadRepos("dcoletto");
    }

    loadRepos(username){
        fetch("https://api.github.com/users/" + username + "/repos")
            .then(data => data.json())
            .then(json => json.map(repoObj => new Repo(repoObj)))
            .then(repos => repos.forEach(repo => this.onRepoDownloaded(repo)))
            .catch(e => console.log("Error: " + e));
    }
}

class Repo {
    constructor({id, html_url, name, description, language, owner}) {
        this.repo_id = id;
        this.html_url = html_url;
        this.name = name;
        this.description = description;
        this.lang = language || "NoLang";
        this.owner = new Owner(owner);
    }
}

class Owner {
    constructor({id, html_url, login}){
        this.owner_id = id;
        this.html_url = html_url;
        this.login = login;
    }
}

let initialized = false;
const github = new GithubApi();

function onInit(){
    if(initialized) return;
    initialized = true;

    const cardColumn = document.getElementById("card-column");

    github.onRepoDownloaded = (repo) => {
        const secondaryCard = document.createElement("div");
        secondaryCard.id = "card-" + repo.repo_id;
        secondaryCard.classList.add("base-card");
        secondaryCard.classList.add("secondary-card");

        const author = document.createElement("p");
        const authorLink = document.createElement("a");
        author.classList.add("secondary-card-author");
        authorLink.href = repo.owner.html_url;
        authorLink.target = "_blank";
        authorLink.rel = "noopener noreferrer";
        authorLink.innerText = "@" + repo.owner.login;
        author.appendChild(authorLink);
        secondaryCard.appendChild(author);

        const title = document.createElement("div");
        const titleSpan = document.createElement("span");
        titleSpan.innerText = repo.name;
        title.classList.add("secondary-card-title");
        title.appendChild(titleSpan);
        secondaryCard.appendChild(title);

        const desc = document.createElement("p");
        desc.innerText = repo.description;
        desc.classList.add("secondary-card-desc");
        secondaryCard.appendChild(desc);

        const lang = document.createElement("p");
        lang.innerText = "{ "+repo.lang+" }";
        lang.classList.add("secondary-card-lang");
        secondaryCard.appendChild(lang);

        secondaryCard.onclick = (event) => {
            const tagName = event.target.tagName.toLowerCase();
            if(tagName !== "a") {
                window.open(repo.html_url);
            }
        };

        cardColumn.appendChild(secondaryCard);
    };
    github.initGithub();
}

// Calling the script twice (here and on the body load) since it is deferred
// and it's not called in the onload (probably?)
// Maybe some browser doesn't support deferred, so let's do this
onInit();
