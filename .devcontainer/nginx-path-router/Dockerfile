FROM nginx:stable
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001
CMD ["nginx-debug", "-g", "daemon off;"]