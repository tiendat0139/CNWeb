import { useState } from "react";
import { Avatar, Modal, Upload } from "antd";
import { LuImage } from "react-icons/lu";
import Blog from "../../components/Blog";
import RichTextEditor from "../../components/RichTextEditor";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageList, setImageList] = useState([]);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handelChangeImageList = ({fileList: newFileList}) => {
    setImageList(newFileList)
  }

  return (
    <div className="h-[1000px] pt-5">
      <div
        className="flex gap-x-2 p-4 rounded-lg shadow-md"
        style={{ border: "1px solid rgba(0,0,0,0.1)" }}
      >
        <Avatar
          size={40}
          style={{
            backgroundColor: "#7265e6",
          }}
        >
          D
        </Avatar>
        <div 
          className="grow px-4 rounded-full cursor-pointer bg-gray-200"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-base text-gray-400 leading-10">{"What's on your mind"}</span>
        </div>

        {/* Create post modal */}
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <div className="flex gap-x-3">
            <Avatar className="bg-[#7265e6] mt-12" size={40}>
              D
            </Avatar>
            <RichTextEditor />
          </div>
          <div className="pl-[52px]">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={imageList}
              onChange={handelChangeImageList}
            >
              <button type="button">
                <LuImage size={20} color="#1877F2" />
              </button>
            </Upload>
          </div>
        </Modal>
      </div>
      <Blog />
    </div>
  );
};

export default Home;
