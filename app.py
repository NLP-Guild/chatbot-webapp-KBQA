import json
from flask import Flask, render_template
from chatbots import KBQABot_Diagnosis as kbqabot


bot = kbqabot('EYz8JHg7CAef4eR3rvKAeGFXwZvaQxH_q_MYvtGC5Cw')
app = Flask(__name__)



@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')

@app.route('/processUserQuery/<string:user_query>', methods=['POST'])
def process_user_query(user_query):
    user_query = json.loads(user_query)
    msg = user_query['content']

    response = bot.reply(msg)

    return response


if __name__ == '__main__':
    app.run(debug=False,host='120.77.235.141',port=8080)
