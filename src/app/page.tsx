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
    <div className="lcs-container">
      <h1 className="lcs-title">最長共通部分列計算ツール</h1>
      <div className="lcs-field">
        <label className="lcs-label">
          文字列1:
          <input
            type="text"
            value={str1}
            onChange={e => setStr1(e.target.value)}
            className="lcs-input"
          />
        </label>
      </div>
      <div className="lcs-field">
        <label className="lcs-label">
          文字列2:
          <input
            type="text"
            value={str2}
            onChange={e => setStr2(e.target.value)}
            className="lcs-input"
          />
        </label>
      </div>
      <button className="lcs-btn" onClick={handleCalculate} disabled={loading}>
        {loading ? '計算中...' : '計算'}
      </button>
      {result !== null && (
        <div className="lcs-result">
          <strong>結果:  ※()内は1つの例</strong>
          <div className="lcs-result-string">{`${result.length} (最長共通部分列: "${result}") `}</div>
        </div>
      )}
    </div>
  );
}
