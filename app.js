/* ==============================================
   STO Protocol — Referral Dashboard v2
   Pure vanilla JS, no framework
   ============================================== */

// ===== i18n System =====
const LANG = {
  en: {
    // Navbar & wallet
    connectWallet: 'Connect Wallet',
    walletModalTitle: 'Connect Wallet',
    metamaskDesc: 'Browser extension wallet',
    tpTrustDesc: 'Mobile wallet',
    // Hero
    heroTitle: 'Referral Management',
    heroSubtitle: 'View your referral network, bind a referrer, query any address',
    // Tabs
    tabMy: 'My Referrals',
    tabBind: 'Bind Referral',
    tabSearch: 'Search Address',
    // My Referrals - no wallet
    pleaseConnect: 'Please Connect Wallet',
    connectToView: 'Connect your wallet to view referral relationships',
    // My Referrals - stats
    bindStatus: 'Bind Status',
    directCount: 'Direct Referrals',
    statusBound: 'Bound',
    statusPending: 'Pending',
    statusUnbound: 'Unbound',
    // My Referrals - referrer card
    myReferrer: 'My Referrer',
    copyTooltip: 'Copy',
    // My Referrals - pending invite
    receivedInvite: 'Received Referral Invite',
    pendingHint: 'The following address sent you a referral invite. Confirm to complete binding:',
    confirmBindBtn: 'Confirm Bind (Send 0.01 STO)',
    // My Referrals - direct list
    directList: 'Direct Referral List',
    noDirectUsers: 'No direct referrals yet',
    scanningChain: 'Scanning on-chain data...',
    noChainRecords: 'No on-chain records (only recent data scanned)',
    loadFailed: 'Failed to load',
    tagValid: 'Active',
    tagNoDeposit: 'No Deposit',
    // Bind Referral
    bindTitle: 'Bind Referral Relationship',
    bindDesc: 'STO uses a two-way confirmation mechanism to establish referral relationships',
    step1Title: 'Referrer sends invite',
    step1Desc: 'A bound user sends 0.01 STO to the new user',
    step2Title: 'New user confirms binding',
    step2Desc: 'New user sends 0.01 STO back to the referrer to complete binding',
    targetAddrLabel: 'Target Wallet Address',
    inputPlaceholder: '0x...',
    inviteBtn: 'Send Invite (Send 0.01 STO)',
    confirmBtn2: 'Confirm Bind (Send back 0.01 STO)',
    // Search Address
    searchTitle: 'Search Referral Relationship',
    searchDesc: 'Enter any address to view its referral information',
    searchPlaceholder: 'Enter wallet address 0x...',
    searchBindStatus: 'Bind Status',
    searchDirectCount: 'Direct Referrals',
    searchReferrer: 'Referrer',
    searchPending: 'Pending Invite',
    referralChain: 'Referral Chain (Upline)',
    none: 'None',
    // Footer
    viewContract: 'View Contract',
    // Toast / error messages
    toastInstallMM: 'Please install MetaMask wallet',
    toastConnected: 'Wallet connected',
    toastUserCancel: 'User cancelled connection',
    toastConnFail: 'Connection failed: ',
    toastPleaseConnect: 'Please connect wallet first',
    toastInsufficient: 'Insufficient STO balance (need 0.01)',
    toastTxSent: 'Transaction sent, awaiting confirmation...',
    toastBindSuccess: 'Binding successful!',
    toastCopied: 'Copied',
    errInvalidAddr: 'Please enter a valid wallet address',
    errCannotInviteSelf: 'Cannot invite yourself',
    errNotBound: 'You have not bound a referrer yet, cannot send invites',
    errTargetBound: 'This address already has a referrer',
    errInsufficientSTO: 'Insufficient STO balance (need 0.01)',
    errInviteSent: 'Invite transaction sent, awaiting confirmation...',
    errInviteSuccess: 'Invite sent! Waiting for the other party to send back 0.01 STO to complete binding.',
    errNoInviteFrom: 'This address has not sent you an invite',
    errConfirmSent: 'Confirmation transaction sent...',
    errBindComplete: 'Binding successful! Referral relationship established.',
    errQueryFail: 'Query failed',
    errQueryFailMsg: 'Query failed: ',
    errNetworkInit: 'Network not initialized',
    errTxFailed: 'Transaction failed',
    errUserCancelTx: 'User cancelled the transaction',
    errInsufficientBNB: 'Insufficient BNB balance',
  },
  ko: {
    connectWallet: '지갑 연결',
    walletModalTitle: '지갑 연결',
    metamaskDesc: '브라우저 확장 지갑',
    tpTrustDesc: '모바일 지갑',
    heroTitle: '추천 관리',
    heroSubtitle: '추천 네트워크 조회, 추천인 바인딩, 주소 검색',
    tabMy: '내 추천',
    tabBind: '추천 바인딩',
    tabSearch: '주소 검색',
    pleaseConnect: '지갑을 연결해주세요',
    connectToView: '지갑 연결 후 추천 관계를 확인할 수 있습니다',
    bindStatus: '바인딩 상태',
    directCount: '직접 추천 수',
    statusBound: '바인딩됨',
    statusPending: '확인 대기',
    statusUnbound: '미바인딩',
    myReferrer: '내 추천인',
    copyTooltip: '복사',
    receivedInvite: '추천 초대 수신',
    pendingHint: '다음 주소가 추천 초대를 보냈습니다. 확인하여 바인딩을 완료하세요:',
    confirmBindBtn: '바인딩 확인 (0.01 STO 전송)',
    directList: '직접 추천 목록',
    noDirectUsers: '아직 직접 추천이 없습니다',
    scanningChain: '온체인 데이터 스캔 중...',
    noChainRecords: '온체인 기록 없음 (최근 데이터만 스캔)',
    loadFailed: '로드 실패',
    tagValid: '활성',
    tagNoDeposit: '미입금',
    bindTitle: '추천 관계 바인딩',
    bindDesc: 'STO는 양방향 확인 메커니즘으로 추천 관계를 설정합니다',
    step1Title: '추천인이 초대 전송',
    step1Desc: '바인딩된 사용자가 신규 사용자에게 0.01 STO를 전송',
    step2Title: '신규 사용자가 바인딩 확인',
    step2Desc: '신규 사용자가 추천인에게 0.01 STO를 전송하여 바인딩 완료',
    targetAddrLabel: '상대방 지갑 주소',
    inputPlaceholder: '0x...',
    inviteBtn: '초대 전송 (0.01 STO 전송)',
    confirmBtn2: '바인딩 확인 (0.01 STO 전송)',
    searchTitle: '추천 관계 검색',
    searchDesc: '아무 주소를 입력하여 추천 정보를 확인하세요',
    searchPlaceholder: '지갑 주소 입력 0x...',
    searchBindStatus: '바인딩 상태',
    searchDirectCount: '직접 추천 수',
    searchReferrer: '추천인',
    searchPending: '대기 중인 초대',
    referralChain: '추천 체인 (상위 라인)',
    none: '없음',
    viewContract: '컨트랙트 보기',
    toastInstallMM: 'MetaMask 지갑을 설치해주세요',
    toastConnected: '지갑 연결 완료',
    toastUserCancel: '사용자가 연결을 취소했습니다',
    toastConnFail: '연결 실패: ',
    toastPleaseConnect: '먼저 지갑을 연결해주세요',
    toastInsufficient: 'STO 잔액 부족 (0.01 필요)',
    toastTxSent: '트랜잭션 전송됨, 확인 대기 중...',
    toastBindSuccess: '바인딩 성공!',
    toastCopied: '복사됨',
    errInvalidAddr: '유효한 지갑 주소를 입력하세요',
    errCannotInviteSelf: '자신을 초대할 수 없습니다',
    errNotBound: '아직 추천인을 바인딩하지 않아 초대할 수 없습니다',
    errTargetBound: '이 주소는 이미 추천인이 바인딩되어 있습니다',
    errInsufficientSTO: 'STO 잔액 부족 (0.01 필요)',
    errInviteSent: '초대 트랜잭션 전송됨, 확인 대기 중...',
    errInviteSuccess: '초대 전송 완료! 상대방이 0.01 STO를 전송하여 바인딩을 완료하기를 기다리는 중.',
    errNoInviteFrom: '이 주소에서 보낸 초대가 없습니다',
    errConfirmSent: '확인 트랜잭션 전송 중...',
    errBindComplete: '바인딩 성공! 추천 관계가 설정되었습니다.',
    errQueryFail: '조회 실패',
    errQueryFailMsg: '조회 실패: ',
    errNetworkInit: '네트워크가 초기화되지 않았습니다',
    errTxFailed: '트랜잭션 실패',
    errUserCancelTx: '사용자가 트랜잭션을 취소했습니다',
    errInsufficientBNB: 'BNB 잔액 부족',
  },
  ja: {
    connectWallet: 'ウォレット接続',
    walletModalTitle: 'ウォレット接続',
    metamaskDesc: 'ブラウザ拡張ウォレット',
    tpTrustDesc: 'モバイルウォレット',
    heroTitle: 'リファラル管理',
    heroSubtitle: 'リファラルネットワークの確認、紹介者のバインド、アドレス検索',
    tabMy: 'マイリファラル',
    tabBind: 'リファラルバインド',
    tabSearch: 'アドレス検索',
    pleaseConnect: 'ウォレットを接続してください',
    connectToView: 'ウォレット接続後にリファラル関係を確認できます',
    bindStatus: 'バインド状態',
    directCount: '直接紹介数',
    statusBound: 'バインド済み',
    statusPending: '確認待ち',
    statusUnbound: '未バインド',
    myReferrer: '私の紹介者',
    copyTooltip: 'コピー',
    receivedInvite: 'リファラル招待を受信',
    pendingHint: '以下のアドレスからリファラル招待が届きました。確認してバインドを完了してください：',
    confirmBindBtn: 'バインド確認（0.01 STO送信）',
    directList: '直接紹介リスト',
    noDirectUsers: 'まだ直接紹介はありません',
    scanningChain: 'オンチェーンデータをスキャン中...',
    noChainRecords: 'オンチェーン記録なし（最新データのみスキャン）',
    loadFailed: '読み込み失敗',
    tagValid: '有効',
    tagNoDeposit: '未入金',
    bindTitle: 'リファラル関係のバインド',
    bindDesc: 'STOは双方向確認メカニズムでリファラル関係を構築します',
    step1Title: '紹介者が招待を送信',
    step1Desc: 'バインド済みユーザーが新規ユーザーに0.01 STOを送信',
    step2Title: '新規ユーザーがバインドを確認',
    step2Desc: '新規ユーザーが紹介者に0.01 STOを送り返してバインド完了',
    targetAddrLabel: '相手のウォレットアドレス',
    inputPlaceholder: '0x...',
    inviteBtn: '招待送信（0.01 STO送信）',
    confirmBtn2: 'バインド確認（0.01 STO送り返す）',
    searchTitle: 'リファラル関係の検索',
    searchDesc: '任意のアドレスを入力してリファラル情報を確認',
    searchPlaceholder: 'ウォレットアドレスを入力 0x...',
    searchBindStatus: 'バインド状態',
    searchDirectCount: '直接紹介数',
    searchReferrer: '紹介者',
    searchPending: '保留中の招待',
    referralChain: 'リファラルチェーン（上位ライン）',
    none: 'なし',
    viewContract: 'コントラクト表示',
    toastInstallMM: 'MetaMaskウォレットをインストールしてください',
    toastConnected: 'ウォレット接続完了',
    toastUserCancel: 'ユーザーが接続をキャンセルしました',
    toastConnFail: '接続失敗: ',
    toastPleaseConnect: '先にウォレットを接続してください',
    toastInsufficient: 'STO残高不足（0.01必要）',
    toastTxSent: 'トランザクション送信済み、確認待ち...',
    toastBindSuccess: 'バインド成功！',
    toastCopied: 'コピーしました',
    errInvalidAddr: '有効なウォレットアドレスを入力してください',
    errCannotInviteSelf: '自分自身を招待できません',
    errNotBound: 'まだ紹介者をバインドしていないため、招待を送信できません',
    errTargetBound: 'このアドレスは既に紹介者がバインドされています',
    errInsufficientSTO: 'STO残高不足（0.01必要）',
    errInviteSent: '招待トランザクション送信済み、確認待ち...',
    errInviteSuccess: '招待送信完了！相手が0.01 STOを送り返すのを待っています。',
    errNoInviteFrom: 'このアドレスからの招待はありません',
    errConfirmSent: '確認トランザクション送信中...',
    errBindComplete: 'バインド成功！リファラル関係が確立されました。',
    errQueryFail: '照会失敗',
    errQueryFailMsg: '照会失敗: ',
    errNetworkInit: 'ネットワークが初期化されていません',
    errTxFailed: 'トランザクション失敗',
    errUserCancelTx: 'ユーザーがトランザクションをキャンセルしました',
    errInsufficientBNB: 'BNB残高不足',
  },
  'zh-TW': {
    connectWallet: '連接錢包',
    walletModalTitle: '連接錢包',
    metamaskDesc: '瀏覽器插件錢包',
    tpTrustDesc: '手機端錢包',
    heroTitle: '推薦關係管理',
    heroSubtitle: '查看你的推薦網絡，綁定推薦人，查詢任意地址',
    tabMy: '我的推薦',
    tabBind: '綁定推薦',
    tabSearch: '查詢地址',
    pleaseConnect: '請先連接錢包',
    connectToView: '連接錢包後可查看你的推薦關係',
    bindStatus: '綁定狀態',
    directCount: '直推人數',
    statusBound: '已綁定',
    statusPending: '待確認',
    statusUnbound: '未綁定',
    myReferrer: '我的推薦人',
    copyTooltip: '複製',
    receivedInvite: '收到推薦邀請',
    pendingHint: '以下地址向你發起了推薦邀請，確認後即可完成綁定：',
    confirmBindBtn: '確認綁定（發送 0.01 STO）',
    directList: '直推列表',
    noDirectUsers: '暫無直推用戶',
    scanningChain: '掃描鏈上數據中...',
    noChainRecords: '暫無鏈上記錄（僅掃描最近數據）',
    loadFailed: '載入失敗',
    tagValid: '有效',
    tagNoDeposit: '未入金',
    bindTitle: '綁定推薦關係',
    bindDesc: 'STO 使用雙向確認機制建立推薦關係',
    step1Title: '推薦人發起邀請',
    step1Desc: '已綁定的用戶向新用戶發送 0.01 STO',
    step2Title: '新用戶確認綁定',
    step2Desc: '新用戶向推薦人回發 0.01 STO，完成綁定',
    targetAddrLabel: '對方錢包地址',
    inputPlaceholder: '0x...',
    inviteBtn: '發起邀請（發送 0.01 STO）',
    confirmBtn2: '確認綁定（回發 0.01 STO）',
    searchTitle: '查詢推薦關係',
    searchDesc: '輸入任意地址，查看其推薦資訊',
    searchPlaceholder: '輸入錢包地址 0x...',
    searchBindStatus: '綁定狀態',
    searchDirectCount: '直推人數',
    searchReferrer: '推薦人',
    searchPending: '待確認邀請',
    referralChain: '推薦鏈（上級鏈路）',
    none: '無',
    viewContract: '查看合約',
    toastInstallMM: '請安裝 MetaMask 錢包',
    toastConnected: '錢包已連接',
    toastUserCancel: '用戶取消連接',
    toastConnFail: '連接失敗: ',
    toastPleaseConnect: '請先連接錢包',
    toastInsufficient: 'STO 餘額不足（需 0.01）',
    toastTxSent: '交易已發送，等待確認...',
    toastBindSuccess: '綁定成功！',
    toastCopied: '已複製',
    errInvalidAddr: '請輸入有效的錢包地址',
    errCannotInviteSelf: '不能邀請自己',
    errNotBound: '你還未綁定推薦人，無法發起邀請',
    errTargetBound: '該地址已綁定推薦人',
    errInsufficientSTO: 'STO 餘額不足（需 0.01）',
    errInviteSent: '邀請交易已發送，等待確認...',
    errInviteSuccess: '邀請已發送！等待對方回發 0.01 STO 完成綁定。',
    errNoInviteFrom: '該地址沒有向你發起邀請',
    errConfirmSent: '確認交易已發送...',
    errBindComplete: '綁定成功！推薦關係已建立。',
    errQueryFail: '查詢失敗',
    errQueryFailMsg: '查詢失敗: ',
    errNetworkInit: '網絡未初始化',
    errTxFailed: '交易失敗',
    errUserCancelTx: '用戶取消了交易',
    errInsufficientBNB: 'BNB 餘額不足',
  },
};

