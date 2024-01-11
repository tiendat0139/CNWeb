import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, Popover } from "antd";
import { IoIosMore } from "react-icons/io";

const CommentItem = ({ avatar, content, time }) => {
  return (
    <div className="flex gap-x-3 mt-8">
      <span>
        <Avatar src={avatar} className="bg-[#7265e6] gap-x-3 grow" size={32}>
          D
        </Avatar>
      </span>
      <div>
        <div className="flex items-center gap-x-2">
          <p className="bg-gray-100 p-2 rounded-xl text-wrap">{content}</p>
          <Popover
            content={<Link to="">Delete comment</Link>}
            placement="bottom"
          >
            <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
              <IoIosMore size={16} />
            </div>
          </Popover>
        </div>
        <span className="px-3 text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  avatar: PropTypes.node,
  content: PropTypes.string,
  time: PropTypes.string,
};

export default CommentItem;
