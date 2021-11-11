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
  const { title, author, content } = req.body;

  // request data 확인 - 없다면 Null Value 반환
  if (!title || !author || !content) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // 현재 시각 구하기
  const today = new Date();
  const year = "" + today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const timestamp =
    year + "." + month + "." + day + " " + hours + ":" + minutes;

  // 새로운 포스팅 만들기
  const newPosting = {
    id: postings.length + 1,
    title,
    author,
    content,
    created_at: timestamp,
    updated_at: timestamp,
    deleted: false,
  };

  // 파일에 저장
  postings.push(newPosting);
  let strPostings = JSON.stringify(postings);
  fs.writeFileSync(`./dbMockup/postingTxt.txt`, strPostings);

  // 성공
  res
    .status(statusCode.OK)
    .send(
      util.success(
        statusCode.OK,
        responseMessage.POSTING_CREATE_SUCCESS,
        newPosting
      )
    );
};
