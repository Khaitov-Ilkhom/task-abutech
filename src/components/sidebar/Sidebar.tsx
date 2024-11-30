import {Menu} from "antd";
import { FaFileContract } from "react-icons/fa6";
import {Layout} from 'antd';
import {NavLink} from "react-router-dom";
import logoSmall from "../../images/Layer 1.png"
import logoBig from "../../images/LOGO Najot Ta'lim.png"

const {Sider} = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const items = [
  {
    key: '1',
    icon: <FaFileContract/>,
    label: <NavLink to="/">Contracts</NavLink>,
  },
  {
    key: '2',
    icon: <FaFileContract/>,
    label: <NavLink to="/two">Page Two</NavLink>,
  }
]

const Sidebar = ({collapsed}: { collapsed: boolean }) => {
  return (
      <div>
        <Sider style={siderStyle} className="bg-white" trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical"/>
          {
            collapsed ? <div
                    className={collapsed ? "w-full flex justify-center items-center py-3 opacity-100 duration-700" : "duration-700 opacity-0"}>
                  <img className="max-w-[50px] object-contain" src={logoSmall} alt="Logo"/></div> :
                <div
                    className={collapsed ? "duration-700 opacity-0" : "w-full flex justify-center items-center py-3 opacity-100 duration-700"}>
                  <img className="max-w-[180px]" src={logoBig} alt="Logo"/></div>
          }
          <Menu
              mode="inline"
              items={items}
          />
        </Sider>
      </div>
  )
}
export default Sidebar
