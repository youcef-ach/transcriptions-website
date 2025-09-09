export const formatTimestamp = ({ h, m, s }) => {
  const pad = (num, size) => num.toString().padStart(size, "0");
  return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}`;
};

export const parseMilliseconds = (msTotal) => {
  const h = Math.floor(msTotal / 3600000);
  const m = Math.floor((msTotal % 3600000) / 60000);
  const s = Math.floor((msTotal % 60000) / 1000);

  return { h, m, s };
};

export function getSegment(details) {
  
  const templateSegment = [];
  templateSegment.speaker = "SPEAKER_01";
  templateSegment.start = 0;
  templateSegment.text = "";
  const segments = [templateSegment];
  let previous_speaker = "SPEAKER_01";

  details.segments.forEach((item) => {
    let txt = "";
    let words = item.segment_words.map((word) => {
      txt += word.word;
      txt += " ";
      return (
        <span
          key={word.probability}
          id={word.probability}
          title={word.probability}
          data-color={
            word.probability >= 0.95
              ? "green"
              : word.probability >= 0.9
              ? "orange"
              : "red"
          }
        >
          {word.word}
        </span>
      );
    });
    if (item.speaker == previous_speaker) {
      segments[segments.length - 1].push(...words);
      segments[segments.length - 1].text += txt;
    } else {
      segments[segments.length] = words;
      segments[segments.length - 1].speaker = item.speaker;
      segments[segments.length - 1].start = item.start_time * 1000;
      segments[segments.length - 1].text = txt;
      segments[segments.length - 2].end = item.start_time * 1000;
    }
    previous_speaker = item.speaker;
  });

  segments[segments.length - 1].end =
    details.segments[details.segments.length - 1].end_time;

  return segments;
}