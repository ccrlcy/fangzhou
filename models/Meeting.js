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


const meetingSchema = new mongoose.Schema({
  name: { type: Schema.ObjectId, ref: 'Member', required: true },
  day: Date,
  place:{type:String},
  comment:{type:String},
  fzcrew:{
    type: String,
    enum: Object.values(FZ_staff),
  },
});

Object.assign(meetingSchema.statics, {
  Services,
});

// model & export
var Meeting = mongoose.model('meeting', meetingSchema);
module.exports = Meeting;