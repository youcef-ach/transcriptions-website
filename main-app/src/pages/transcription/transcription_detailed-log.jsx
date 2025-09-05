import { useParams } from "react-router-dom";
import { details } from "../../assets/transcDetail";
import Typography from "antd/es/typography/Typography";
import { Collapse, Descriptions, Flex, Progress, Table } from "antd";
import "./transcription.css";
import Panel from "antd/es/splitter/Panel";
import { Children } from "react";
import LinkA from "antd/es/typography/Link";

const { Text, Title } = Typography;

const data = details.segments.map((item, index) => ({
  key: index,
  "start time": item.start_time,
  "end time": item.end_time,
  "segment text": item.segment_text,
  speaker: item.speaker,
  childs: item.segment_words.map((item) => ({
    key: item.probability,
    start: item.start,
    end: item.end,
    word: item.word,
    probability: item.probability,
  })),
}));

const columns = [
  {
    title: "start time",
    dataIndex: "start time",
    key: "start time",
  },
  {
    title: "end time",
    dataIndex: "end time",
    key: "end time",
  },
  {
    title: "segment text",
    dataIndex: "segment text",
    key: "segment text",
  },
  {
    title: "speaker",
    dataIndex: "speaker",
    key: "speaker",
  },
];

const childColumns = [
  {
    title: "start",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "end",
    dataIndex: "end",
    key: "end",
  },
  {
    title: "word",
    dataIndex: "word",
    key: "word",
  },
  {
    title: "probability",
    dataIndex: "probability",
    key: "probability",
    render: (item) => {
      if (item < 0.9) return <Text type="danger">{item}</Text>;
      if (item > 0.9 && item < 0.95) return <Text type="warning">{item}</Text>;
      if (item > 0.95) return <Text type="success">{item}</Text>;
    },
  },
];

const descriptionItems = [
  {
    key: 1,
    label: "status",
    children:
      details.status_transc == "Transcribed" ? (
        <Progress percent={100} type="circle" size="small" status="success" />
      ) : (
        <Progress percent={0} type="circle" size="small" status="exception" />
      ),
  },
  {
    key: 2,
    label: "audio language",
    children: <Text>{details.audio_language}</Text>,
  },
  {
    key: 3,
    label: "number of speakers",
    children: <Text>{details.audio_nb_speakers}</Text>,
  },
  {
    key: 4,
    label: "audio transc duration",
    children: <Text>{details.audio_transc_duration}</Text>,
  },
  {
    key: 5,
    label: "uploaded at",
    children: <Text>{details.audio_transc_duration}</Text>,
  },
];

const collapseItems = [
  {
    key: 1,
    label: "see the full text transcription",
    children: <Text style={{fontSize:"1.2rem"}}>{details.audio_transc}</Text>,
  },
  {
    key: 2,
    label: "audio file url",
    children: (
      <LinkA copyable href={details.audio_file} target="blank">
        {details.audio_file}
      </LinkA>
    ),
  },
  {
    key: 3,
    label: "youtube url",
    children: (
      <LinkA href={details.YouTube_url} copyable target="blank">
        {details.YouTube_url ? details.YouTube_url : "not available"}
      </LinkA>
    ),
  },
];

function Transcription() {
  return (
    <div className="transcriptionContainer">
      <Flex vertical gap={20}>
        <Title level={3} className="tCenter">
          {details.title}
        </Title>
        <Collapse items={collapseItems} />
        <Descriptions
          size="small"
          bordered
          items={descriptionItems}
          className="desc"
        />
        {details.status_transc == "Transcribed" ? (
          <div style={{ marginTop: 15 }}>
            <Title type="success" level={3}>
              detailed log
            </Title>
            <Table
              pagination={false}
              bordered
              expandable={{
                expandedRowRender: (item) => (
                  <Table
                    pagination={false}
                    columns={childColumns}
                    dataSource={item.childs}
                  />
                ),
              }}
              dataSource={data}
              columns={columns}
            />
          </div>
        ) : (
          <Text>no transcribed yet</Text>
        )}
      </Flex>
    </div>
  );
}

export default Transcription;
