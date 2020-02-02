# Pursuit-Core-Web-Express-Group-Project

With your group, build an app that has the basic functionality of a social media website.

## Groupwork

This is our first large group project. There are three large things to be aware of for group projects:

1. Git
2. Trello
3. Group Roles

### Git

Unlike homework in the past where you forked a Pursuit repo, then committed and pushed at the end, a group project must be more collaborative.

The master branch should be the most current version of the project. Whenever you want to make a change to the project, you should create a new branch named after the change you will be making. Make your changes in the branch, then make a PR against master. Someone else from your team should review the PR, then merge it into the master branch. Everyone else should then pull the master branch to have the most current version on their local machines.

### Trello

Each group member should have an account on [Trello](https://trello.com/) and the group should have a well maintained list of who is working on what task. Without this, two people might try to edit the same file and create merge conflicts.

[Example](https://trello.com/b/DnZvFigA/agile-board)

### Group Roles

The expectation is that everyone in a group is chiefly occupied with writing code. In addition to that, the following roles are important for someone to have explicit ownership of:

|       Role        |                                                                                        Responsibilities                                                                                        |
| :---------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  Technical Lead   | In charge of maintaining the health of master branch and ensure that master is always safe to pull from. Makes final decisions on project architecture in conversation with other team members |
|  Project Manager  |                                                         Is responsible for the health of the Trello or board. Organizes daily standups                                                         |
|       UI/UX       |                                                                       Is responsible for the design and flow of the app                                                                        |
| PR Review Process |                                    Is responsible for ensuring that PRs into master are reviewed, and that all team members are reviewing each other's PRs                                     |

## Back-End

Create a full RESTful API using the social media database structure described below, including an Express app and a Postgres database. This app should have the following routes, with corresponding SQL statements:

- **Users**

  - GET `/users` - Get all users.
  - GET `/users/:id` - Get single user.
  - POST `/users` - Add single user.
  - DELETE `/users/:id` - Delete user with the corresponding `id`.

- **Posts**

  - GET `/posts` - Get all posts.
  - GET `/posts/:id` - Get single post.
  - POST `/posts` - Add single post.
  - PATCH `/posts/:id` - Edit single post.
  - DELETE `/posts/:id` - Delete single post.

- **Likes**

  - GET `/likes/posts/:post_id` - Get all likes for a single post.
    <!-- //get all likes count or get users who like??? -->
  - POST `/likes/posts/:post_id` - Add single like.
  - DELETE `/likes/:post_id/:liker_id` - Delete single like.

- **Comments**

  - GET `/comments/posts/:post_id` - Get all comments for a single post.
  - POST `/comments/posts/:post_id/:commenter_id` - Add single comment.
  - PATCH `/comments/:post_id/:commenter_id` - Edit single comment.
  - DELETE `/comments/:post_id/:commenter_id` - Delete single comment.

- **Albums**

  - GET `/albums/:owner_id` - Get all albums that belong to a user.
  - POST `/albums/:owner_id` - Create new empty album for user.

- **Pictures**
  - GET `/pictures/albums/:album_id` - Get all pictures for a single album.
  - POST `/pictures/albums/:album_id` - Add single picture to album.
  - DELETE `/pictures/:pic_id` - Delete single picture.

The responses from your Express app should have three keys: `status`, `message`, and `body`. For example, when I send a GET request for a single user, I should get back something that looks like this:

```js
{
  status: "success",
  message: "got single user",
  body: {
    id: 1,
    name: "Reed",
    age: 46
  }
}
```

## Front end

Your front end should have each of the following components. Don't worry about authentication yet: anyone can make whatever REST calls they want to.

### Table of contents

Have a table of contents page that contains hyperlinks to all of the other pages

### Posts Feed

- Display all posts from all users in chronological order
- Include the number of likes in each post as well as the user
- Display all comments from each post
- Create a new post
- Create a new comment for a given post

### User Search

- Search for a user
- Create a new user
- Delete a user

### Albums

- See all existing albums
- Create a new album

### Photos

- See all photos
- Create a single photo
- Delete a single photo