let currentLang = localStorage.getItem('sto-lang') || 'en';

function t(key) {
  return (LANG[currentLang] && LANG[currentLang][key]) || LANG.en[key] || key;
}

function setLang(code) {
  currentLang = code;
  localStorage.setItem('sto-lang', code);
  document.documentElement.lang = code === 'zh-TW' ? 'zh-TW' : code;

  // Update all static data-i18n elements (skip walletBtn when connected)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (me && el.id === 'walletBtn') return;
    el.textContent = t(el.dataset.i18n);
  });

  // Update all data-i18n-placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Update all data-i18n-title elements
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });

  // Update wallet button text (only if not connected)
  if (!me) {
    $('walletBtn').textContent = t('connectWallet');
  }

  // Update language button label
  const langFlags = { en: 'us', ko: 'kr', ja: 'jp', 'zh-TW': 'tw' };
  const langNames = { en: 'EN', ko: '한국어', ja: '日本語', 'zh-TW': '繁中' };
  const langBtn = $('langBtn');
  if (langBtn) langBtn.innerHTML = `<span class="fi fi-${langFlags[code]} fis"></span> ${langNames[code] || code}`;

  // Close dropdown
  const dd = $('langDropdown');
  if (dd) dd.classList.remove('show');
}

function toggleLangDropdown(e) {
  e.stopPropagation();
  $('langDropdown').classList.toggle('show');
}

