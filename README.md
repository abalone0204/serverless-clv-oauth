# Clv oauth

# Intro

- Get away from config for OAUTH

- Management server(less) for users

- You only have serveral things to know:

    - 1. How to get user's access token

    - 2. How to fetch user's data with access token

    - 3. Go serverless

# Get started

## 1.  How to get user's access token

- The best way to understand what's going on is to do it again step by step.

- Get you facebook app id: `APP_ID`, and set the application url in facebook app console

- This is your request to get your grant code

> You can specify the scope

```
https://www.facebook.com/dialog/oauth?client_id=APP_ID&redirect_uri=REDIRECT_URI&auth_type=rerequest&scope=email,public_profile,user_friends
```

- After you click the confirm button, facebook will redirect to your `redirect_uri`, and it will append `GRANT_CODE` after your redirect uri

```
REDIRECT_URI?code=GRANT_CODE
```

- Then, time to fetch your access token with your grant code

```
GET https://graph.facebook.com/v2.3/oauth/access_token?
    client_id=APP_ID
   &redirect_uri=REDIRECT_URI
   &client_secret=APP_SECRET
   &code=GRANT_CODE
```

- Finally you will receive a json response:

```json
{
  "access_token": "ACCESS_TOKEN",
  "token_type": "bearer",
  "expires_in": 5174611,
  "auth_type": "rerequest"
}
```

## 2 Fetch user data with access token

- Fetch user's data with access token you got in the previous step

```
https://graph.facebook.com/me?access_token=ACCESS_TOKEN
```

- By default, it will only return `id` and `name`

```json
{
    "id": "USER_ID",
    "name": "Denny Ku"
}
```

- But you can specify the fields that you want to know

```
https://graph.facebook.com/me?fields=mail,id,name&access_token=ACCESS_TOKEN
```

> If you want to get avatar of user

> `https://graph.facebook.com/v2.6/USER_ID/picture`

# Todo

- [] Facebook login

