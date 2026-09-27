let audioCtx=null, osc=null, gain=null, timerId=null, remaining=600;
const $=id=>document.getElementById(id);
const guidance={
 relax:"<b>Full Body Relaxation:</b> Pair a comfortable volume with slow breathing and a relaxed posture.",
 eye:"<b>Eye Rest:</b> Use the session as a reminder to relax your gaze. Look away from the screen regularly and blink normally.",
 focus:"<b>Calm Focus:</b> Use a quiet, low-volume tone while doing one simple task. Stop if it becomes distracting.",
 sleep:"<b>Pre-Sleep Relaxation:</b> Keep the volume low, dim the screen, and use slow breathing before bed.",
 breath:"<b>Breathing:</b> Try a slow, comfortable breathing rhythm. Never force or hold your breath if uncomfortable."
};
$("freq").addEventListener("change",()=>{
  $("customWrap").classList.toggle("hidden",$("freq").value!=="custom");
  updateHz();
});
$("target").addEventListener("change",()=>{$("guidance").innerHTML=guidance[$("target").value]});
$("minutes").addEventListener("input",()=>{if(!timerId) setTimer()});
function getHz(){return $("freq").value==="custom"?Number($("custom").value):Number($("freq").value)}
function updateHz(){$("hz").textContent=getHz()}
$("custom").addEventListener("input",updateHz);

function setTimer(){
 remaining=Math.max(60,Number($("minutes").value)*60);
 renderTimer();
}
function renderTimer(){
 let m=Math.floor(remaining/60),s=remaining%60;
 $("timer").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
}
async function start(){
 if(timerId) return;
 const hz=getHz();
 if(!(hz>=20&&hz<=20000)){alert("Choose a frequency between 20 and 20,000 Hz.");return}
 setTimer();
 audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
 if(audioCtx.state==="suspended") await audioCtx.resume();
 osc=audioCtx.createOscillator(); gain=audioCtx.createGain();
 osc.type="sine"; osc.frequency.value=hz; gain.gain.value=.035;
 osc.connect(gain).connect(audioCtx.destination); osc.start();
 $("status").textContent="Playing gently — stop anytime if uncomfortable.";
 timerId=setInterval(()=>{
   remaining--;renderTimer();
   if(remaining<=0) stop();
 },1000);
}
function stop(){
 if(timerId){clearInterval(timerId);timerId=null}
 if(osc){try{osc.stop()}catch(e){} osc.disconnect();osc=null}
 if(gain){gain.disconnect();gain=null}
 $("status").textContent="Ready";
 setTimer();
}
$("start").onclick=start;$("stop").onclick=stop;updateHz();setTimer();
