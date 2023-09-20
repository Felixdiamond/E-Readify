import sys
import requests
import time

file_path = sys.argv[1]
file_name = file_path.split('/')[-1]
print(file_path)
    
# request_json = {'localPath': file_path, 'remotePath': 'pdfs/{}'.format(file_name)}

# response = requests.post("http://127.0.0.1:4000/user/login", json={'email': sys.argv[1], 'password':sys.argv[2]})
# print('login test: ', response.text)


response = requests.get("http://127.0.0.1:4000/user/books/favorites")
print(response.text)
# response = requests.delete("http://127.0.0.1:4000/user/delete-book", json=request_json);
# print(response)

# bookmodel = {
#     'title': 'my test book',
#     'description': 'little mongo db',
#     'addedDate': '10:04pm',
#     'author': 'testing',
#     'rating': 3,
#     'genres': 'programming',
#     'pages': 10,
#     'localPath': sys.argv[3]
# }

# r_json = {
#     'bookInfo': bookmodel,
#     'userId': response.json()['id'],
#     'bookId': "-NeiXWScF21qnNHTf-RX",
# }

# new = requests.get("http://127.0.0.1:4000/all-books")
# print(new.text)
# print(r_json)
# new = requests.post("http://127.0.0.1:4000/user/post-book", json=r_json)
# resp = new.json()

# del_payload = {
#     # 'bookId': '-NeiSmOk9wdUs5CV_1l9',
#     # 'userId': 'Xv2tBod1GxbiNo5dxCjOrKfg9eo2',
#     'localPath': 'mongo.pdf',
#     'remotePath': 'pdfs/Xv2tBod1GxbiNo5dxCjOrKfg9eo2/-NeiSmOk9wdUs5CV_1l9/mongo.pdf'
# }
# # print(del_payload)
# # new = requests.delete("http://127.0.0.1:4000/user/delete-book", json=del_payload)
# # print(new.text)

# new = requests.put("http://127.0.0.1:4000/user/book/edit", json=r_json)
# print(new.text)