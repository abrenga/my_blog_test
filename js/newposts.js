var blog = {

    containerCard: document.getElementById("container-posts"),

    createCard: function (post) {
        let cardWrapper = document.createElement("div");
        cardWrapper.setAttribute("class", "col");

        let cardDom = document.createElement("div");
        cardDom.setAttribute("class", "card Card-style");
        cardWrapper.appendChild(cardDom);



        let image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        image.setAttribute("src", post.image);
        cardDom.appendChild(image);



        cardDom.appendChild(this.createCardPosts(post));
        this.containerCard.appendChild(cardWrapper);
    },

    createCardPosts: function (post) {

        let postDom = document.createElement("div");
        postDom.setAttribute("class", "card-body");
        postDom.setAttribute('id', post.id);

        let title = document.createElement('h5');
        title.setAttribute('class', 'card-title');
        title.innerHTML = post.title;
        postDom.appendChild(title);

        let paragraphPosts = document.createElement("p");
        paragraphPosts.setAttribute('class', 'card-text');
        paragraphPosts.innerHTML = this.extractPostBodyPreview(post);
        postDom.appendChild(paragraphPosts);

        let buttom = document.createElement("a");
        buttom.setAttribute('class', 'btn btn-primary');
        buttom.innerHTML = "leggi i più"
        postDom.appendChild(buttom);
        return postDom;
    },


    prendiPosts: function (posts) {

        posts.forEach(post => {
            getPost(post);

        });

    },

    extractPostBodyPreview: function (post) {
        let str = post.content;
        let newStr = str.substring(0, 150);
        return newStr + "...";
    }
}


async function getPostsIndex() {
    let response = await fetch('posts/index.json');
    let posts = await response.json();

    return posts;
}

async function getPost(slug) {
    let response = await fetch('posts/' + slug + '/post.json');
    let post = await response.json();
    post.image = "posts/" + slug + "/" + post.image;

    return post;
}

async function getLatestPosts(slugs) {
    let promises = [];

    slugs.forEach((slug) => {
        const promise = getPost(slug);
        promises.push(promise);
    });

    return await Promise.all(promises);
}

async function init() {
    const postsIndex = await getPostsIndex();

    const selectedSlugs = postsIndex.slice(-3);
    const posts = await getLatestPosts(selectedSlugs);

    posts.forEach((post) => blog.createCard(post));
}

init().then();
