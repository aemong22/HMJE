FROM nginx:stable-alpine as production-stage

COPY /var/jenkins_home/workspace/python-deploy/python-server/nginx_conf/deploy-conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
