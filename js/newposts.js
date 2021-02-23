var blog = {

    containerCard: document.getElementById("container-posts"),

    createCard: function (post) {
        let cardWrapper = document.createElement("div");
        cardWrapper.setAttribute("class", "col");

        let cardDom = document.createElement("div");
        cardDom.setAttribute("class", "card Card-style");
        cardWrapper.appendChild(cardDom);



        let image = document.createElement("img"); 
        image.setAttribute("src", post.image);
        image.setAttribute('class', 'btn btn-primary');
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
        buttom.setAttribute('href', 'singolPost.html?id=' + post.id);
        buttom.innerHTML = "leggi i più"
        postDom.appendChild(buttom);
        return postDom;
    },

    createSinglePost: function (post) {

        let postImage = document.createElement("div");
        postImage.setAttribute("class","col-md-8 myjumboT");
        let imgE =document.createElement("img");
        imgE.setAttribute("src", post.image);
        postImage.appendChild(imgE);
        this.containerCard.appendChild(postImage);
        return postImage;



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
    },

    getPostsIndex: async function () {
        let response = await fetch('posts/index.json');
        let posts = await response.json();

        return posts;
    },


    getPost: async function (slug) {
        let response = await fetch('posts/' + slug + '/post.json');
        let post = await response.json();
        post.image = "posts/" + slug + "/" + post.image;

        return post;
    },

    getLatestPosts: async function (slugs) {
        let promises = [];

        slugs.forEach((slug) => {
            const promise = this.getPost(slug);
            promises.push(promise);
        });

        return await Promise.all(promises);
    },

    init: async function () {
        const postsIndex = await this.getPostsIndex();

        const selectedSlugs = postsIndex.slice(-4);
        const posts = await this.getLatestPosts(selectedSlugs);

        posts.forEach((post) => this.createCard(post));
    },

    initSinglePost : async function () {
        let postId = this.getPostIdParameter();
        let post = await this.getPost(postId);
        this.createSinglePost(post);
    },

    getPostIdParameter : function () {
        let postId = window.location.search.substr(4);
        return postId;
    },

  

}











