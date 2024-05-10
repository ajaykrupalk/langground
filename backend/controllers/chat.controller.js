import { helper } from '../helpers/helper.js'

const chat = async (req, res) => {
    try {
        const { token, question, sessionId, provider, model } = req.body;
        const stream = await helper(token, question, sessionId, provider, model)

        for await (const chunk of stream) {
            const decoder = new TextDecoder();
            const text = decoder.decode(chunk);
            res.write(text)
        }
        res.end();
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
    }
}

export { chat };