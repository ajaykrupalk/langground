import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

var model;

function chooseModel(provider, model, token){
    switch (provider){
        case "google": return new ChatGoogleGenerativeAI({
            modelName: model,
            maxOutputTokens: 2048,
            apiKey: token
        })
        case "openai": return new ChatOpenAI({
            model: model,
            temperature: 0,
            apiKey: token
        }) 
        default: return 'Helllo';
    }
}

model = chooseModel("google");

export function createRephraseQuestionChain() {
    const REPHRASE_QUESTION_SYSTEM_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.`;

    const rephraseQuestionChainPrompt = ChatPromptTemplate.fromMessages([
        ["system", REPHRASE_QUESTION_SYSTEM_TEMPLATE],
        new MessagesPlaceholder("history"),
        ["human", "Rephrase the following question as a standalone question:\n{question}"],
    ]);
    const rephraseQuestionChain = RunnableSequence.from([
        rephraseQuestionChainPrompt,
        // new ChatGoogleGenerativeAI({
        //     modelName: "gemini-pro",
        //     maxOutputTokens: 2048,
        //     apiKey: process.env.GOOGLE_API_KEY
        // }),
        model,
        new StringOutputParser(),
    ]);
    return rephraseQuestionChain;
}

const rephraseQuestionChain = createRephraseQuestionChain();

const ANSWER_CHAIN_SYSTEM_TEMPLATE = `You are an experienced researcher,
expert at interpreting and answering questions.
Using the below provided context and chat history, 
answer the user's question to the best of your ability
using only the resources provided. Be verbose!`;

const answerGenerationChainPrompt = ChatPromptTemplate.fromMessages([
    ["system", ANSWER_CHAIN_SYSTEM_TEMPLATE],
    new MessagesPlaceholder("history"),
    [
        "human",
        `Now, answer this question using the previous context and chat history:
  
    {standalone_question}`
    ]
]);

const conversationalRetrievalChain = RunnableSequence.from([
    RunnablePassthrough.assign({
        standalone_question: rephraseQuestionChain,
    }),
    answerGenerationChainPrompt,
    new ChatGoogleGenerativeAI({
        modelName: "gemini-pro",
        maxOutputTokens: 2048,
        apiKey: process.env.GOOGLE_API_KEY
    }),
]);

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

const httpResponseOutputParser = new HttpResponseOutputParser({
    contentType: "text/plain"
});

const finalRetrievalChain = new RunnableWithMessageHistory({
    runnable: conversationalRetrievalChain,
    getMessageHistory: getMessageHistoryForSession,
    inputMessagesKey: "question",
    historyMessagesKey: "history",
}).pipe(httpResponseOutputParser);

async function helper(token, question, sessionId, provider, model){
    try{
        model = chooseModel(provider, model, token);
        const stream = await finalRetrievalChain.stream({
            question: question
        }, { configurable: { sessionId: sessionId } });
    
        return stream;
    } catch(err){
        throw new Error(err)
    }
}

export { helper };