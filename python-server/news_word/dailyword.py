import requests
from math import log10
import os
from collections import defaultdict
from dotenv import load_dotenv
import pymysql
import datetime
from bs4 import BeautifulSoup
import time
from konlpy.tag import Kkma
kkma = Kkma()
load_dotenv()

# ------------------------ tf-idf 구현 함수 선언 ----------------------- #


def f(t, d):
    # 해당 문서 내에 단어가 몇 번 등장하는가. d = 문서, t = 단어
    return d.count(t)


def tf(t, d):
    # 문서 내 tf 계산. d = 문서 t = 단어
    return 0.5 + 0.5*f(t, d)/max([f(w, d) for w in d])


def idf(t, D):
    # 문서 내 idf 계산. d = 문서 t = 단어
    numerator = len(D)
    denominator = 1 + len([True for d in D if t in d])
    return log10(numerator/denominator)


def tfidf(t, d, F):
    # tf-idf 계산. t = 단어, d = (단어가 나온)문서, F = 비교할 문서집단
    return tf(t, d)*idf(t, F)


def tfidfScorer(D, F):
    # D는 단어 리스트로 받음(고유명사)
    # F는 비교할 단어 집단.
    result = []
    for d in D:
        result.append((d, tfidf(d, D, F)))  # 튜플 형태로 (단어, tf-idf) 형태로 반환
    result = list(set(result))  # 중복단어 제거
    result.sort(key=lambda x: x[1], reverse=True)  # 역순 정렬

    return result

# ---------------------------- 함수 선언 종료 --------------------------- #


# 작동 요청 시간
now = datetime.datetime.now()
# MySQL Connection 연결
sql_host = os.getenv("SQL_HOST")
sql_user = os.getenv("SQL_USER")
sql_password = os.getenv("SQL_PASSWORD")
sql_db = os.getenv("SQL_DB")
sql_port = int(os.getenv("SQL_PORT"))

conn = pymysql.connect(host=sql_host, user=sql_user,
                       password=sql_password, db=sql_db, charset='utf8', port=sql_port)

curs = conn.cursor(pymysql.cursors.DictCursor)
# SQL문 미리 작성해두기
selectSql = "select word_id, word_name from word"
insertSql = "insert into daily_word(category,word_id, created_at, updated_at) values (%s, %s, %s, %s)"
# 대조하기 위해서 DB에 저장된 전체 단어 리스트 꺼내오기
curs.execute(selectSql)
words = curs.fetchall()

# --------------------- tf-idf 관련 자료 임포트 ---------------- #
news_text = [line.rstrip('\n') for line in open(
    '2016-10-20.txt', 'r', encoding="UTF-8") if len(line.rstrip()) > 0]


