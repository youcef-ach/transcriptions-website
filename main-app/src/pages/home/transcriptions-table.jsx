import { Button, Flex, Table, Tag } from "antd";
import { transcriptions } from "../../assets/transcriptions.js";
import { Link } from "react-router-dom";
import LinkA from "antd/es/typography/Link.js";
import Typography from "antd/es/typography/Typography.js";
const { Text } = Typography;

const data = transcriptions.results.map((item) => {
  const audioType = item.audio_file.split(".").pop();
  return {
    key: item.id,
    title: item.title,
    audio_file: item.audio_file,
    youtube_url: item["YouTube_url"],
    status: item.status_transc,
    audio_transc_duration: item.audio_transc_duration,
    date_uploaded: item.uploaded_at,
    audio_type: audioType,
  };
});

const columns = [
  {
    title: "watch",
    dataIndex: "status",
    key: "watch",
    render: (item) => {
      if (item == "Transcribed")
        return (
          <Link to="#">
            <Text type="success">watch</Text>
          </Link>
        );
      else return <Text type="warning">not ready</Text>;
    },
  },
  {
    title: "detailed log",
    dataIndex: "status",
    key: "detailed log",
    render: (item) => {
      if (item == "Transcribed") return <Link to="#">view detailed log</Link>;
      else return <Text type="warning">not ready</Text>;
    },
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (item) => <Text>{item}</Text>,
  },
  {
    title: "audio file",
    dataIndex: "audio_file",
    key: "audio file",
    render: (item) => (
      <LinkA href={item} target="blank" copyable={{ text: item }}>
        audio file
      </LinkA>
    ),
    filters: [...new Set(data.map((d) => d.audio_type))].map((type) => ({
      text: type,
      value: type,
    })),
    onFilter: (value, record) => record.audio_type == value,
  },
  {
    title: "audio duration",
    dataIndex: "audio_transc_duration",
    key: "audio duration",
  },
  {
    title: "youtube url",
    dataIndex: "youtube_url",
    key: "youtube url",
    render: (item) => (
      <LinkA href={item} copyable={{ text: item }}>
        copy youtube url
      </LinkA>
    ),
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
    render: (item) => {
      switch (item) {
        case "Transcribed":
          return (
            <Tag color="green" tag="success">
              {item}
            </Tag>
          );
      }
    },
    filters: [
      { text: "Transcribed", value: "Transcribed" },
      { text: "Not Transcribed", value: "Not Transcribed" },
    ],
    onFilter: (value, record) => record.status == value,
  },
  {
    title: "uploaded at",
    dataIndex: "date_uploaded",
    key: "date uploaded",
    render: (date) => {
      let isoStr = date;
      let myDate = new Date(isoStr);
      myDate = myDate.toLocaleString();
      return <Text>{myDate}</Text>;
    },
  },
];

const App = () => (
  <div className="homeContainer">
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ width: "100%", paddingTop: 20 }}
      gap={20}
    >
      <Flex justify="center" align="center" gap={20}>
        <Button size="large" type="primary">
          <Link to="/transcription">see a sample transcription</Link>
        </Button>
        <Button type="default" size="large">
          <Link to="/detailed-log">
            see a sample detailed log of a transcription
          </Link>
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} bordered pagination={false} />
    </Flex>
  </div>
);
export default App;
