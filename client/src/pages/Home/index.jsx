import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LuImage } from "react-icons/lu";
import Blog from "../../components/Blog";
import RichTextEditor from "../../components/RichTextEditor";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editorValue, setEditorValue] = useState("");
  const [imageList, setImageList] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const avatar = localStorage.getItem("avatar");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type) => {
    api[type]({
      message: "Create blog successfully" 
    })
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handelChangeImageList = ({ fileList: newFileList }) => {
    setImageList(newFileList);
  };

  const handleSubmit = async () => {
    let formData = new FormData();

    imageList.forEach((image) => {
      formData.append("images", image.originFileObj);
    });

    formData.append("content", editorValue);

    const res = await axios.post("/blogs/create", formData, {
      headers: {
        "Content-Type": " multipart/form-data",
      },
    });

    if(res.status == 200){
      setIsModalOpen(false);
      openNotification("success")
    }
  };
  
  useEffect(() => {
    const getBlogs = async () => {
      const res = await axios.get("/blogs");

      if (res.status == 200) {
        setBlogs(res.data.blogs);
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="py-5">
      {contextHolder}
      <div
        className="flex gap-x-2 p-4 rounded-lg shadow-md"
        style={{ border: "1px solid rgba(0,0,0,0.1)" }}
      >
        <Avatar src={avatar} size={40} />
        <div
          className="grow px-4 rounded-full cursor-pointer bg-gray-200"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-base text-gray-400 leading-10">
            {"What's on your mind"}
          </span>
        </div>

        {/* Create post modal */}
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex gap-x-3 mt-10">
            <Avatar src={avatar} size={40} />
            <RichTextEditor setEditorValue={setEditorValue} />
          </div>
          {showUpload && (
            <div className="pl-[52px] mt-3">
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={imageList}
                onChange={handelChangeImageList}
              >
                <button type="button">
                  <PlusOutlined />
                  <div className="mt-2">Upload</div>
                </button>
              </Upload>
            </div>
          )}
          {/* Modal Footer */}
          <div className="flex justify-end gap-x-4 mt-3">
            <Button
              type="text"
              className="hover:bg-primary-hover"
              icon={<LuImage size={20} color="#1877F2" />}
              onClick={() => setShowUpload(!showUpload)}
            />

            <Button
              type="primary"
              className="bg-primary rounded-full px-6 font-medium"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        </Modal>
      </div>
      {blogs.map((blog, index) => (
        <Blog
          blog={blog}
          key={index}
        />
      ))}
    </div>
  );
};

export default Home;
