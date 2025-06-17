import { NextRequest, NextResponse } from 'next/server';

// 最長共通部分列 (LCS) を計算する関数
function calculateLCS(a: string, b: string): string {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // DPテーブルの構築
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // LCSの復元
    let res = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (a[i - 1] === b[j - 1]) {
            res = a[i - 1] + res;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return res;
}

// POSTリクエストでLCSを計算
export async function POST(req: NextRequest) {
    const { a, b } = await req.json();
    if (typeof a !== 'string' || typeof b !== 'string') {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const result = calculateLCS(a, b);
    return NextResponse.json({ lcs: result });
}