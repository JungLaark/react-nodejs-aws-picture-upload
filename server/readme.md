# backend 환경설정 
## 명령어
    - npm install -D nodemon --> DEV 버전 
    - npm install multer
    - npm install morgan 
    - npm install uuid mime-types --save
## 진행사항 
    - package.json/script -> "dev": "nodemon server.js"
        - 이건 npm run dev 로 명령을 했을 때 실행됨. 
### 이미지 파일 업로드 
    - postman > Body > form-data > key > file 선택 
### 외부에서 파일 접근 가능 할 수 있도록 하기 
    - app.use('경로', express.static('./uploads'));
### 파일 저장 시 필터 설정 
```javascript
    if(['image/png', 'image/jpg'].includes(file.mimetype)){
        callback(null, true);
    }else{
        callback(new Error('파일 타입이 png나 jpg 가 아닙니다.'));
    }
```


infinite scroll