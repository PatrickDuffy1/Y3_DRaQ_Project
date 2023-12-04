export class Post
{

    constructor(title, image, content, owner, likes, dislikes, comments)
    {
        this.title = title;
        this.image = image;
        this.content = content;
        this.owner = owner;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
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