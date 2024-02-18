import {Context, h, Schema} from 'koishi'

export const name = 'dxl-bert-vit'
export const usage = `## 🌈 使用

- 建议自行添加别名。

## 🌼 指令

### bertVit

- 显示语音合成使用帮助。

\`\`\`
bertVit
\`\`\`

### bertVit.东雪莲|塔菲|坏女人星瞳...

- 将输入的文本转换为东雪莲|塔菲|坏女人星瞳...的语音。

\`\`\`
bertVit.东雪莲|塔菲|坏女人星瞳... 你好
\`\`\`
`

export interface Config {
}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  const logger = ctx.logger('dxlBertVit');

  ctx.command('bertVit', 'AIBertVit语音合成帮助')
    .action(async ({session}) => {
      await session.execute(`bertVit -h`);
    });

  const voiceInstructions = {
    "梅西": ["Messi-Bert-VITS2-2.3"],
    "尼奈": ["nine-Bert-VITS2-2.3", "nine1-Bert-VITS2"],
    "科比": ["Kobe-Bert-VITS2-2.3"],
    "嘉然": ["Diana-Bert-VITS2-2.3", "Diana-Bert-VITS2"],
    "炫神": ["Xuan-Bert-VITS2-2.3"],
    "永雏小菲": ["LittleTaffy-Bert-VITS2"],
    "奶绿": ["LAPLACE-Bert-VITS2-2.3", "LAPLACE-Bert-VITS2"],
    "珈乐": ["Carol-Bert-VITS2-2.3", "Carol-Bert-VITS2"],
    "电棍": ["otto-Bert-VITS2-2.3", "otto-Bert-VITS2"],
    "七海": ["Nana7mi-Bert-VITS2-2.3", "Nana7mi-Bert-VITS2"],
    "阿梓": ["Azusa-Bert-VITS2-2.3"],
    "星瞳": ["2568-Bert-VITS2", "XingTong-Bert-VITS2"],
    "向晚": ["Ava-Bert-VITS2"],
    "剑魔": ["Aatrox-Bert-VITS2"],
    "乃琳": ["Queen-Bert-VITS2-2.3"],
    "贝拉": ["Bella-Bert-VITS2"],
    "扇宝": ["ShanBao-Bert-VITS2"],
    "恬豆": ["Bekki-Bert-VITS2", "TianDou-Bert-VITS2"],
    "黑桃影": ["Echo-Bert-VITS2", "Spade-Bert-VITS2"],
    "卖卖": ["maimai-Bert-VITS2"],
    "鹿鸣": ["Lumi-Bert-VITS2", "yoyo-Bert-VITS2"],
    "文静": ["Wenjing-Bert-VITS2"],
    "东雪莲": ["Azuma-Bert-VITS2-2.3", "Azuma-Bert-VITS2.0.2", "Azuma-Bert-VITS2"],
    "永雏塔菲": ["Taffy-Bert-VITS2-2.3", "Taffy1.2-Bert-VITS2", "Taffy-Bert-VITS2"],
    "坏女人星瞳": ["badXT-Bert-VITS2-2.3"],
    "丁真": ["DZ-Bert-VITS2-2.3", "dingzhen-Bert-VITS2-2.3", "DZhen-Bert-VITS2-2.3"],
    "孙笑川": ["SXC-Bert-VITS2"]
  };

  for (const instruction in voiceInstructions) {
    ctx.command(`bertVit.${instruction} [textContent:text]`, `AI${instruction}语音合成`)
      .action(async ({session}, textContent) => {
        await handleVoiceSynthesis(session, textContent, voiceInstructions[instruction], instruction);
      });
  }


  // hs*
  function getKeyByValue(value: string, sliderValues: { [key: number]: string[] }): number | undefined {
    for (const key in sliderValues) {
      if (sliderValues[key].includes(value)) {
        return parseFloat(key);
      }
    }
    return undefined;
  }


  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async function handleVoiceSynthesis(session, textContent, versions, type) {
    const {username, timestamp} = session;
    textContent = textContent.trim();
    if (!textContent) {
      await session.send(`【@${username}】\n请输入【待合成的语音内容】：`);
      const userInput = await session.prompt();
      if (!userInput) return `【@${username}】\n输入超时！`;
      textContent = userInput.trim();
    }

    const nameMap = {
      "Azuma-Bert-VITS2-2.3": "东雪莲",
      "Azuma-Bert-VITS2.0.2": "东雪莲",
      "Azuma-Bert-VITS2": "Azuma",
      "Taffy-Bert-VITS2.0.2": "永雏塔菲",
      "Taffy1.2-Bert-VITS2": "taffy",
      "Taffy-Bert-VITS2": "taffy",
      "LittleTaffy-Bert-VITS2": "TF",
      "badXT-Bert-VITS2-2.3": "坏女人星瞳",
      "DZ-Bert-VITS2-2.3": "丁真",
      "SXC-Bert-VITS2": "孙笑川",
      "Messi-Bert-VITS2-2.3": "Messi",
      "Carol-Bert-VITS2-2.3": "珈乐",
      "Carol-Bert-VITS2": "Carol",
      "Queen-Bert-VITS2-2.3": "乃琳",
      "Nana7mi-Bert-VITS2-2.3": "七海",
      "Nana7mi-Bert-VITS2": "Nana7mi",
      "LAPLACE-Bert-VITS2-2.3": "明前奶绿",
      "LAPLACE-Bert-VITS2": "LAPLACE",
      "nine-Bert-VITS2-2.3": "尼奈",
      "nine1-Bert-VITS2": "nine",
      "Kobe-Bert-VITS2-2.3": "科比",
      "Diana-Bert-VITS2-2.3": "嘉然",
      "Diana-Bert-VITS2": "Diana",
      "Xuan-Bert-VITS2-2.3": "炫神",
      "otto-Bert-VITS2-2.3": "otto",
      "otto-Bert-VITS2": "otto",
      "Azusa-Bert-VITS2-2.3": "阿梓",
      "2568-Bert-VITS2": "星瞳",
      "XingTong-Bert-VITS2": "XingTong",
      "Ava-Bert-VITS2": "Ava",
      "Aatrox-Bert-VITS2": "Aatrox",
      "Bella-Bert-VITS2": "Bella",
      "ShanBao-Bert-VITS2": "ShanBao",
      "Bekki-Bert-VITS2": "Bekki",
      "TianDou-Bert-VITS2": "Bekki",
      "Echo-Bert-VITS2": "Echo",
      "Spade-Bert-VITS2": "Echo",
      "maimai-Bert-VITS2": "WaiMai",
      "Lumi-Bert-VITS2": "Lumi",
      "yoyo-Bert-VITS2": "Lumi",
      "Wenjing-Bert-VITS2": "Wenjing",
    };

    const sliderValues = {
      0.5: ['东雪莲', '丁真', '珈乐', '乃琳', '七海', '奶绿', '尼奈', '科比', '嘉然', '炫神', '电棍', '阿梓'],
      0.2: ['永雏塔菲', '孙笑川', '星瞳', '向晚', '永雏小菲', '剑魔', '贝拉', '扇宝', '恬豆', '黑桃影', '卖卖', '鹿鸣', '文静'],
      0.6: ['坏女人星瞳', '梅西'],
    };

    const sliderValue = getKeyByValue(type, sliderValues);

    for (const version of versions) {
      const postDataUrl = `https://www.modelscope.cn/api/v1/studio/xzjosh/${version}/gradio/run/predict?backend_url=%2Fapi%2Fv1%2Fstudio%2Fxzjosh%2F${version}%2Fgradio%2F&sdk_version=3.47.1&t=${timestamp}&studio_token=c8fe7633-baa8-4083-a09a-70c45ed8851e`;
      const requestBody = {
        "data": [
          textContent,
          nameMap[version],
          sliderValue,
          0.5,
          0.9,
          1,
          "auto",
          null,
          "Happy",
          "Text prompt",
          "",
          0.7
        ],
        "event_data": null,
        "fn_index": 0,
        "dataType": [
          "textbox",
          "dropdown",
          "slider",
          "slider",
          "slider",
          "slider",
          "dropdown",
          "audio",
          "textbox",
          "radio",
          "textbox",
          "slider"
        ],
        "session_hash": "kg71r7fv3e8"
      };

      try {
        const response = await postData(postDataUrl, requestBody);
        if (response && response.data && response.data[1] && response.data[1].name) {
          const name = response.data[1].name;
          const fileUrl = `https://www.modelscope.cn/api/v1/studio/xzjosh/${version}/gradio/file=${name}`;
          await session.send(h.audio(fileUrl));
          break;
        }
      } catch (error) {
        logger.error('Error:', error);
      }
    }
  }
}
