'use client'

import { useState, useEffect } from "react"
import ChatTypingAnimation from "./components/ChatTypingAnimation/ChatTypingAnimation";

interface Message {
  role: string,
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [conversation, setConversation] = useState<Array<string>>([]);
  const [openAiLoading, setOpenAiLoading] = useState<boolean>(false);

  const classnames = ["text-right flex justify-end mt-2", "flex mt-2"]
  const textClassNames = [
    "p-4 bg-emerald-300 w-fit text-right text-slate-900 rounded-md break-words max-w-xs	",
    "p-4 bg-rose-300 text-slate-900 rounded-md w-fit break-words max-w-xs	"
  ]

  useEffect(() => {
    if (openAiLoading)
      callToOpenAI();
  }, [openAiLoading]);

  function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const messageInput = (document.getElementById('user-input') as HTMLTextAreaElement).value;
    (document.getElementById('user-input') as HTMLTextAreaElement).value = "";
    console.log(messageInput);
    setConversation(prevConversation => [...prevConversation, messageInput]);
    setOpenAiLoading(true)
    setMessages(prevConversation => [...prevConversation, {role: "user", content: messageInput}]);
  }

  async function callToOpenAI() {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        cache: 'no-cache',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4-1106-preview',
            messages: messages,
        }),
      });
      const openAiResponse = await response.json()
      setConversation(prevConversation => [...prevConversation, openAiResponse.choices[0].message.content]);
      setMessages(prevConversation => [...prevConversation, {role: openAiResponse.choices[0].message.role, content: openAiResponse.choices[0].message.content}]);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenAiLoading(false)
    } 
  }

  function handleDeleteAction() {
    setConversation([])
    setMessages([])
  }

  return (
    <div id="global-container" className="w-1/2 flex justify-center h-full flex-col m-auto py-4 gap-4">
      <div id="chat" className="h-full bg-slate-100 p-4 rounded-sm overflow-scroll">
        {
          conversation.map((elem, index) => {
            return (
              <div key={index} className={classnames[index % classnames.length]}>
                <p className={textClassNames[index % textClassNames.length]}>{elem}</p>
              </div>
            )
          })
        }
      </div>

      <div id="input" className="w-full h-fit">
        <form name="questionForm" onSubmit={(e) => {
          submitData(e)
        }}>
          <div>
            <input type="text" className="w-full text-slate-900 bg-slate-100 p-2" name="user input" id="user-input" placeholder="Type your text here" autoComplete="off"/>
            <div className="grid grid-cols-2 gap-2 mt-2">
              { openAiLoading && <button className='w-full bg-emerald-800 rounded-sm'><ChatTypingAnimation /></button>}
              { !openAiLoading && <button className="w-full bg-emerald-800 rounded-sm">Send</button>}
              <button className="w-full bg-rose-800 rounded-sm" type="button" onClick={handleDeleteAction}>Clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