// Close dropdown on outside click
document.addEventListener('click', () => {
  const dd = $('langDropdown');
  if (dd) dd.classList.remove('show');
});

// ===== Config =====
const CFG = {
  contract: '0x6D857C2A06e1c91D4C025221b8c05FAEFc0d4E17',
  deposit:  '0x92e35Ec8Bf0CF65705a8948a5357Ddc1375fAc3C', // STODeposit
  chainId: '0x38',
  rpc: 'https://bsc-dataseed1.binance.org/',
  bindAmt: '10000000000000000', // 0.01 * 1e18
  zero: '0x0000000000000000000000000000000000000000',
};

const ABI = [
  'function referrer(address) view returns (address)',
  'function hasReferrer(address) view returns (bool)',
  'function directReferrals(address) view returns (uint256)',
  'function pendingInvite(address) view returns (address)',
  'function getReferralChain(address) view returns (address[])',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address,uint256) returns (bool)',
  'event ReferralBound(address indexed user, address indexed referrer)',
];

const DEPOSIT_ABI = [
  'function hasDeposited(address) view returns (bool)',
  'function depositAmount(address) view returns (uint256)',
];

// ===== State =====
let provider = null;
let signer = null;
let rw = null;        // read-write contract
let ro = null;        // read-only contract
let me = null;        // user address
let listenersSet = false;

