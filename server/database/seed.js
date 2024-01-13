import bcypt from "bcrypt"
import mongoose from "mongoose";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

const seedData = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connnect to mongoDB successfully")
  } catch(err) {
    throw err
  }
  const saltRound = 10

  await User.deleteMany({});
  await Blog.deleteMany({});
  await Comment.deleteMany({});

  const user1 = await User.create({
    name: "EnchantingEsme",
    email: "encesme@example.com",
    password: bcypt.hashSync("123456", saltRound),
    avatar: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  })
  
  const user2 = await User.create({
    name: "DreamyDahlia",
    email: "dreamy@example.com",
    password: bcypt.hashSync("123456", saltRound),
    avatar: "https://as1.ftcdn.net/v2/jpg/05/40/05/10/1000_F_540051021_gYGDBfWpFRskAYkzkZGLSTOblzvufwOd.jpg",
  }) 

  const user3 = await User.create({
    name: "ElegantEmilia",
    email: "emilia@example.com",
    password: bcypt.hashSync("123456", saltRound),
    avatar: "https://as2.ftcdn.net/v2/jpg/05/39/45/97/1000_F_539459704_6YeYMPrSqWO7N4jvQ1y3ViIMk9RGzzdA.jpg",
  }) 

  const blog1 = await Blog.create({
    content: "Thành phố Paris luôn nổi tiếng với những điều thơ mộng và lãng mạng nay có thêm những cảnh sắc tuyệt đẹp của hoa anh đào đi kèm với đó là chiêm ngưỡng tháp eiffel  cùng không hoa sắc nở khiên nơi đây nên thơ bao giờ hết.  khiến chúng ta có cảm giác thật thoải mái với không gian tĩnh lặng giữa trung tâm Paris",
    images: [
      {url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"}
    ],
    author: user1._id,
  })
  const blog2 = await Blog.create({
    content: "Hoa anh đào nở rộ ở Jinhae Gunhangje mỗi năm sẽ có lễ hội hoa anh đào lớn nhất ở Hàn Quốc. Mọi người đổ xô đến Jinhae để ngắm hoa nở tạo nên một bức tranh màu sắc tuyệt đẹp, với những hàng cây vẽ nên những sọc trắng hồng khắp thành phố.",
    images: [
      {url: "https://antuongchaua.com.vn/wp-content/uploads/2018/03/221.jpg"}
    ],
    author: user2._id,
  })
  const blog3 = await Blog.create({
    content: "Vẻ đẹp của hoa anh đào khi đêm về",
    images: [
      {url: "https://www.chudu24.com/wp-content/uploads/2019/02/Thaophuongnguyen-174610094620-hoa-hq4.jpg"},
    ],
    author: user3._id,
  })

  const comment1 = await Comment.create({
    content: 'Great post!',
    author: user1._id,
    blog: blog1._id,
  });

  const comment2 = await Comment.create({
    content: 'Awesome!',
    author: user2._id,
    blog: blog1._id,
  });

  const comment3 = await Comment.create({
    content: 'Awesome!',
    author: user2._id,
    blog: blog2._id,
  });

  blog1.comments.push(comment1._id)
  blog1.comments.push(comment2._id)
  blog2.comments.push(comment3._id)
  await blog1.save();
  await blog2.save();

  await mongoose.connection.close()

  console.log("Seed successfully")
}

seedData();