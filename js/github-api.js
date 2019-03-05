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
