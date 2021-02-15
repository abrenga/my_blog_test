var blog = {

    containerCard: document.getElementById("container-posts"),

    createCard: function () {

        let potDom = document.createElement("div");
        potDom.setAttribute("class", "card Card-style");

        let image = document.createElement("img");
        image.setAttribute("class", "card-img-top");

        potDom.appendChild(createCardPosts());
    },

    createCardPosts: function () {

        let cardDom = document.createElement("div");
        cardDom.setAttribute("class","card-body");

        let title = document.createElement('h5');
        title.setAttribute('class', 'card-title');
        post
        
        let pDiPosts =  document.createElement("p");
        pDiPosts.setAttribute('class', 'card-text');

        let buttom =  document.createElement("a");
        buttom.setAttribute('class', 'btn btn-primary')

    },



}