const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("./../../../lib/util");
const responseMessage = require("./../../../constants/responseMessage");
const statusCode = require("./../../../constants/statusCode");

// db mockup
// let postings = require("./../../../dbMockup/posting");

const fs = require("fs");
let postings;
// fs.readFile(`./dbMockup/postingTxt.txt`,  (err, data) => {
//   if (err) return console.log(err.message);
//   postingsTxt = JSON.parse(data);
//   // console.log(postingsTxt)
// });

// RESPONSE DATA: posting 정보
module.exports = async (req, res) => {
  const data = fs.readFileSync(`./dbMockup/postingTxt.txt`);
  postings = JSON.parse(data);
  console.log(postings);
  

  // deleted가 false인 것 추리기
  let returnValue = postings.filter((obj) => Boolean(obj.deleted) === false);
  console.log(returnValue);

  // 필요없는 정보 삭제
  returnValue.forEach((p) => {
    delete p["created_at"];
    delete p["deleted"];
  });

  // 성공
  res
    .status(statusCode.OK)
    .send(
      util.success(
        statusCode.OK,
        responseMessage.READ_ALL_POSTING_SUCCESS,
        returnValue
      )
    );
};
