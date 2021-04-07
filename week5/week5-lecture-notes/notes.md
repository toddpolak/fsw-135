# Week 5 Lecture - FSW135

Learnign goals for weeks 5 & 6 => Understand the entire data flow within a MERN stack authetication cycle.

## Agenda

    1) Weeks 3 & 4 Overview
    2) Auth Basics
    3) Relating Data in Mongo
    4) Context
    5) Hooks*

### 1. Weeks 3 & 4 Overview

#### **Mongoose**

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

Mongoose has lots of really fine-grained controls it allows, such as defining static methods for your models (so that every object created is able to run a specific method, similar to adding a method to a JavaScript "class", A.K.A. function constructor), adding pre/post hooks into your schema (so that you can run certain code before and/or after an item is created from the schema, deleted, updated, etc.)

* [Mongoose API Docs](https://mongoosejs.com/docs/api.html)

* [Mongoose Schema Guide](https://mongoosejs.com/docs/guide.html)

* [Mongoose Models Guide](https://mongoosejs.com/docs/models.html)

* [Mongoose Documents Guide](https://mongoosejs.com/docs/documents.html)

* [Mongoose Queries Guide](https://mongoosejs.com/docs/queries.html)

### 2. Auth Basics

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

### 3. Relating Data in MongoDB

Although Mongo is typically a non-relational(no SQL) database, recently it has expanded its functionality to support both SQL and relations. For relating data we have two options — **embedded documents** and **document references**.

These data models allow us to describe one-to-one and one-to-many relationships between connected data.

    When considering where to split your data, the most frequently-accessed portion of the data should go in the collection that the application loads first.

#### **Embedded Documents**

[Model One-to-One Relationships with Embedded Documents](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)

Embedding connected data in a single document can reduce the number of read operations required to obtain data. In general, you should structure your schema so your application receives all of its required information in a single read operation.

    A potential problem with the embedded document pattern is that it can lead to large documents that contain fields that the application does not need. This unnecessary data can cause extra load on your server and slow down read operations. Instead, you can use the subset pattern to retrieve the subset of data which is accessed the most frequently in a single database call.

Trade-Offs of the Subset Pattern:

* Using smaller documents containing more frequently-accessed data reduces the overall size of the working set. These smaller documents result in improved read performance and make more memory available for the application. However, it is important to understand your application and the way it loads data. If you split your data into multiple collections improperly, your application will often need to make multiple trips to the database and rely on JOIN operations to retrieve all of the data that it needs.

* In addition, splitting your data into many small collections may increase required database maintenance, as it may become difficult to track what data is stored in which collection.

[Model One-to-Many Relationships with Embedded Documents](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/)

#### **Document References**

[Model One-to-Many Relationships with Document References](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)

When using references, **the growth of the relationships determine where to store the reference**. If the number of books per publisher is small with limited growth, storing the book reference inside the publisher document may sometimes be useful. Otherwise, if the number of books per publisher is unbounded, this data model would lead to mutable, growing arrays.

### 4. Context

[React Context](https://reactjs.org/docs/context.html) provides a way to pass data through the component tree without having to pass props down manually at every level.

    In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

**If you only want to avoid passing some props through many levels, [component composition](https://reactjs.org/docs/composition-vs-inheritance.html) is often a simpler solution than context.**

### 5. Hooks

[Hooks](https://reactjs.org/docs/hooks-intro.html) are a new addition in React 16.8. They let you use state and other React features without writing a class.

Note that Hooks are:

* **Completely opt-in**. You can try Hooks in a few components without rewriting any existing code. But you don’t have to learn or use Hooks right now if you don’t want to.

* **100% backwards-compatible**. Hooks don’t contain any breaking changes.

* **Available now**. Hooks are now available with the release of v16.8.0.

* There are no plans to remove classes from React. You can read more about the gradual adoption strategy for Hooks in the bottom section of this page.

* Hooks don’t replace your knowledge of React concepts. Instead, Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. As we will show later, Hooks also offer a new powerful way to combine them.

#### **Motivation**

Hooks solve a wide variety of seemingly unconnected problems in React that the react team encountered over five years of writing and maintaining tens of thousands of components. Whether you’re learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.

_It’s hard to reuse stateful logic between components:_

React doesn’t offer a way to “attach” reusable behavior to a component (for example, connecting it to a store). If you’ve worked with React for a while, you may be familiar with patterns like render props and higher-order components that try to solve this. But these patterns require you to restructure your components when you use them, which can be cumbersome and make code harder to follow. If you look at a typical React application in React DevTools, you will likely find a “wrapper hell” of components surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions. While we could filter them out in DevTools, this points to a deeper underlying problem: React needs a better primitive for sharing stateful logic.

With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy. This makes it easy to share Hooks among many components or with the community.

_Complex components become hard to understand:_

We’ve often had to maintain components that started out simple but grew into an unmanageable mess of stateful logic and side effects. Each lifecycle method often contains a mix of unrelated logic. For example, components might perform some data fetching in componentDidMount and componentDidUpdate. However, the same componentDidMount method might also contain some unrelated logic that sets up event listeners, with cleanup performed in componentWillUnmount. Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method. This makes it too easy to introduce bugs and inconsistencies.

In many cases it’s not possible to break these components into smaller ones because the stateful logic is all over the place. It’s also difficult to test them. This is one of the reasons many people prefer to combine React with a separate state management library. However, that often introduces too much abstraction, requires you to jump between different files, and makes reusing components more difficult.

To solve this, Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods. You may also opt into managing the component’s local state with a reducer to make it more predictable.

_Classes confuse both people and machines:_

In addition to making code reuse and code organization more difficult, we’ve found that classes can be a large barrier to learning React. You have to understand how this works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without unstable syntax proposals, the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.

Additionally, React has been out for about five years, and we want to make sure it stays relevant in the next five years. As Svelte, Angular, Glimmer, and others show, ahead-of-time compilation of components has a lot of future potential. Especially if it’s not limited to templates. Recently, we’ve been experimenting with component folding using Prepack, and we’ve seen promising early results. However, we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path. Classes present issues for today’s tools, too. For example, classes don’t minify very well, and they make hot reloading flaky and unreliable. We want to present an API that makes it more likely for code to stay on the optimizable path.

To solve these problems, Hooks let you use more of React’s features without classes. Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don’t require you to learn complex functional or reactive programming techniques.

[Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
