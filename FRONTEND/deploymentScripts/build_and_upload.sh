cd ..
npm run build
tar zcvf frontExpacom.tar.gz build/*
scp frontExpacom.tar.gz expacom@10.7.14.30:.
rm -rf build
rm frontExpacom.tar.gz
ssh expacom@10.7.14.30 ./updateFront.sh