// Latice v2 interactions — adapted from 21st.dev component patterns
(function(){
  // Glow menu nav (21st.dev glow-menu, ported to vanilla): glass pill, per-item
  // radial glow, nav-wide glow on hover, 3D rotateX label flip. Active = current URL.
  const tl=document.querySelector('.tubelight');
  if(tl){
    const path=location.pathname.replace(/\/+$/,'');
    const items=[
      {label:'Services',href:'/v2/services',icon:'grid',cls:'gm-green'},
      {label:'About',   href:'/v2/about',   icon:'info',cls:'gm-blue'},
      {label:'Contact', href:'/v2/contact', icon:'mail',cls:'gm-coral'}
    ];
    const icons={
      grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
      info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
      mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'
    };
    const svg=p=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
    const nav=document.createElement('nav');
    nav.className='glow-menu';
    nav.setAttribute('aria-label','Primary');
    nav.innerHTML='<span class="gm-navglow" aria-hidden="true"></span><ul>'+items.map(it=>{
      const face='<span class="gm-ic">'+svg(icons[it.icon])+'</span><span>'+it.label+'</span>';
      const active=path===it.href?' active':'';
      return '<li class="gm-item '+it.cls+active+'"><a href="'+it.href+'/"><span class="gm-glow" aria-hidden="true"></span>'+
        '<span class="gm-face gm-front">'+face+'</span>'+
        '<span class="gm-face gm-back" aria-hidden="true">'+face+'</span></a></li>';
    }).join('')+'</ul>';
    tl.replaceWith(nav);
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
