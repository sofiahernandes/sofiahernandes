'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';

const prompt = 'sofia.hernandes@macbook-pro ~ $';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);

      setHistory([
        'Last login: ' + new Date().toLocaleString(),
        "Type 'help' to see available commands",
        '',
      ]);
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener('click', handleClick);
      }
    };
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

    setHistory((prev) => [
      ...prev,
      `${prompt} ${cmd}`,
      '',
    ]);

    switch (mainCommand) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          'Available commands:',
          '  help       Show this help message',
          '  clear      Clear the terminal',
          '  ls         List apps in the portfolio',
          '  about      A little about me',
          '  skills     My primary skills',
          '  contact    Contact information',
          '',
        ]);
        break;

      case 'clear':
        setHistory(['']);
        break;

      case 'ls':
        setHistory((prev) => [
          ...prev,
          'Projects Library',
          'About Me Game',
          'Gallery',
          'Terminal',
          'Email',
          'LinkedIn',
          'Instagram',
          'GitHub',
          '',
        ]);
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

  const terminalLines = document.querySelectorAll('.teminal-line');

  terminalLines.forEach((el) => {
    if (el.clientHeight === 0) {
      el.classList.add('line-divisor');
    }
  });

  return (
    <div
      ref={terminalRef}
      className="h-full bg-black text-white p-2 font-mono text-sm overflow-auto"
    >
      {history.map((line, index) => (
        <div key={index} className="teminal-line whitespace-pre-wrap">
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
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white"
          autoFocus
        />
      </div>
    </div>
  );
}
