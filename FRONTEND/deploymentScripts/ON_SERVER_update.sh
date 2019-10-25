rm -rf frontend/*
mkdir ./frontend/logs
mkdir ./frontend/static
tar zxvf ./frontExpacom.tar.gz
mv build/* frontend/
rm -rf build
rm -rf frontExpacom.tar.gz