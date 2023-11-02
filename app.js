const express = require('express')
const mongoose = require('mongoose'); //commonJS방식
// import mongoose from 'mongoose'; //ESM방식
// 둘다 가능
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB에 연결
mongoose.connect('mongodb://localhost/mydb', {
  // 첫번째 매개변수는 연결하려는 데이터베이스 URL
  // 옵션객체 useNewUrlParser: MongoDB 연결 URL의 파싱을 위해 사용하는 옵션으로, true로 설정해야 합니다.
  // useUnifiedTopology: 새로운 서버 디스커버 및 모니터링 엔진을 사용하는 옵션으로, true로 설정해야 합니다.
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// MongoDB 스키마 및 모델 정의
const dataSchema = new mongoose.Schema({
// mongoose.Schema는 Mongoose에서 데이터 모델의 스키마를 정의하기 위한 클래스입니다. 스키마는 데이터 모델의 구조와 필드를 정의하는데 사용됩니다.

// dataSchema는 스키마의 인스턴스를 생성한 것으로, 데이터 모델의 구조를 정의합니다. 이 예제에서는 간단한 스키마로 message라는 필드를 가지고 있습니다.
  message : String,

  // message: String:
// ? 스키마 정의 내부에서 각 필드는 객체 형태로 표현됩니다. 여기서 message는 데이터 모델이 가질 필드의 이름이고, String은 데이터의 데이터 유형을 나타냅니다. 이 경우, message 필드는 문자열(String) 값을 가집니다.

// const Data = mongoose.model('Data', dataSchema);:
// mongoose.model() 메서드를 사용하여 데이터 모델을 생성합니다. 이 메서드는 두 개의 인수를 받습니다.
// 첫 번째 인수인 'Data'는 모델의 이름으로, 이 이름은 MongoDB 데이터베이스 내의 컬렉션 이름을 나타냅니다.
// 두 번째 인수인 dataSchema는 앞에서 정의한 스키마를 가리킵니다. 이 스키마를 기반으로 데이터 모델을 생성합니다.
// 
});

const Data = mongoose.model('Data', dataSchema);

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// 루트 페이지
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// POST 요청 처리
app.post('/addData', async (req, res) => {
  try {
    // POST 요청에서 클라이언트로부터 받은 데이터를 MongoDB에 저장
    const newData = new Data({ message: req.body.message });
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ error: '데이터를 저장하는 중에 오류가 발생했습니다.' });
  }
});
app.listen(PORT, () => {
  console.log(`서버 구동 중: http://localhost:${PORT}`);
});