import FormPanel from "./components/FormPanel";
import ChatPanel from "./components/ChatPanel";

function App() {
  return (
    <div className="h-screen flex bg-gray-100 font-sans">
      
      {/* Left Panel - Form */}
      <div className="w-1/2 border-r bg-white overflow-y-auto">
        <FormPanel />
      </div>

      {/* Right Panel - Chat */}
      <div className="w-1/2 flex flex-col">
        <ChatPanel />
      </div>

    </div>
  );
}

export default App;