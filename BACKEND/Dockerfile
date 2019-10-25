# https://medium.com/@kmmanoj/deploying-a-scalable-flask-app-using-gunicorn-and-nginx-in-docker-part-1-3344f13c9649

# BUILD:
# docker build --tag backend .

# SERVE:
# docker run --name backend --detach -p 5000:5000 backend

FROM python:3.7
ADD . /app
WORKDIR /app
ADD requirements.txt /
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "backend:app"]