// ===== Init =====
document.addEventListener('DOMContentLoaded', async () => {
  initReadOnly();
  positionIndicator();

  // Apply saved language
  setLang(currentLang);

  // URL ?ref=0x... auto-fill
  const ref = new URLSearchParams(location.search).get('ref');
  if (ref && /^0x[0-9a-fA-F]{40}$/.test(ref)) {
    $('bindInput').value = ref;
    switchTab('bind');
  }

  // Auto-connect if already authorized
  if (window.ethereum) {
    try {
      const accs = await window.ethereum.request({ method: 'eth_accounts' });
      if (accs.length) await connectWallet();
    } catch (_) {}
  }

  // Enter key triggers
  $('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') searchAddress(); });
  $('bindInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendInvite(); });
});

function initReadOnly() {
  try {
    const p = new ethers.JsonRpcProvider(CFG.rpc);
    ro = new ethers.Contract(CFG.contract, ABI, p);
  } catch (e) { console.warn('RO init failed', e); }
}

// ===== Tabs =====
function switchTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === `panel-${id}`));
  positionIndicator();
}

function positionIndicator() {
  const active = document.querySelector('.tab.active');
  const indicator = $('tabIndicator');
  if (!active || !indicator) return;
  const tabs = document.querySelector('.tabs');
  const idx = [...tabs.querySelectorAll('.tab')].indexOf(active);
  const w = 100 / 3;
  indicator.style.left = `calc(${w * idx}% + 4px)`;
  indicator.style.width = `calc(${w}% - 5.33px)`;
}

