import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Image, Input, Modal } from "antd";
import { IoIosMore } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import BlogImage from "../../assets/images/blog-image.jpg";
import Button from "../Button";
import CommentItem from "./CommentItem";

const Blog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode == 13 && commentInput != "") {
      setComments([
        ...comments,
        {
          avatar: "",
          content: commentInput,
          time: "Just now",
        },
      ]);
      setCommentInput("");
    }
  };

  return (
    <div
      className="shadow-md rounded-lg mt-4"
      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
    >
      {/* Card Header */}
      <div className="px-4 pt-4 flex justify-between items-center gap-x-2">
        <Avatar size={40} className="bg-[#7265e6]">
          D
        </Avatar>
        <div className="flex flex-col grow">
          <Link to="" className="font-medium text-base">
            Nguyen Tien Dat
          </Link>
          <span className="font-light text-sm">23 hours ago</span>
        </div>
        <IoIosMore className="cursor-pointer" size={20} />
      </div>

      {/* Card Body */}
      <div>
        {/* Blog text */}
        <div className="px-4 mt-4">
          <p className="text-base font-light leading-5">
            Chẳng cần những chuyến đi ra nước ngoài, ở nước ta cũng cũng có
            những bãi biển đẹp như mơ rất được yêu thích. Một trong số đó là
            vịnh Ninh Vân với biển xanh, mây trắng, mang theo vẻ hoang sơ nhưng
            đẹp đến nao lòng.
          </p>
        </div>
        {/* Blog Image*/}
        <div className="mt-4">
          <Image src={BlogImage} width={590} />
        </div>
        {/* Footer */}
        <div className="px-4">
          <div className="flex justify-between items-center">
            <span>
              <BiSolidLike className="inline-block" size={20} color="#1877F2" />
              <span className="text-[15px] ml-1 font-thin text-gray-700">
                75
              </span>
            </span>
            <span className="text-[15px] ml-1 font-thin text-gray-700">
              3 comments
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
              {comments.map((comment, index) => (
                <CommentItem
                  key={index}
                  avatar={comment.avatar}
                  content={comment.content}
                  time={comment.time}
                />
              ))}
              <div className="flex gap-x-3 mt-8">
                <div>
                  <Avatar className="bg-[#7265e6] gap-x-3 grow" size={32}>
                    D
                  </Avatar>
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

export default Blog;
