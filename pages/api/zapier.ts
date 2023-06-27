import type { NextApiRequest, NextApiResponse } from "next"
import { OpenAI } from 'langchain/llms/openai'
import { ZapierNLAWrapper } from 'langchain/tools'
import {
  initializeAgentExecutorWithOptions,
  ZapierToolKit,
} from 'langchain/agents'


function prepareResponse(res: NextApiResponse) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question, history } = req.body
  const sanitizedQuestion = question.trim().replaceAll("\n", " ")
  const model = new OpenAI({ temperature: 0 });
  const zapier = new ZapierNLAWrapper()
  const toolkit = await ZapierToolKit.fromZapierNLAWrapper(zapier)

  prepareResponse(res)

  const sendData = (data: string) => {
    res.write(`data: ${data}\n\n`)
  }

  sendData(JSON.stringify({ question: sanitizedQuestion }))
  sendData(JSON.stringify({ data: "" }))

  const chain = await initializeAgentExecutorWithOptions(
    toolkit.tools,
    model,
    {
        agentType: 'zero-shot-react-description',
        verbose: true
    },
  )

  try {
    const response = await chain.call({
      input: sanitizedQuestion,
      chat_history: history || [],
    })

    sendData(JSON.stringify({ data: response?.output }))
  } catch (error) {
    console.error("error", error)
  } finally {
    sendData("[DONE]")
    res.end()
  }
}