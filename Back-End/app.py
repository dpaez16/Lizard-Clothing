from modules.lin_regress import linRegression
from modules.svm import svm
from modules.kmeans import kmeans
from modules.kmedoids import kmedoids
from modules.lda import lda
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
services = {
    'svm': svm,
    'lin_regress': linRegression,
    'kmeans': kmeans,
    'kmedoids': kmedoids,
    'lda': lda
}

cors = CORS(app, resources={
    r'/{}'.format(service): {"origins": "*"} for service in services
})

@app.route('/<string:service_name>', methods=['POST'])
def service(service_name):
    try:
        service_func = services[service_name]
    except:
        # service does not exist
        return None, 401
    
    data = request.get_json()
    output_data = service_func(data)
    return jsonify(output_data)


if __name__ == "__main__":
    app.run(debug=True)
