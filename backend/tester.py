import sys
import requests
import time

file_path = sys.argv[1]
file_name = file_path.split('/')[-1]
print(file_path)
    
request_json = {'localPath': file_path, 'remotePath': 'pdfs/{}'.format(file_name)}

response = requests.post("http://127.0.0.1:4000/user/login", json={'email': sys.argv[1], 'password':sys.argv[2]})
print('login test: ', response.text)


response = requests.get("http://127.0.0.1:4000/user/")
print('current user', response.text)
# response = requests.delete("http://127.0.0.1:4000/user/delete-book", json=request_json);
# print(response)

bookmodel = {
    'title': 'my test book',
    'description': 'little mongo db',
    'addedDate': '10:04pm',
    'author': 'me',
    'rating': 5,
    'genres': 'programming',
    'pages': 100,
    'localPath': sys.argv[3]
}

r_json = {
    'bookInfo': bookmodel,
    'userId': response.json()['id']
}

# new = requests.get("http://127.0.0.1:4000/all-books")
# print(new.text)
print(r_json)
new = requests.post("http://127.0.0.1:4000/user/post-book", json=r_json)
resp = new.json()

del_payload = {
    'bookId': resp['pdfInfo']['id'],
    'userId': response.json()['id'],
    'remotePath': resp['remotePath']
}
print(del_payload)
new = requests.delete("http://127.0.0.1:4000/user/delete-book", json=del_payload)
print(new.text)