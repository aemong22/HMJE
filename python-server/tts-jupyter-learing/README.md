# TTS 학습
## 환경
- OS : ubuntu 18.04
- Python : Python3.7
- TTS, g2pK 등 추가 사항들 다운 및 설치 진행
  - https://github.com/sce-tts/TTS.git
  - https://github.com/sce-tts/g2pK.git
- 사용 데이터
  - KSS(https://www.kaggle.com/datasets/bryanpark/korean-single-speaker-speech-dataset)
    - **리샘플링 후 사용** : 44100KHz -> 22050KHz 
    - 오디오 파일 형식: wav
    - 총 실행 시간: 12시간 이상
    - 오디오 파일 수: 12,853
- 사용 모델
  - Coqui.ai TTS에서 제공하는 사전 학습 모델에 KSS 데이터로 추가 학습하여 사용
  - GlowTTS + hifiGan