'use client'

import { useState } from "react"

export default function Home() {
  const [conversation, setConversation] = useState<Array<string>>(["Message 1", "Message 2", "Message 3", "Message 4", "Message 5", "Message 6", 
  "Message 7 longer than the other ones. Long enough to be on multiples lines", "Message 8", "Message 9", "Message 10", "Message 11", "Message 12"]);

  const classnames = ["text-right flex justify-end mt-2", "flex mt-2"]
  const textClassNames = [
    "p-4 bg-emerald-300 w-fit text-right text-slate-900 rounded-md break-words max-w-xs	",
    "p-4 bg-rose-300 text-slate-900 rounded-md w-fit break-words max-w-xs	"
]
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
        <form action="">
          <div>
            <input type="text" className="w-full text-slate-900 bg-slate-100 p-2" name="user input" id="user-input" placeholder="Type your text here" />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="w-full bg-emerald-800 rounded-sm">Send</button>
              <button className="w-full bg-rose-800 rounded-sm">Clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
