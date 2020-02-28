# Summer19

## Todo

_Database_

- Create `Post` model {\_id, title, markdown text, userid}

_Backend_

_ Move python compilation onto the server. Take the code and run exec. Should create a temporary folder for the processes to occur, in case files are created. Must be secure- do not allow os commands.
- Move passport authorization from config to user model
- REST API for posts (create, delete, get_all_for_user, )

_Frontend_

- Fix async abort on unmounts
- Make menu buttons only appear for admins/roles etc.
- User dashboard (Create new post)
- Error feedback for login/registration and posts
- Serialize all of the routes and use those statics instead of hard coding
- Route 404's to 404 page