# --------------------- 크롤링 파트 ---------------------------- #
# user input
keywords = ["경제", "사회", "문화", "과학"]
lastpage = 50
new_flag = 0  # 0은 정확도순 / 1은 최신순
결과 = []
insert_list = []
불용어리스트 = ['여성', '지역', '남성', '사업', '국가', '기자', '게임', '뉴스', '대표', '산업', '중국', '경제', '과학', '주석', '한국', '사냥', '기업', '문제',
          '대회', '시상', '지난해', '회의', '구조', '문화', '위원회', '운영', '서비스', '센터', '이번', '부산', '확대', '관련',
          '다양', '사장', '경기', '서울', '게이', '아이', '시청', '이날', '대상', '시간', '지적', '관계자', '대통령', '본관', '위원장', '역사', '최대', '경영', '출처',
          '기술', '사회', '정부', '연구', '시장', '투자', '제공', '추진', '울산', '생활', '정책', '활동', '시민', '사진', '사회적', '분야', '기관', '단체', '연합', '세계', '올해', '도시', '참여', '예정', '환경',
          '교육', '시설', '강화', '국민', '금리', '전략', '조사', '프로젝트', '발표', '조성', '평가', '선정', '이후', '이상', '안전', '필요', '국내', '재단', '진행', '금융', '개선', '상황', '미래', '최근', '청년', '프로그램',
          '은행', '방안', '내용', '발전', '공간', '규모', '예술', '콘텐츠', '주민', '국제', '과정', '참석', '전국', '수출', '정보', '동물', '문화재', '방문', '기준', '수준', '공동', '성장',
          '노력', '일본', '가능', '생각', '개최', '사람', '활용', '마련', '업무', '회장', '목표', '글로벌', '세종', '중심', '행사', '기반', '피해', '금지', '공개', '오후', '피해자', '학교',
          '복지', '결과', '경우', '영향', '설명', '해외', '시작', '통신', '구성', '분석', '연대', '노동', '지정', '활성화', '그룹', '관리', '공유', '광주', '기대', '교수', '건강', '자원',
          '성과', '전문', '핵심', '대출', '간담회', '재판매', '중앙', '현장', '주요', '건설', '제도', '기획', '체험', '지금', '병원', '가능성', '행정', '준비', '반도체',
          '인상', '결정', '의료', '국립', '지속', '생산', '오전', '가운데', '우리나라', '기간', '변화', '홍보', '전망', '물가', '대응', '확인', '양 성', '현재', '개혁', '회관', '협약',
          '대학', '제품', '방송', '논의', '주장', '탄소', '체육', '에너지', '관계', '해결', '복합', '연구원', '증가', '이야기', '반려', '시스템', '학생', '취약', '모습', '후보',
          '포함', '장애인', '의원', '서울시', '주택', '공공', '지급', '코로나', '가격', '전세', '시대', '지난달', '온라인', '박사', '의사', '대전', '대비', '자료', '연구소', '장관',
          '공사', '중요', '발언', '소비자', '공원', '현지', '교류', '체계', '실장', '역량', '현대', '달러', '추가', '적극', '민간', '계층', '과학자', '과장', '공모', '예산', '우주', '확산',
          '제보',  '지구', '첨단', '단지', '예상', '자리', '소비', '전체', '발생', '사실', '기존', '디지털', '이유', '완화', '지표', '입장', '화학', '과제', '정도',
          '진흥원', '유치', '감소', '부분', '인력', '지속적', '사건', '가족', '범죄', '전문가', '정상', '일부', '이용', '사기', '기초', '장애', '향후', '대한민국', '심사', '지방', '육성',
          '경험', '최고', '고용', '위기', '예방', '의대', '통합', '대책', '공급', '특별', '전환', '사우디', '사항', '부지', '최초', '강제', '전시', '위원', '신뢰', '처음', '기회', '종합',
          '관광', '영상', '인천', '보건', '제시', '사용', '대구', '상품', '백신', '제주', '플랫폼', '석유', '기사', '오일', '관심', '음악', '조선', '모집', '상담',
          '공연', '당시', '반영', '주제', '탈모', '연계', '의견', '소개', '학습', '선택', '종교', '적자', '기공식', '국회', '부동산', '각종', '민생', '노조', '신규', '공무원', '발굴',
          '보장', '요구', '의미', '원장', '실천', '회견', '제작', '인간', '방침', '효과', '인사', '적극적', '위험', '보도', '이사장', '건립', '제안', '자유', '드라마', '전자', '산림',
          '개인', '이전', '자신', '유지', '외국인', '상태', '지도', '비판', '도입', '인재', '전통', '반대', '인구', '양국', '계속', '기여', '통화', '사이', '동안', '평균', '운동',
          '사례', '한일', '회담', '구매', '보고서', '바이오', '우수', '경주', '영화', '수행', '절차', '적용', '인식', '지사', '재정', '자동차', '전당', '실시', '시범', '처리', '구역',
          '농업', '조직', '정의', '감독', '상승', '요약', '최종', '진단', '수립', '본부장', '카카오', '합의', '사회단체', '민주당', '발견', '식물', '자연', '차지', '회복', '부담', '대화',
          '배상', '경제인', '보호', '부총리', '은행권', '모델', '홈페이지', '브랜드', '미추홀', '방법', '대구시', '음식', '박물관', '인민', '동원', '기념', '촬영', '복원', '오늘', '최선',
          '카드', '희망', '인권', '커피', '박람회', '발달', '등록', '외교', '기금', '판매', '제한', '강조', '본부', '확충', '중소기업', '필수', '스포츠', '아시아', '광주시', '노총',
          '아동', '여건', '연방', '청사', '진출', '파월', '의장', '고객', '단위', '공장', '이하', '요청', '해당', '아파트', '물질', '치료', '작품', '행동', '연구자', '청소년', '스컹크',
          '세계적', '창출', '시행', '요인', '이자', '기부', '중인', '이동', '수요', '방향', '이미지', '이름', '거리', '직원', '앵커', '주거', '취지', '이재명', '검찰', '이해', '캠페인',
          '과기', '집중', '대규모', '계기', '해법', '주도', '하락', '신속', '논란', '언급', '전기', '세대', '세상', '지수', '비용', '채널', '헬스', '협회', '진료', '재난', '책임', '실태',
          '안정', '투표', '기구', '둔화', '신용', '당부', '차원', '촉진', '모두', '연결', '현황', '점검', '스타', '제약', '융합', '교통', '어머니', '한류', '토양', '속도',
          '기록', '상당', '단계', '일보', '도움', '조정', '소속', '차례', '사고', '소재', '음반', '어린이', '새끼', '대명', '한화', '수도원', '전인대', '일자리',
          '부채', '연속', '혜택', '여의도', '총리', '일정', '참가', '어려움', '목소리', '가구', '부문', '훈련', '맞춤', '접종', '왼쪽', '근로', '내부', '블랙', '한편', '교회', '씨앗', '허브',
          '충북', '영산포', '창경궁', '그레이트', '청주', '잠실', '산둥성', '광역시', '러시아', '아프리카', '베스트', '중남미', '영국', '시다', '블록', '체인', '과학적', '과학화', '후미', '교육청', '경제계', '이메일'
          ]
