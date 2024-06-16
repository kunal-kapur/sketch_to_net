from flask import Flask, jsonify, request
from flask_cors import CORS
from graph import Graph
import traceback
from generate_template import generate_python_code

app = Flask(__name__)
CORS(app)


@app.route('/submission', methods=['POST'])
def give_results():
    response = {}
    try:
        print("reached")
        data = request.get_json()
        print("data", data)
        response = {
            'status': 'success',
            'data': "data"
        }
        neural_network = Graph(nodes=data['nodes'], arrows=data['arrows'])
        for i in (neural_network.topological_sort()):
            print(i.name, i.attributes)
        out = generate_python_code(ordered_layers=neural_network.topological_sort())
        response = {'output': out}
        print("success")
        return jsonify(response), 200
    except Exception as e:
        print(traceback.format_exc())

    return jsonify(response)
