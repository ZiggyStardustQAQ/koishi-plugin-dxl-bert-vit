import {Context, h, Schema} from 'koishi'

export const name = 'dxl-bert-vit'
export const usage = `## 🌈 使用

- 建议自行添加别名。

## 🌼 指令

### dxlBertVit

- 显示语音合成使用帮助。

\`\`\`
dxlBertVit
\`\`\`

### dxlBertVit.say

- 将输入的文本转换为东雪莲的语音。

\`\`\`
dxlBertVit.say 你好
\`\`\``

export interface Config {
}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  const logger = ctx.logger('dxlBertVit')
  ctx.command('dxlBertVit', 'AI东雪莲语音合成帮助')
    .action(async ({session}) => {
      await session.execute(`dxlBertVit -h`)
    })
  ctx.command('dxlBertVit.say [textContent:text]', 'AI东雪莲语音合成')
    .action(async ({session}, textContent) => {
      const {username, timestamp} = session;
      textContent = textContent.trim();
      if (!textContent) {
        // 提示输入
        await session.send(`【@${username}】\n请输入【待合成的语音内容】：`);
        const userInput = await session.prompt();
        if (!userInput) return `【@${username}】\n输入超时！`;
        textContent = userInput.trim();
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

      const versions = ["Azuma-Bert-VITS2-2.3", "Azuma-Bert-VITS2.0.2", "Azuma-Bert-VITS2"];

      let response, postDataUrl, requestBody;
      for (const version of versions) {
        postDataUrl = `https://www.modelscope.cn/api/v1/studio/xzjosh/${version}/gradio/run/predict?backend_url=%2Fapi%2Fv1%2Fstudio%2Fxzjosh%2F${version}%2Fgradio%2F&sdk_version=3.47.1&t=${timestamp}&studio_token=c8fe7633-baa8-4083-a09a-70c45ed8851e`;
        requestBody = {
          "data": [
            textContent,
            version === "Azuma-Bert-VITS2" ? "Azuma" : "东雪莲",
            0.5,
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
          response = await postData(postDataUrl, requestBody);
          if (response && response.data && response.data[1] && response.data[1].name) {
            const name = response.data[1].name;
            const fileUrl = `https://www.modelscope.cn/api/v1/studio/xzjosh/${version}/gradio/file=${name}`;
            // logger.success("File URL:", fileUrl);
            await session.send(h.audio(fileUrl))
            break;
          }
        } catch (error) {
          logger.error('Error:', error);
        }
      }
    });

}