for x in range(len(keywords)):
    keyword = keywords[x]
    db_cnt = 0
    page_num = 1
    category_list = defaultdict(float)
    for i in range(1, lastpage * 10, 10):
        print(f"{page_num} page...")
        response = requests.get(
            f"https://search.naver.com/search.naver?where=news&sm=tab_jum&query={keyword}&start={i}&sort={new_flag}")
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        articles = soup.select("div.info_group")

        for article in articles:
            links = article.select("a.info")
            if len(links) >= 2:
                try:
                    url = links[1].attrs["href"]
                    # to avoid error use headers
                    response = requests.get(
                        url, headers={'User-agent': 'Mozila/5.0'})
                    # for each url get html
                    html = response.text
                    # for each html make soup
                    soup = BeautifulSoup(html, "html.parser")

                    # separation
                    if "entertain" in response.url:                                         # to avoid redirection error
                        # get the title
                        title = soup.select_one(".end_tit")
                        # get the body
                        content = soup.select_one("#articeBody")

                    elif "sports" in response.url:                                          # to avoid redirection error
                        # get the title
                        title = soup.select_one("h4.title")
                        # get the body
                        content = soup.select_one("#newsEndContents")

                        # delete unnecessary elements
                        divs = content.select("div")
                        for div in divs:
                            div.decompose()

                        paragraphs = content.select("p")
                        for p in paragraphs:
                            p.decompose()

                    else:
                        # get the title
                        title = soup.select_one(".media_end_head_headline")
                        # get the body
                        content = soup.select_one("#dic_area")
                except:
                    title = "잘못된 게시글입니다."
                    content = " "

                # print("========LINK========\n", url)
                # print("========TITLE========\n", title.text.strip())
                # print("========BODY========\n", content.text.strip())
                try:
                    tagging = kkma.pos(content.text.strip())
                    NNG_list = []
                    for i, j in tagging:
                        # 길이가 2~4인 일반 명사만 추출
                        if j == 'NNG' and 5 > len(i) > 1 and i not in 불용어리스트:
                            NNG_list.append(i)

                    result = tfidfScorer(NNG_list, news_text)  # tf-idf 값 추출
                    for a, b in result[:30]:
                        category_list[a] += b  # tf-idf 값 더해주기
                except:
                    print("tf-idf 오류")

                time.sleep(0.3)

        page_num += 1
    print()
    keyword_list = list(category_list.items())
    keyword_list.sort(key=lambda x: x[1], reverse=True)
    # print("tf-idf값 총합 확인")
    # print(keyword_list)
    tfidf_keyword = [i for i, j in keyword_list]
    # print(repeat_keyword[:100])
    for k in tfidf_keyword:
        if k in 결과:
            continue
        for word in words:
            if k == word["word_name"]:
                # print("=== 등록된 키워드 ===")
                # print(k)
                db_cnt += 1
                결과.append(k)
                insert_list.append((k, keyword, word['word_id']))
                break
        if db_cnt >= 5:
            break

print()
print()
print(결과)
for k, c, i in insert_list:
    curs.execute(insertSql, (c, i, now, now))
    conn.commit()

end = datetime.datetime.now()

print(f"경과한 시간 : {(end-now).seconds}초")
# --------------------- 크롤링 파트 끝 ---------------------------- #
