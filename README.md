# 都道府県別の総人口推移グラフ

株式会社ゆめみさんが公開している、フロントエンドコーディング試験をやってみるためのプロジェクト。

- [フロントエンドコーディング試験](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d)
- [ワイヤーフレーム](https://notion.yumemi.co.jp/ab4a837f8e764dffb0fc93c7b1387af7)

## 開発

### 技術要素、環境

- React
- TypeScript
- vite

環境

- Node.js v16 系
- vscode

### 環境構築

1. Node.js v16 系をインストールする
1. リポジトリをクローンする
1. プロジェクト init
   ```
   $ cd total-population-transition-graph
   $ bin/init
   ```
1. prettier 利用のため、vscode に以下の拡張機能をインストールする
   - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### アプリ起動

- 開発サーバー起動

  ```
  $ npm run dev
  ```

### 開発その他

#### test

```
$ npm test
```

#### eslint

```
$ npm run lint
```

もしくは、以下のコマンドで警告が自動修正される。

```
$ npm run lint-fix
```

#### prettier

- vscode では、ファイル保存時に自動的に整形される
- 以下のコマンドで一括実行も可能
  ```
  $ npm run fmt-fix
  ```
