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
        let post_Dom = document.createElement('article');
        post_Dom.setAttribute('class', 'blog-post');
        post_Dom.setAttribute('id', post.id);

        let title = document.createElement('h3');
        title.setAttribute('class', 'title');
        title.innerHTML = post.title;
        post_Dom.appendChild(title);
        
        let contentBody = document.createElement('div');
        contentBody.setAttribute('class','body');
        contentBody.innerHTML = post.content;
        post_Dom.appendChild(contentBody);        

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