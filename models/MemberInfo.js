var mongoose = require('mongoose');

const memberInfo = new mongoose.Schema({
	name: {
		type: mongoose.Schema.ObjectId, ref: 'Member', required: true,
	},
	email: {type: String},
	emailPw: {type: String},
	topik: {type: String},
	topikPw: {type: String},
	uway: {type: String},
	uwayPw: {type: String},
	uwayCn: {type: String}, 
	uwayCnPw: {type: String},
	addressKr: {type: String},
	addressCn: {type: String},
	mobileCn: {type: Number},

	// 학력
	hsName: {type: String},
	hsAddress: {type: String},
	hsPhone: {type: Number},
	hsPeriod: {type: String},
	hsGrad: {type: String},
	hsWeb: {type: String},
	hsPost: {type: String},
	hsEmail: {type: String},
	hsFax:{type: String},

	msName:{type: String},
	msPeriod:{type: String},
	msGrad:{type: String},

	psName:{type: String},
	psPeriod: {type: String},
	psGrad:{type: String},

	// 아버지
	fName:{type: String},
	fAddress:{type: String},
	fPhone:{type: Number},
	fCountry: {type: String},
	fOfficeName:{type: String},
	fPosition:{type: String},
	fSalary:{type: String},

	// 어머니
	mName:{type: String},
	mAddress:{type: String},
	mPhone:{type: Number},
	mCountry:{type: String},
	mOfficeName:{type: String},
	mPosition:{type: String},
	mSalary:{type: String},
});

var MemberInfo = mongoose.model('memberInfo', memberInfoSchema);
module.exports = MemberInfo