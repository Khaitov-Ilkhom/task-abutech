import {useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Button, Layout} from 'antd';
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import {Outlet, useNavigate} from "react-router-dom";

const {Header, Content} = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
      <div>
        <Layout hasSider>
          <Sidebar collapsed={collapsed}/>
          <Layout className={`transition-all duration-200 overflow-visible ${collapsed ? 'ml-[80px]' : 'ml-[200px]'}`}>
            <Header className="p-0 bg-white w-full min-h-[60px] sticky top-0 z-10 flex justify-between items-center">
              <Button
                  type="text" icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                  onClick={() => setCollapsed(!collapsed)} className="text-[16px] !w-[64px] !h-[64px]"
              />
              <Button className="mr-8" onClick={() => navigate("/auth")}>Login</Button>
            </Header>
            <Content className="m-4 min-h-[680px]">
              <Outlet/>
            </Content>
          </Layout>
        </Layout>
      </div>
  )
}
export default Dashboard
