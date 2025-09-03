import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./home.css";
import { Content } from "antd/es/layout/layout";

const menuItems = [
  {
    key: "1",
    label: <Link to="/home">home</Link>,
  },
  {
    key: "2",
    label: "why transcripta",
  },
  {
    key: "3",
    label: "pricing",
  },
  {
    key: "4",
    label: "About",
  },
  {
    key: "5",
    label: <Link to="/auth">signin</Link>,
  },
  {
    key: "6",
    label: <Link to="/dashboard">dashboard</Link>,
  },
];

function global() {
  const { Header } = Layout;

  return (
    <div className="fullHW">
      <Layout className="layout">
        <Header className="header">
          <div className="logo">LOGO</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={menuItems}
            className="menu"
          />
        </Header>
        <Content className="contentContainer">
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default global;
