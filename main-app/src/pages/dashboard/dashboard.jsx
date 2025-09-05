import React, { useRef, useState } from "react";
import {
  Divider,
  Flex,
  Input,
  Steps,
  Button,
  Form,
  Select,
  Result,
} from "antd";
import "./dashboard.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link } from "react-router-dom";
const { Dragger } = Upload;

const humanLanguages = [
  "English",
  "Spanish",
  "Mandarin Chinese",
  "Hindi",
  "Arabic",
  "Portuguese",
  "Bengali",
  "Russian",
  "Japanese",
  "Punjabi",
  "German",
  "French",
  "Korean",
  "Turkish",
  "Italian",
];

const items = [
  {
    title: "upload",
    description: "desciption",
  },
  {
    title: "add details",
    description: "description",
  },
  {
    title: "transcription",
    description: "description",
  },
];

function dashboard() {
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);

  const props = {
    name: "file",
    multiple: false,
    fileList,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      setFileList([file]);
      file.current = message.success(`${file.name} selected.`);
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleFinish = (values) => {
    if (values.file || values.youtubeUrl) {
      message.success("phase 1 complete");
      setCurrent(current + 1);
    } else {
      message.error("please upload a file or type a valid youtube Url");
    }
  };

  const UploadComponent = (
    <div className="uploadContainer">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  );

  return (
    <div className="dashboardContainer">
      <Steps current={current} className="dashboardSteps" items={items}></Steps>
      {current == 0 ? (
        <Form className="formContainer" onFinish={handleFinish} form={form}>
          <Flex vertical className="dashboardFlex" gap={25}>
            <Form.Item name={"file"}>{UploadComponent}</Form.Item>
            <Divider className="dashboardDivider" plain>
              OR
            </Divider>
            <Form.Item name={"youtubeUrl"}>
              <Input placeholder="input youtube URL" />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                next
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      ) : current == 1 ? (
        <>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%", paddingTop: 20, marginBottom: 20 }}
            placeholder="Select languages"
          >
            {humanLanguages.map((lang) => (
              <Option key={lang} value={lang}>
                {lang}
              </Option>
            ))}
          </Select>
          <Flex gap={20} style={{ padding: "0 20px" }}>
            <Button
              block
              type="primary"
              onClick={() => setCurrent(current + 1)}
            >
              submit
            </Button>
            <Button
              block
              type="default"
              onClick={() => setCurrent(current - 1)}
            >
              back
            </Button>
          </Flex>
        </>
      ) : (
        <Result
          status="success"
          title="Successfully submited for transcription"
          subTitle="The transcription process may take 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console">
              <Link to="/home">Go Home</Link>
            </Button>,
            <Button
              key="buy"
              onClick={() => {
                form.resetFields();
                setCurrent(0);
              }}
            >
              Make a new transcription
            </Button>,
          ]}
        />
      )}
    </div>
  );
}

export default dashboard;
