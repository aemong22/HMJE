FROM matthewfeickert/docker-python3-ubuntu
WORKDIR /var/jenkins_home/workspace/hmje-deploy/python-server/news_word
COPY requirements.txt ./

RUN apt-get update
RUN apt-get install g++ openjdk-8-jdk python3-dev python3-pip curl
RUN python -m pip install --upgrade pip
RUN python -m pip install konlpy
RUN pip install -r requirements.txt

# Add the script to the Docker Image
ADD news_word.sh /root/news_word.sh

# Give execution rights on the cron scripts
RUN chmod 0644 /root/news_word.sh

RUN apt-get update
RUN apt-get -y install cron

# Add the cron job
RUN crontab -l | { cat; echo "0 11 * * * bash /root/news_word.sh"; } | crontab -

CMD ["cron", "-f"]
