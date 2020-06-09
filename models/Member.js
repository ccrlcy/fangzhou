var mongoose = require('mongoose');

const Services = Object.freeze({
	Total: '토탈서비스',
	DIY: 'DIY토탈서비스',
	Consulting: '컨설팅+번역서비스',
	Onestop: '원스탑서비스',
	Nonstop: '논스탑서비스',
	Home: '주거지서비스',
});

const FZ_staff = Object.freeze({
	Ih: '황인희',
	Joy: '조이',
	Zhao: '조선희',
	Sh: '정승환',
	Sy: '이상인',
	Mh: '장명호',
	Jy: '이주용',
});

const Genders = Object.freeze({
	Male: '남자', 
	Female: '여자'
})

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
  },
  nameEn: {type: String},
  nameCh: {type: String},
  gender: {
    type: String,
    enum: Object.values(Genders),
  },
  status: {
  	type: String,
  	enum: ['온라인 상담', '방문 상담', '계약 고려', '계약 완료', '진행 중', '발표 대기', '서비스 완료', '보류']
  },
  reason: {
  	type: String,
  	enum: ['어학원 홍보지', '친구 소개', '길거리 포스터', '토픽시험 당일 홍보지', '면세점 홍보지']
  },
  birth: Date,
  country: {type: String},
  mobile_kr: {type: String},
  city: {type: String},
  current_job: {type: String},
  lvOfLs: {
  	type: Number,
  	min : 0,
  	max : 8
  }, 
  lvOfTp: {
  	type: Number,
  	min : 0,
  	max : 8
  }, 
  lvOfEng:{type: Number},
  visa:{type:String},
  certificate:{type:String},
  Grad_status:{
  	type:String,
  	enum: ['졸업', '졸업예정', '수료', '기타']
  },
  grad_comment:{type:String},
  wish_service:{
  	type:String,
  	enum:Object.values(Services),
  },
  wish_univ:[{type: mongoose.Schema.ObjectId, ref: 'University'}],
  wish_major:{type:String},
  hoku: {
  	type: String,
  	enum: ['한권-호주:부', '한권-호주:모', '두권', '세권']
  },
  parents: {
  	type:String,
  	enum:['이혼안함', '이혼증서있음', '민사판결문 있음', '기타']
  },
  feed:{
  	type:String,
  	enum:['아버지', '어머니']
  },
});

// Object.assign(memberSchema.statics, {
//   Services,
// });

// model & export
var Member = mongoose.model('Member', memberSchema);
module.exports = Member;