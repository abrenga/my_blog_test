var blog = {

    containerCard: document.getElementById("container-posts"),

    createCard: function (post) {

        let cardDom = document.createElement("div");
        cardDom.setAttribute("class", "card Card-style");

        let image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        image.setAttribute("src",post.image);
        cardDom.appendChild(image);
        


        cardDom.appendChild(this.createCardPosts(post));
        this.containerCard.appendChild(cardDom);
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


    showPosts: function(){

        this.post.forEach(post => {
            this.createCard(post);
            
        });
    },

    extractPostBodyPreview: function(post){
        let str = post.content;
        let newStr = str.substring(0,150);
        return newStr+ "...";
        
    }



}


async function initPosts() {
    let response = await fetch('js/posts.json');
    let posts = await response.json();
    blog.post = posts;
    blog.showPosts();
};



initPosts();