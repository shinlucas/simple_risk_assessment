# simple_risk_assessment
simple risk assessment service for beginner

# 🛠️ 위험성평가 간편화 시스템

사업장 내 위험성평가를 누구나 쉽게 수행할 수 있도록 지원하는 웹 기반 간편화 서비스입니다.  
설비를 선택하고 유해위험요인을 체크하면 자동으로 워드 문서를 생성하여 다운로드할 수 있습니다.

---

## 🔧 주요 기능

- ✅ 설비 검색 및 자동완성 기능 (JSON 데이터 기반)
- ✅ 유해위험요인 체크 및 적정/보완 평가
- ✅ 결과 리스트 누적 및 개별 삭제 가능
- ✅ Word(.docx) 파일 자동 생성 및 다운로드
- ✅ 가이드 문구 포함, 토글 방식 메모장 지원

---

## 📂 프로젝트 구조
simple_risk_assessment/
├── app.py # Flask 앱 실행 파일
├── generate_docx.py # Word 문서 생성 처리
├── requirements.txt # Python 의존성 명세
├── templates/
│ └── index.html # 메인 웹페이지
├── static/
│ └── scripts.js # 클라이언트 스크립트
├── base/
│ └── 위험성평가_견본파일.docx # 결과 양식 템플릿
└── data
│ └── 위평_데이터_변환.json # 설비별 유해위험요인 데이터

---

## 🚀 실행 방법 (로컬 테스트)

python -m venv venv
source venv/bin/activate  # 또는 venv\Scripts\activate (Windows)
pip install -r requirements.txt
python app.py
→ 브라우저에서 http://localhost:5000 접속

## 🔍 사용 가이드
- 설비명을 입력하면 자동완성 리스트가 나타납니다.
- 자동완성 리스트 중 설비를 선택하고 "결정" 버튼을 클릭하면 설비별 유해위험요인이 표시됩니다.
- 체크박스로 항목을 선택하고, 각 항목의 평가(적정/보완)를 지정합니다.
- "추가" 버튼을 누르면 아래 결과표에 항목이 추가됩니다.
- "삭제" 버튼으로 개별 항목의 제거가 가능하며, "다운로드"를 통해 위험성평가 결과 word 문서 생성도 가능합니다.
- 유해위험요인 및 개선사항은 한국산업안전보건공단 위험성평가시스템 KRAS( https://kras.kosha.or.kr/kras24/ )을 참조하였습니다.
- 본 웹사이트는 간단한 일시적 활용에 중점을 두고 제작한 위험성평가 간편화 툴로, 지속적이고 체계적인 위험성평가는 KRAS를 활용해주세요.

## 📄 라이선스 및 출처 고지
이 서비스는 산업안전보건공단의 위험성평가 양식 및 자료, 데이터를 참고하여 제작되었습니다.
공공데이터 기반 자료이며, 실제 공단과 직접적 연관은 없습니다.


