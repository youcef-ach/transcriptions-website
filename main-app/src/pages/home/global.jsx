import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./home.css";
import { Content } from "antd/es/layout/layout";

const menuItems = [
  {
    key: "1",
    label: <Link to="/">home</Link>,
  },
  {
    key: "2",
    label: <Link to="/whyTranscripta">Why transcripta</Link>,
  },
  {
    key: "3",
    label: <Link to="/pricing">Pricing</Link>,
  },
  {
    key: "4",
    label: <Link to="/about">about</Link>,
  },
  {
    key: "5",
    label: <Link to="/auth">signin</Link>,
  },
  {
    key: "6",
    label: <Link to="/dashboard">upload</Link>,
  },
];

function global() {
  const { Header } = Layout;

  return (
    <div className="fullHW">
      <Layout className="layout">
        <div className="headerWrapper">
          <Header className="header">
            <div className="logo">LOGO</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={menuItems}
              className="menu"
            />
          </Header>
        </div>
        <div className="contentWrapper">
          <Content className="contentContainer">
            <Outlet />
          </Content>
        </div>
      </Layout>
    </div>
  );
}

export default global;