// ===== Wallet =====
function handleWalletClick() {
  if (me) return;
  $('walletOverlay').classList.add('show');
}
function closeModal(e) {
  if (e && e.target !== e.currentTarget) return;
  $('walletOverlay').classList.remove('show');
}

async function connectWallet() {
  closeModal();
  if (!window.ethereum) { toast(t('toastInstallMM'), 'err'); return; }

  try {
    const accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
    me = accs[0];

    // Switch to BSC
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CFG.chainId }] });
    } catch (sw) {
      if (sw.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: CFG.chainId, chainName: 'BNB Smart Chain', nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 }, rpcUrls: ['https://bsc-dataseed.binance.org/'], blockExplorerUrls: ['https://bscscan.com/'] }]
        });
      }
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    rw = new ethers.Contract(CFG.contract, ABI, signer);

    // UI update
    const short = me.slice(0, 6) + '...' + me.slice(-4);
    const btn = $('walletBtn');
    btn.textContent = short;
    btn.classList.add('connected');
    btn.onclick = null;

    $('noWallet').style.display = 'none';
    $('myData').style.display = 'block';
    $('inviteBtn').disabled = false;
    $('confirmBtn2').disabled = false;

    await loadMyData();

    // Listeners (once)
    if (!listenersSet) {
      listenersSet = true;
      window.ethereum.on('accountsChanged', () => location.reload());
      window.ethereum.on('chainChanged', () => location.reload());
    }

    toast(t('toastConnected'), 'ok');
  } catch (err) {
    if (err.code === 4001) toast(t('toastUserCancel'), 'err');
    else toast(t('toastConnFail') + (err.message || ''), 'err');
  }
}

