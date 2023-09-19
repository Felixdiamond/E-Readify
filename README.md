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

## Future Plans
We have many exciting features planned for E-Readify in the future! Some of these include:
- Social features: Users will be able to connect with friends and share book recommendations.
- Reading challenges: Users will be able to participate in reading challenges and earn rewards for completing them.
- Book clubs: Users will be able to join book clubs and discuss books with other readers.



## E-Readify Backend APIs Documentation
The E-Readify backend provides APIs for books management and user management which is documented below

# User APIs


 - ### POST  /user/register
    - takes in CustomUser Model present in the models file as a Json object to create a user, update the user model in firebase and post the user favorites to the database.



```c
    const userModel = CustomUser(
        email: 'testEmail@gmail.com',
        password: 'testpassword',
        photoUrl: 'photourl.google.com.jpg'
        firstName: 'myFirstName',
        lastName: 'myLastName',
        favorites: [lets have an empty list that stores the id of favorite books later]
    );
    userJson = userModel.toJSON();
    const newUser = request.post('myserverurl/user/register', userJson);
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
    const response = request.post('myserverurl/user/login', credentials);
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