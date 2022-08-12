
# Stardew Seeker

The Stardew Seeker web app is intended to be used as a companion to the cozy Stardew Valley PC farming game. Users can use this web app to keep track of their personal gaming goals and be inspired by what other gamers are accomplishing while they build the farm of their dreams and help the town flourish. Happy farming, gamers!


## API Reference
This app is built on its own Ruby on Rails server. The routes listed below are all accessible through the app. Not all routes are used in the current version of the app, but were included for further app development. 

#### Index all users

```http
  GET /api/users
```

#### Show a user

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** id of user to fetch |

#### Authorize a user

```http
  GET /auth
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** accessed through user id found in the session cookies

Note that the user id cannot be explicitly passed through the route, must be held in the session's cookies

#### Create a user

```http
  POST /signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **required** unique account username|
| `password`      | `string` | **required** account password|
| `name`      | `string` | **required** unique screenname |


#### Create a user session

```http
  POST /login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **required** account username|
| `password`      | `string` | **required** account password|


#### Delete a user session

```http
  DESTROY /logout
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** accessed through user id found in the session cookies

Note that the user id cannot be explicitly passed through the route, must be held in the session's cookies

#### Index all goals

```http
  GET /api/goals
```

#### Show a goal

```http
  GET /api/goals/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** id of goal to fetch |

#### Show goals associated with a user

```http
  GET /api/my_goals/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** id of user to fetch associated goals|

#### Update a goal

```http
  UPDATE /api/goals/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** id of goal to modify|

#### Delete a goal

```http
  DESTROY /api/goals/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** id of goal to delete|

Note that when a goal's record is deleted, the associated goal_tags are dependent on it and are also deleted 

#### Create a goal

```http
  POST /api/goals
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **required** goal's title|
| `description`      | `string` | **required** goal's description|
| `user_id`      | `integer` | **required** user associated with the goal |
| `copied_from`      | `integer` | if the goal is copied from a previously created goal, that goal's original id |

#### Create associated tags for a created goal (nested route)

```http
  POST /api/goals/${id}/goal_tags
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `goal_id`      | `integer` | **required** id of a newly created goal passed through the route|
| `tag_id`      | `integer` | **required** array of tag ids passed through the request body|

Note that this is a nested route. Once a goal is created by the user on the front end and the POST request is sent to the server, the new goal must be sent to this route to create the associated goal_tags for the new goal

#### Index all tags
```http
  GET /api/tags
```

#### Show a tag
```http
  GET /api/tags/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** id of tag|

#### Index all goal tags
```http
  GET /api/goal_tags
```

#### Show a goal tag
```http
  GET /api/goal_tags/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **required** id of goal tag|





## Run Locally

Clone the project

```bash
  git clone https://github.com/mborreros/stardew-seeker
```

Install dependencies

```bash
  npm bundle install
```

Start the server

```bash
  rails s
```

Start the web app

```bash
  npm start
```

Or start the wep app and server simultaneously
```bash
  foreman start -f Procfile.dev
```


## Demo

Link to web app [walkthrough](https://www.youtube.com/watch?v=GxWyWG0CY6o&t=2s )


## Acknowledgements

- Source for the icons and images that you see in this web app are courtesy of the [Stardew Vallery Wikipedia](https://stardewvalleywiki.com/Stardew_Valley_Wiki)
- Inspiration and motivation for this project brought to you by Concerned Ape's beautiful [Stardew Valley game](https://www.stardewvalley.net/)
- [Project guidelines](https://github.com/learn-co-curriculum/phase-4-project-review-guidelines) and goals brought to you by Flatiron Academy   
- Additional thanks to the programmers of React Bootstrap, React-Select, Material Design, Moment, Active Record, Heroku, and React-DOM who made the functionality of this app possible


## Authors

[@mborreros](https://github.com/mborreros)


## Feedback

If you have any feedback, you can reach out to me at mlbsindia@gmail.com


