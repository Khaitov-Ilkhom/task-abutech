import {Button, Form, FormProps, Input, message, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {useEffect} from "react";
import {signIn} from "../../../redux/slice/authSlice.ts";
import {useSignInMutation} from "../../../redux/api/authApi.ts";
import backgroundImage from "../../../images/IMG.png"
import logo from "../../../images/LOGO Najot Ta'lim.png"

export type FieldTypeL = {
  login: string,
  password: string,
}

const {Title} = Typography

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [login, {data, isSuccess, isError}] = useSignInMutation();
  const navigate = useNavigate()

  const onFinish: FormProps<FieldTypeL>["onFinish"] = (values) => {
    login(values)
  };
  const onFinishFailed: FormProps<FieldTypeL>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(data)

  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully logged")
      dispatch(signIn(data?.data.accessToken))
      navigate("/")
    }
    if (isError) {
      message.error("Logged error")
    }
  }, [isSuccess, isError])

  return (
      <div className="w-full h-screen mx-auto flex justify-center items-center gap-4">
        <div className="w-full mx-auto flex justify-center items-center">
          <img className="min-w-[700px] max-h-screen object-cover" src={backgroundImage} alt=""/>
        </div>
        <div className="w-full flex justify-start items-start flex-col mx-[50px] mt-[-100px]">
          <div className="w-full">
            <img className="max-w-[200px]" src={logo} alt="Logo"/>
          </div>
          <div className="w-full flex justify-start items-center pt-[150px]">
            <div className="max-w-[400px] w-full">
              <div className="pb-4">
                <Title className="!text-3xl font-semibold">
                  Tizimga kirish
                </Title>
              </div>

              <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="space-y-4"
              >
                <Form.Item<FieldTypeL>
                    label="Login"
                    name="login"
                    rules={[{required: true, message: "Please enter your login"}]}
                    className="mb-0"
                >
                  <Input
                      placeholder="Loginni kiriting"
                      className="py-2.5 px-4 !border-gray-300 hover:!border-gray-400 focus:!border-gray-500 focus:ring-2 focus:!ring-gray-300 rounded-lg transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item<FieldTypeL>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: "Please input your password!"}]}
                    className="mb-0"
                >
                  <Input.Password
                      placeholder="Parolni kiriting"
                      className="py-2.5 px-4 !border-gray-300 hover:!border-gray-400 focus:!border-gray-500 focus:ring-2 focus:!ring-gray-300 rounded-lg transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item className="py-4">
                  <Button
                      className="w-full py-5 border-none !bg-[#0EB182] !text-white font-bold rounded-lg active:scale-95 focus:!outline-none"
                      htmlType="submit"
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>


  )
}
export default SignIn
