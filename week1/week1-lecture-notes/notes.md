# Week 1 Lecture - FSW135

Learnign goals for weeks 1 & 2 => Recap our request response cycle and how databases will now be added to our "full stack" development approach while being introduced to databases.

## Agenda

    1) Introduction
    2) Repository Overview
    3) Req < - > Res Cycle/Express Refresh
    4) Intro to Databases
    5) Mongo Compass GUI
    6) Mongo DB*

### 2. Repository Overview

[Week 1 Step 5](https://github.com/v-school/m5-dbsandmongoose)

When cloning repositoreies you must always install all dependencies to your local project. This is true accross all languages but for us will likely look like an `npm install` from the root directory, the client directory, and the admin directory.

Things to Note:

* The `package.json` file on the front end has an added `proxy` key: value pair that will automatically proxy your HTTP requests to your server running on localhost port 9000. This avoids having to set up any CORS rules.

* Nothing is done with the `tvshowRouter` file in this series, though you are encouraged to build
it out like the `movieRouter` file and make it functional with your front end application.

### 3. Req < - > Res Cycle/Express Refresh

### 4. Intro to Databases

A database management system is a software package for creating and managing databases. Many different types of database systems exist based on how they manage the database structure.

    Relational vs. Non-Relational

A **relational database** contains multiple tables of data with rows and columns that relate to each other through special key fields. These databases are more flexible than flat file structures (non-relational), and provide functionality for reading, creating, updating, and deleting data. Relational databases use Structured Query Language (SQL) - a standard user application that provides an easy programming interface for database interaction. Common examples of this are mySQL, Oracle, Microsoft SQL Server, and PostgreSQL which you will be learnign about in a later course.

A popular alternative to relational databases, **non-relational databases** (NoSQL) take a variety of forms and allow you to store and manipulate large amounts of unstructured and semi-structured data. Examples include key-value stores, document stores, and graph databases.

An interesting aspect of a non-relational database such as NoSQL is scalability. NoSQL uses the **BASE** system (basically available, soft-state, eventually consistent). Non-relational databases forgo the table form of rows and columns relational databases use in favor of specialized frameworks to store data, which can be accessed by special query APIs. Persistence is an important element in these databases. To enable fast throughput of vast amounts of data the best option for performance is "in memory," rather than reading and writing from disks.

Relational databases use the ACID system, which ensures consistency of data in all situations of data management but obviously takes longer to process because of all those relations and its branching nature. However, the BASE system loosened up the requirements on consistency to achieve better availability and partitioning for better scalability.

### 5. Mongo Compass GUI

There are many different shells to connect to many different databases. Shells allows us a graphical interface to connect and interact with our data. They connect via REPL (read evaluate print loop) methods.

[mongo shell](https://docs.atlas.mongodb.com/mongo-shell-connection/)

We will explore next week how to connect via a GUI (graphical user interface) called Mongo Compass.

[compass](https://docs.atlas.mongodb.com/compass-connection/)

### 6. Mongo DB

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
