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

### bertVit.东雪莲/塔菲

- 将输入的文本转换为东雪莲/塔菲的语音。

\`\`\`
bertVit.东雪莲/塔菲 你好
\`\`\`
`

export interface Config {
}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  const logger = ctx.logger('dxlBertVit')
  ctx.command('bertVit', 'AI东雪莲/塔菲语音合成帮助')
    .action(async ({session}) => {
      await session.execute(`bertVit -h`)
    })
  ctx.command('bertVit.东雪莲 [textContent:text]', 'AI东雪莲语音合成')
    .action(async ({session}, textContent) => {
      const versions = ["Azuma-Bert-VITS2-2.3", "Azuma-Bert-VITS2.0.2", "Azuma-Bert-VITS2"];
      await handleVoiceSynthesis(session, textContent, versions, "azuma");
    });
  ctx.command('bertVit.塔菲 [textContent:text]', 'AI塔菲语音合成')
    .action(async ({session}, textContent) => {
      const versions = ["Taffy-Bert-VITS2.0.2", "Taffy-Bert-VITS2"];
      await handleVoiceSynthesis(session, textContent, versions, "tafei");
    });
  ctx.command('bertVit.坏女人星瞳 [textContent:text]', 'AI坏女人星瞳语音合成')
    .action(async ({session}, textContent) => {
      const versions = ["badXT-Bert-VITS2-2.3"];
      await handleVoiceSynthesis(session, textContent, versions, "xingtong");
    });


// hs*
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
      "Taffy-Bert-VITS2": "taffy",
      "badXT-Bert-VITS2-2.3": "坏女人星瞳",
    };

    const sliderValues: { [key: string]: number } = {
      azuma: 0.5,
      tafei: 0.2,
      xingtong: 0.6,
    };

    const sliderValue = sliderValues[type] || sliderValues.default;

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
