import { Layout, Menu } from "antd";
import {Link} from 'react-router-dom'
import "./home.css";

// const menuItems = [
//   {
//     key: "1",
//     label: <Link to='/home'>home</Link>,
//   },
//   {
//     key: "2",
//     label: "why transcripta",
//   },
//   {
//     key: "3",
//     label: "pricing",
//   },
//   {
//     key: "4",
//     label: "About",
//   },
//   {
//     key: "5",
//     label: <Link to='/auth'>signin</Link>,
//   }
// ];

// const { Header } = Layout;

function home() {
  return (
    // <div className="fullHW">
    //   <Layout>
    //     <Header className="header">
    //       <div className="logo">LOGO</div>
    //       <Menu
    //         theme="dark"
    //         mode="horizontal"
    //         defaultSelectedKeys={["2"]}
    //         items={menuItems}
    //         className="menu"
    //       />
    //     </Header>
    //   </Layout>
    // </div>
    <p>HOME CONTENT</p>
  );
}

export default home;