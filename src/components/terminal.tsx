'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';

const prompt = 'sofia.hernandes@macbook-pro ~ $';

export default function Terminal({
  onOpenFolder,
}: {
  onOpenFolder?: (title: string, id: string) => void;
}) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory([
      'Last login: ' + new Date().toLocaleString(),
      "Type 'help' to see available commands",
      '',
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(1);
    }
  };

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return;

    const newIndex = historyIndex + direction;

    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1);
      setInput('');
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex]);
    }
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const args = command.split(' ');
    const mainCommand = args[0];

    setHistory((prev) => [...prev, `${prompt} ${cmd}`, '']);

    switch (mainCommand) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          'Available commands:',
          '  help:       Show this help message',
          '  clear:      Clear the terminal',
          '  ls:         List apps in the portfolio',
          '  about:      A little about me',
          '  skills:     My primary skills',
          '  contact:    Contact information',
          '',
        ]);
        break;

      case 'clear':
        setHistory(['']);
        break;

      case 'ls':
        setHistory((prev) => [
          ...prev,
          'Projects',
          'About',
          'Resume',
          'Contact',
          'Finder',
          'Terminal',
          'Email',
          'LinkedIn',
          'Instagram',
          'GitHub',
          '',
        ]);
        break;

      case 'about':
      case 'contact':
        onOpenFolder?.('About', 'folder-2');
        setHistory((prev) => [...prev, 'Opening About...', '']);
        break;

      default:
        setHistory((prev) => [
          ...prev,
          `Command not found: ${mainCommand}`,
          'Type "help" to see available commands',
          '',
        ]);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      ref={terminalRef}
      className="h-full bg-black text-white p-2 font-mono text-sm overflow-auto"
      onClick={focusInput}
      onPointerDown={focusInput}
    >
      {history.map((line, index) => (
        <div key={index} className="terminal-line">
          {line.startsWith(prompt) ? (
            <>
              <span className="text-gray-300">{prompt}</span>
              {line.slice(prompt.length)}
            </>
          ) : (
            line
          )}
        </div>
      ))}

      <div className="flex">
        <span className="mr-2 text-gray-300">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          enterKeyHint="done"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent text-base text-white outline-none sm:text-sm"
          autoFocus
        />
      </div>
    </div>
  );
}
