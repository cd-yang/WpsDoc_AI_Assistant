import { AzureChatOpenAI, ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY, AZURE_DEPLOYMENT_ID, AZURE_INSTANCE_NAME, AZURE_API_VERSION } from '../config'

const chatModel = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-35-turbo',
    openAIApiKey: OPENAI_API_KEY,
    azureOpenAIApiKey: OPENAI_API_KEY,
    azureOpenAIApiDeploymentName: AZURE_DEPLOYMENT_ID,
    azureOpenAIApiInstanceName: AZURE_INSTANCE_NAME,
    azureOpenAIApiVersion: AZURE_API_VERSION,
});

export async function get技术要求响应(技术评审要求) {
    const response = await chatModel.invoke(`帮我写一个技术要求响应，技术评审要求是：${技术评审要求}`);
    console.log('response: ', JSON.stringify(response, null, 2));
    return response?.lc_kwargs?.content ?? '请求失败'
}