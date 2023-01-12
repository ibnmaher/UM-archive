import React from "react";

import "./App.css";
import { Index } from "routes";
import { Navbar } from "common/components/nav/navbar";

function App() {
  return (
    <div className="bg-quan min-h-screen relative">
      <Navbar />
      <Index />
    </div>
  );
}

export default App;
