import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { FormEvent, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";
import { UserOnClient } from "./types/user";
import { Navigate } from "react-router-dom";
import { Message } from "./types/messages";
import { Loader } from "./components/loader/Loader";


export default function App() {
  const { user } = useSelector((state: { auth: { user: UserOnClient } }) => state.auth)
  if (!user) return <Navigate to="/signin" />

  const [isLoading, setIsLoading] = useState(false)
  const sendMessage = useMutation(api.messages.send);
  const sendToDB = useAction(api.messages.sendToDB);
  const messages = useQuery(api.messages.list, { userId: user?._id || "" });

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    console.log(messages)
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = newMessageText
    setNewMessageText("");
    await sendMessage({ content: newMessageText, role: "user", phone: user.phone as string });

    setIsLoading(true)
    sendToDB({ content: newMessageText, phone: user.phone as string }).then(() => {
      setIsLoading(false)
    });
  }

  return (
    <main className="chat">
      <header>
        <h1>Monee Share</h1>
        <p>
          Connected as <strong>{user.firstName}</strong>
        </p>
      </header>
      {messages?.map((message: Message) => (
        <article
          key={message._id}
          className={message.role === "user" ? "message-mine" : ""}
        >
          <div>{message.role}</div>
          <p>{message.content}</p>
        </article>
      ))}
      {isLoading ?
        <article key={"botholder"} style={{ display: "block" }}>
          <div>bot</div>
          <Loader />
        </article>
        : null}
      <form
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          placeholder="Write a message…"
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>
    </main>
  );
}
