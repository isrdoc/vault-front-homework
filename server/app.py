import time
from flask import Flask, jsonify, request
from flask_cors import CORS

from mock_data import mock_data

app = Flask(__name__)
CORS(app)

@app.route('/search')
def search_handler():
    # simulate long request
    time.sleep(2)

    event_type = request.args.get('type')
    if not event_type:
        return jsonify(mock_data)
    filtered = [x for x in mock_data if event_type.lower() in x['type'].lower()]
    return jsonify(filtered)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5001')
