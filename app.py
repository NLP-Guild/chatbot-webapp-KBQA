import json
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')

@app.route('/processUserQuery/<string:user_query>', methods=['POST'])
def process_user_query(user_query):
    user_query = json.loads(user_query)
    print()
    print('服务器端接收到了user query:')
    print(user_query)
    print()
    return '服务器端成功接受消息并发送回复'


if __name__ == '__main__':
    app.run()
