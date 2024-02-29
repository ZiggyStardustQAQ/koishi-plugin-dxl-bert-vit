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
    "以里illi": ["illi-Bert-VITS2"],

    "力巴尔": ["Test2"],

    "露早": ["Gogo-Bert-VITS2"],
    "柚恩": ["UU-Bert-VITS2"],

    "克烈": ["Kled-Bert-VITS2"],

    "BT7274": ["BT7274-Bert-VITS2"],
    "皮特174": ["Pite-Bert-VITS2"],
    "万蒂奇": ["Vantage-Bert-VITS2"],
    "罗芭": ["Loba-Bert-VITS2"],
    "艾许": ["Ash-Bert-VITS2"],
    "懒羊羊": ["LanYangYang-Bert-VITS2"],
    "幻象": ["Mirage-Bert-VITS2"],
    "瓦尔基里": ["Valkyrie-Bert-VITS2"],
    "弹道": ["Ballistic-Bert-VITS2"],
    "密客": ["Crypto-Bert-VITS2"],
    "亡灵": ["Revenant-Bert-VITS2"],
    "沃特森": ["Wattson-Bert-VITS2"],
    "疯玛吉": ["Madmaggie-Bert-VITS2"],
    "播音员": ["AiNotify-Bert-VITS2"],
    "寻血猎犬": ["Bloodhound-Bert-VITS2"],
    "地平线": ["Horizon-Bert-VITS2"],
    "暴雷": ["Fuse-Bert-VITS2"],
    "恶灵": ["wraith-Bert-VITS2"],
    "动力小子": ["octane-Bert-VITS2"],
    "雫るる": ["lulu-Bert-VITS2"],
    "探路者": ["Pathfinder2.0-Bert-VITS2-copy", "Pathfinder-Bert-VITS2"],
    "米诺": ["MINuo-Bert-VITS2"],
    "柯洁": ["KeJie-Bert-VITS2"],
    "雪糕": ["VITS2-test"],
    "山泥若": ["SNR-Bert-VITS2"],

    "陈泽": ["Ze-Bert-VITS2-2.3"],
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
    "贝拉": ["Bella-Bert-VITS2"],
    "扇宝": ["ShanBao-Bert-VITS2"],
    "恬豆": ["Bekki-Bert-VITS2", "TianDou-Bert-VITS2"],
    "黑桃影": ["Echo-Bert-VITS2", "Spade-Bert-VITS2"],
    "卖卖": ["maimai-Bert-VITS2"],
    "鹿鸣": ["Lumi-Bert-VITS2", "yoyo-Bert-VITS2"],
    "文静": ["Wenjing-Bert-VITS2"],
    "东雪莲": ["Azuma-Bert-VITS2-2.3", "Azuma-Bert-VITS2.0.2", "Azuma-Bert-VITS2", "Azuma1-Bert-VITS2"],
    "永雏塔菲": ["Taffy-Bert-VITS2-2.3", "Taffy1.2-Bert-VITS2", "Taffy-Bert-VITS2"],
    "坏女人星瞳": ["badXT-Bert-VITS2-2.3"],
    "丁真": ["DZ-Bert-VITS2-2.3", "dingzhen-Bert-VITS2-2.3", "DZhen-Bert-VITS2-2.3"],
    "孙笑川": ["SXC-Bert-VITS2"]
  };

  for (const instruction in voiceInstructions) {
    ctx.command(`bertVit.${instruction} [textContent:text]`, `AI${instruction}语音合成`)
      .action(async ({session}, textContent) => {
        let author = 'xzjosh';
        const specialInstructionsForMiDd1Eye = ['山泥若', '雪糕', '柯洁', '米诺', '探路者', '雫るる', '动力小子',
          '地平线', '暴雷', '寻血猎犬', '播音员', '疯玛吉', '恶灵', '沃特森', '万蒂奇', '罗芭', '艾许', '懒羊羊', '幻象',
          '瓦尔基里', '弹道', '密客', '亡灵', '皮特174', 'BT7274', '北极星泰坦', '帝王泰坦'];
        const specialInstructionsForsrcresources = ['克烈'];
        const specialInstructionssrcreForMeteorakuma = ['柚恩', '露早'];
        const specialInstructionssrcreForhanson91696 = ['力巴尔'];
        const specialInstructionssrcreForRayzggz = ['以里illi'];

        if (specialInstructionsForMiDd1Eye.includes(instruction)) {
          author = 'MiDd1Eye';
        } else if (specialInstructionsForsrcresources.includes(instruction)) {
          author = 'srcresources';
        } else if (specialInstructionssrcreForMeteorakuma.includes(instruction)) {
          author = 'Meteorakuma';
        } else if (specialInstructionssrcreForhanson91696.includes(instruction)) {
          author = 'hanson91696';
        }else if (specialInstructionssrcreForRayzggz.includes(instruction)) {
          author = 'Rayzggz';
        }

        await handleVoiceSynthesis(session, textContent, voiceInstructions[instruction], instruction, author);
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

  async function handleVoiceSynthesis(session, textContent, versions, type, author) {
    const {username, timestamp} = session;
    textContent = textContent.trim();
    if (!textContent) {
      await session.send(`【@${username}】\n请输入【待合成的语音内容】：`);
      const userInput = await session.prompt();
      if (!userInput) return `【@${username}】\n输入超时！`;
      textContent = userInput.trim();
    }

    const nameMap = {
      "illi-Bert-VITS2": "illi",

      "Test2": "Revali_Bert2_V2",

      "Gogo-Bert-VITS2": "aimino",
      "UU-Bert-VITS2": "aimino",

      "Kled-Bert-VITS2": "kled",

      "BT7274-Bert-VITS2": "Speaker",
      "Pite-Bert-VITS2": "Speaker",
      "Vantage-Bert-VITS2": "Speaker",
      "Loba-Bert-VITS2": "Speaker",
      "Ash-Bert-VITS2": "Speaker",
      "LanYangYang-Bert-VITS2": "Speaker",
      "Mirage-Bert-VITS2": "Speaker",
      "Valkyrie-Bert-VITS2": "Speaker",
      "Ballistic-Bert-VITS2": "Speaker",
      "Crypto-Bert-VITS2": "Speaker",
      "Revenant-Bert-VITS2": "Speaker",
      "lulu-Bert-VITS2": "Speaker",
      "Wattson-Bert-VITS2": "Speaker",
      "Madmaggie-Bert-VITS2": "Speaker",
      "AiNotify-Bert-VITS2": "Speaker",
      "Bloodhound-Bert-VITS2": "Speaker",
      "Horizon-Bert-VITS2": "Speaker",
      "Fuse-Bert-VITS2": "Speaker",
      "wraith-Bert-VITS2": "Speaker",
      "octane-Bert-VITS2": "Speaker",
      "Pathfinder-Bert-VITS2": "Speaker",
      "MINuo-Bert-VITS2": "Speaker",
      "KeJie-Bert-VITS2": "Speaker",
      "VITS2-test": "Cheese",
      "SNR-Bert-VITS2": "Speaker",

      "Ze-Bert-VITS2-2.3": "陈泽",
      "Azuma-Bert-VITS2-2.3": "东雪莲",
      "Azuma-Bert-VITS2.0.2": "东雪莲",
      "Azuma1-Bert-VITS2": "Azuma",
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
      0.2: ['永雏塔菲', '孙笑川', '星瞳', '向晚', '永雏小菲', '剑魔', '贝拉', '扇宝', '恬豆', '黑桃影', '卖卖', '鹿鸣', '文静', '山泥若',
        '雪糕', '柯洁', '米诺', '探路者', '雫るる', '动力小子', '地平线', '暴雷', '寻血猎犬', '播音员', '疯玛吉', '恶灵', '沃特森', '万蒂奇', '罗芭', '艾许',
        '懒羊羊', '幻象', '瓦尔基里', '弹道', '密客', '亡灵', 'BT7274', '北极星泰坦', '帝王泰坦', '克烈', '露早', '力巴尔','以里illi'],
      0.6: ['坏女人星瞳', '梅西', '陈泽'],
      0.3: ['皮特174', '柚恩']
    };

    const sliderValue = getKeyByValue(type, sliderValues);

    const sliderValuesMap = {
      '沃特森': 0.7,
      '皮特174': 0.7,
      'BT7274': 0.8,
      '克烈': 0.6,
      '以里illi': 0.6,
      '力巴尔': 0.6,
      '柚恩': 0.7,
    };

    let sliderValues2 = {
      '皮特174': 1,
      '克烈': 0.8,
      '力巴尔': 0.8,
      '以里illi': 0.8,
      '柚恩': 0.7,
      '露早': 0.7
    };

    const dropdownValuesMap = {
      '克烈': 'ZH',
      '柚恩': 'ZH',
      '露早': 'ZH',
      '力巴尔': 'ZH',
    };

    for (const version of versions) {
      let suffix = 'run/predict';
      const postDataUrl = `https://www.modelscope.cn/api/v1/studio/${author}/${version}/gradio/${suffix}`;

      const sliderValueToUse = sliderValuesMap[type] || 0.5;
      let sliderValueToUse2 = sliderValues2[type] || 0.9;
      const dropdownValueToUse = dropdownValuesMap[type] || 'auto';


      const requestBody = {
        "data": [
          textContent,
          nameMap[version],
          sliderValue,
          sliderValueToUse,
          sliderValueToUse2,
          type === '露早' ? 1.1 : 1,
          dropdownValueToUse,
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
          const fileUrl = `https://www.modelscope.cn/api/v1/studio/${author}/${version}/gradio/file=${name}`;
          await session.send(h.audio(fileUrl));
          break;
        }
      } catch (error) {
        logger.error('Error:', error);
      }
    }

  }
}
