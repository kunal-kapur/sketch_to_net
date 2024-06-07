from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"

@app.route('/submission', methods=['POST'])
def submission():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(port=3000)