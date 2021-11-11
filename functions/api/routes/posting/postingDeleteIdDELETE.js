const express = require("express");
const router = express.Router();
// response 데이터 형식 지정
const util = require("./../../../lib/util");
const responseMessage = require("./../../../constants/responseMessage");
const statusCode = require("./../../../constants/statusCode");

// db mockup
// const postings = require("../../../dbMockup/posting");
const fs = require("fs");
let postings;
// fs.readFile(`./dbMockup/postingTxt.txt`, (err, data) => {
//   if (err) return console.log(err.message);
//   postings = JSON.parse(data);
// });

// RESPONSE DATA: posting 정보
module.exports = (req, res) => {
  const data = fs.readFileSync(`./dbMockup/postingTxt.txt`);
  postings = JSON.parse(data);

  const { id } = req.params;

  // request data 확인 - 없다면 Null Value 반환
  if (!id) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // deleted가 false인 것 추리기
  const truePosting = postings.filter((obj) => Boolean(obj.deleted) === false);

  // 존재하는 게시글인지 확인
  let existPosting = truePosting.filter(
    (obj) => Number(obj.id) === Number(id)
  )[0];
  if (!existPosting) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POSTING));
  }
  // 현재 시각
  const today = new Date();
  const year = "" + today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const timestamp =
    year + "." + month + "." + day + " " + hours + ":" + minutes;

  //   // 포스팅 삭제처리
  //   const deletedPosting = {
  //     ...existPosting,
  //     updated_at: timestamp,
  //     deleted: true
  //   };

  // 인덱스 구하기
  const index = postings.findIndex((i) => Number(i.id) === Number(id));
  postings[index].updated_at = timestamp;
  postings[index].deleted = true;

  // 파일에 저장
  console.log(postings);

  let strPostings = JSON.stringify(postings);
  fs.writeFileSync(`./dbMockup/postingTxt.txt`, strPostings);

  // 성공
  res.status(statusCode.OK).send(
    util.success(
      statusCode.OK,
      responseMessage.POSTING_DELETE_SUCCESS
      // deletedPosting
    )
  );
};
