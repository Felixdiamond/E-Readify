import sys
import requests
import time

user_id = None
book_id = None
remote_path = None

email = sys.argv[1]
password = sys.argv[2]
local_path = sys.argv[3]

login_credentials = {
    'email': email,
    'password': password
}

new_user = {
    'email': email,
    'password': password,
    'avatarUrl': 'www.test.com',
    'firstName': 'John',
    'lastName': 'Doe',
    'favorites': ['id1', 'id2']
}


# response = requests.post("http://127.0.0.1:4000/user/register", json=new_user)
# print("[[*] new user ] ", response.text)
# # time.sleep(10)

response = requests.post("http://127.0.0.1:4000/user/login", json=login_credentials)
print("[[*] login test ]", response.text)
# time.sleep(10)

# response = requests.get("http://127.0.0.1:4000/user/verify")
# print("[[*] GET test(verify) ]", response.text)
# time.sleep(10)

# response = requests.get('http://127.0.0.1:4000/user/verification-status')
# print("[[*] GET test(verification) ]", response.text)



# response = requests.get("http://127.0.0.1:4000/user/reset-password", json={'email': email})
# print("[[*] GET test(reset-password) ]", response.text)
# time.sleep(10)

# response = requests.post("http://127.0.0.1:4000/user/login", json=login_credentials)
# print("[[*] login test ]", response.text)
user_id = response.json()['id']

# response = requests.get('http://127.0.0.1:4000/user/verification-status')
# print("[[*] GET test(verification) ]", response.text)

# response = requests.get("http://127.0.0.1:4000/user/all-books", json={'userId': user_id})
# print("[[*] GET test(books) ]", response.text)

# book_json = {
#     'title': 'my test book',
#     'description': 'little mongo db',
#     'addedDate': '10:04pm',
#     'author': 'testing',
#     'rating': 3,
#     'genres': 'programming',
#     'pages': 10,
#     'localPath': local_path
# }
# r_json = {
#     'bookInfo': book_json,
#     'userId': user_id,
# }

# response = requests.post('http://127.0.0.1:4000/user/post-book', json=r_json)
# print("[[*] POST test(post book) ]", response.text)
# book_id = response.json()['pdfInfo']['id']


# response = requests.get('http://127.0.0.1:4000/all-books')
# print("[[*] GET test(all books) ]", response.text)

# response = requests.get('http://127.0.0.1:4000/user/all-books', json={'userId': user_id})
# print("[[*] GET test(all user books) ]", response.text)

# json = {
#     'userId': user_id,
#     'bookId': book_id
# }
# response = requests.get('http://127.0.0.1:4000/user/book', json=json)
# print("[[*] GET test(get a book) ]", response.text)

# response = requests.get('http://127.0.0.1:4000/user/books/favorites', json={'userId': user_id})
# print("[[*] GET test(get a book) ]", response.text)
response = requests.delete('http://127.0.0.1:4000/user/delete', json={'userId': user_id})
print("[[*] DELETE test(delete a user) ]", response.text)