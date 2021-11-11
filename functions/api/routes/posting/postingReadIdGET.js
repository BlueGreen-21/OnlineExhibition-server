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

// RESPONSE DATA: posting 정보
module.exports = async (req, res) => {
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

  // 필요없는 정보 삭제
  delete existPosting["created_at"];
  delete existPosting["deleted"];

  // 성공
  res
    .status(statusCode.OK)
    .send(
      util.success(
        statusCode.OK,
        responseMessage.READ_SPECIFIC_POSTING_SUCCESS,
        existPosting
      )
    );
};
