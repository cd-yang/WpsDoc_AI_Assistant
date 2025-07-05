import { StringOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GOOGLE_API_KEY } from '../config';

const chatModel = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    temperature: 0,
    maxOutputTokens: 1000,
    apiKey: GOOGLE_API_KEY,
});

export async function get技术要求响应(技术评审要求) {
    // const response = await chatModel.invoke(`帮我写一个技术要求响应，技术评审要求是：${技术评审要求}`);
    // console.log('response: ', JSON.stringify(response, null, 2));


    const prompt = ChatPromptTemplate.fromMessages([
        ["system",
            `You are a world class technical documentation writer.
        帮我写一个技术要求响应。回答要满足下面两个条件：
        1. 返回结果只包含内容
        2. 字数与技术要求相同
        技术要求是：
        `],
        ["user", "{input}"],
    ]);
    const outputParser = new StringOutputParser();
    const chain = prompt.pipe(chatModel).pipe(outputParser);
    const response = await chain.invoke({ input: 技术评审要求 });

    return response ?? '请求失败'
}



export async function getTypo_old(originText) {
    const prompt = ChatPromptTemplate.fromMessages([
        ["system",
            `Review the following passage and identify any spelling or typographical errors. 
            Once you've identified them, return the original text and corrected text.`
            // Once you've identified them, correct them accordingly and provide an explanation for why you made each change.`
        ],
        ["user", "{input}"],
    ]);
    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        originalText: "answer to the user's question",
        correctedText: "source used to answer the user's question, should be a website.",
    });
    const chain = prompt.pipe(chatModel)
        .pipe(outputParser);
    const response = await chain.invoke({ input: originText });
    alert(response)
    // return response ?? '请求失败'
    return {
        typoExists: true,
        // textsWithTypos: response
    };
}

export async function getTypo(originText) {
    if (!originText) {
        return {
            typoExists: false,
            res: ''
        };
    }
    // 使用 StringOutputParser 效果很差
    // const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    //     originalText: "original text with typos",
    //     correctedText: "corrected text",
    // });

    // const chain = RunnableSequence.from([
    //     PromptTemplate.fromTemplate(
    //         "Based on the information provided the following passage delimited by triple backticks, identify any spelling or typographical errors.\n{format_instructions}\n```{originText}```"
    //     ),
    //     chatModel,
    //     outputParser,
    // ]);

    // const response = await chain.invoke({
    //     originText: originText,
    //     // Once you've identified them, return the original text and corrected text.
    //     format_instructions: outputParser.getFormatInstructions(),
    // });

    const prompt = ChatPromptTemplate.fromMessages([
        ["system",
            // `
            // Based on the information provided the following passage delimited by triple backticks, 
            // identify any spelling or typographical errors.
            // `
            `
            帮我检测以下文本有没有拼写或语法错误:
            `
        ],
        ["user", `{input}`],
    ]);
    const outputParser = new StringOutputParser();
    const chain = prompt.pipe(chatModel).pipe(outputParser);
    const response = await chain.invoke({ input: originText });
    console.log('response: ', response)
    return {
        typoExists: true,
        // textsWithTypos: response
        res: response
    };
}