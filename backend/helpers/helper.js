import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";

var providerModel;

function chooseModel(provider, model, apiKey, temperature, maxTokens, topP, frequencyPenalty, topK) {
    switch (provider.toLowerCase()) {
        case "openai": return new ChatOpenAI({
            modelName: model,
            maxTokens: maxTokens,
            apiKey: apiKey,
            temperature: temperature,
            frequencyPenalty: frequencyPenalty,
            topP: topP
        })
        case "google": return new ChatGoogleGenerativeAI({
            modelName: model,
            maxOutputTokens: maxTokens,
            apiKey: apiKey,
            temperature: temperature,
            topK: topK,
            topP: topP
        })
        case "anthropic": return new ChatAnthropic({
            modelName: model,
            maxTokens: maxTokens,
            apiKey: apiKey,
            temperature: temperature,
            topK: topK,
            topP: topP
        })
        default: throw new Error("Invalid Provider");
    }
}

function createRephraseQuestionChain(providerModel) {
    const REPHRASE_QUESTION_SYSTEM_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.`;

    const rephraseQuestionChainPrompt = ChatPromptTemplate.fromMessages([
        ["system", REPHRASE_QUESTION_SYSTEM_TEMPLATE],
        new MessagesPlaceholder("history"),
        ["human", "Rephrase the following question as a standalone question:\n{question}"],
    ]);
    const rephraseQuestionChain = RunnableSequence.from([
        rephraseQuestionChainPrompt,
        providerModel,
        new StringOutputParser(),
    ]);
    return rephraseQuestionChain;
}

const messageHistory = new ChatMessageHistory();
const messageHistories = {}
const getMessageHistoryForSession = (sessionId) => {
    if (messageHistories[sessionId] !== undefined) {
        return messageHistories[sessionId];
    }
    const newChatSessionHistory = new ChatMessageHistory();
    messageHistories[sessionId] = newChatSessionHistory;
    return newChatSessionHistory;
};

async function helper(message, model, provider, apiKey, temperature, maxTokens, topP, frequencyPenalty, topK, sessionId) {
    try {
        providerModel = chooseModel(provider, model, apiKey, temperature, maxTokens, topP, frequencyPenalty, topK);

        const rephraseQuestionChain = createRephraseQuestionChain(providerModel);

        const ANSWER_CHAIN_SYSTEM_TEMPLATE = `You are an AI assistant. You have a broad knowledge base spanning various topic,
        allowing  you to engage in thoughtful conversations and provide informative responses. If the context and chat history 
        do not contain sufficient information to fully address the question or topic, acknowledge the limitations and provide 
        the best possible response based on the available information. Ask clarifying questions if needed, but always aim to 
        provide a substantive answer that demonstrates your depth of knowledge and reasoning abilities.Your responses should be 
        thorough, well-structured, and easy to understand. Use your analytical and communication skills to break down complex topics, 
        offer clear explanations, and provide insightful perspectives. Maintain a friendly and engaging tone throughout the conversation.`;

        const answerGenerationChainPrompt = ChatPromptTemplate.fromMessages([
            ["system", ANSWER_CHAIN_SYSTEM_TEMPLATE],
            new MessagesPlaceholder("history"),
            [
                "human",
                `Now, with your knowledge available, answer this question, and if there is any previous context revolving this question use the 
                previous context and chat history, answer this question:
                {standalone_question}`
            ]
        ]);

        const conversationalRetrievalChain = RunnableSequence.from([
            RunnablePassthrough.assign({
                standalone_question: rephraseQuestionChain,
            }),
            answerGenerationChainPrompt,
            providerModel
        ]);

        const httpResponseOutputParser = new HttpResponseOutputParser({
            contentType: "text/plain"
        });

        const finalRetrievalChain = new RunnableWithMessageHistory({
            runnable: conversationalRetrievalChain,
            getMessageHistory: getMessageHistoryForSession,
            inputMessagesKey: "question",
            historyMessagesKey: "history",
        }).pipe(httpResponseOutputParser);

        const stream = await finalRetrievalChain.stream({
            question: message
        }, { configurable: { sessionId: sessionId } });

        return stream;
    } catch (err) {
        throw new Error(err)
    }
}

export { helper };