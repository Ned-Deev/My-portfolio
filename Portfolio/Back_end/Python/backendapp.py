# backend/app.py
from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/projects')
def projects():
    conn = get_db_connection()
    projects = conn.execute('SELECT * FROM projects').fetchall()
    conn.close()

    project_list = [dict(p) for p in projects]
    return jsonify(project_list)

if __name__ == '__main__':
    app.run(debug=True)
