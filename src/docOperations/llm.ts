import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY, AZURE_DEPLOYMENT_ID, AZURE_INSTANCE_NAME, AZURE_API_VERSION } from '../config'
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


const chatModel = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-35-turbo',
    openAIApiKey: OPENAI_API_KEY,
    azureOpenAIApiKey: OPENAI_API_KEY,
    azureOpenAIApiDeploymentName: AZURE_DEPLOYMENT_ID,
    azureOpenAIApiInstanceName: AZURE_INSTANCE_NAME,
    azureOpenAIApiVersion: AZURE_API_VERSION,
});

export async function get技术要求响应(技术评审要求: string) {
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

    // return JSON.stringify(response, null, 2)
    return response ?? '请求失败'
}

export async function getTypo(originText: string): Promise<{ typoExists: boolean; textsWithTypos?: string[]; }> {
    const prompt = ChatPromptTemplate.fromMessages([
        ["system",
            `欢迎使用文本错别字检测器！
            请在下方输入您要检查的文本。我们将为您检测其中的错别字并提供修正建议。返回值只应包含原始错误的文字和修改后的内容，不应包含其他信息。
        `],
        ["user", "{input}"],
    ]);
    // const outputParser = new StringOutputParser();
    const chain = prompt.pipe(chatModel)
    // .pipe(outputParser);
    const response = await chain.invoke({ input: originText });
    alert(JSON.stringify(response, null, 2))
    // return response ?? '请求失败'
    return {
        typoExists: true,
        // textsWithTypos: response
    };
}