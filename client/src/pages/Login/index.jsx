import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Divider, Form, Input, Image } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useGoogleLogin } from "@react-oauth/google";
import googleIcon from "../../assets/images/google.svg";
import { authLogin } from "../../redux/userSlice";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        // console.log(res);
        dispatch(authLogin({
          name: res.data.name,
          email: res.data.email,
          avatar: res.data.picture
        }))
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    }
  });

  return (
    <div
      className="w-1/3 rounded-2xl shadow-md m-auto mt-[80px] px-16 py-6"
      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
    >
      <h1 className="text-center">Login</h1>
      <Form form={form} layout="vertical" className="mt-5">
        <FormItem name="username" label="Username:">
          <Input size="large" />
        </FormItem>
        <FormItem name="passoword" label="Password:">
          <Input size="large" />
        </FormItem>
        <Form.Item>
          <Button
            className="bg-primary w-full text-white hover:text-white hover:opacity-90"
            size="large"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ color: "#9ca3af", fontWeight: "400" }}>OR</Divider>
      <div
        className="border py-2 rounded-md justify-center flex items-center gap-x-4 cursor-pointer hover:shadow"
        onClick={() => login()}
      >
        <Image src={googleIcon} width={28} preview={false} />
        <span className="text-base">Sign in with Google</span>
      </div>
    </div>
  );
};

export default Login;
