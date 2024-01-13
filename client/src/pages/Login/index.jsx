import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button, Divider, Form, Input, Image } from "antd";
import FormItem from "antd/es/form/FormItem";
import googleIcon from "../../assets/images/google.svg";

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_REDIRECT_URI } = import.meta.env;
  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    prompt: "consent",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};

const googleOauthUrl = getGoogleAuthUrl();

const Login = () => {
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const [searchPrams, setSearchParams] = useSearchParams();
  const accessToken = searchPrams.get("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      const userInfo = jwtDecode(accessToken);
      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("avatar", userInfo.avatar);
      navigate("/");
    }
  }, [accessToken, navigate]);

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
      <Link
        to={googleOauthUrl}
        className="border py-2 rounded-md justify-center flex items-center gap-x-4 cursor-pointer hover:shadow"
      >
        <Image src={googleIcon} width={28} preview={false} />
        <span className="text-base">Sign in with Google</span>
      </Link>
    </div>
  );
};

export default Login;
