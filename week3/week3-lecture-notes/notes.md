# Week 3 Lecture - FSW135

Learnign goals for weeks 3 & 4 => Gain familiarity with Mongoose, a library for connecting to Mongo and running queries within a Node application. Dive deeper into Mongoose CRUD methodology including more advanced params & queries. High level introduction to authentication basics on the web.

## Agenda

    1) Weeks 1 & 2 Overview
    2) Mongo DB
    3) Intro to Mongoose
    4) Mongoose CRUD
    5) Mongoose Params & Queries
    6) Capstone
    7) Auth Basics *

### 1. Weeks 1 & 2 Overview

#### **Databases**

Relational vs. Non-Relational
ACID vs. BASE

    MongoDB is a document database, which means it stores data in JSON-like documents.

### 2. Mongo DB

    MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.

MongoDB is a document database, which means it stores data in JSON-like documents. We believe this is the most natural way to think about data, and is much more expressive and powerful than the traditional row/column model.

    As a programmer, you think in objects. Now your database does too.

Data within MongoDB is stored as `Rich JSON Documents` which:

* Are the most natural and productive way to work with data.

* Supports arrays and nested objects as values.

* Allows for flexible and dynamic schemas.

```JSON
{
  "_id": "5cf0029caff5056591b0ce7d",
  "firstname": "Jane",
  "lastname": "Wu",
  "address": {
    "street": "1 Circle Rd",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90404"
  },
  "hobbies": ["surfing", "coding"]
}
```

MongoDB uses a powerful query language.

* This rich and expressive query language allows you to filter and sort by any field, no matter how nested it may be within a document.

* It has support for aggregations and other modern use-cases such as geo-based search, graph search, and text search.

* Queries are themselves JSON, and thus easily composable. No more concatenating strings to dynamically generate SQL queries.

Mongo's main benefit used to be its scalibility but now has many advanced features that blur the line between traditional relational and non-relational DB's including:

* Distributed multi-document ACID transactions with snapshot isolation.

* Support for joins in queries.

* Two types of relationships instead of one: reference and embedded.

MongoDB is a true data platform with a comprehensive suite of tools to make working with data remarkably easy for everyone, from developers to analysts to data scientists.

    "More than just a database"

