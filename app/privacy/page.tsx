import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | こどもトリアージ",
  description: "こどもトリアージのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/" className="text-sm text-rose-500 underline">
          ← ホームに戻る
        </Link>

        <h1 className="text-3xl font-bold text-slate-800 mt-6 mb-2">プライバシーポリシー</h1>
        <p className="text-xs text-slate-500 mb-8">最終更新日：2026年4月30日</p>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 shadow-sm border border-white space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">基本方針</h2>
            <p>
              当サイト「こどもトリアージ」(以下「本サービス」)は、ユーザーのプライバシーを尊重し、個人情報の保護に関する法律(個人情報保護法)を遵守します。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">取得する情報</h2>
            <p>本サービスでは、以下の情報を取得する場合があります。</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                ユーザーがフォームに入力した症状情報や写真：これらの情報はユーザーのブラウザ内でのみ処理され、サーバーには送信・保存されません。
              </li>
              <li>
                アクセス解析サービス(Google Analytics 等)を利用する場合の、Cookieによる匿名のアクセス情報(ページビュー数、参照元、閲覧端末の種類等)。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">情報の利用目的</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>本サービスの提供・運営のため</li>
              <li>本サービスの利用状況の分析と改善のため</li>
              <li>不正利用の防止のため</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">Cookie(クッキー)について</h2>
            <p>
              本サービスでは、利便性向上やアクセス解析のためにCookieを使用する場合があります。ユーザーはブラウザの設定でCookieを無効にすることができますが、その場合一部の機能が利用できなくなることがあります。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第三者サービスの利用</h2>
            <p>本サービスは以下の第三者サービスを利用する場合があります。</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Google Analytics：</strong>アクセス解析のため、匿名のアクセスデータを収集します。詳細は
                <a
                  href="https://policies.google.com/privacy?hl=ja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-500 underline ml-1"
                >
                  Googleのプライバシーポリシー
                </a>
                をご確認ください。
              </li>
              <li>
                <strong>Vercel：</strong>本サービスのホスティングに利用しています。
              </li>
              <li>
                <strong>Amazonアソシエイト・プログラム：</strong>商品紹介リンクを通じて遷移先サイトでCookie等が設定される場合があります。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">個人情報の第三者提供</h2>
            <p>
              法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">免責事項</h2>
            <p>
              当サイトからリンクされた外部サイトのプライバシー保護については、当方は責任を負いません。各外部サイトのプライバシーポリシーをご確認ください。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">プライバシーポリシーの変更</h2>
            <p>
              本ポリシーは、必要に応じて予告なく変更されることがあります。変更後の内容は本ページに掲示した時点から効力を生じます。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">お問い合わせ</h2>
            <p>
              個人情報の取り扱いに関するお問い合わせは、サイト運営者までご連絡ください(連絡先は本番運用前に追記してください)。
            </p>
          </section>
        </div>

        <Link href="/" className="inline-block mt-8 text-sm text-rose-500 underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
