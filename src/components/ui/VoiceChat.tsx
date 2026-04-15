"use client";

import { useState, useRef } from "react";

export function VoiceChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [inputText, setInputText] = useState("");

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Su navegador no soporta reconocimiento de voz nativo.");
      return;
    }
    
    setIsRecording(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "es-ES";
    recognitionRef.current.interimResults = false;
    
    recognitionRef.current.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("Audio capturado:", transcript);
      setIsRecording(false);
      await sendMessage(transcript);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      console.error("Error en reconocimiento de voz:", event.error);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      console.log("El micrófono se ha apagado o desconectado.");
      setIsRecording(false);
    };

    try {
      recognitionRef.current.start();
      console.log("Micrófono iniciado correctamente.");
    } catch (err) {
      console.error("No se pudo iniciar el microfono:", err);
      setIsRecording(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setIsLoading(true);
    setInputText("");
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {messages.length > 0 && (
        <div className="bg-slate-800 text-white p-4 rounded-lg mb-4 w-72 max-h-96 overflow-y-auto space-y-4 shadow-2xl">
          {messages.map((m, i) => (
            <div key={i} className={`p-2 rounded-lg text-sm ${m.role === "user" ? "bg-blue-600 ml-auto w-fit" : "bg-slate-700 mr-auto w-fit"}`}>
              {m.content}
            </div>
          ))}
          {isLoading && <div className="text-sm text-gray-400 italic">Pensando...</div>}
        </div>
      )}
      <div className="flex gap-2 items-center bg-slate-800 p-2 rounded-full shadow-lg">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
          placeholder="Escribe algo..."
          className="bg-transparent text-white px-4 py-2 outline-none w-48"
          disabled={isLoading}
        />
        <button 
          onClick={startRecording}
          disabled={isRecording || isLoading}
          className={`p-3 rounded-full text-white font-bold transition-all ${isRecording ? "bg-red-500 animate-pulse" : "bg-[#00FF41] text-[#0A192F] hover:bg-green-400"}`}
          title="Dictar por voz"
        >
          {isRecording ? "🔴" : "🎤"}
        </button>
        <button
          onClick={() => sendMessage(inputText)}
          disabled={!inputText.trim() || isLoading}
          className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-bold disabled:opacity-50"
          title="Enviar texto"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
