# E-Readify

E-Readify is a book reader website where readers can read books online. It features a personalized AI recommendation system, allowing authors to publish books with the choice of making it paid or not. The website also has a secure authentication system, with more features coming soon.

## Features

- Personalized AI recommendation system: Our AI system recommends books to users based on their reading history and preferences.
- Secure authentication system: Users can create an account and log in securely to access their personalized recommendations and reading history.
- Option for authors to publish books as paid or free: Authors have the flexibility to choose whether they want to offer their books for free or for a fee.
- Users can rate books: Readers can leave ratings and reviews for the books they've read, helping other users discover great reads.

## Technologies Used

- Firebase: We use Firebase for its real-time database and authentication features. This allows us to store user data securely and provide real-time updates to our users.
- Next.js: We use Next.js for its server-side rendering capabilities and ease of deployment. This allows us to deliver fast, responsive pages to our users.
- Node.js: We use Node.js as the runtime environment for our backend. This allows us to write server-side code in JavaScript, which is fast and efficient.
- Express.js: We use Express.js for creating our custom APIs because of its simplicity and flexibility so that the APIs can be easily accessible for users.
- Typescript: We use Typescript because Javascript is a loosely-typed language thus ensuring strict type annotation.

## Future Plans

We have many exciting features planned for E-Readify in the future! Some of these include:

- Social features: Users will be able to connect with friends and share book recommendations.
- Reading challenges: Users will be able to participate in reading challenges and earn rewards for completing them.
- Book clubs: Users will be able to join book clubs and discuss books with other readers.

## E-Readify Backend APIs Documentation

The E-Readify backend provides APIs for books management and user management which is documented below. Note that almost all end points return unathorized error for unverified users

## Installation

To install E-Readify backend API services on a local machine, open your command line and type the following snippet. Ensure that you have node js already installed.

```c
    git clone https://github.com/Felixdiamond/E-Readify.git
```

After installation, navigate to the folder and run the following snippet

```c
    cd E-readify/backend
    npm install
    nodemon start
    .............
    server running on port ......
```

The APIs are now ready for use. Note that GET request parameters are sent through the param object and other requests are sent through the body object of the http request.

## APIs

- ### POST  /user/register

  - takes in CustomUser Model present in the models file as a Json object to create a user, update the user model in firebase and post the user favorites to the database.

```c
    const credentials = {
        email: 'testEmail@gmail.com',
        password: 'testpassword',
        photoUrl: 'path/to/my/image.jpg//nullable string'
        firstName: 'myFirstName',
        lastName: 'myLastName'
    };
    const newUser = request.post('myserverurl/user/register', body=credentials);
    console.log(newUser);
    //the output
     {
        id: 'myNewUserId',
        verifiedUser: 'false',// verification status is always false for new users
      }
    // returns custom errors on failure
```

- ### POST  /user/login

    takes in the user email and password as a Json object
    and create a session for the user.

```c
    const credentials = {
        email: 'testEmail@gmail.com',
        password: 'testpassword'
    };
    const response = request.post('myserverurl/user/login', body=credentials);
    console.log(response);
    //the output
     {
        id: 'myUserId',
        verifiedUser: 'false',// verification status is always false for new users
      }
    // returns custom errors on failure
```

- ### GET  /user/logout

- sign out user from the current auth instance.

```c
    const response = request.get('myserverurl/user/logout', credentials);
    console.log(response);
    //the output
    {
        "status": loggedOut
    }
    // returns error on failure
```

- ### GET  /user

- returns a current snapshot of the logged in user.

```c
    const response = request.get('myserverurl/user');
    console.log(response);
    //the output
    {
        id: 'userId',
        verified: 'true/false',
        data: ['displayName', 'photoURL']
    }
    // console.log(response); returns null if there is no user logged in at the moment
    // returns error on failure
```

- ### PATCH  /user/edit

- edit the returns a current snapshot of the logged in user.

```c
    const objectToAdd = {
        displayName: 'myFirstName myLastName',
        photoUrl: 'path/to/my/image.jpg'
    }
    const response = request.patch('myserverurl/user/edit', obody=bjectToAdd);
    console.log(response); //returns the same response as /user
    //the output
    {
        id: 'userId',
        verified: 'true/false',
    }
    // returns error on failure
```

- ### DELETE  /user/delete

- takes in the user id and delete current snapshot of the logged in user and related files.

```c
    const response = request.delete('myserverurl/user/delete', query={'userId': 'myId'});
    console.log(response);
    //the output
    {
        response: 'file deleted'
    }
    // returns error on failure
```

- ### GET  /user/verify

- sends email verification to verify the current user to gain access to the files.

```c
    const response = request.get('myserverurl/user/verify');
    console.log(response);
    //the output
    {
        emailStatus: 'verification email sent'
    }
    // returns error on failure
```

- ### GET  /user/reset-password

- sends email link to reset the current user password.

```c
    const response = request.get('myserverurl/user/reset-password');
    console.log(response);
    //the output
    {
        status: 'reset password link sent'
    }
    // returns error on failure
```

- ### GET /user/verification-status

- get the current user email verification status.

```c
    const response = request.get('myserverurl/user/verification-status');
    console.log(response);
    //the output
    true // if user ie email verified else otherwise
    // returns error on failure
```

