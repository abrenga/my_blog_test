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
        image.setAttribute('class', 'btn ');
        cardDom.appendChild(image);



        cardDom.appendChild(this.createCardPosts(post));
        this.containerCard.appendChild(cardWrapper);
    },

    createCardPosts: function (post) {

        let postDom = document.createElement("div");
        postDom.setAttribute("class", "card-body");
        postDom.setAttribute('id', post.id);

        let title = document.createElement('h5');
        title.setAttribute('class', 'featurette-heading myCardTitle');
        title.innerHTML = post.title;
        postDom.appendChild(title);

        let info= document.createElement("span");
        info.setAttribute("class","myspan");
        info.innerHTML = post.info.date;
        postDom.appendChild(info);


        let paragraphPosts = document.createElement("p");
        paragraphPosts.setAttribute('class', 'lead myCard');
        paragraphPosts.innerHTML = this.extractPostBodyPreview(post);
        postDom.appendChild(paragraphPosts);

        let buttom = document.createElement("a");
        buttom.setAttribute('class', 'btn btn-primary');
        buttom.setAttribute('href', 'singolPost.html?id=' + post.id);
        buttom.innerHTML = "Leggi di più"
        postDom.appendChild(buttom);
        return postDom;
    },

    createSinglePost: function (post) {

        let imgE = document.createElement("img");
        imgE.setAttribute("src", post.image);
        imgE.setAttribute("height", "500px")
        

        let postContainer = document.createElement("div");
        postContainer.setAttribute("class", "card-body");


        let postTitle = document.createElement("h1");
        postTitle.setAttribute("class", "my-title card-title");
        postTitle.innerHTML = post.title;
        postContainer.appendChild(postTitle);

        let postNews = document.createElement("p");
        postNews.setAttribute("class", "text-mutedTwo");
        postNews.innerHTML = post.info.date + " / " + post.info.author;
        postContainer.appendChild(postNews);

        let hrSeparator = document.createElement("hr");
        hrSeparator.setAttribute("class", "featurette divider myh3");
        postContainer.appendChild(hrSeparator);



        let postText = document.createElement("p");
        postText.setAttribute("class", " my-content card-text");
        postText.innerHTML = post.content;
        postContainer.appendChild(postText);




        this.containerCard.appendChild(imgE);
        this.containerCard.appendChild(postContainer);



        return postContainer, imgE;

    },


    createAdvancedSinglePost: function (post) {

        let mainImage = document.createElement("img");
        mainImage.setAttribute("src", post.image);
        mainImage.setAttribute("height", "500px")
        

        let postContainer = document.createElement("div");
        postContainer.setAttribute("class", "card-body");


        let postTitle = document.createElement("h1");
        postTitle.setAttribute("class", "my-title card-title");
        postTitle.innerHTML = post.title;
        postContainer.appendChild(postTitle);

        let postNews = document.createElement("p");
        postNews.setAttribute("class", "text-mutedTwo");
        postNews.innerHTML = post.info.date + " / " + post.info.author;
        postContainer.appendChild(postNews);

        let hrSeparator = document.createElement("hr");
        hrSeparator.setAttribute("class", "featurette divider myh3 myz");
        postContainer.appendChild(hrSeparator);



        let contentContainer = document.createElement("div");
        contentContainer.setAttribute("class", " my-content card-text");
        postContainer.appendChild(contentContainer);

        this.renderPostContent(contentContainer, post);


        this.containerCard.appendChild(mainImage);
        this.containerCard.appendChild(postContainer);



        return postContainer, mainImage;
    },

    renderPostContent: function (container, post) {
        post.content.forEach((entry) => {

            switch(entry.type) {
                case "text":
                    const textNode = this.renderTextContent(post, entry);
                    container.appendChild(textNode);
                    break;
                case "image":
                    const imageNode = this.renderImageContent(post, entry);
                    container.appendChild(imageNode);
                    break;
                case "heading":
                    const headingNode = this.renderHeadingContent(post, entry);
                    container.appendChild(headingNode);
                    break;
            }

        });
    },

    renderTextContent: function (post, content) {
        let node = document.createElement("p");
        node.setAttribute("class", content.class);
        node.innerHTML = content.content;

        return node;
    },

    renderImageContent: function (post, content) {
        let node = document.createElement("img");
        node.setAttribute("class", content.class + " postImage");
        node.src = "posts/" + post.id + "/" + content.content;

        return node;
    },

    renderHeadingContent: function (post, content) {
        let node = document.createElement("h2");
        node.setAttribute("class", content.class);
        node.innerHTML = content.content;

        return node;
    },


    prendiPosts: function (posts) {

        posts.forEach(post => {
            getPost(post);

        });

    },

    extractPostBodyPreview: function (post) {
        let str = post.content[0].content;
        let newStr= str.substring(0,150);
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

    initSinglePost: async function () {
        let postId = this.getPostIdParameter();
        let post = await this.getPost(postId);
        this.createAdvancedSinglePost(post);
    },

    getPostIdParameter: function () {
        let postId = window.location.search.substr(4);
        return postId;
    },



  



}











