var blog = {

    containerCard: document.getElementById("container-posts"),

    createCard: function (post) {
        let cardWrapper = document.createElement("div");
        cardWrapper.setAttribute("class","col");
        
        let cardDom = document.createElement("div");
        cardDom.setAttribute("class", "card Card-style");
        cardWrapper.appendChild(cardDom);



        let image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        image.setAttribute("src",post.image);
        cardDom.appendChild(image);
        


        cardDom.appendChild(this.createCardPosts(post));
        this.containerCard.appendChild(cardWrapper);
    },

    createCardPosts: function (post) {

        let postDom = document.createElement("div");
        postDom.setAttribute("class","card-body");
        postDom.setAttribute('id', post.id);

        let title = document.createElement('h5');
        title.setAttribute('class', 'card-title');
        title.innerHTML = post.title;
        postDom.appendChild(title);
        
        let paragraphPosts =  document.createElement("p");
        paragraphPosts.setAttribute('class', 'card-text');
        paragraphPosts.innerHTML =this.extractPostBodyPreview(post);
        postDom.appendChild(paragraphPosts);

        let buttom =  document.createElement("a");
        buttom.setAttribute('class', 'btn btn-primary');
        buttom.innerHTML="leggi i più"
        postDom.appendChild(buttom);
        return postDom;
    },


    showPosts: function(post){

        this.posts.forEach(post => {
            this.createCard(post);
            
        });
    },

    extractPostBodyPreview: function(post){
        let str = post.content;
        let newStr = str.substring(0,150);
        return newStr+ "...";
        
    }


}


async function getPostsIndex() {
    let response = await fetch('posts/index.json');
    let posts = await response.json();
    posts.forEach(post=>{
        getPost(post);
    })
    
    
    
}

async function getPost(slug) {
    let response = await fetch('posts/' + slug + '/post.json');
    let post = await response.json();
        blog.createCard(post);



    
}


getPost("my-first-post");

