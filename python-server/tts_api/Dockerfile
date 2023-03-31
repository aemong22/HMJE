FROM ubuntu:18.04
WORKDIR /var/jenkins_home/workspace/hmje-deploy/python-server/tts_api

# 모든 파일.
COPY * ./

# timezone
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# python, jdk
RUN apt-get update
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:webupd8team/java
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update
RUN apt-get install python3.9 -y
RUN apt-get install g++ openjdk-8-jdk curl -y
RUN apt-get install -y python3.9-distutils python3.9-dev unzip
RUN curl -sS https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3.9 get-pip.py --user
RUN python3.9 -m pip install --upgrade pip --user

RUN python3.9 -m pip install -r requirements.txt
RUN gdown --fuzzy https://drive.google.com/file/d/1onoQRGFPuBfmsuRvaJMRIkOhS6hVLSdL/view?usp=share_link -O /root/g2pK.zip
RUN gdown https://drive.google.com/drive/folders/1cSnA0-IpcnQ9fwyGU9Z-iwim02KW0WFp?usp=share_link -O /root/glow-tts --folder
RUN gdown https://drive.google.com/drive/folders/166fPFrVRrCLXNeX36cH7gxcFDCfQwM1O?usp=share_link -O /root/hifi-gan --folder
RUN gdown --fuzzy https://drive.google.com/file/d/1ctRe2bVewNFtVPmCaRHU3fIYDlgUTVSb/view?usp=share_link -O /root/TTS.zip
RUN unzip -q /root/TTS.zip -d /root/TTS
RUN unzip -q /root/g2pK.zip -d /root/g2pK

RUN python3.9 -m pip install -q --no-cache-dir -e /root/TTS/requirements.txt

RUN python3.9 -m pip install -q --no-cache-dir "konlpy" "jamo" "nltk" "python-mecab-ko"
RUN python3.9 -m pip install -q --no-cache-dir -e /root/g2pK

ADD flask_tts_api.py /root/flask_tts_api.py
ADD tts.py /root/tts.py

RUN chmod 0644 /root/flask_tts_api.py
RUN chmod 0644 /root/tts.py

EXPOSE 8080
ENTRYPOINT ["python3.9", "/root/flask_tts_api.py"]