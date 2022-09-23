# chat-web-app
A web app for direct chat.
<!-- [[GitHub Page (static)](https://leoxiang66.github.io/chat-web-app/)] -->


## Features
1. send user query to flask backend
    ```javascript
      // 读取user msg
      {
        msg = $('.message-input').val();
        // console.log(msg)
        if ($.trim(msg) == '') {
          return false;
        }
      }



      // 将User msg 发送给服务器
      {
        let user_query = {
        'content': msg
        }
        const request = new XMLHttpRequest()
        request.open('POST', `processUserQuery/${JSON.stringify(user_query)}`)
        request.send()
      }
    ```
2. recieve user query at flask backend and response
    ```python
    @app.route('/processUserQuery/<string:user_query>', methods=['POST'])
    def process_user_query(user_query):
        user_query = json.loads(user_query)
        print()
        print('服务器端接收到了user query:')
        print(user_query)
        print()
        return '服务器端成功接受消息并发送回复'
    ```
3. recieve server response at frontend and print it to console
    ```javascript
    // 接受服务器的response
    request.onload = () => {
      const flaskMsg = request.responseText
      console.log(flaskMsg)
    }
    ```