// ===== Load My Data =====
async function loadMyData() {
  if (!me) return;
  const c = rw || ro;
  if (!c) return;

  try {
    const [bound, ref, cnt, pending] = await Promise.all([
      c.hasReferrer(me), c.referrer(me), c.directReferrals(me), c.pendingInvite(me),
    ]);

    // Status
    const el = $('sBindStatus');
    if (bound) { el.textContent = t('statusBound'); el.className = 'stat-val c-green'; }
    else if (pending !== CFG.zero) { el.textContent = t('statusPending'); el.className = 'stat-val c-yellow'; }
    else { el.textContent = t('statusUnbound'); el.className = 'stat-val c-yellow'; }

    // Direct count
    const n = Number(cnt);
    $('sDirectCount').textContent = n;

    // Referrer
    $('referrerBox').style.display = 'block';
    if (bound && ref !== CFG.zero) {
      $('myReferrer').textContent = ref;
      $('myReferrer').className = '';
    } else {
      $('myReferrer').textContent = 'None';
      $('myReferrer').className = 'c-muted';
    }

    // Pending
    if (!bound && pending !== CFG.zero) {
      $('pendingAddr').textContent = pending;
      $('pendingBox').style.display = 'block';
    }

    // Direct list
    $('directBox').style.display = 'block';
    $('directBadge').textContent = n;
    if (n > 0) loadDirectList(); else $('directList').innerHTML = `<div class="list-empty">${t('noDirectUsers')}</div>`;

  } catch (e) {
    console.error(e);
    $('sBindStatus').textContent = t('errQueryFail');
    $('sDirectCount').textContent = '-';
  }
}

