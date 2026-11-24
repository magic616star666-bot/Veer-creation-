'use strict';
(()=>{
const $=id=>document.getElementById(id);
const config=window.VEER_CONFIG||{};
const apps=Array.isArray(window.VEER_APPS)?window.VEER_APPS:[];
const languages=['en','hi','hinglish'];
const i18n={
en:{home:'Home',apps:'Apps',process:'How it works',support:'Support',independent:'Independent software & experiments',hero1:'Ideas beyond',hero2:'the ordinary.',heroDesc:'An independent studio exploring Android development, useful tools and ambitious ideas. Every download shown here links to an actual published release.',explore:'Explore apps',noAccount:'No account to browse',verified:'Release links verified',openSource:'Open-source where noted',published:'Published apps',releaseCount:'Verified releases',downloadSource:'Release source',catalog:'THE CATALOG',built:'Built with purpose.',catalogDesc:'Only approved, published projects appear here. Download links are checked against GitHub Releases.',search:'Search apps',all:'All categories',preparing:'Launchpad is ready.',emptyDesc:'No app has been approved for publication yet. Verified releases will appear here after the catalog is updated.',noMatches:'No apps match your search.',follow:'Follow development on GitHub ↗',trusted:'TRANSPARENT BY DESIGN',processTitle:'How releases work',processDesc:'A simple, verifiable route from source to the APK you install.',stage1:'Review',stage1Desc:'Project details and permissions are reviewed before it is listed.',stage2:'Publish',stage2Desc:'The approved build is uploaded to its own GitHub Release.',stage3:'Verify',stage3Desc:'This catalog checks for a published release, never inventing a download.',community:'BUILD WITH THE COMMUNITY',keepBuilding:'Help good ideas grow.',supportDesc:'Follow updates, report issues, or support independent development when a funding option becomes available.',fundingPending:'Sponsorship is not yet enabled. No payments are being collected here.',visitGithub:'Visit GitHub ↗',beSponsor:'Become a sponsor ↗',footerTag:'Independent ideas. Real projects.',latest:'Latest release',checking:'Checking release…',unavailable:'No verified APK release yet',download:'Download APK ↓',release:'View release ↗',source:'Repository ↗',other:'Other'},
hi:{home:'होम',apps:'ऐप्स',process:'यह कैसे काम करता है',support:'सहयोग',independent:'स्वतंत्र सॉफ्टवेयर और प्रयोग',hero1:'सोच से आगे',hero2:'नई दुनिया तक।',heroDesc:'Android, उपयोगी टूल और नए विचारों का स्वतंत्र स्टूडियो। यहाँ हर डाउनलोड केवल असली प्रकाशित GitHub Release से जुड़ा होगा।',explore:'ऐप्स देखें',noAccount:'देखने के लिए अकाउंट नहीं',verified:'रिलीज़ की जाँच',openSource:'जहाँ लिखा हो वहीं ओपन-सोर्स',published:'प्रकाशित ऐप्स',releaseCount:'सत्यापित रिलीज़',downloadSource:'डाउनलोड स्रोत',catalog:'ऐप कैटलॉग',built:'मकसद से बनाए गए।',catalogDesc:'सिर्फ स्वीकृत और प्रकाशित प्रोजेक्ट। डाउनलोड GitHub Releases से जाँचा जाता है।',search:'ऐप खोजें',all:'सभी कैटेगरी',preparing:'लॉन्च प्लेटफ़ॉर्म तैयार है।',emptyDesc:'अभी कोई ऐप सार्वजनिक करने के लिए स्वीकृत नहीं है। स्वीकृत रिलीज़ बाद में यहीं दिखाई देगी।',noMatches:'इस खोज से कोई ऐप नहीं मिला।',follow:'GitHub पर प्रगति देखें ↗',trusted:'पारदर्शी प्रक्रिया',processTitle:'रिलीज़ कैसे होती है',processDesc:'सोर्स से APK तक जाँचने योग्य प्रक्रिया।',stage1:'जाँच',stage1Desc:'सूची में रखने से पहले प्रोजेक्ट, जानकारी और परमिशन की जाँच।',stage2:'प्रकाशन',stage2Desc:'स्वीकृत बिल्ड को GitHub Release पर प्रकाशित करना।',stage3:'सत्यापन',stage3Desc:'इस कैटलॉग में सिर्फ असली प्रकाशित रिलीज़ का डाउनलोड दिखता है।',community:'कम्युनिटी से जुड़ें',keepBuilding:'अच्छे विचारों को आगे बढ़ाएँ।',supportDesc:'अपडेट देखें, समस्या बताएँ या सहयोग सुविधा चालू होने पर विकास में मदद करें।',fundingPending:'स्पॉन्सरशिप अभी चालू नहीं है। यहाँ कोई भुगतान नहीं लिया जा रहा।',visitGithub:'GitHub देखें ↗',beSponsor:'सहयोग करें ↗',footerTag:'नए विचार। असली प्रोजेक्ट।',latest:'नवीनतम रिलीज़',checking:'रिलीज़ जाँच रहे हैं…',unavailable:'अभी कोई सत्यापित APK रिलीज़ नहीं',download:'APK डाउनलोड ↓',release:'रिलीज़ देखें ↗',source:'रिपॉज़िटरी ↗',other:'अन्य'},
hinglish:{home:'Home',apps:'Apps',process:'Kaise kaam karta hai',support:'Support',independent:'Independent software & experiments',hero1:'Soch se aage',hero2:'naye ideas.',heroDesc:'Android, useful tools aur naye ideas ka independent studio. Har download sirf asli GitHub release se linked hoga.',explore:'Apps dekho',noAccount:'Account ki zaroorat nahi',verified:'Verified releases',openSource:'Jahan noted ho open-source',published:'Published apps',releaseCount:'Verified releases',downloadSource:'Release source',catalog:'APP CATALOG',built:'Purpose ke saath.',catalogDesc:'Sirf approved aur published projects. Download GitHub Releases se verify hota hai.',search:'App search karo',all:'All categories',preparing:'Launchpad ready hai.',emptyDesc:'Abhi koi app publish karne ke liye approve nahi hui. Approval ke baad yahan show hogi.',noMatches:'Koi matching app nahi.',follow:'GitHub par updates dekho ↗',trusted:'TRANSPARENT PROCESS',processTitle:'Release kaise hoti hai',processDesc:'Source se APK tak verifiable process.',stage1:'Review',stage1Desc:'Listing se pehle details aur permissions check hoti hain.',stage2:'Publish',stage2Desc:'Approved build GitHub Release par upload hoti hai.',stage3:'Verify',stage3Desc:'Sirf asli public release ka link dikhta hai.',community:'COMMUNITY',keepBuilding:'Ideas ko aage badhao.',supportDesc:'Updates dekho aur future funding option activate hone par support karo.',fundingPending:'Sponsorship abhi enable nahi hui. Yahan payment nahi liya ja raha.',visitGithub:'GitHub dekho ↗',beSponsor:'Sponsor ↗',footerTag:'Independent ideas. Real projects.',latest:'Latest release',checking:'Release check ho rahi hai…',unavailable:'Verified APK release nahi hai',download:'Download APK ↓',release:'View release ↗',source:'Repository ↗',other:'Other'}
};
const safeRepo=x=>typeof x==='string'&&/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(x)&&!x.includes('..');
const safeSponsor=s=>{try{const u=new URL(s);return u.protocol==='https:'&&u.hostname==='github.com'&&/^\/sponsors\/[a-zA-Z0-9-]+\/?$/.test(u.pathname);}catch{return false;}};
const entries=apps.filter(a=>a&&typeof a==='object'&&safeRepo(a.repo)&&a.approved===true&&typeof a.name==='string'&&a.name.trim()&&typeof a.description==='string');
const element=(type,cls,txt)=>{const n=document.createElement(type);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;};
const safeGet=(key,fallback)=>{try{return localStorage.getItem(key)||fallback;}catch{return fallback;}};
const safeSet=(key,value)=>{try{localStorage.setItem(key,value);}catch{}};
let lang=safeGet('veer-lang','en');if(!languages.includes(lang))lang='en';
let light=safeGet('veer-light','0')==='1';
const cache=new Map();
const tr=key=>i18n[lang][key]||i18n.en[key]||key;
function translate(){
document.documentElement.lang=lang==='hi'?'hi':'en';
document.querySelectorAll('[data-i18n]').forEach(n=>{n.textContent=tr(n.dataset.i18n);});
document.querySelectorAll('[data-i18n-placeholder]').forEach(n=>{n.placeholder=tr(n.dataset.i18nPlaceholder);});
$('langButton').textContent=lang==='en'?'हिंदी':lang==='hi'?'Hinglish':'English';
}
function categoryOptions(){
const s=$('category'),prev=s.value;
s.replaceChildren();
const all=element('option','',tr('all'));all.value='all';s.append(all);
[...new Set(entries.map(a=>a.category||'Other'))].sort().forEach(c=>{const n=element('option','',c);n.value=c;s.append(n);});
s.value=[...s.options].some(n=>n.value===prev)?prev:'all';
}
function applyRelease(record,status,actions){
if(!status.isConnected)return;
status.textContent=record?.apk?(tr('latest')+' '+(record.tag||'')):tr('unavailable');
if(!record?.apk)return;
const btn=element('a','small-link',tr('download'));btn.href=record.apk;btn.target='_blank';btn.rel='noopener noreferrer';actions.prepend(btn);
if(record.url){const link=element('a','small-link',tr('release'));link.href=record.url;link.target='_blank';link.rel='noopener noreferrer';actions.append(link);}
$('releaseCount').textContent=String(document.querySelectorAll('.app-card .small-link[href*=".apk"]').length);
}
function buildCard(a){
const c=element('article','app-card');
const icon=element('div','app-icon',(a.name[0]||'V').toUpperCase());icon.setAttribute('aria-hidden','true');c.append(icon);
c.append(element('div','app-meta',a.category||tr('other')),element('h3','',a.name),element('p','',a.description));
const actions=element('div','app-actions');
const state=element('span','small-link disabled',tr('checking'));state.setAttribute('role','status');actions.append(state);
const repoLink=element('a','small-link',tr('source'));repoLink.href='https://github.com/'+a.repo;repoLink.target='_blank';repoLink.rel='noopener noreferrer';actions.append(repoLink);c.append(actions);
if(cache.has(a.repo)){applyRelease(cache.get(a.repo),state,actions);}
else{
const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),9000);
fetch('https://api.github.com/repos/'+a.repo+'/releases/latest',{signal:controller.signal,headers:{Accept:'application/vnd.github+json'}})
.then(r=>{if(!r.ok)throw Error('unavailable');return r.json();})
.then(r=>{const apks=Array.isArray(r.assets)?r.assets.filter(x=>typeof x.name==='string'&&/\.apk$/i.test(x.name)&&typeof x.browser_download_url==='string'):[];const rec={tag:String(r.tag_name||''),apk:apks.length?apks[0].browser_download_url:null,url:typeof r.html_url==='string'?r.html_url:null};cache.set(a.repo,rec);applyRelease(rec,state,actions);})
.catch(()=>{cache.set(a.repo,null);applyRelease(null,state,actions);})
.finally(()=>clearTimeout(timer));
}
return c;
}
function showCatalog(){
const q=$('search').value.trim().toLowerCase(),category=$('category').value;
const selected=entries.filter(a=>(category==='all'||(a.category||'Other')===category)&&(!q||(a.name+' '+a.description+' '+(a.category||'')).toLowerCase().includes(q)));
$('catalog').replaceChildren(...selected.map(buildCard));$('publishedCount').textContent=String(entries.length);
$('releaseCount').textContent=String([...cache.values()].filter(r=>r?.apk).length);
$('emptyState').hidden=selected.length>0;
$('emptyState').querySelector('h3').textContent=entries.length&&!selected.length?tr('noMatches'):tr('preparing');
}
function drawer(open){
const menu=$('mobileDrawer');
menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));
$('drawerOverlay').hidden=!open;$('menuButton').setAttribute('aria-expanded',String(open));
document.body.style.overflow=open?'hidden':'';
if(open)$('drawerClose').focus();
}
$('menuButton').addEventListener('click',()=>drawer(true));
$('drawerClose').addEventListener('click',()=>drawer(false));
$('drawerOverlay').addEventListener('click',()=>drawer(false));
document.querySelectorAll('.drawer a').forEach(n=>n.addEventListener('click',()=>drawer(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')drawer(false);});
let x=0,y=0;
document.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;x=e.touches[0].clientX;y=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchend',e=>{if(!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-x,dy=e.changedTouches[0].clientY-y;if(Math.abs(dx)>75&&Math.abs(dy)<Math.abs(dx)*.6){if(dx>0&&!$('mobileDrawer').classList.contains('open'))drawer(true);else if(dx<0)drawer(false);}},{passive:true});
$('search').addEventListener('input',showCatalog);
$('category').addEventListener('change',showCatalog);
$('langButton').addEventListener('click',()=>{lang=languages[(languages.indexOf(lang)+1)%languages.length];safeSet('veer-lang',lang);translate();categoryOptions();showCatalog();});
document.documentElement.classList.toggle('light',light);
$('themeButton').addEventListener('click',()=>{light=!light;document.documentElement.classList.toggle('light',light);safeSet('veer-light',light?'1':'0');});
if(safeSponsor(config.sponsorUrl)){$('sponsorLink').hidden=false;$('sponsorLink').href=config.sponsorUrl;$('fundingState').hidden=true;}
$('year').textContent=String(new Date().getFullYear());
translate();categoryOptions();showCatalog();
})();