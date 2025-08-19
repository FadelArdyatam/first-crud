# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username" : "Fadel",
  "password" : "rahasia",
  "name" : " Fadel"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "Fadel",
    "name" : " Fadel"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username" : "Fadel",
  "password" : "rahasia"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "Fadel",
    "name" : " Fadel",
    "token" : "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "data" : {
    "username" : "Fadel",
    "name" : " Fadel"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :
- Authorization: token

Request Body :

```json
{
  "password" : "rahasia", // optional, if want to change password
  "name" : " Fadel" // optional, if want to change name
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "Fadel",
    "name" : " Fadel"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "data" : true
}
```