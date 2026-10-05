/**
 * Violating snippets for the `eslint-plugin-react-you-might-not-need-an-effect` rules enabled by `react.js`.
 */
// several rules overlap (for example `no-derived-state` and `no-adjust-state-on-prop-change`), and some count references
// to state, so these snippets follow the shapes in the plugin's README to make exactly the intended rule report
const effect = (body) => ({
  file: 'case.jsx',
  code: `import { useEffect, useState } from 'react';\n\n${body}\n`,
});

const PREFIX = 'react-you-might-not-need-an-effect';

module.exports = {
  [`${PREFIX}/no-adjust-state-on-prop-change`]: effect(
    'export function Component({ items }) {\n  const [selection, setSelection] = useState(null);\n  useEffect(() => {\n    setSelection(null);\n  }, [items]);\n  return <div>{String(selection)}</div>;\n}',
  ),
  [`${PREFIX}/no-chain-state-updates`]: effect(
    'export function Game({ card }) {\n  const [goldCardCount, setGoldCardCount] = useState(0);\n  const [round, setRound] = useState(1);\n  useEffect(() => {\n    if (card !== null && card.gold) {\n      setGoldCardCount((c) => c + 1);\n    }\n  }, [card]);\n  useEffect(() => {\n    if (goldCardCount > 3) {\n      setRound((r) => r + 1);\n      setGoldCardCount(0);\n    }\n  }, [goldCardCount]);\n  return <div>{round}</div>;\n}',
  ),
  [`${PREFIX}/no-derived-state`]: effect(
    'export function Component({ value }) {\n  const [doubled, setDoubled] = useState(0);\n  useEffect(() => {\n    setDoubled(value * 2);\n  }, [value]);\n  return <div>{doubled}</div>;\n}',
  ),
  [`${PREFIX}/no-event-handler`]: effect(
    'export function Component({ submitted, data }) {\n  useEffect(() => {\n    if (submitted) {\n      fetch("/api", { method: "POST", body: data });\n    }\n  }, [submitted, data]);\n  return null;\n}',
  ),
  [`${PREFIX}/no-external-store-subscription`]: effect(
    'export function useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(true);\n\n  useEffect(() => {\n    function updateState() {\n      setIsOnline(navigator.onLine);\n    }\n\n    updateState();\n    window.addEventListener("online", updateState);\n    window.addEventListener("offline", updateState);\n    return () => {\n      window.removeEventListener("online", updateState);\n      window.removeEventListener("offline", updateState);\n    };\n  }, []);\n}',
  ),
  [`${PREFIX}/no-initialize-state`]: effect(
    'export function Component() {\n  const [count, setCount] = useState(null);\n  useEffect(() => {\n    setCount(0);\n  }, []);\n  return <div>{count}</div>;\n}',
  ),
  [`${PREFIX}/no-pass-data-to-parent`]: effect(
    'export function Component({ onData, query }) {\n  useEffect(() => {\n    const data = fetch(`/api?q=${query}`);\n    onData(data);\n  }, [onData, query]);\n  return null;\n}',
  ),
  [`${PREFIX}/no-pass-live-state-to-parent`]: effect(
    'export function Component({ onChange }) {\n  const [value, setValue] = useState("");\n  useEffect(() => {\n    onChange(value);\n  }, [value, onChange]);\n  return <input value={value} onChange={(e) => setValue(e.target.value)} />;\n}',
  ),
  [`${PREFIX}/no-reset-all-state-on-prop-change`]: effect(
    'export function List({ items }) {\n  const [selection, setSelection] = useState(null);\n\n  useEffect(() => {\n    setSelection(null);\n  }, [items]);\n\n  return <div />;\n}',
  ),
};