async function loadDirectList() {
  const el = $('directList');
  el.innerHTML = `<div class="list-empty" style="opacity:.6">${t('scanningChain')}</div>`;

  try {
    const p = new ethers.JsonRpcProvider(CFG.rpc);
    const c = new ethers.Contract(CFG.contract, ABI, p);
    const dep = new ethers.Contract(CFG.deposit, DEPOSIT_ABI, p);

    const filter = c.filters.ReferralBound(null, me);
    const block = await p.getBlockNumber();
    const events = await c.queryFilter(filter, Math.max(0, block - 200000), block);

    if (!events.length) { el.innerHTML = `<div class="list-empty">${t('noChainRecords')}</div>`; return; }

    const addrs = events.map(ev => ev.args[0]);

    const depositChecks = await Promise.all(
      addrs.map(addr => dep.hasDeposited(addr).catch(() => false))
    );

    el.innerHTML = addrs.map((addr, i) => {
      const short = addr.slice(0, 8) + '...' + addr.slice(-6);
      const valid = depositChecks[i];
      const numCls = valid ? 'list-num ok' : 'list-num';
      const addrCls = valid ? 'list-addr c-green' : 'list-addr';
      const tagCls = valid ? 'list-tag tag-ok' : 'list-tag';
      const tagText = valid ? t('tagValid') : t('tagNoDeposit');
      return `<div class="list-item"><div class="${numCls}">${i + 1}</div><span class="${addrCls}">${short}</span><span class="${tagCls}">${tagText}</span></div>`;
    }).join('');
  } catch (e) {
    console.error('loadDirectList error:', e);
    el.innerHTML = `<div class="list-empty">${t('loadFailed')}</div>`;
  }
}

// ===== Confirm Bind (from pending) =====
async function confirmBind() {
  if (!rw || !me) { toast(t('toastPleaseConnect'), 'err'); return; }
  const addr = $('pendingAddr').textContent;
  if (!addr || addr === '—') return;

  const btn = $('confirmBindBtn');
  btn.classList.add('loading');

  try {
    const bal = await rw.balanceOf(me);
    if (bal < BigInt(CFG.bindAmt)) { toast(t('toastInsufficient'), 'err'); btn.classList.remove('loading'); return; }

    const tx = await rw.transfer(addr, CFG.bindAmt);
    toast(t('toastTxSent'), 'ok');
    await tx.wait();
    toast(t('toastBindSuccess'), 'ok');
    await loadMyData();
  } catch (e) { handleErr(e); }

  btn.classList.remove('loading');
}

// ===== Send Invite =====
async function sendInvite() {
  if (!rw || !me) { toast(t('toastPleaseConnect'), 'err'); return; }
  const addr = $('bindInput').value.trim();
  if (!ethers.isAddress(addr)) { showMsg('bindErr', t('errInvalidAddr')); return; }
  if (addr.toLowerCase() === me.toLowerCase()) { showMsg('bindErr', t('errCannotInviteSelf')); return; }

  hideMsg('bindOk'); hideMsg('bindErr');
  const btn = $('inviteBtn');
  btn.classList.add('loading');

  try {
    const myBound = await rw.hasReferrer(me);
    if (!myBound) { showMsg('bindErr', t('errNotBound')); btn.classList.remove('loading'); return; }

    const targetBound = await rw.hasReferrer(addr);
    if (targetBound) { showMsg('bindErr', t('errTargetBound')); btn.classList.remove('loading'); return; }

    const bal = await rw.balanceOf(me);
    if (bal < BigInt(CFG.bindAmt)) { showMsg('bindErr', t('errInsufficientSTO')); btn.classList.remove('loading'); return; }

    const tx = await rw.transfer(addr, CFG.bindAmt);
    showMsg('bindOk', t('errInviteSent'));
    await tx.wait();
    showMsg('bindOk', t('errInviteSuccess'));
  } catch (e) { handleErr(e, 'bindErr'); }

  btn.classList.remove('loading');
}

