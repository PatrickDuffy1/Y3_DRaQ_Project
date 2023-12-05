export class Post
{

    constructor(id, title, image, content, owner, likes, dislikes, comments)
    {
        this.id = id;
        this.title = title;
        this.image = image;
        this.content = content;
        this.owner = owner;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
    }

    getId()
    {
        return this.id;
    }

    getTitle()
    {
        return this.title;
    }

    getImage()
    {
        return this.image;
    }

    getContent()
    {
        return this.content;
    }

    getLikes()
    {
        return this.likes;
    }

    getComments()
    {
        return this.comments;
    }
}