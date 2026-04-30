import Link from "next/link";
import type { Metadata } from "next";
import { Heart, AlertCircle, Phone, Shield, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "このサイトについて | こどもトリアージ",
  description:
    "こどもトリアージのコンセプトと運営方針、医療機器プログラム該当性に関する考え方について説明します。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/" className="text-sm text-rose-500 underline">
          ← ホームに戻る
        </Link>

        <header className="text-center mt-6 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200 rounded-3xl shadow mb-4">
            <Heart className="w-8 h-8 text-rose-500" strokeWidth={2.5} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">このサイトについて</h1>
          <p className="text-sm text-slate-500">こどもトリアージの考え方</p>
        </header>

        <div className="space-y-5">
          <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white">
            <h2 className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-3">
              <BookOpen className="w-5 h-5 text-rose-500" />
              なぜつくったのか
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              夜中に子どもが熱を出した、いつもより様子がおかしい——保護者が一番不安になる瞬間に、「いま救急車を呼ぶべきか、朝まで様子を見ていいのか」を判断するのは難しいものです。本サービスは、そんなときに
              <strong className="text-slate-800">最初の一歩としての行動の目安</strong>
              をやさしく提示することを目指しています。
            </p>
          </section>

          <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white">
            <h2 className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-3">
              <Shield className="w-5 h-5 text-emerald-500" />
              本サービスの位置づけ
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed space-y-3">
              <p>
                本サービスは
                <strong className="text-slate-800">医療機器プログラムではありません</strong>
                。厚生労働省「プログラムの医療機器該当性に関するガイドライン」を踏まえ、本サービスは個別具体的な疾病名・罹患の可能性・将来の罹患リスクを示すことを目的とせず、一般論としての受診タイミングの目安を提示するに留めています。
              </p>
              <p>
                判定は日本小児科学会『こどもの救急(ONLINE-QQ)』等の公開情報を参考にしていますが、最終的な医学的判断は必ず医師・看護師等の医療従事者がおこないます。
              </p>
            </div>
          </section>

          <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white">
            <h2 className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-3">
              <Phone className="w-5 h-5 text-sky-500" />
              いざというときの連絡先
            </h2>
            <div className="space-y-2">
              <div className="bg-rose-50 rounded-xl p-4">
                <p className="font-bold text-slate-800">119(消防・救急)</p>
                <p className="text-xs text-slate-600 mt-1">緊急時はためらわず通報してください</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="font-bold text-slate-800">#7119(救急安心センター)</p>
                <p className="text-xs text-slate-600 mt-1">救急車を呼ぶか迷ったとき(対応地域あり)</p>
              </div>
              <div className="bg-sky-50 rounded-xl p-4">
                <p className="font-bold text-slate-800">#8000(小児救急電話相談)</p>
                <p className="text-xs text-slate-600 mt-1">看護師・医師が子どもの症状について電話相談に対応</p>
              </div>
            </div>
          </section>

          <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white">
            <h2 className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-3">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              参考情報
            </h2>
            <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
              <li>
                ・
                <a
                  href="https://kodomo-qq.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-500 underline"
                >
                  日本小児科学会『こどもの救急(ONLINE-QQ)』
                </a>
              </li>
              <li>
                ・
                <a
                  href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000179749_00004.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-500 underline"
                >
                  厚生労働省「医療機器プログラムについて」
                </a>
              </li>
              <li>
                ・
                <a
                  href="https://www.iryou.teikyouseido.mhlw.go.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-500 underline"
                >
                  厚生労働省 医療機能情報提供制度
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="flex justify-center gap-4 mt-8 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-700 underline">ホーム</Link>
          <Link href="/terms" className="hover:text-slate-700 underline">利用規約</Link>
          <Link href="/privacy" className="hover:text-slate-700 underline">プライバシーポリシー</Link>
        </div>
      </div>
    </div>
  );
}
