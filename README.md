### How to run app

> docker が動作するので、止めたければ pnpm db:stop をしてください

```bash
pnpm i
pnpm db:start
pnpm dev
pnpm db:studio
```

### shadcn ui の使い方

> コンポーネントの追加方法

```
npx shadcn-ui@latest add
or
npx shadcn-ui@latest add [component name]
```

### firebase エミュレータの起動

> <a href="https://console.firebase.google.com/u/0/project/skillio-workbook/authentication/providers?hl=ja">本番　 https://console.firebase.google.com/u/0/project/skillio-workbook/authentication/providers?hl=ja</a>

```
pnpm run emulators
```

> firebase エミュレータの起動には java が環境内で使える必要があります。
> 以下の手順を参考に java を install できます。
> <a href="https://adoptium.net/">https://adoptium.net/</a> で java のインストーラを入手してください。<br />

```
cd ~
echo JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home >> .zshrc
source .zshrc
echo $JAVA_HOME
cd ~
echo PATH=$PATH:$JAVA_HOME/bin >> .zshrc
source .zshrc
echo $PATH
```

> 以下でバージョンが表示されれば java の install は成功です。

```
java --version
javac --version
```

### drizzle の使い方

> <a href="https://orm.drizzle.team/docs/column-types/pg">公式 URL https://orm.drizzle.team/docs/column-types/pg</a><br /> <a href="https://orm.drizzle.team/drizzle-studio/overview">公式 URL https://orm.drizzle.team/drizzle-studio/overview</a>

> <b>マイグレーションファイルの生成</b>

```
pnpm db:migration
```

> <b>マイグレーションの実行</b>

```
pnpm db:push
```

> <b>マイグレーションファイルの削除方法</b>

```
pnpm db:drop
```

### Plopによるテンプレートソースコード生成

> componentのテンプレートを作成

```
pnpm gen:component
```

### node バージョン情報

```
$ pnpm -v
8.15.5
$ node -v
v21.7.1
```

### 本番環境 Vercel

> <a href="https://skillio.vercel.app/">main 変更時反映されます https://skillio.vercel.app/ </a> <br /> > <a href="https://vercel.com/ootashikous-projects/skillio">dashbord https://vercel.com/ootashikous-projects/skillio</a>

### 本番環境 Neon Sql

> <a href="https://console.neon.tech/app/projects/old-heart-54579401">https://console.neon.tech/app/projects/old-heart-54579401</a>
