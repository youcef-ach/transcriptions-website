import { details } from "../../assets/transcDetail";
import {
  Avatar,
  Button,
  Card,
  Flex,
  message,
  Select,
  Slider,
  Splitter,
  Tooltip,
  Typography,
} from "antd";
import {
  CopyOutlined,
  PlayCircleOutlined,
  UserOutlined,
  PauseCircleOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  EyeOutlined,
  GlobalOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import "./transcription.css";
import audio from "../../assets/trump.mp4";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  parseMilliseconds,
  formatTimestamp,
  getSegment,
} from "./functions.jsx";

const { Text, Title } = Typography;

const colors = {
  SPEAKER_00: "green",
  SPEAKER_01: "purple",
  SPEAKER_02: "orange",
  SPEAKER_03: "blue",
  SPEAKER_04: "pink",
  SPEAKER_05: "lightblue",
};

function transcription() {
  
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const isSeeking = useRef(false);
  const previousHighlight = useRef(
    details.segments[0].segment_words[0].probability
  );
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [confidence, setConfidence] = useState(false);
  const segments = useRef(getSegment(details));

  useEffect(() => {
    // audioRef.current.playbackRate = speed;
    videoRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    try {
      let newHighlight = getWordFromTime(time);
      if (newHighlight != previousHighlight.current) {
        document.getElementById(previousHighlight.current).style.color =
          confidence
            ? document.getElementById(previousHighlight.current).dataset.color
            : "black";
        document.getElementById(
          previousHighlight.current
        ).style.textDecoration = "none";
        previousHighlight.current = newHighlight;
        document.getElementById(previousHighlight.current).style.color =
          "#1890ff";
        document.getElementById(
          previousHighlight.current
        ).style.textDecoration = "underline";
        document.getElementById(previousHighlight.current).scrollIntoView({
          block: "center",
          behaviour: "smooth",
        });
      }
    } catch (err) {}
  }, [time]);

  useEffect(() => {
    if (confidence) {
      details.segments.forEach((item) => {
        item.segment_words.forEach((item) => {
          let el = document.getElementById(item.probability);
          el.style.color = el.dataset.color;
        });
      });
    } else {
      details.segments.forEach((item) => {
        item.segment_words.forEach((item) => {
          document.getElementById(item.probability).style.color = "black";
        });
      });
    }
    document.getElementById(previousHighlight.current).style.color = "#1890ff";
  }, [confidence]);

  const getWordFromTime = useCallback(function getWordFromTime(time) {
    for (let i = 0; i < details.segments.length; i++) {
      for (let j = 0; j < details.segments[i].segment_words.length; j++) {
        if (details.segments[i].segment_words[j].start <= time) {
          if (details.segments[i].segment_words[j + 1])
            if (details.segments[i].segment_words[j + 1].start > time)
              return details.segments[i].segment_words[j].probability;
            else continue;
          else if (details.segments[i + 1])
            if (details.segments[i + 1].segment_words[0].start > time)
              return details.segments[i].segment_words[j].probability;
            else continue;
          else return details.segments[i].segment_words[j].probability;
        } else continue;
      }
    }
    throw new Error("word not found");
  }, []);

  const segmentCards = segments.current.map((item) => {
    if (item.length) {
      return (
        <Card
          actions={[
            <CopyOutlined
              key="copy"
              onClick={() =>
                navigator.clipboard
                  .writeText(item.text)
                  .then(() => {
                    message.success("copied");
                  })
                  .catch(() => message.error("copy failed"))
              }
            />,
            <PlayCircleOutlined
              className="icon"
              onClick={() => {
                setTime(item.start / 1000);
                // audioRef.current.currentTime = item.start / 1000;
                videoRef.current.currentTime = item.start / 1000;
                // audioRef.current.play();
                videoRef.current.play();
              }}
              key="play"
            />,
          ]}
          title={
            <Flex align="center" justify="center" gap={40}>
              <Avatar
                size={40}
                icon={<UserOutlined />}
                style={{ backgroundColor: colors[item.speaker] }}
              >
                {item.speaker.slice(9)}
              </Avatar>
              <Title level={4} style={{ margin: 0 }}>
                {item.speaker}
              </Title>
              <Text type="secondary" italic>
                {`${formatTimestamp(parseMilliseconds(item.start))} --
            ${formatTimestamp(parseMilliseconds(item.end))}`}
              </Text>
              <Button icon={<GlobalOutlined />}>
                {details.audio_language}
              </Button>
            </Flex>
          }
          key={item.start}
          className="segmentCard tCenter"
        >
          <Text className="segmentTxt">{item}</Text>
        </Card>
      );
    }
  });

  return (
    <div className="transcriptionContainer">
      <Flex
        className="optionsMenu"
        vertical
        justify="center"
        align="center"
        gap={10}
      >
        <Flex
          className="subHeaderFlex"
          justify="center"
          align="center"
          gap={16}
        >
          <Text strong>{formatTimestamp(parseMilliseconds(time * 1000))}</Text>

          <div className="sliderContainer">
            <Slider
              trackStyle={{ backgroundColor: "#001529", height: 13 }}
              railStyle={{ backgroundColor: "#A9A9A9", height: 13 }}
              className="slider"
              min={0}
              max={details.audio_transc_duration}
              value={time}
              onChange={(value) => {
                isSeeking.current = true;
                setTime(value);
              }}
              onChangeComplete={(value) => {
                setTime(value);
                // audioRef.current.currentTime = value;
                videoRef.current.currentTime = value;
                setTimeout(() => {
                  isSeeking.current = false;
                }, 200);
              }}
              tooltip={{ open: false }}
            />
          </div>

          <Text strong>
            {formatTimestamp(
              parseMilliseconds(details.audio_transc_duration * 1000)
            )}
          </Text>
        </Flex>
        <Flex
          justify="center"
          align="center"
          gap={14}
          className="optionsFlex"
          wrap="wrap"
        >
          <Tooltip placement="bottom" title="Play">
            <PlayCircleOutlined
              className="icon"
              onClick={() => {
                // audioRef.current.play();
                videoRef.current.play();
              }}
            />
          </Tooltip>

          <Tooltip placement="bottom" title="Pause">
            <PauseCircleOutlined
              className="icon"
              onClick={() => {
                // audioRef.current.pause();
                videoRef.current.pause();
              }}
            />
          </Tooltip>

          <Tooltip placement="bottom" title="replay">
            <UndoOutlined
              className="icon"
              onClick={() => {
                setTime(0);
                // audioRef.current.currentTime = 0;
                videoRef.current.currentTime = 0;
              }}
            />
          </Tooltip>

          <Tooltip title="Playback Speed">
            <Select
              defaultValue="1x"
              onChange={(value) => setSpeed(value)}
              style={{ width: 40, border: "none", outline: "none" }}
              options={[
                { value: 0.5, label: "0.5x" },
                { value: 1, label: "1x" },
                { value: 1.5, label: "1.5x" },
                { value: 2, label: "2x" },
              ]}
            />
          </Tooltip>

          <Tooltip placement="bottom" title="Jump +5s">
            <StepForwardOutlined
              className="icon"
              onClick={() => {
                setTime((prev) =>
                  Math.min(prev + 5, details.audio_transc_duration)
                );
                videoRef.current.currentTime = Math.min(
                  time + 5,
                  details.audio_transc_duration
                );
              }}
            />
          </Tooltip>

          <Tooltip placement="bottom" title="Jump -5s">
            <StepBackwardOutlined
              className="icon"
              onClick={() => {
                setTime((prev) => Math.max(prev - 5, 0));
                videoRef.current.currentTime = Math.max(time - 5, 0);
              }}
            />
          </Tooltip>

          <Tooltip placement="bottom" title="Toggle Confidence Colors">
            <EyeOutlined
              className="icon"
              onClick={() => setConfidence((prev) => !prev)}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <div className="splitterContainer">
        <Splitter className="splitter">
          <Splitter.Panel
            defaultSize={"30%"}
            max="50%"
            min="30%"
            className="leftPart"
          >
            <div className="frameContainer">
              <audio
                className="frame"
                id="audio"
                onTimeUpdate={() => {
                  if (!isSeeking.current) setTime(audioRef.current.currentTime);
                }}
                src={audio}
                ref={audioRef}
              />
              <video
                onPlay={() => videoRef.current.play()}
                onPause={() => videoRef.current.pause()}
                ref={videoRef}
                onTimeUpdate={() => {
                  if (!isSeeking.current) {
                    setTime(videoRef.current.currentTime);
                  }
                }}
                src={audio}
                className="frame"
                controls
              ></video>
            </div>
          </Splitter.Panel>
          <Splitter.Panel
            max="70%"
            min="50%"
            defaultSize={"70%"}
            className="rightPart"
          >
            <Flex vertical gap={5}>
              {segmentCards}
            </Flex>
          </Splitter.Panel>
        </Splitter>
      </div>
    </div>
  );
}

export default transcription;
