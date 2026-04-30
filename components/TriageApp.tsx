"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Camera,
  Thermometer,
  Wind,
  Droplets,
  CircleDot,
  Activity,
  AlertCircle,
  Phone,
  MapPin,
  ShoppingBag,
  Sparkles,
  Moon,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Info,
  Shield,
  X,
} from "lucide-react";

type SymptomId =
  | "fever"
  | "cough"
  | "vomit"
  | "rash"
  | "diarrhea"
  | "breathing"
  | "convulsion"
  | "lethargy";

type ResultLevel = "emergency" | "urgent" | "observation";

export default function TriageApp() {
  const [agreed, setAgreed] = useState(false);
  const [symptomText, setSymptomText] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomId[]>([]);
  const [painLevel, setPainLevel] = useState(3);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [result, setResult] = useState<ResultLevel | null>(null);
  const [geoState, setGeoState] = useState<"idle" | "loading" | "done" | "denied" | "error">("idle");
  const [postalCode, setPostalCode] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const symptoms: {
    id: SymptomId;
    label: string;
    icon: typeof Thermometer;
    color: string;
  }[] = [
    { id: "fever", label: "発熱", icon: Thermometer, color: "from-rose-200 to-pink-200" },
    { id: "cough", label: "咳", icon: Wind, color: "from-sky-200 to-blue-200" },
    { id: "vomit", label: "嘔吐", icon: Droplets, color: "from-emerald-200 to-teal-200" },
    { id: "rash", label: "発疹", icon: CircleDot, color: "from-amber-200 to-orange-200" },
    { id: "diarrhea", label: "下痢", icon: Activity, color: "from-violet-200 to-purple-200" },
    { id: "breathing", label: "呼吸が苦しい", icon: AlertCircle, color: "from-red-200 to-rose-300" },
    { id: "convulsion", label: "けいれん", icon: Sparkles, color: "from-fuchsia-200 to-pink-300" },
    { id: "lethargy", label: "ぐったり", icon: Moon, color: "from-indigo-200 to-violet-200" },
  ];

  const toggleSymptom = (id: SymptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const evaluate = () => {
    const emergencySymptoms: SymptomId[] = ["breathing", "convulsion", "lethargy"];
    const hasEmergency = selectedSymptoms.some((s) => emergencySymptoms.includes(s));

    let level: ResultLevel;
    if (hasEmergency || painLevel === 5) {
      level = "emergency";
    } else if (painLevel >= 4 || selectedSymptoms.length >= 3) {
      level = "urgent";
    } else {
      level = "observation";
    }

    setResult(level);
    setGeoState("idle");
    setTimeout(() => {
      document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const reset = () => {
    setResult(null);
    setGeoState("idle");
    setPostalCode("");
    setSymptomText("");
    setSelectedSymptoms([]);
    setPainLevel(3);
    setPhotoUploaded(false);
  };

  // 位置情報取得 → Google Maps「小児科」検索へ遷移
  const openNearbyHospitals = () => {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoState("done");
        const { latitude, longitude } = pos.coords;
        const url = `https://www.google.com/maps/search/小児科/@${latitude},${longitude},14z`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoState("denied");
        } else {
          setGeoState("error");
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  // 郵便番号フォールバック → Google Maps へ遷移
  const openByPostalCode = () => {
    const cleaned = postalCode.replace(/[^0-9]/g, "");
    if (cleaned.length !== 7) return;
    const url = `https://www.google.com/maps/search/小児科+〒${cleaned}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const resultConfig = {
    emergency: {
      title: "すぐに救急対応の検討を",
      subtitle: "医療機関への速やかな相談をおすすめします",
      action: "119(消防・救急)に電話",
      actionIcon: Phone,
      bgGradient: "from-rose-100 via-red-50 to-orange-100",
      accentColor: "bg-rose-400",
      textColor: "text-rose-900",
      borderColor: "border-rose-300",
      emoji: "🚨",
      description:
        "選択された症状の組み合わせは、速やかな医療機関での確認が望ましい目安に該当します。判断に迷う場合は #7119(救急安心センター) や #8000(小児救急電話相談) にご相談ください。最終的な判断は必ず医療従事者が行います。",
    },
    urgent: {
      title: "夜間・休日の医療相談を検討",
      subtitle: "早めに専門家へ相談する目安です",
      action: "#8000(小児救急電話相談)",
      actionIcon: Phone,
      bgGradient: "from-amber-100 via-yellow-50 to-orange-100",
      accentColor: "bg-amber-400",
      textColor: "text-amber-900",
      borderColor: "border-amber-300",
      emoji: "🌙",
      description:
        "症状の経過によっては早めの相談が望まれる目安に該当します。夜間・休日であれば #8000(小児救急電話相談) または #7119(救急安心センター) で看護師や医師に相談できます。受診の要否は専門家にご確認ください。",
    },
    observation: {
      title: "ご家庭で様子を見る目安",
      subtitle: "翌日以降にかかりつけ医への相談を検討",
      action: "症状を記録する",
      actionIcon: CheckCircle2,
      bgGradient: "from-emerald-100 via-teal-50 to-cyan-100",
      accentColor: "bg-emerald-400",
      textColor: "text-emerald-900",
      borderColor: "border-emerald-300",
      emoji: "🌿",
      description:
        "今回の入力内容は、ご家庭で様子を見ながら翌日以降にかかりつけ医へ相談することを検討する目安に該当します。症状が変化したり悪化したりした場合は、改めて相談先(#8000 など)の利用をご検討ください。",
    },
  };

  const recommendations = useMemo(() => {
    const items: { name: string; category: string; emoji: string; bg: string }[] = [];
    if (
      selectedSymptoms.includes("fever") ||
      selectedSymptoms.includes("vomit") ||
      selectedSymptoms.includes("diarrhea")
    ) {
      items.push({
        name: "電解質飲料(家庭備蓄向け・500ml)",
        category: "飲料",
        emoji: "💧",
        bg: "from-sky-100 to-blue-100",
      });
    }
    if (selectedSymptoms.includes("fever")) {
      items.push({
        name: "電子体温計(脇下用)",
        category: "一般医療機器・家庭用",
        emoji: "🌡️",
        bg: "from-rose-100 to-pink-100",
      });
    }
    if (selectedSymptoms.includes("cough")) {
      items.push({
        name: "家庭用加湿器",
        category: "家電",
        emoji: "💨",
        bg: "from-indigo-100 to-violet-100",
      });
    }
    if (selectedSymptoms.includes("rash")) {
      items.push({
        name: "ベビー用ローション(保湿用)",
        category: "化粧品",
        emoji: "🧴",
        bg: "from-amber-100 to-yellow-100",
      });
    }
    if (items.length === 0) {
      items.push({
        name: "家庭の医学・育児書",
        category: "書籍",
        emoji: "📖",
        bg: "from-emerald-100 to-teal-100",
      });
    }
    return items.slice(0, 3);
  }, [selectedSymptoms]);

  const canEvaluate = selectedSymptoms.length > 0 || symptomText.trim().length > 0;

  if (!agreed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50 flex items-center justify-center p-5">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl p-7 shadow-lg border border-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200 rounded-3xl shadow mb-4">
            <Heart className="w-8 h-8 text-rose-500" strokeWidth={2.5} fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">こどもトリアージ</h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            このアプリは、お子さまの症状から
            <strong className="text-slate-800">「いつ・どこに相談するか」の一般的な目安</strong>
            をお示しするための情報提供サービスです。
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
            <div className="flex items-start gap-2 mb-2">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-amber-900">ご利用前にお読みください</p>
            </div>
            <ul className="text-xs text-amber-900 space-y-2 leading-relaxed">
              <li>
                ・本アプリは<strong>医療機器ではありません</strong>
                。診断・治療を行うものではなく、医師の判断に代わるものでもありません。
              </li>
              <li>
                ・表示される結果は、日本小児科学会『こどもの救急(ONLINE-QQ)』等の公開情報を参考にした
                <strong>一般的な行動の目安</strong>です。個別の病名や罹患の可能性を示すものではありません。
              </li>
              <li>
                ・症状や状況に少しでも不安がある場合は、
                <strong>#8000(小児救急電話相談)</strong>または医療機関に直接ご相談ください。
              </li>
              <li>
                ・緊急時はためらわず<strong>119</strong>に通報してください。
              </li>
            </ul>
          </div>

          <div className="text-xs text-slate-500 mb-4 leading-relaxed">
            続行することで、
            <Link href="/terms" className="text-rose-500 underline">利用規約</Link>
            および
            <Link href="/privacy" className="text-rose-500 underline">プライバシーポリシー</Link>
            に同意したものとみなします。
          </div>

          <button
            onClick={() => setAgreed(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold shadow-md hover:shadow-lg transition-shadow"
          >
            同意して利用を開始
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative bg-rose-50/90 border-b border-rose-100 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-5 py-2 flex items-center justify-center gap-2 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4" />
          <span>緊急時はためらわず <strong>119</strong>。判断に迷うときは <strong>#8000</strong></span>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto px-5 py-8 pb-20">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200 rounded-3xl shadow-lg mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Heart className="w-10 h-10 text-rose-500" strokeWidth={2.5} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">こどもトリアージ</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            ひとりで悩まないで。<br />
            お子さまの症状から、相談タイミングの目安をお伝えします。
          </p>
          <button
            onClick={() => setShowDisclaimer(true)}
            className="inline-flex items-center gap-1 mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors underline"
          >
            <Info className="w-3 h-3" />
            このアプリについて
          </button>
        </header>

        {!result ? (
          <>
            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-5 shadow-sm border border-white">
              <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
                <span className="w-7 h-7 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-sm font-bold">1</span>
                様子を入力(任意)
              </label>
              <textarea
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                placeholder="例：朝から熱っぽく、いつもより元気がありません..."
                className="w-full p-4 bg-rose-50/50 border-2 border-rose-100 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-rose-300 focus:bg-white transition-all resize-none"
                rows={3}
              />

              <button
                onClick={() => setPhotoUploaded(!photoUploaded)}
                className={`mt-3 w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed rounded-2xl transition-all ${
                  photoUploaded
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50/30 text-slate-500 hover:bg-rose-50"
                }`}
              >
                {photoUploaded ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">写真がアップロードされました</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-medium">様子の写真を追加(任意)</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                ※ 写真や入力内容から自動診断は行いません。受診時の参考メモとしてご利用ください。
              </p>
            </section>

            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-5 shadow-sm border border-white">
              <label className="flex items-center gap-2 text-slate-700 font-semibold mb-4">
                <span className="w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm font-bold">2</span>
                当てはまる様子を選択
              </label>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((s) => {
                  const Icon = s.icon;
                  const selected = selectedSymptoms.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleSymptom(s.id)}
                      className={`relative flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
                        selected
                          ? `bg-gradient-to-br ${s.color} shadow-md scale-[1.02] ring-2 ring-white`
                          : "bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected ? "bg-white/60" : "bg-white"}`}>
                        <Icon className={`w-5 h-5 ${selected ? "text-slate-700" : "text-slate-400"}`} />
                      </div>
                      <span className={`text-sm font-medium ${selected ? "text-slate-800" : "text-slate-600"}`}>
                        {s.label}
                      </span>
                      {selected && (
                        <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-slate-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-sm border border-white">
              <label className="flex items-center gap-2 text-slate-700 font-semibold mb-4">
                <span className="w-7 h-7 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 text-sm font-bold">3</span>
                つらそうな様子の度合い
              </label>

              <div className="flex justify-between items-end mb-3 px-1">
                {[1, 2, 3, 4, 5].map((lv) => {
                  const emojis = ["😊", "🙂", "😟", "😣", "😭"];
                  return (
                    <button
                      key={lv}
                      onClick={() => setPainLevel(lv)}
                      className={`flex flex-col items-center transition-all ${
                        painLevel === lv ? "scale-125" : "scale-100 opacity-40"
                      }`}
                    >
                      <span className="text-3xl mb-1">{emojis[lv - 1]}</span>
                      <span className={`text-xs font-bold ${painLevel === lv ? "text-slate-700" : "text-slate-400"}`}>
                        {lv}
                      </span>
                    </button>
                  );
                })}
              </div>

              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a7f3d0 0%, #fde68a 50%, #fda4af 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 px-1 text-xs text-slate-400">
                <span>いつも通り</span>
                <span>かなりつらそう</span>
              </div>
            </section>

            <button
              onClick={evaluate}
              disabled={!canEvaluate}
              className={`w-full py-5 rounded-3xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                canEvaluate
                  ? "bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Stethoscope className="w-6 h-6" />
              相談タイミングの目安を見る
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
              ※ 結果は一般的な目安であり、医学的な診断ではありません。<br />
              不安なときは #8000 または医療機関へお問い合わせください。
            </p>
          </>
        ) : (
          <div id="result-section" className="space-y-5">
            {(() => {
              const config = resultConfig[result];
              const ActionIcon = config.actionIcon;
              return (
                <>
                  <section className={`bg-gradient-to-br ${config.bgGradient} rounded-3xl p-7 shadow-lg border-2 ${config.borderColor}`}>
                    <div className="text-center">
                      <div className="text-5xl mb-3">{config.emoji}</div>
                      <p className={`text-sm font-semibold ${config.textColor} opacity-70 mb-1`}>
                        {config.subtitle}
                      </p>
                      <h2 className={`text-2xl font-bold ${config.textColor} mb-4`}>{config.title}</h2>
                      <p className={`text-sm ${config.textColor} opacity-80 leading-relaxed mb-6 text-left`}>
                        {config.description}
                      </p>

                      <button className={`w-full py-4 rounded-2xl font-bold text-white ${config.accentColor} shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}>
                        <ActionIcon className="w-5 h-5" />
                        {config.action}
                      </button>
                    </div>

                    <div className="mt-5 pt-5 border-t border-white/50">
                      <p className={`text-xs font-semibold ${config.textColor} opacity-60 mb-2`}>入力された情報</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map((id) => {
                          const s = symptoms.find((x) => x.id === id);
                          return (
                            <span key={id} className="px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-slate-700">
                              {s?.label}
                            </span>
                          );
                        })}
                        <span className="px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-slate-700">
                          つらそうさ {painLevel}/5
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/50">
                      <p className={`text-[11px] ${config.textColor} opacity-70 leading-relaxed`}>
                        <Info className="w-3 h-3 inline mr-1" />
                        この結果は『こどもの救急』等を参考にした一般的な目安であり、診断ではありません。実際の判断は医師・看護師にご相談ください。
                      </p>
                    </div>
                  </section>

                  {/* 病院検索 — 位置情報対応 */}
                  <div className="bg-white rounded-3xl shadow-sm border-2 border-sky-100 overflow-hidden">
                    {/* メインボタン */}
                    <button
                      onClick={openNearbyHospitals}
                      disabled={geoState === "loading"}
                      className="w-full p-5 flex items-center justify-between group hover:bg-sky-50 transition-colors disabled:opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-200 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-sky-700" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-800">現在地から近くの小児科を探す</p>
                          <p className="text-xs text-slate-500">
                            {geoState === "idle" && "位置情報を使ってGoogle マップで検索"}
                            {geoState === "loading" && "位置情報を取得中..."}
                            {geoState === "done" && "Google マップで開きました"}
                            {geoState === "denied" && "位置情報が許可されていません"}
                            {geoState === "error" && "位置情報を取得できませんでした"}
                          </p>
                        </div>
                      </div>
                      {geoState === "loading" ? (
                        <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>

                    {/* 位置情報が拒否・エラーのときのフォールバック */}
                    {(geoState === "denied" || geoState === "error") && (
                      <div className="border-t border-sky-100 p-5 animate-fadeIn space-y-3">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {geoState === "denied"
                            ? "ブラウザの設定でこのサイトへの位置情報アクセスが拒否されています。設定を変更するか、郵便番号で検索できます。"
                            : "位置情報の取得に失敗しました。郵便番号で検索することもできます。"}
                        </p>
                        {/* 郵便番号フォールバック */}
                        <div className="flex gap-2">
                          <input
                            type="tel"
                            inputMode="numeric"
                            placeholder="郵便番号(例: 1600022)"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 7))}
                            className="flex-1 p-3 bg-sky-50 border-2 border-sky-100 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-300 transition-colors"
                          />
                          <button
                            onClick={openByPostalCode}
                            disabled={postalCode.replace(/[^0-9]/g, "").length !== 7}
                            className="px-4 py-3 bg-sky-400 text-white text-sm font-bold rounded-xl disabled:opacity-40 hover:bg-sky-500 transition-colors"
                          >
                            検索
                          </button>
                        </div>
                        {/* 位置情報許可の再促進 */}
                        {geoState === "denied" && (
                          <button
                            onClick={() => { setGeoState("idle"); openNearbyHospitals(); }}
                            className="w-full py-2 text-xs text-sky-600 underline hover:text-sky-800"
                          >
                            位置情報の許可をやり直す
                          </button>
                        )}
                      </div>
                    )}

                    {/* 補足リンク（常時表示） */}
                    <div className="border-t border-sky-50 px-5 py-3 flex flex-wrap gap-x-4 gap-y-1">
                      <a
                        href="tel:#8000"
                        className="flex items-center gap-1 text-xs text-amber-700 font-medium hover:underline"
                      >
                        <Phone className="w-3 h-3" />
                        #8000(小児救急電話相談)
                      </a>
                      <a
                        href="https://www.iryou.teikyouseido.mhlw.go.jp/znk-web/juminkanja/S2300/initialize"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:underline"
                      >
                        厚労省 医療機関検索 ↗
                      </a>
                    </div>
                  </div>

                  <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="w-5 h-5 text-amber-600" />
                      <h3 className="font-bold text-slate-800">家庭で備えておくと安心な商品</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] text-white bg-slate-700 px-2 py-0.5 rounded font-bold">広告</span>
                      <span className="text-[10px] text-slate-500">Amazonアソシエイト</span>
                    </div>

                    <div className="space-y-3">
                      {recommendations.map((item, i) => (
                        <div key={i} className={`bg-gradient-to-r ${item.bg} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform cursor-pointer`}>
                          <div className="w-14 h-14 bg-white/80 rounded-xl flex items-center justify-center text-3xl shadow-sm">
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{item.category}</p>
                          </div>
                          <button className="bg-white text-slate-700 text-xs font-bold px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow whitespace-nowrap">
                            Amazonで見る
                          </button>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                      ※ 上記は症状を治療・軽減する目的の商品ではありません。家庭での備蓄品の一例として一般的な商品カテゴリをご紹介しています。<br />
                      ※ 当サイトはAmazonアソシエイト・プログラムの参加者として、適格販売により収入を得ています。
                    </p>
                  </section>

                  <button
                    onClick={reset}
                    className="w-full py-4 bg-white rounded-2xl font-semibold text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    もう一度入力する
                  </button>
                </>
              );
            })()}
          </div>
        )}

        <footer className="mt-10 pt-6 border-t border-slate-200/50 text-center space-y-3">
          <div className="flex justify-center gap-4 text-xs text-slate-500">
            <Link href="/about" className="hover:text-slate-700 underline">このサイトについて</Link>
            <Link href="/terms" className="hover:text-slate-700 underline">利用規約</Link>
            <Link href="/privacy" className="hover:text-slate-700 underline">プライバシーポリシー</Link>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            本アプリは医療機器ではなく、医学的診断や治療の代替となるものではありません。<br />
            参考：日本小児科学会『こどもの救急(ONLINE-QQ)』／厚生労働省 医療機能情報提供制度
          </p>
        </footer>
      </div>

      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-500" />
                このアプリについて
              </h3>
              <button onClick={() => setShowDisclaimer(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-800">サービスの位置づけ</strong><br />
                本アプリはお子さまの体調が気になる保護者向けの<strong>情報提供サービス</strong>です。医療機器プログラムではなく、診断・治療を行うものではありません。
              </p>
              <p>
                <strong className="text-slate-800">表示される結果について</strong><br />
                日本小児科学会『こどもの救急(ONLINE-QQ)』等の一般に公開されている情報を参考にした、<strong>受診タイミングの一般的な目安</strong>を表示します。具体的な病名・罹患の可能性・将来の罹患リスクなどは表示しません。
              </p>
              <p>
                <strong className="text-slate-800">関連商品の表示について</strong><br />
                結果画面に表示されるAmazonアソシエイトの商品は、症状の治療・予防を目的としたものではなく、家庭での備蓄品の一例です。効果効能の提示は行っていません。
              </p>
              <p>
                <strong className="text-slate-800">緊急時のお願い</strong><br />
                少しでも危険を感じた場合は、本アプリの結果に関わらず<strong className="text-rose-600">119番通報</strong>または<strong className="text-rose-600">#8000(小児救急電話相談)</strong>をご利用ください。
              </p>
            </div>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="mt-5 w-full py-3 bg-slate-100 rounded-xl font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
