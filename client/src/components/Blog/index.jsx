import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, Image, Input, Modal } from "antd";
import { IoIosMore } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import parse from "html-react-parser";
import Button from "../Button";
import CommentItem from "./CommentItem";

const timeAgoFormatString = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: 'ago',
  suffixFromNow: 'from now',
  seconds: 'less than a minute',
  minute: 'about a minute',
  minutes: '%d minutes',
  hour: 'about an hour',
  hours: '%d hours',
  day: 'a day',
  days: '%d days',
  month: 'about a month',
  months: '%d months',
  year: 'about a year',
  years: '%d years',
  wordSeparator: ' '
};

const formatter = buildFormatter(timeAgoFormatString);

const Blog = ({ blog }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const authUserAvatar = localStorage.getItem("avatar");

  const endOfCommentRef = useRef(null);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeleteComment = (commentId) => {
    const newComment = comments.filter(comment => comment._id != commentId)
    setComments(newComment)
  }

  const handleKeyPress = async (e) => {
    if (e.keyCode == 13 && commentInput != "") {
      const res = await axios.post("/comments/create", {
        blogId: blog._id,
        content: commentInput
      })
      console.log(res.data.comment)
      if(res.status == 200) {
        setComments([
          res.data.comment,
          ...comments,
        ]);
        setCommentInput("");
      }
    }
  };

  useEffect(() => {
    setHtmlContent(JSON.parse(blog.content));
  }, [blog.content]);

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/comments/${blog._id}`);
      if (res.status == 200) {
        setComments(res.data.comments);
      }
    };
    getComments();
  }, [blog._id]);


  return (
    <div
      className="shadow-md rounded-lg mt-4"
      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
    >
      {/* Card Header */}
      <div className="px-4 pt-4 flex justify-between items-center gap-x-2">
        <Avatar size={40} src={blog.author.avatar} />
        <div className="flex flex-col grow">
          <Link to="" className="font-medium text-base">
            {blog.author.name}
          </Link>
          <TimeAgo
            className="font-light text-sm"
            date={blog.createdAt}
            formatter={formatter}
          />
        </div>
        <IoIosMore className="cursor-pointer" size={20} />
      </div>

      {/* Card Body */}
      <div>
        {/* Blog content */}
        <div className="px-4 mt-4 text-lg font-light">{parse(htmlContent)}</div>

        {/* Blog Image*/}
        {blog.images.length > 0 && (
          <div className="mt-4">
            <Image src={blog.images[0].url} width={590} />
          </div>
        )}

        {/* Footer */}
        <div className="px-4">
          <div className="flex justify-between items-center">
            <span>
              <BiSolidLike className="inline-block" size={20} color="#1877F2" />
              <span className="text-[15px] ml-1 font-thin text-gray-700">
                1
              </span>
            </span>
            <span className="text-[15px] ml-1 font-thin text-gray-700">
              {comments.length} comments
            </span>
          </div>

          {/* Reaction button */}
          <div
            className="py-1"
            style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
          >
            <div className="h-8 flex justify-between">
              <Button
                icon={<AiOutlineLike size={20} color="#6b7280" />}
                text="Like"
              />
              <Button
                icon={<AiOutlineComment size={20} color="#6b7280" />}
                text="Comment"
                onClick={() => setIsModalOpen(true)}
              />
              <Button
                icon={<TbShare3 size={20} color="#6b7280" />}
                text="Share"
              />
            </div>
            {/* Comment modal */}
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div className="h-[300px] mt-6 overflow-auto">
                {comments.map((comment, index) => (
                  <CommentItem
                    key={index}
                    comment = {comment}
                    isAuthor={blog.isAuthor}
                    blogId={blog._id}
                    handleDeleteSuccess={handleDeleteComment}
                  />
                ))}
                <span ref={endOfCommentRef}></span>
              </div>
              <div className="flex gap-x-3 mt-8">
                <div>
                  <Avatar
                    src={authUserAvatar}
                    className="gap-x-3 grow"
                    size={32}
                  />
                </div>
                <Input
                  rows={2}
                  className="bg-gray-100 border-none rounded-xl placeholder-gray-500"
                  size="large"
                  placeholder="Post your comment"
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object
};

export default Blog;