[Charts and data visualization](https://www.mongodb.com/products/charts)

[Business Intelligence Connector](https://www.mongodb.com/products/bi-connector)

### 3. Intro to Mongoose

Mongoose is a library for connecting to MongoDB and running queries from a Node.js app. Installation is trivial:
```npm install --save mongoose.```

    Mongoose.js is an elegant mongodb object modeling framework for node.js

Although documents in a MongoDB collection do not have to be homogeneous (they may have different schemas), Mongoose enforces document schemas to make the collection more uniform (and they help a lot).

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

    Mongoose has lots of really fine-grained controls it allows, such as defining static methods for your models (so that every object created is able to run a specific method, similar to adding a method to a JavaScript "class", A.K.A. function constructor), adding pre/post hooks into your schema (so that you can run certain code before and/or after an item is created from the schema, deleted, updated, etc.), adding options like there's no tomorrow, etc. Check out some of the following Mongoose documentation to become more familiar with the intricacies it has.

* [Mongoose API Docs](https://mongoosejs.com/docs/api.html)

* [Mongoose Schema Guide](https://mongoosejs.com/docs/guide.html)

* [Mongoose Models Guide](https://mongoosejs.com/docs/models.html)

* [Mongoose Documents Guide](https://mongoosejs.com/docs/documents.html)

* [Mongoose Queries Guide](https://mongoosejs.com/docs/queries.html)

### 4. Mongoose CRUD

#### **Read**

This is how we get items from MongoDB. Mongoose gives us 3 basic ways to get stuff from the database .find(), .findOne(), and .findById(), and one advanced way, .where().

    .find([query], [callback])

Finds all documents in the database that match the query. If no query is given, it returns everything.

    .findOne([query], [fieldsToReturn], [callback])

Finds one object from the database. If your query matches more than one item in the database, it still only returns the first one it finds.

* If you don't provide a query, it will just return the first matched document in the database.

* If you don't provide a fieldsToReturn, it will return the entire object.

* fieldsToReturn can also be in the form of a string with spaces between the field names, e.g. "name age owner", instead of an object.

    .findById(id, [fieldsToReturn], [callback])

Finds a single object in the database by the provided id.

    .where(selector)

Calling .where() on a Mongoose Model actually returns a Mongoose "Query" object. In order to actually execute the query, we have to call the .exec() method and pass in our usual callback.

#### **Create**

This is how we can create new items in the database. This will commonly be from an HTTP POST request.

``` Javascript
const Todo = require("../models/todo");

// Assuming this is from a POST request and the body of the
// request contained the JSON of the new "todo" item to be saved
const newTodoObj = new Todo(req.body);
newTodoObj.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newTodoObj);
});
```

Create the new object just like you would if you were creating a JavaScript object from an [object function constructor](http://www.javascriptkit.com/javatutors/oopjs2.shtml), then call the .save() method on that object.

One common operation apps will make is called findOrCreate, where it will look for an existing instance in the database and return it if it exists, and create it if it doesn't exist. Mongoose doesn't have a built-in method for doing that, but there is a third-party package called [mongoose-findorcreate](https://github.com/drudge/mongoose-findorcreate) that you can install as a plugin to your model to include that as a static method on all models it is plugged in to.

#### **Update**

This is just a combination of "read" and "create", but instead of creating a new one with const newTodoObj = new Todo(...), we query the database and send a change to be made using findByIdAndUpdate. Make sure to read the comments below explaining each of the parts:

``` Javascript
const Todo = require("../models/todo");

// This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
// Find the existing resource by ID
Todo.findByIdAndUpdate(
    // the id of the item to find
    req.params.todoId,
    
    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body,
    
    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},
    
    // the callback function
    (err, todo) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(todo);
    }
)
```

There are a few different ways you could structure your PUT request. Above, we opted for the use of the Mongoose shortcut method findByIdAndUpdate (there's also a findOneAndUpdate).Check out the documentation here: [findOneAndUpdate()](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate), [findByIdAndUpdate()](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate).

Another option would be to use a findOne or findById, make the changes to the properties manually, then use .save to save the change. The benefit of doing it this way is that you have more control over the changes being made, but at the expense of having to make two trips to the database (one to retrieve the document, another to save it). Using findByIdAndUpdate combines these two trips into one, but also makes it a little harder to make granular modifications. It also bypasses any model "hooks", like a "pre-save" hook. But if that isn't a concern to you, findByIdAndUpdate and findOneAndUpdate are great shortcut methods to use.

#### **Delete**

Similar to the "Update" section above, you can go about deleting a document from the database by first finding it, then running the .remove() method on the found document. Also similar to the updating section above, Mongoose v4.0 introduced some helper methods - .findOneAndRemove() and .findByIdAndRemove()

``` Javascript
// The "todo" in this callback function represents the document that was found.
// It allows you to pass a reference back to the client in case they need a reference for some reason.
Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});
```

### 5. Mongoose Params & Queries

Mongoose models provide several static helper functions for CRUD operations. Each of these functions returns a mongoose Query object.

A mongoose query can be executed in one of two ways. First, if you pass in a callback function, Mongoose will execute the query asynchronously and pass the results to the callback.

A query also has a .then() function, and thus can be used as a promise.

#### **Executing**

When executing a query with a callback function, you specify your query as a JSON document. The JSON document's syntax is the same as the [MongoDB shell](https://docs.mongodb.com/manual/tutorial/query-documents/).

All callbacks in Mongoose use the pattern: callback(error, result). If an error occurs executing the query, the error parameter will contain an error document, and result will be null. If the query is successful, the error parameter will be null, and the result will be populated with the results of the query.

Anywhere a callback is passed to a query in Mongoose, the callback follows the pattern callback(error, results). What results is depends on the operation: For findOne() it is a potentially-null single document, find() a list of documents, count() the number of documents, update() the number of documents affected, etc. The [API docs for Models](https://mongoosejs.com/docs/api.html#model-js) provide more detail on what is passed to the callbacks.

**When no callback is passed:** A Query enables you to build up a query using chaining syntax, rather than specifying a JSON object. The below 2 examples are equivalent.

``` Javascript
// With a JSON doc
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);

// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
```

#### **Queries Are Not Promises**

**Mongoose queries are not promises**. They have a .then() function for co and async/await as a convenience. However, unlike promises, calling a query's .then() can execute the query multiple times.

    Mixing promises and callbacks can lead to duplicate entries in arrays.

Don't mix using callbacks and promises with queries, or you may end up with duplicate operations. That's because passing a callback to a query function immediately executes the query, and calling then() executes the query again.

### 6. Capstone

**Weeks 3 - 7 ongoing project please keep up and be aware of the time commitment**

### 7. Auth Basics

Authentication is the process of allowing a user of your application to create an account, sign in, have specific user permissions, get data that only concerns them as a user, etc. Authentication includes a **security** concern (we don't want people to be able to see or manipulate each other's data) as well as a **usability** concern (a todo app that doesn't let me have my own todo list is pretty pointless, unless I'm the only user of the application).

There are three main different authentication types you really need to concern yourself with - 1) Session/cookie-based auth, 2) Token-based auth, and 3) OAuth. We will be focusing mainly on token-based authentication for now. I I will be skipping over session-based authentication for now because it is generally considered to be inferior to token-based authentication these days. That being said, it is still worth researching on your own because there are TONS of applications that are still using session-based auth, so as a programmer in the field, you may find yourself in a position to need to deal with it.

#### **Understanding Token-based Auth**

Token-authentication is conceptually pretty easy to understand. A user fills in a login form containing, typically, a username and password which is then sent to the server for checking. The server looks up a user with the given username in the database and checks if the password is correct. If not, it returns an authentication error telling the person they put in the wrong username and/or password.

Otherwise, if everything checks out, the server creates a **token**, which is just a long string of seemingly-random text that gets sent back to the user. This token is like an access card to a building - that user now has a certain level of privilege to move about the app accessing certain data, making changes to the data, accessing certain parts of the website, etc. Oftentimes we save this token in sessionStorage or localStorage for easy access by the client app.

Every single time the client app makes an HTTP request to the server, it sends that token along with it. And with every protected resource on the server (any API endpoint that requires special access rights, like that of a logged-in user), the server checks the token that it received from the client to make sure this user is authorized to access this content. If so, it returns the requested content. Otherwise it sends some kind of authorization error indicating that the user isn't authorized to see that information.

In order to log a user out, you simply need to remove the token from wherever you saved it (session or local storage) and it stops being sent with every request, meaning the server stops giving the user access to the protected data. This is akin to taking away the access card from the employee of a building until they come in the next time and prove again they're allowed to be there.

Here are some great resources for better understanding how token-based authentication works, and specifically how JSON Web Tokens (a.k.a JWTs, pronounced "jots") work.

* [The Ins and Outs of Token-based auth](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)

* [Getting to know JSON Web Tokens](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)

* [Tutorial on authenticating a Node.js app with JWTs](https://scotch.io/tutorials/authenticate-a-node-es6-api-with-json-web-tokens)