- ### POST  /user/post-book

- upload a book into the user's catalogue. It takes in a jsonObject as shown below.

```c
    const bookmodel = {
        'title': 'my test book',
        'description': 'little mongo db',
        'addedDate': '10:04pm',
        'imagePreviewUrl': 'path/to/preview/image.png',
        'author': 'testing',
        'rating': 3,
        'genres': 'programming',
        'pages': 10,
        'localPath': 'path to file'
    }

    const r_json = {
        'bookInfo': bookmodel,
        'userId': 'myId'
    }
    const response = request.post('myserverurl/user/post-book', body=r_json);
    console.log(response);
    //the output
    {
        pdfDetails: {
            id: bookid
            status: 200
            text: OK
        },
        pdfInfo: {
            status: 'file successfully uploaded'
        },
        remotePath: 'remote/path/to/my/book.pdf'
    }
    // returns error on failure
```

- ### GET  /user/get-book

- download a book from the server into the local system. It creates a read stream from the remote path and dump the contents to the local path.

```c
    const bookPaths = {
        'localPath': 'path/to/store/my/book.pdf',
        'remotePath': 'path/of/my/book/on/the/server.pdf',
    }

    const response = request.get('myserverurl/user/get-book', query=bookPaths);
    console.log(response);
    //the output
    {
       status: 'file successfully dowmnloaded'
    }
    // returns error on failure
```

- ### DELETE  /user/delete-book

- delete a book from the server using the remote path.

```c
    const r_json = {
        'bookId': 'myBookId',
        'userId': 'myId',
        'remotePath': 'path/of/my/book/on/the/server.pdf',
    }

    const response = request.delete('myserverurl/user/delete-book', body=r_json);
    console.log(response);
    //the output
    {
       status: 'deleted'
    }
    // returns error on failure
```

- ### GET  /all-books

- get all books info from the server.

```c
    const response = request.get('myserverurl/all-books');
    console.log(response);
    //the output
    {
       .........
       .........//all books
       .........
    }
    // returns error on failure
```

- ### GET  /user/all-books

- get all user's books info from the server.

```c
    const response = request.get('myserverurl/all-books', query={userId: 'myId'});
    console.log(response);
    //the output
    {
       .........
       .........//user books info
       .........
    }
    // returns error on failure
```

- ### GET  /user/book

- get a specific book info from the server.

```c
    const r_json = {
        userId: 'userID',
        bookId: 'bookId'
    }
    const response = request.get('myserverurl/user/book', query=r_json);
    console.log(response);
    //the output
    {
       .........
       .........//specified book info
       .........
    }
    // returns error on failure
```

- ### PUT  /user/book/edit

- edit a specific book info from the server.

```c
    const bookmodel = {
        'title': 'my test book',
        'description': 'little mongo db',
        'addedDate': '10:04pm',
        'imagePreviewUrl': 'my image link"
        'author': 'testing',
        'rating': 3,
        'genres': ['programming'],
        'pages': 10,
        'localPath': 'my local path'
    }
    const r_json = {
        bookInfo: bookmodel,
        userId: 'userID',
        bookId: 'bookId'
    }
    const response = request.put('myserverurl/user/book/edit', body=r_json);
    console.log(response);
    //the output
    {
       .........
       .........//specified book updated info
       .........
    }
    // returns error on failure
```

- ### GET  /user/books/favorites

- get an object containing the user's favorite books from the server.

```c
    const response = request.get('myserverurl/user/books/favorites', query=r_json);
    console.log(response);
    //the output
    {
       '-NeiXWScF21qnNHTf-RX': 'my book id'
    }
    // returns error on failure
```

- ### GET  /user/books/favorite/add

- add objects containing the user's favorite books to the server.

```c
    const response = request.get('myserverurl/user/books/favorites', query=r_json);
    console.log(response);
    //the output
    {
       '-NeiXWScF21qnNHTf-RX': [my list of favorite books id]
    }
    // returns error on failure
```

- ### DELETE  /user/books/favorite/delete

  - delete from the user's favorite list or remove favorite.

```c
    const r_json = {
        userId: 'userID',
        favId: 'favBookId'
    }
    const response = request.delete('myserverurl/user/books/favorites/delete', query=r_json);
    console.log(response);
    //the output
    {
       '-NeiXWScF21qnNHTf-RX': "some random string"
       .......
    }
    // returns error on failure
```

- ### DELETE  /user/books/favorites/delete

  - delete all user's favorites.

```c
    const r_json = {
        userId: 'userID',
    }
    const response = request.delete('myserverurl/user/books/favorites/delete', r_json);
    console.log(response);
    //the output
    {
       status: 'favorites deleted'
    }
    // returns error on failure
```

- ### GET  /read-book

- read the book content, it returns the content of the book in a readable stream.

```c
    const resp = requests.get('localhost:4000/read-book', query={'userId': 'myId', 'bookId': 'book id'});
    console.log(resp);
    //the output
    {
       status: "OK",
       .......binary content of the book.......
    }
    // returns error on failure
```

## Authors

- Jimoh Qudus <engineerphoenix1@gmail.com>
- Felix Dawodu <diamondfelix006@gmail.com>
