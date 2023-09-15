import sys
import requests
import base64

file_path = sys.argv[1]
file_name = file_path.split('/')[-1]
    
request_json = {'localPath': file_path, 'remotePath': 'pdfs/{}'.format(file_name)}

response = requests.delete("http://127.0.0.1:4000/user/delete-book", json=request_json);
print(response.content)
