FROM python:3.9



WORKDIR /home/vasiliy/my_project/hakatons/test4

RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .