from flask import Flask, jsonify, request
from flask_cors import CORS
from graph import Graph
import traceback

app = Flask(__name__)
CORS(app)


@app.route('/submission', methods=['POST'])
def hello_world():
    response = {}
    try:
        print("reached")
        data = request.get_json()
        print("data", data)
        response = {
            'status': 'success',
            'data': "data"
        }
        neural_net = Graph(nodes=data['nodes'], arrows=data['arrows'])
        for i in (neural_net.topological_sort()):
            print(i.name)
        print("success")
    except Exception as e:
        print(traceback.format_exc())

    return jsonify(response)