// ===== Confirm Bind from Input =====
async function confirmBindFromInput() {
  if (!rw || !me) { toast(t('toastPleaseConnect'), 'err'); return; }
  const addr = $('bindInput').value.trim();
  if (!ethers.isAddress(addr)) { showMsg('bindErr', t('errInvalidAddr')); return; }

  hideMsg('bindOk'); hideMsg('bindErr');
  const btn = $('confirmBtn2');
  btn.classList.add('loading');

  try {
    const pending = await rw.pendingInvite(me);
    if (pending.toLowerCase() !== addr.toLowerCase()) { showMsg('bindErr', t('errNoInviteFrom')); btn.classList.remove('loading'); return; }

    const bal = await rw.balanceOf(me);
    if (bal < BigInt(CFG.bindAmt)) { showMsg('bindErr', t('errInsufficientSTO')); btn.classList.remove('loading'); return; }

    const tx = await rw.transfer(addr, CFG.bindAmt);
    showMsg('bindOk', t('errConfirmSent'));
    await tx.wait();
    showMsg('bindOk', t('errBindComplete'));
    await loadMyData();
  } catch (e) { handleErr(e, 'bindErr'); }

  btn.classList.remove('loading');
}

// ===== Search =====
async function searchAddress() {
  const addr = $('searchInput').value.trim();
  if (!ethers.isAddress(addr)) { showMsg('searchErr', t('errInvalidAddr')); return; }

  hideMsg('searchErr');
  $('searchResult').style.display = 'none';
  $('searchBtn').disabled = true;

  const c = ro || rw;
  if (!c) { showMsg('searchErr', t('errNetworkInit')); $('searchBtn').disabled = false; return; }

  try {
    const [bound, ref, cnt, pending, chain] = await Promise.all([
      c.hasReferrer(addr), c.referrer(addr), c.directReferrals(addr), c.pendingInvite(addr), c.getReferralChain(addr),
    ]);

    $('srAddr').textContent = addr;

    // Status
    const s = $('srStatus');
    if (bound) { s.textContent = t('statusBound'); s.className = 'mini-val c-green'; }
    else if (pending !== CFG.zero) { s.textContent = t('statusPending'); s.className = 'mini-val c-yellow'; }
    else { s.textContent = t('statusUnbound'); s.className = 'mini-val c-yellow'; }

    $('srDirect').textContent = Number(cnt);

    const r = $('srReferrer');
    r.textContent = ref !== CFG.zero ? shortAddr(ref) : t('none');
    r.title = ref;

    const p = $('srPending');
    p.textContent = pending !== CFG.zero ? shortAddr(pending) : t('none');
    p.title = pending;

    // Chain
    if (chain.length) {
      $('chainBox').style.display = 'block';
      $('chainList').innerHTML = chain.map((a, i) =>
        `<div class="chain-item"><span class="chain-lv">L${i + 1}</span><span class="chain-arr">\u2192</span><span class="chain-a" title="${a}">${a.slice(0, 10)}...${a.slice(-8)}</span></div>`
      ).join('');
    } else {
      $('chainBox').style.display = 'none';
    }

    $('searchResult').style.display = 'block';
  } catch (e) {
    showMsg('searchErr', t('errQueryFailMsg') + (e.message || ''));
  }

  $('searchBtn').disabled = false;
}

// ===== Helpers =====
function $(id) { return document.getElementById(id); }
function shortAddr(a) { return a.slice(0, 8) + '...' + a.slice(-6); }

function handleErr(e, msgId) {
  let m = t('errTxFailed');
  if (e.code === 'ACTION_REJECTED' || e.code === 4001) m = t('errUserCancelTx');
  else if (e.reason) m = e.reason;
  else if (e.message?.includes('insufficient funds')) m = t('errInsufficientBNB');
  else if (e.message?.includes('user rejected')) m = t('errUserCancelTx');
  else if (e.message) m = e.message.slice(0, 80);

  if (msgId) showMsg(msgId, m); else toast(m, 'err');
}

function showMsg(id, txt) { const el = $(id); el.textContent = txt; el.classList.add('show'); }
function hideMsg(id) { $(id).classList.remove('show'); }

function copy(id) {
  const txt = $(id).textContent;
  if (!txt || txt === '—') return;
  navigator.clipboard.writeText(txt).then(() => toast(t('toastCopied'), 'ok')).catch(() => {
    const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); toast(t('toastCopied'), 'ok');
  });
}

function toast(msg, type) {
  const box = $('toastBox');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 250); }, 3000);
}
