import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | こどもトリアージ",
  description: "こどもトリアージの利用規約です。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/" className="text-sm text-rose-500 underline">
          ← ホームに戻る
        </Link>

        <h1 className="text-3xl font-bold text-slate-800 mt-6 mb-2">利用規約</h1>
        <p className="text-xs text-slate-500 mb-8">最終更新日：2026年4月30日</p>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 shadow-sm border border-white space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第1条(適用)</h2>
            <p>
              本規約は、当サイト「こどもトリアージ」(以下「本サービス」)の利用条件を定めるものです。利用者(以下「ユーザー」)は本規約に同意のうえで本サービスを利用するものとします。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第2条(本サービスの位置づけ)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスは、お子さまの症状から医療機関への相談タイミングの一般的な目安をお示しする情報提供サービスです。
              </li>
              <li>
                本サービスは医薬品医療機器等法に定める医療機器(プログラム医療機器)ではありません。診断・治療を目的とするものではなく、医師・看護師等の医療従事者の判断に代わるものでもありません。
              </li>
              <li>
                本サービスが提示する結果は、日本小児科学会『こどもの救急(ONLINE-QQ)』等の公開情報を参考とした一般的な行動の目安であり、個別具体的な疾病名・罹患の可能性・将来の罹患リスクを示すものではありません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第3条(緊急時の対応)</h2>
            <p>
              ユーザーは、お子さまに少しでも異変を感じた場合、本サービスの結果に関わらず、ためらわず119番通報、#7119(救急安心センター)、#8000(小児救急電話相談)、または直接の医療機関受診により対応するものとします。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第4条(免責)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスの利用により生じた一切の損害について、運営者は責任を負わないものとします。
              </li>
              <li>
                本サービスに掲載される情報の正確性・完全性・有用性等について、運営者はいかなる保証も行いません。
              </li>
              <li>
                本サービスからリンクする外部サイトの内容について、運営者は責任を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第5条(アフィリエイトリンクについて)</h2>
            <p>
              本サービスはAmazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できるAmazonアソシエイト・プログラムの参加者です。商品掲載部分には「広告」と明示しています。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第6条(禁止事項)</h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>本サービスの内容を、医療従事者の判断に代えて利用する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第7条(サービスの変更・終了)</h2>
            <p>
              運営者は、ユーザーへの事前通知なく、本サービスの内容を変更・追加・削除し、または本サービスを終了することができるものとします。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第8条(規約の変更)</h2>
            <p>
              運営者は、必要と判断した場合、ユーザーへの事前通知なく本規約を変更できるものとします。変更後の規約は本サイトに掲示した時点から効力を生じます。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 text-base mb-2">第9条(準拠法・管轄)</h2>
            <p>
              本規約の解釈にあたっては日本法を準拠法とし、本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 text-sm text-rose-500 underline"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
