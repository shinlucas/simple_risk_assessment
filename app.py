from flask import Flask, render_template, request, send_file, jsonify
from generate_docx import generate_docx_file
import json
from datetime import datetime

app = Flask(__name__)

# JSON 로딩 및 구조 변환: equipment_name -> list of {"risk": ..., "improvement": ...}
with open("data/위평_데이터_변환.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

    RISK_DATA = {}
    for entry in raw_data:
        equipment = entry["설비"]
        risks = entry["유해위험요인목록"]
        RISK_DATA[equipment] = risks

# 메인 페이지
@app.route('/')
def index():
    return render_template("index.html")

# 설비 목록 반환 (자동완성용)
@app.route('/get_equipment_list', methods=['GET'])
def get_equipment_list():
    return jsonify(list(RISK_DATA.keys()))

# 선택된 설비의 유해위험요인 리스트만 반환
@app.route('/get_risks', methods=['POST'])
def get_risks():
    data = request.get_json()
    equipment = data.get('equipment', '')
    risk_entries = RISK_DATA.get(equipment, [])
    risk_list = [item["유해위험요인"] for item in risk_entries]
    return jsonify(risk_list)

# 다운로드 요청 처리
@app.route('/download', methods=['POST'])
def download():
    try:
        raw_data = request.form.get('data')
        parsed_data = json.loads(raw_data)
        file_stream = generate_docx_file(parsed_data)
        return send_file(
            file_stream,
            as_attachment=True,
            download_name= datetime.today().strftime("%Y-%m-%d") + "위험성평가.docx",
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
