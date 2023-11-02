const express = require('express')
const mongoose = require('mongoose'); //commonJS방식
// import mongoose from 'mongoose'; //ESM방식
// 둘다 가능

mongoose.connect('mongodb://localhost/your-database-name', {
  // mongoDB와 연결
  // 첫번째 매개변수는 연결하려는 데이터베이스 URL
  // 옵션객체 useNewUrlParser: MongoDB 연결 URL의 파싱을 위해 사용하는 옵션으로, true로 설정해야 합니다.
  // useUnifiedTopology: 새로운 서버 디스커버 및 모니터링 엔진을 사용하는 옵션으로, true로 설정해야 합니다.
  useNewUrlParser: true,
  // 
  useUnifiedTopology: true
})
