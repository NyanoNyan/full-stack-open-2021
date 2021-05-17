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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
};