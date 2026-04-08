
const API_KEY = 'c552228b440b42e5fd49294694fe8012';
/* ══════════════════════════════════════ */

/* ── STARS ── */
(function(){
  const c=document.getElementById('stars-canvas');
  const ctx=c.getContext('2d');
  let stars=[];
  function resize(){c.width=innerWidth;c.height=innerHeight;init()}
  function init(){
    stars=[];
    for(let i=0;i<200;i++){
      stars.push({
        x:Math.random()*c.width,y:Math.random()*c.height,
        r:Math.random()*1.4+.2,a:Math.random(),
        da:.002+Math.random()*.005
      });
    }
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    stars.forEach(s=>{
      s.a+=s.da;if(s.a>1||s.a<0)s.da*=-1;
      ctx.globalAlpha=s.a*.75;
      ctx.fillStyle='#fff';
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize);
  resize();draw();
})();

/* ── EMOJI MAP ── */
const emojiMap={
  'clear sky':'☀️','few clouds':'🌤️','scattered clouds':'⛅',
  'broken clouds':'🌥️','overcast clouds':'☁️',
  'light rain':'🌦️','moderate rain':'🌧️','heavy intensity rain':'⛈️',
  'very heavy rain':'⛈️','extreme rain':'⛈️',
  'thunderstorm':'⛈️','thunderstorm with rain':'⛈️',
  'thunderstorm with heavy rain':'⛈️','light thunderstorm':'⛈️',
  'heavy thunderstorm':'⛈️','ragged thunderstorm':'⛈️',
  'light snow':'🌨️','snow':'❄️','heavy snow':'❄️',
  'sleet':'🌨️','freezing rain':'🌨️','shower sleet':'🌨️',
  'mist':'🌫️','fog':'🌁','haze':'🌫️','smoke':'🌫️',
  'dust':'🌫️','sand':'🌫️','ash':'🌋',
  'drizzle':'🌧️','light intensity drizzle':'🌦️',
  'shower rain':'🌧️','heavy intensity shower rain':'⛈️',
};
function getEmoji(desc){
  const d=desc.toLowerCase();
  for(const[k,v]of Object.entries(emojiMap))if(d.includes(k))return v;
  return '🌡️';
}

/* ── SKY THEMES ── */
const themes={
  Clear:       'linear-gradient(160deg,#0d1b4f,#1a3a8f,#1e5aad)',
  Clouds:      'linear-gradient(160deg,#1a1f30,#2a3455,#354575)',
  Rain:        'linear-gradient(160deg,#091420,#122032,#1a2e42)',
  Drizzle:     'linear-gradient(160deg,#0e1820,#1e2d3d,#243d50)',
  Thunderstorm:'linear-gradient(160deg,#0a0a14,#180f28,#2a1642)',
  Snow:        'linear-gradient(160deg,#1a2535,#2d3f55,#3a5070)',
  Mist:        'linear-gradient(160deg,#181f2e,#252f40,#323f55)',
};

function applyTheme(main){
  const sky=document.getElementById('sky');
  sky.style.background=themes[main]||themes.Clouds;
  spawnParticles(main);
}

/* ── PARTICLES ── */
function spawnParticles(main){
  const anim=document.getElementById('weather-anim');
  anim.innerHTML='';
  if(main==='Rain'||main==='Drizzle'){
    const count=main==='Drizzle'?50:90;
    for(let i=0;i<count;i++){
      const d=document.createElement('div');
      d.className='rain-drop';
      const h=Math.random()*60+20;
      d.style.cssText=`left:${Math.random()*110-5}%;height:${h}px;
        animation-duration:${.35+Math.random()*.5}s;
        animation-delay:${-Math.random()*2}s;
        opacity:${.3+Math.random()*.45}`;
      anim.appendChild(d);
    }
  }else if(main==='Snow'){
    for(let i=0;i<65;i++){
      const d=document.createElement('div');
      d.className='snow-flake';
      const s=Math.random()*6+2;
      d.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;
        animation-duration:${5+Math.random()*6}s,${2+Math.random()*2}s;
        animation-delay:${-Math.random()*5}s,${-Math.random()*2}s;
        opacity:${.5+Math.random()*.5}`;
      anim.appendChild(d);
    }
  }else if(main==='Thunderstorm'){
    for(let i=0;i<80;i++){
      const d=document.createElement('div');
      d.className='rain-drop';
      const h=Math.random()*80+30;
      d.style.cssText=`left:${Math.random()*110-5}%;height:${h}px;width:2.5px;
        animation-duration:${.28+Math.random()*.3}s;
        animation-delay:${-Math.random()*1.5}s;
        opacity:${.5+Math.random()*.4}`;
      anim.appendChild(d);
    }
    for(let i=0;i<2;i++){
      const l=document.createElement('div');
      l.className='lightning';
      l.style.left=(20+Math.random()*60)+'%';
      l.style.animationDelay=(i*2.5)+'s';
      anim.appendChild(l);
    }
  }else if(main==='Clouds'||main==='Mist'){
    for(let i=0;i<5;i++){
      const d=document.createElement('div');
      d.className='cloud-puff';
      d.style.cssText=`width:${180+Math.random()*220}px;height:${70+Math.random()*70}px;
        top:${5+Math.random()*55}%;
        animation-duration:${22+Math.random()*18}s;
        animation-delay:${-Math.random()*22}s;
        opacity:${.35+Math.random()*.35}`;
      anim.appendChild(d);
    }
  }
}

/* ── TIME FORMAT ── */
function fmtTime(unix,offset){
  const d=new Date((unix+offset)*1000);
  let h=d.getUTCHours(),m=d.getUTCMinutes(),ap=h>=12?'PM':'AM';
  h=h%12||12;
  return `${h}:${String(m).padStart(2,'0')} ${ap}`;
}

/* ── UI ── */
const $=id=>document.getElementById(id);
function showErr(msg){$('errorMsg').textContent=msg;$('errorMsg').classList.add('show');$('loader').classList.remove('show')}
function hideErr(){$('errorMsg').classList.remove('show')}

/* ── FETCH ── */
async function getWeather(city){
  hideErr();
  $('weatherCard').classList.remove('show');
  $('loader').classList.add('show');
  try{
    const [curRes,fRes]=await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
    ]);
    if(!curRes.ok){const e=await curRes.json();throw new Error(e.message)}
    const cur=await curRes.json();
    const forecast=await fRes.json();
    render(cur,forecast);
  }catch(e){
    const msg=e.message.toLowerCase();
    if(msg.includes('not found')||msg.includes('city'))showErr('🔍 City not found. Please check the spelling and try again.');
    else if(msg.includes('invalid api')||msg.includes('401'))showErr('🔑 Invalid API key. Please replace YOUR_API_KEY_HERE with your OpenWeatherMap key.');
    else showErr('⚠️ Something went wrong. Please try again.');
  }
}

/* ── RENDER ── */
function render(d,fData){
  $('loader').classList.remove('show');

  $('cityName').textContent=d.name;
  $('countryName').textContent=d.sys.country;
  $('temperature').innerHTML=`${Math.round(d.main.temp)}<sup>°C</sup>`;
  $('feelsLike').textContent=`Feels like ${Math.round(d.main.feels_like)}°C`;
  $('weatherCondition').textContent=d.weather[0].description;
  $('weatherEmoji').textContent=getEmoji(d.weather[0].description);
  $('minMax').textContent=`Low ${Math.round(d.main.temp_min)}°  ·  High ${Math.round(d.main.temp_max)}°`;
  $('humidity').textContent=d.main.humidity+'%';
  $('windSpeed').textContent=Math.round(d.wind.speed*3.6)+' km/h';
  $('visibility').textContent=d.visibility?(d.visibility/1000).toFixed(1)+' km':'N/A';
  $('pressure').textContent=d.main.pressure+' hPa';
  $('sunrise').textContent=fmtTime(d.sys.sunrise,d.timezone);
  $('sunset').textContent=fmtTime(d.sys.sunset,d.timezone);

  const now=new Date();
  $('dateTime').textContent=
    now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})
    +' · '+now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});

  applyTheme(d.weather[0].main);

  // 5-day forecast
  const dailyMap={};
  for(const item of fData.list){
    const k=new Date(item.dt*1000).toISOString().split('T')[0];
    if(!dailyMap[k])dailyMap[k]=[];
    dailyMap[k].push(item);
  }
  const days=Object.keys(dailyMap).slice(0,5);
  const allHi=days.flatMap(day=>dailyMap[day].map(i=>i.main.temp_max));
  const gMax=Math.max(...allHi),gMin=Math.min(...allHi);
  const todayKey=new Date().toISOString().split('T')[0];

  // Store forecast data globally for click handler
  window._forecastDailyMap = dailyMap;
  window._forecastCityData = d;

  $('forecastRow').innerHTML=days.map((day,idx)=>{
    const items=dailyMap[day];
    const hi=Math.round(Math.max(...items.map(i=>i.main.temp_max)));
    const lo=Math.round(Math.min(...items.map(i=>i.main.temp_min)));
    const mid=items[Math.floor(items.length/2)];
    const emoji=getEmoji(mid.weather[0].description);
    const label=idx===0?'Today':new Date(day+'T12:00:00').toLocaleDateString('en-US',{weekday:'short'});
    const fullLabel=idx===0?'Today — '+new Date(day+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})
      :new Date(day+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
    const barW=Math.round(((hi-gMin)/((gMax-gMin)||1))*100);
    const isToday=day===todayKey||idx===0;
    return `<div class="fc-day${isToday?' today':''}" onclick="showDayDetail('${day}','${fullLabel}',${idx})" title="Click to see ${label}'s details" style="cursor:pointer">
      <div class="fc-name">${label}</div>
      <div class="fc-icon">${emoji}</div>
      <div class="fc-hi">${hi}°</div>
      <div class="fc-lo">${lo}°</div>
      <div class="fc-bar"><div class="fc-bar-fill" style="width:${barW}%"></div></div>
    </div>`;
  }).join('');

  // Click on Today by default to keep hero in sync
  setTimeout(()=>{ const first=$('forecastRow').querySelector('.fc-day'); if(first)first.click(); },100);

  $('weatherCard').classList.add('show');
}

/* ── DAY DETAIL ON CLICK ── */
function showDayDetail(dayKey, fullLabel, idx){
  const map = window._forecastDailyMap;
  const cityD = window._forecastCityData;
  if(!map||!map[dayKey]) return;

  const items = map[dayKey];
  const mid = items[Math.floor(items.length/2)];
  const hi  = Math.round(Math.max(...items.map(i=>i.main.temp_max)));
  const lo  = Math.round(Math.min(...items.map(i=>i.main.temp_min)));
  const avgHumidity = Math.round(items.reduce((a,i)=>a+i.main.humidity,0)/items.length);
  const avgWind     = Math.round(items.reduce((a,i)=>a+i.wind.speed,0)/items.length * 3.6);
  const avgPressure = Math.round(items.reduce((a,i)=>a+i.main.pressure,0)/items.length);
  const avgVis      = items[0].visibility ? (items[0].visibility/1000).toFixed(1)+' km' : 'N/A';
  const avgTemp     = Math.round(items.reduce((a,i)=>a+i.main.temp,0)/items.length);
  const feelsAvg    = Math.round(items.reduce((a,i)=>a+i.main.feels_like,0)/items.length);

  // Highlight selected forecast card
  document.querySelectorAll('.fc-day').forEach(el=>el.classList.remove('today'));
  const allCards = document.querySelectorAll('.fc-day');
  if(allCards[idx]) allCards[idx].classList.add('today');

  // Animate hero out then update
  const hero = document.querySelector('.hero');
  hero.style.opacity='0';hero.style.transform='translateY(8px)';

  setTimeout(()=>{
    $('temperature').innerHTML = `${avgTemp}<sup>°C</sup>`;
    $('feelsLike').textContent  = `Feels like ${feelsAvg}°C`;
    $('weatherCondition').textContent = mid.weather[0].description;
    $('weatherEmoji').textContent     = getEmoji(mid.weather[0].description);
    $('minMax').textContent           = `Low ${lo}°  ·  High ${hi}°`;
    $('humidity').textContent         = avgHumidity+'%';
    $('windSpeed').textContent        = avgWind+' km/h';
    $('visibility').textContent       = avgVis;
    $('pressure').textContent         = avgPressure+' hPa';
    $('dateTime').textContent         = fullLabel;

    // Sunrise/sunset only meaningful for today; show '—' for future days
    if(idx===0){
      $('sunrise').textContent = fmtTime(cityD.sys.sunrise, cityD.timezone);
      $('sunset').textContent  = fmtTime(cityD.sys.sunset,  cityD.timezone);
    } else {
      $('sunrise').textContent = '—';
      $('sunset').textContent  = '—';
    }

    applyTheme(mid.weather[0].main);

    hero.style.transition='opacity .35s ease,transform .35s ease';
    hero.style.opacity='1';hero.style.transform='translateY(0)';
  }, 200);
}

/* ── EVENTS ── */
$('searchBtn').addEventListener('click',()=>{
  const c=$('cityInput').value.trim();
  if(!c){showErr('Please enter a city name.');return;}
  getWeather(c);
});
$('cityInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('searchBtn').click()});

/* ── DEFAULT ── */
getWeather('Delhi');
