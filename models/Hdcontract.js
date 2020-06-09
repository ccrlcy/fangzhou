var mongoose = require('mongoose');

const FZ_staff = Object.freeze({
  Ih: '황인희',
  Joy: '조이',
  Zhao: '조선희',
  Sh: '정승환',
  Sy: '이상인',
  Mh: '장명호',
  Jy: '이주용',
});

const HdconctractSchema = new mongoose.Schema({
  name: { 
    type: Schema.ObjectId, 
    ref: 'Member', 
    required: true 
  },
  dateOfContract: {type: Date},
  fzcrew:{
    type: String,
    enum: Object.values(FZ_staff),
  },
  serviceName: {
    type: String,
    enum: ['토픽서비스', '회화서비스'],
  },
  serviceSub: {
    type: Number,
    min:1,
    max:5
  },
  serviceNum: {
    type: String,
    enum: ['주2회', '주3회'],
  },
  period: {
    type: Number,
    min:1,
    max:12
  },
  startDate: {type: Date},
  classDay1: {type: Date},
  classDay2: {type: Date},
  classDay3: {type: Date},
  classDay4: {type: Date},
  classDay5: {type: Date},
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

Object.assign(contractSchema.statics, {
  Services,
});

// model & export
var Contract = mongoose.model('contract', contractSchema);
module.exports = Contract;