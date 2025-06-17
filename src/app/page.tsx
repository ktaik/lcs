'use client';

import React, { useState } from 'react';

export default function Home() {
  const [str1, setStr1] = useState('');
  const [str2, setStr2] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/lcs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a: str1, b: str2 }),
      });

      const data = await res.json();
      if (data.lcs !== undefined) {
        setResult(data.lcs);
      } else {
        setResult('エラー: レスポンスが不正です');
      }
    } catch (error) {
      console.error(error);
      setResult('通信エラーが発生しました');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1>最長共通部分列計算ツール</h1>
      <div style={{ marginBottom: 16 }}>
        <label>
          文字列1:
          <input
            type="text"
            value={str1}
            onChange={e => setStr1(e.target.value)}
            style={{ width: '100%', marginTop: 4 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          文字列2:
          <input
            type="text"
            value={str2}
            onChange={e => setStr2(e.target.value)}
            style={{ width: '100%', marginTop: 4 }}
          />
        </label>
      </div>
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? '計算中...' : '最長共通部分列を計算'}
      </button>
      {result !== null && (
        <div style={{ marginTop: 24 }}>
          <strong>結果:</strong>
          <div style={{ marginTop: 8, wordBreak: 'break-all' }}>{`${result.length} (最長共通部分列: "${result}") `}</div>
        </div>
      )}
    </div>
  );
}
