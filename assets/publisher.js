'use strict';
(()=>{
const $=id=>document.getElementById(id);
const owner=window.VEER_CONFIG?.owner||'magic616star666-bot';
let apps=(Array.isArray(window.VEER_APPS)?window.VEER_APPS:[]).map(x=>({...x}));
const safeRepo=x=>typeof x==='string'&&/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(x)&&!x.includes('..');
const safeSponsor=s=>{if(!s)return true;try{let u=new URL(s);return u.protocol==='https:'&&u.hostname==='github.com'&&/^\/sponsors\/[a-zA-Z0-9-]+\/?$/.test(u.pathname);}catch{return false;}};
function message(s,success=true){$('status').textContent=s;$('status').style.color=success?'var(--a)':'#ff9faf';}
function draw(){
$('count').textContent=apps.length;$('list').replaceChildren();
if(!apps.length){const p=document.createElement('p');p.className='publisher-hint';p.textContent='अभी कोई ऐप नहीं जोड़ी गई।';$('list').append(p);}
apps.forEach((a,i)=>{const row=document.createElement('div');row.className='item';const info=document.createElement('div');const b=document.createElement('strong');b.textContent=a.name;const small=document.createElement('small');small.textContent=a.repo;info.append(b,small);const btn=document.createElement('button');btn.type='button';btn.textContent='Remove';btn.addEventListener('click',()=>{apps.splice(i,1);draw();});row.append(info,btn);$('list').append(row);});
}
async function verify(repo){
if(!safeRepo(repo))throw Error('Repository format गलत है।');
const c=new AbortController(),timer=setTimeout(()=>c.abort(),12000);
try{
const r=await fetch('https://api.github.com/repos/'+repo+'/releases/latest',{signal:c.signal,headers:{Accept:'application/vnd.github+json'}});
if(!r.ok)throw Error('Latest public GitHub Release नहीं मिली ('+r.status+')।');
const release=await r.json();
const ok=(release.assets||[]).some(a=>/\.apk$/i.test(a.name)&&a.browser_download_url);
if(!ok)throw Error('Release मिली, पर APK asset नहीं है।');
return String(release.tag_name||'release');
}finally{clearTimeout(timer);}
}
$('checkRepo').addEventListener('click',async()=>{message('GitHub API से जाँच चल रही है…');try{let tag=await verify($('repo').value.trim());message('✓ Public APK release मिली: '+tag);}catch(e){message(e.message,false);}});
$('appForm').addEventListener('submit',async e=>{
e.preventDefault();const name=$('name').value.trim(),repo=$('repo').value.trim(),description=$('description').value.trim();
if(!safeRepo(repo)||!name||!description||!$('approved').checked){message('नाम, जानकारी, मंजूरी और GitHub repository सही भरें।',false);return;}
message('असली public APK release सत्यापित हो रही है…');
try{await verify(repo);}catch(error){message('ऐप नहीं जोड़ी गई: '+error.message,false);return;}
if(apps.some(x=>x.repo.toLowerCase()===repo.toLowerCase())){message('यह repository पहले से सूची में है।',false);return;}
apps.push({name,description,category:$('category').value,repo,approved:true});
$('appForm').reset();draw();message('✓ ऐप सूची में जुड़ गई। अब नीचे से apps-data.js डाउनलोड करें।');
});
$('sponsorUrl').value=window.VEER_CONFIG?.sponsorUrl||'';
$('sponsorUrl').addEventListener('input',()=>{let v=$('sponsorUrl').value.trim();$('sponsorStatus').textContent=safeSponsor(v)?'':'कृपया असली https://github.com/sponsors/USERNAME URL ही डालें।';});
$('download').addEventListener('click',()=>{
const s=$('sponsorUrl').value.trim();if(!safeSponsor(s)){$('sponsorStatus').textContent='Sponsor URL गलत है।';return;}
const content='/* Veer Creation catalog: public metadata only */\nwindow.VEER_CONFIG = '+JSON.stringify({owner,sponsorUrl:s},null,2)+';\nwindow.VEER_APPS = '+JSON.stringify(apps,null,2)+';\n';
const blob=new Blob([content],{type:'text/javascript;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='apps-data.js';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);message('✓ apps-data.js डाउनलोड हो गई। GitHub website repo में assets/apps-data.js बदलें।');
});
$('reset').addEventListener('click',()=>{if(confirm('इस पेज में किए गए बदलाव रीसेट करें?')){apps=(Array.isArray(window.VEER_APPS)?window.VEER_APPS:[]).map(x=>({...x}));$('sponsorUrl').value=window.VEER_CONFIG?.sponsorUrl||'';draw();message('रीसेट किया गया।');}});
draw();
})();