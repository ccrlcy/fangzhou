var mongoose = require('mongoose');

const Services = Object.freeze({
  Total: '토탈서비스',
  DIY: 'DIY토탈서비스',
  Consulting: '컨설팅+번역서비스',
  Onestop: '원스탑서비스',
  Nonstop: '논스탑서비스',
  Home: '주거지서비스',
});

const ServiceSub = Object.freeze({
  Uni : '대학',
  Grad : '대학원',
  Lang: '어학원',
  Non1: '어학원 + 대학',
  Non2: '어학원 + 대학원',
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

const contractSchema = new mongoose.Schema({
  dateOfContract: {type: Date},
  fzcrew:{
    type: String,
    enum: Object.values(FZ_staff),
  },
  member: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Member', 
    required: true,
  },
  serviceName: {
    type: String,
    enum: Object.values(Services),
  },
  serviceSub: {
    type: String,
    enum: Object.values(ServiceSub),
  },
  serviceNum: {
    type: Number,
    min:1,
    max:3,
  },
  appDate: {type: String,},
  comment: {type: String,},
  appUniv1: {type: String},
  appUniv2: {type: String,},
  appUniv3: {type: String,},
  appMajor1: {type: String,},
  appMajor2: {type: String,},
  appMajor3: {type: String,},
  counselling: {
    type: Boolean,
  },
  counsDate:{
    type: Date,
  },
  counsComment:{
    type:String,
  },
  counsDate2:{type: Date},
  counsComment2: {type: String},
  interview:{type: Boolean},
  interDate:{type: String},
  interPlace:{type:String},
  interPrepareDate:{type: String},
  interComment:{type: String},
  pice: {type: Number},
  current : {
    type: String, 
    enum: ['원화', '위챗페이', '알리페이'],
  },
  depositDate1: {type: Date},
  depositMoney1: {type: Number},
  depositDate2: {type: Date},
  depositMoney2: {type: Number},
});

// model & export
var Contract = mongoose.model('contract', contractSchema);
module.exports = Contract;