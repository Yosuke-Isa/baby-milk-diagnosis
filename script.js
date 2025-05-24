document.addEventListener('DOMContentLoaded', function () {
  const basicAnswers = {};
  const answers = [];
  let current = 0;

  const questions = [
    { q: "今、一番気になることは？", options: ["便秘ぎみ", "ゆるい", "吐き戻し", "特になし"] },
    { q: "最近の便の硬さは？", options: ["硬い", "普通", "ゆるい"] },
    { q: "吐き戻しの頻度は？", options: ["なし", "たまに", "よくある"] },
    { q: "1 缶あたりのご予算は？", options: ["〜2,000円", "〜3,000円", "こだわらない"] },
    { q: "母乳に近い味・成分を重視しますか？", options: ["とても重視", "やや重視", "気にしない"] },
    { q: "液体ミルクの取り扱いがあることを重視しますか？", options: ["とても重視", "やや重視", "気にしない"] },
    { q: "甘さの好みは？", options: ["甘め", "さっぱり", "わからない"] },
    { q: "産院での使用実績を重視しますか？", options: ["とても重視", "やや重視", "気にしない"] }
  ];

  const imageList = [
    "./images/ChatGPT Image Q1_2.png",
    "./images/ChatGPT Image Q2_2.png",
    "./images/ChatGPT Image Q3_2.png",
    "./images/ChatGPT Image Q4_2.png",
    "./images/ChatGPT Image Q5_2.png",
    "./images/ChatGPT Image Q6_2.png",
    "./images/ChatGPT Image Q7_2.png",
    "./images/ChatGPT Image Q8_2.png"
  ];

  const milkList = [
    { id: 'hohoemi', name: '明治 ほほえみ', score: 0, feature: '母乳にとても近い味。キューブタイプだから夜中でもポンと入れてサッと作れる。' },
    { id: 'hagukumi', name: '森永 はぐくみ', score: 0, feature: 'さっぱりめの味。粉が細かくて溶けやすい。' },
    { id: 'eakachan', name: '森永 E赤ちゃん', score: 0, feature: 'たんぱく質をこまかくしているので、肌やお腹にやさしい設計。' },
    { id: 'pure', name: '雪印 ぴゅあ', score: 0, feature: 'やや甘めで飲みやすいのにお値段はお手ごろ。' },
    { id: 'sukoyaka', name: '雪印 すこやかM1', score: 0, feature: 'オリゴ糖入りでお腹の調子を助けてくれる。' },
    { id: 'icareo', name: 'グリコ アイクレオ', score: 0, feature: '塩分が少なく、母乳にかなり近いまろやかな味。' },
    { id: 'haihai', name: '和光堂 はいはい', score: 0, feature: '必要な栄養はしっかり、だけどお財布にやさしい価格。' }
  ];

  const linkMap = {
    "eakachan-hagukumi-haihai": "https://akachanmilk.base.shop/items/108328727",
    "eakachan-hagukumi-hohoemi": "https://akachanmilk.base.shop/items/108328771",
    "eakachan-hagukumi-icareo": "https://akachanmilk.base.shop/items/108328937",
    "eakachan-hagukumi-pure": "https://akachanmilk.base.shop/items/108328964",
    "eakachan-hagukumi-sukoyaka": "https://akachanmilk.base.shop/items/108329000",
    "eakachan-haihai-hohoemi": "https://akachanmilk.base.shop/items/108329048",
    "eakachan-haihai-icareo": "https://akachanmilk.base.shop/items/108329070",
    "eakachan-haihai-pure": "https://akachanmilk.base.shop/items/108329092",
    "eakachan-haihai-sukoyaka": "https://akachanmilk.base.shop/items/108329115",
    "eakachan-hohoemi-icareo": "https://akachanmilk.base.shop/items/108329153",
    "eakachan-hohoemi-pure": "https://akachanmilk.base.shop/items/108329194",
    "eakachan-hohoemi-sukoyaka": "https://akachanmilk.base.shop/items/108329238",
    "eakachan-icareo-pure": "https://akachanmilk.base.shop/items/108329277",
    "eakachan-icareo-sukoyaka": "https://akachanmilk.base.shop/items/108329306",
    "eakachan-pure-sukoyaka": "https://akachanmilk.base.shop/items/108329337",
    "hagukumi-haihai-hohoemi": "https://akachanmilk.base.shop/items/108329601",
    "hagukumi-haihai-icareo": "https://akachanmilk.base.shop/items/108329645",
    "hagukumi-haihai-pure": "https://akachanmilk.base.shop/items/108329668",
    "hagukumi-haihai-sukoyaka": "https://akachanmilk.base.shop/items/108329687",
    "hagukumi-hohoemi-icareo": "https://akachanmilk.base.shop/items/108329736",
    "hagukumi-hohoemi-pure": "https://akachanmilk.base.shop/items/108329760",
    "hagukumi-hohoemi-sukoyaka": "https://akachanmilk.base.shop/items/108329776",
    "hagukumi-icareo-pure": "https://akachanmilk.base.shop/items/108329813",
    "hagukumi-icareo-sukoyaka": "https://akachanmilk.base.shop/items/108329833",
    "hagukumi-pure-sukoyaka": "https://akachanmilk.base.shop/items/108329849",
    "haihai-hohoemi-icareo": "https://akachanmilk.base.shop/items/108329886",
    "haihai-hohoemi-pure": "https://akachanmilk.base.shop/items/108329902",
    "haihai-hohoemi-sukoyaka": "https://akachanmilk.base.shop/items/108329918",
    "haihai-icareo-pure": "https://akachanmilk.base.shop/items/108329949",
    "haihai-icareo-sukoyaka": "https://akachanmilk.base.shop/items/108329966",
    "haihai-pure-sukoyaka": "https://akachanmilk.base.shop/items/108329983",
    "hohoemi-icareo-pure": "https://akachanmilk.base.shop/items/108330008",
    "hohoemi-icareo-sukoyaka": "https://akachanmilk.base.shop/items/108330023",
    "hohoemi-pure-sukoyaka": "https://akachanmilk.base.shop/items/108330037",
    "icareo-pure-sukoyaka": "https://akachanmilk.base.shop/items/108330055"
  };

  document.getElementById('start-button').addEventListener('click', () => {
    showScreen('basic-info-screen');
  });

  document.getElementById('basic-info-form').addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData(e.target);
    basicAnswers.situation = Number(form.get('situation'));
    basicAnswers.age = Number(form.get('age'));
    basicAnswers.style = Number(form.get('style'));
    current = 0;
    answers.length = 0;
    showScreen('question-screen');
    showQuestion();

    document.getElementById('back-button').addEventListener('click', () => {
      if (current > 0) {
        answers.pop();
        current--;
        showQuestion();
      }
    });
  });

  function showQuestion() {
    const q = questions[current];
    document.getElementById('question-text').innerText = `Q${current + 1}. ${q.q}`;
    document.getElementById('question-image').src = imageList[current];
    document.getElementById('options').innerHTML = q.options.map((opt, i) =>
      `<button class="option-button" onclick="selectOption(${i})">${opt}</button>`
    ).join('');
    const backBtn = document.getElementById('back-button');
    if (backBtn) backBtn.style.display = current > 0 ? 'block' : 'none';
  }

  window.selectOption = function (index) {
    answers.push(index);
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showScreen('loading-screen');
      setTimeout(() => {
        calculateResult();
      }, 2000);
    }
  }

  function addScore(id, value) {
    const target = milkList.find(m => m.id === id);
    if (target) target.score += value;
  }

  function calculateResult() {
    milkList.forEach(m => m.score = 0);
    const [mainConcern, stool, reflux, budget, breast, liquid, taste, hospital] = answers;

    if (mainConcern === 0) { addScore('icareo',1); addScore('hohoemi',1); addScore('sukoyaka',2); }
    if (mainConcern === 1) { addScore('hagukumi',1); addScore('eakachan',1); addScore('icareo',1); }
    if (mainConcern === 2) { addScore('hagukumi',1); addScore('eakachan',2); }

    if (stool === 0) addScore('sukoyaka', 2);
    if (stool === 2) { addScore('hagukumi',1); addScore('eakachan',1); addScore('icareo',1); }

    if (reflux === 2) { addScore('hagukumi',1); addScore('eakachan',1); }

    if (budget === 0) {
      addScore('pure',1); addScore('haihai',1);
      addScore('hohoemi',-1); addScore('eakachan',-1); addScore('icareo',-1);
    } else if (budget === 1) {
      addScore('hagukumi',1); addScore('sukoyaka',1);
    } else {
      ['hohoemi','hagukumi','eakachan','sukoyaka','icareo'].forEach(id => addScore(id,1));
    }

    const factor = [1.5, 0.5, 0][breast];
    const map = {hohoemi:3, icareo:3, hagukumi:2, sukoyaka:2, pure:2, eakachan:2, haihai:1};
    Object.entries(map).forEach(([id, val]) => addScore(id, val * factor));

    if (liquid === 0) {
      addScore('hohoemi', 2); addScore('icareo', 2); addScore('hagukumi', 1);
    } else if (liquid === 1) {
      addScore('hohoemi', 1); addScore('icareo', 1);
    }

    if (taste === 0) ['hohoemi','eakachan','pure','haihai'].forEach(id => addScore(id,1));
    if (taste === 1) ['hagukumi','sukoyaka','icareo'].forEach(id => addScore(id,1));

    if (hospital === 0) {
      addScore('hohoemi', 2); addScore('eakachan', 2); addScore('sukoyaka', 2); addScore('hagukumi', 1);
    } else if (hospital === 1) {
      addScore('hohoemi', 1); addScore('eakachan', 1); addScore('sukoyaka', 1); addScore('hagukumi', 1);
    }

    milkList.forEach(m => m.score += Math.random() * 0.009);

    const top3 = [...milkList].sort((a,b) => b.score - a.score).slice(0,3);
    const comboKey = [top3[0].id, top3[1].id, top3[2].id].sort().join("-");
    const purchaseUrl = linkMap[comboKey] || "https://akachanmilk.base.shop/";

    const resultHTML = `
      <div class="result-item top-ranking">
        <div class="rank-label">おすすめNo.1</div>
        <h2>${top3[0].name}</h2>
        <p><strong>理由：</strong>${top3[0].feature}</p>
      </div>
      <div class="result-item">
        <div class="rank-label">No.2</div>
        <h3>${top3[1].name}</h3>
        <p>${top3[1].feature}</p>
      </div>
      <div class="result-item">
        <div class="rank-label">No.3</div>
        <h3>${top3[2].name}</h3>
        <p>${top3[2].feature}</p>
      </div>
      <div class="result-action-fixed">
        <a href="${purchaseUrl}" class="buy-main-button">お試しセットを購入する</a>
      </div>`;

    document.getElementById('result-list').innerHTML = resultHTML;
    showScreen('result-screen');
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
});
