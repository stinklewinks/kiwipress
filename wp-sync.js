async function fetch_protocol(url)
{
    const response = await fetch(url);

    if(!response.ok)
    {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    else
    {
        const data = await response.json();
        console.info('Success.')
        return data;
    }   
}

class WPSync {
    
    static wpurl = {
        base: '/wp-json/wp/v2',
        forum: '/wp/bbpress/v1',
        posts: '/post',
        pages: '/page',
        menus: '/menu',
        users: '/user',
        comments: '/comment',
        products: '/product',
        forums: '/forums'
    };


    constructor(){
        // const h2o = new h2o(h2oOptions);
    }

    set_url(type, url){
        this.wpurl[type] = url;
    }

    // Post Methods
    // TODO: Get Comments

    async get_posts(url){
        // Get posts
        const posts = await fetch_protocol(url);
        const filtered_posts = posts.map(post => ({
            id: post.id,
            title: post.title.rendered,
            date: post.date,
            excerpt: post.excerpt.rendered,
            content: post.content.rendered,
            author: post.author,
            categories: post.categories,
            tags: post.tags,
            status: post.status,
            // GetSet Comments
            // comments: post._embedded.comments
        }));
        return filtered_posts;
    }

    async get_published_posts(url)
    {
        
            const data = await this.get_posts(url);
            const response = data;
            const published_posts = response.filter(data => data.status === 'publish');
            const posts = {}
            for(let [key, post] of Object.entries(published_posts))
            {
                posts[key] = {
                    id: post.id,
                    title: post.title,
                    date: post.date,
                    excerpt: post.excerpt,
                    content: post.content,
                    author: post.author,
                    categories: post.categories,
                    tags: post.tags,
                    status: post.status,
                }
            }
    }

    async get_post_content(url, post_id){
        // Get post
        fetch_protocol(url + '/' + post_id).then(data => {
            return data.content.rendered;
        });
    }

    async get_post_title(url, post_id){
        // Get post title
        fetch_protocol(url + '/' + post_id).then(data => {
            // Filter the published posts
            const published_posts = data.filter(post => post.status === 'publish');
            console.log(published_posts.title.rendered);
        });
    }

    // Page Methods
    async get_pages(url){
        // Get pages
        fetch_protocol(url).then(data => {
            data.forEach(page => {
                console.log(page.title.rendered);
            });
        });
    }

    // Get menus
    get_menus(url, user, pass)
    {
        fetch_protocol(url, user, pass)
        .then(data => {
            data.forEach(menu => {
                console.log(menu.name);
            });
        });
    }

    // User Methods
    async get_users(url){
        // Get users
        const response = await fetch_protocol(url)
        const data = await response;
        const users = {};
        for(let [key, user] of Object.entries(data))
        {
            users[key] =  {
                id: user.id,
                name: user.name,
                description: user.description,
                url: user.url,
                isSuperAdmin: user.is_super_admin,
                slug: user.slug
            }
        } 
        return users;
    }

    // Product Methods (WooCommerce)
    // Perhaps create a method that returns data that we can send into UI components.
    get_products(url){
        // Get products
        fetch_protocol(url)
        .then(data => {
            data.forEach(product => {
                console.log('Success!')
                console.log(product.title.rendered);
                return product.title.rendered; 
            });
        });
    }

    // bbPress Forum Methods
    get_forums(url){
        // Get forums
        fetch_protocol(url)
        .then(data => {
            data.forEach(forum => {
                console.log(forum.post_title);
            });
        });
    }

    get_forum(url, id){
        // Get forum
        fetch_protocol(url + '/' + id)
        .then(data => {
            console.log(data.post_title);
        });
    }

}

export { WPSync, fetch_protocol };