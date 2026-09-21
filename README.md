# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Release Aの計測基準

Release Aでは、通信なしで水泳練習のタイムを計測・保存・復元できることを目標とする。

### A-00 テストデータ

実装とテストでは、以下の固定データを使用する。

- 架空選手：10人
- 使用コース：3コース
- 計測件数：100件
- サークル：60,000ms（60秒）
- 選手間隔：5,000ms（5秒）
- 基準タイム：55,000ms（55秒）
- 時間の内部単位：整数ミリ秒

実在選手の氏名や個人情報はテストデータに使用しない。

### コース配置

- 1コース：選手01〜選手04
- 2コース：選手05〜選手07
- 3コース：選手08〜選手10

配列内の順番を各コースの泳順とする。

### タイム計算

予定出発時刻は次の式で求める。

```text
予定出発時刻
= ラウンド番号 × サークル
+ 泳順番号 × 選手間隔