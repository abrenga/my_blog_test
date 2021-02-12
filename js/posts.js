var blog = {
    currentPage: 0,
    postsContainer: document.getElementById('container-posts'),
    posts: null,
    showPosts: function () {
        /*Per mostrare i posts devo iterare sull'array */
        this.posts.forEach(post => {
            this.createPostHTML(post);

        });
    },

    createPostHTML: function (post) {
        let post_Dom = document.createElement('div');
        post_Dom.setAttribute('class','row featurette-divider')
        let article_Dom = document.createElement('div');
        article_Dom.setAttribute('class', 'blog-post');
        
        article_Dom.setAttribute('id', post.id);

        let title = document.createElement('h3');
        title.setAttribute('class', 'title');
        title.innerHTML = post.title;
        article_Dom.appendChild(title);
        
        let contentBody = document.createElement('p');
        contentBody.setAttribute('class','col-md-7');
        contentBody.innerHTML = post.content;
        article_Dom.appendChild(contentBody);
        post_Dom.appendChild(article_Dom);


        this.postsContainer.appendChild(post_Dom);
    },

}


async function initPosts() {
    let response = await fetch('js/posts.json');
    let posts = await response.json();
    blog.posts = posts;
    blog.showPosts();
}

initPosts();


var isClosed = true;


$(document).ready(function() {
    $(".link").click(
        function() {
            $(".displayno").slideToggle(1000, "swing",
                function() {
                    isClosed =!isClosed;
                    
                    if(isClosed){
                        $(".link").text("leggi di più");
                    }else{
                        $(".link").text("leggi di meno");
                    }

                    
                }
            )
        }
    );
});