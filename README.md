# PINE ~新世代待ち合わせサービス~
## 製品概要
### 待ち合わせTech

### 背景（製品開発のきっかけ、課題等）

IT化が進もうと、人と人との直接的な会合は失われることはない。この待ち合わせという手法は、いくつかの変化を経てはいるものの、未だに課題を残している。
手紙、電話、メール、チャット･･･すべて相手とのインタラクションを必要とし、ここに情報共有のボトルネックが生ずる。
無駄なインタラクションを排除した情報共有アプリケーションを開発することで、このボトルネックを排除すると共に、
ユーザーデータを用いて街・広告といった大規模な視野における人の流れをも制御することを狙う。

時間にルーズなネットの皆さんとオフ会したい、でもその1回オフ会するためにSlackやLINEでグループを作ったり連絡先を交換するのはめんどくさい。

待ち合わせ ->  待つ -> 松 -> Pine

**「「「そうだ、PINEを使おう。」」」**

![logo](./image/logo.png =400x)

### 製品説明（具体的な製品の説明）

PINEはWEBブラウザ上で動く待ち合わせ情報共有アプリケーションです。
メンバーの遅刻情報や最新の待ち合わせ場所の共有などをスムーズに行います。

1. LINE BOTに日時や集合場所を伝え、PINEがURLを返答。
2. メンバーはWEBブラウザからそのURLにアクセス。
3. 着くまでの間、目的地が更新されたか、遅刻するかなどを共有。
4. 到着後、今どこに誰がいるかを参照したり集合場所を変更したり。

### 特長
#### 1. 特長1
* LINE Botを友達に追加することによって、Webページにアクセスすることなく集合場所と集合時間に基づいたURLを発行。

![bot](./image/bot.jpg =400x)

#### 2. 特長2
* 共有URLには、集合前と集合後のページが別々に用意され、必要な情報とインタラクションのみを提示。

* 集合前

![ongoing](./image/going.png =400x)

* 集合後

![wating](./image/wating.png =400x)

#### 3. 特長3

### 解決出来ること
* 待ち合わせという状況下における意思疎通の遅延緩和
 * 例・待ち合わせるにあたって誰がどこにいるかを一括で管理
 * 例・待ち合わせ場所の変更、遅刻等の情報を即座に共有


### 今後の展望
* WEB Bluetoothの情報を統合した、より高精度な位置情報取得
* 近くの居酒屋などの広告サジェスト
* 混雑緩和を目的とした集合場所サジェスト

### 注力したこと（こだわり等）
* インストール不要のWEBアプリケーション
* BOTとの対話でURL生成

## 開発技術
### 活用した外部技術
#### API・データ
* LINE BOT Messaging API
* NTTレゾナント 時刻情報正規化API
* Google Maps API
* heroku

#### フレームワーク・ライブラリ・モジュール
* Firebase

#### デバイス
* Google Chromeが使える端末

### 独自技術
#### 期間中に開発した独自機能・技術
* 独自で開発したものの内容をこちらに記載してください
* 特に力を入れた部分をファイルリンク、またはcommit_idを記載してください（任意）

#### 研究内容（任意）
* もし、製品に研究内容を用いた場合は、研究内容の詳細及び具体的な活用法について、こちらに記載をしてください。
*