import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, Popover } from "antd";
import { IoIosMore } from "react-icons/io";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

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

const CommentItem = ({ blogId, comment, isAuthor, handleDeleteSuccess }) => {
  const handleDeleteComment = async () => {
    console.log(comment, blogId);
    const res = await axios.delete(`/comments/${blogId}/${comment._id}`);
    if (res.status == 200) {
      handleDeleteSuccess(res.data.comment._id);
    }
  };

  return (
    <div className="flex gap-x-3 mt-8">
      <span>
        <Avatar
          src={comment.author.avatar}
          className="bg-[#7265e6] gap-x-3 grow"
          size={32}
        />
      </span>
      <div>
        <div className="flex items-center gap-x-2">
          <p className="bg-gray-100 p-2 rounded-xl text-wrap">
            {comment.content}
          </p>
          {isAuthor && (
            <Popover
              content={
                <Link to="" onClick={handleDeleteComment}>
                  Delete comment
                </Link>
              }
              placement="bottom"
            >
              <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
                <IoIosMore size={16} />
              </div>
            </Popover>
          )}
        </div>
        <TimeAgo
          className="text-xs text-gray-500 px-3"
          date={comment.createdAt}
          formatter={formatter}
        />
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object,
  blogId: PropTypes.string,
  isAuthor: PropTypes.bool,
  handleDeleteSuccess: PropTypes.func,
};

export default CommentItem;
