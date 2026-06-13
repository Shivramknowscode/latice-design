// Latice v2 interactions — adapted from 21st.dev component patterns
(function(){
  // Tubelight navbar: moving pill behind active/hovered link
  const tl=document.querySelector('.tubelight');
  if(tl){
    const pill=document.createElement('div');pill.className='pill';tl.appendChild(pill);
    const active=tl.querySelector('a.active');
    const place=el=>{if(!el){pill.classList.remove('show');return;}pill.style.left=el.offsetLeft+'px';pill.style.width=el.offsetWidth+'px';pill.classList.add('show');};
    requestAnimationFrame(()=>place(active));            // homepage has no active link -> pill hidden until hover
    tl.querySelectorAll('a').forEach(a=>a.addEventListener('mouseenter',()=>place(a)));
    tl.addEventListener('mouseleave',()=>place(active));  // return to active, or hide
    addEventListener('resize',()=>place(active));
  }
  // Magnetize button
  document.querySelectorAll('.magnet').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
      btn.style.transform=`translate(${x*0.25}px,${y*0.35}px)`;});
    btn.addEventListener('mouseleave',()=>btn.style.transform='translate(0,0)');
  });
  // Animated text cycle in hero
  const cyc=document.querySelector('.cycle .word');
  if(cyc){const words=JSON.parse(cyc.dataset.words||'[]');let i=0;
    setInterval(()=>{i=(i+1)%words.length;cyc.style.opacity=0;cyc.style.transform='translateY(8px)';
      setTimeout(()=>{cyc.textContent=words[i];cyc.style.opacity=1;cyc.style.transform='none';},220);},2200);
    cyc.style.transition='opacity .22s ease, transform .22s ease';
  }
  // Container-scroll feature: rotateX -> flat as it enters
  const feat=document.querySelector('.feature .frame');
  if(feat){const onScroll=()=>{const r=feat.getBoundingClientRect();const vh=innerHeight;
    let p=1-(r.top/vh);p=Math.max(0,Math.min(1.1,p));
    const rot=14*(1-Math.min(1,p*1.2));const sc=0.94+0.06*Math.min(1,p*1.2);
    feat.style.transform=`rotateX(${rot}deg) scale(${sc})`;};
    addEventListener('scroll',onScroll,{passive:true});onScroll();}
  // Reveal on scroll
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3*0.06)+'s';io.observe(el);});
  // Live clock (IST)
  const clk=document.querySelector('.nav-time');
  if(clk){const tick=()=>{const t=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'});clk.textContent='MUMBAI '+t+' IST';};tick();setInterval(tick,15000);}
  // Mobile menu
  const mb=document.querySelector('.menu-btn'),mn=document.querySelector('.mobile-nav');
  if(mb&&mn)mb.addEventListener('click',()=>mn.classList.toggle('open'));
})();
