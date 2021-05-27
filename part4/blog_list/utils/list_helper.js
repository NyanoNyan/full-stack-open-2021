const  _ = require('lodash');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((total, curr) => total + curr.likes, 0);
};

const favouriteBlog = (blogs) => {
    const likesList = blogs.map(blog => blog.likes);
    const indexLargest = likesList.indexOf(Math.max(...likesList));
    return blogs[indexLargest];
};

const mostBlogs = (blogs) => {
    // Count how many author with the same blogs
    // const test2 = [...new Set(blogs.map(blog => blog.author))];
    // const test = blogs.map(blog => {

    //     if (test2.includes(blog.name)) {
    //         count
    //     }

    //     return {
    //         author: blog.author,
    //         blogs: 0
    //     }
    // });

    // console.log(test2)
    const test = _.countBy(blogs,'author')

    const sorted = _.chain(test).
    map(function(cnt, author) {
        return {
            author: author,
            blogs: cnt
        }
    })
    .sortBy('count').reverse()
    .value();

    return sorted[Object.keys(sorted)[0]];
}

const mostLikes = (blogs) => {
    const most = blogs.reduce((acc, curr) => {
        let checkVal = acc.find( ( {author} ) => author === curr.author)

        if (!checkVal){
            acc.push({
                'author': curr.author,
                'likes': curr.likes
            });
        } else {
            checkVal.likes += curr.likes;
        }

        return acc;

    }, [])

    const sortMost = most.sort((a,b) => b.likes - a.likes);

    return sortMost[0];
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs, 
    mostLikes,
};