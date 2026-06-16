// Latice v2 interactions — adapted from 21st.dev component patterns
(function(){
  // Glow menu nav (21st.dev glow-menu, ported to vanilla): glass pill, per-item
  // radial glow, nav-wide glow on hover, 3D rotateX label flip. Active = current URL.
  const tl=document.querySelector('.tubelight');
  if(tl){
    const path=location.pathname.replace(/\/+$/,'');
    const items=[
      {label:'Services',href:'/services',icon:'grid',cls:'gm-green'},
      {label:'About',   href:'/about',   icon:'info',cls:'gm-blue'},
      {label:'Contact', href:'/contact', icon:'mail',cls:'gm-coral'}
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
  // Home: transparent nav over the aurora hero, gain solid background once scrolled past it
  if(document.body.classList.contains('home')){
    const hdr=document.querySelector('header');
    if(hdr){const onScroll=()=>hdr.classList.toggle('solid',scrollY>innerHeight*0.6);
      addEventListener('scroll',onScroll,{passive:true});onScroll();}
  }
  // About: scroll-narrative active step + progress fill
  const beats=[...document.querySelectorAll('.beat')];
  if(beats.length){
    const rail=[...document.querySelectorAll('.rail li')], fill=document.querySelector('.rail-fill');
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.35});
    beats.forEach(b=>io.observe(b));
    const upd=()=>{const mid=innerHeight*0.45;let cur=0;
      beats.forEach((b,i)=>{if(b.getBoundingClientRect().top<mid)cur=i;});
      rail.forEach((li,i)=>li.classList.toggle('on',i===cur));
      if(fill){const f=beats[0].getBoundingClientRect().top,l=beats[beats.length-1].getBoundingClientRect().bottom;
        fill.style.height=(Math.min(1,Math.max(0,(mid-f)/((l-f)||1)))*100)+'%';}};
    addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
  }
  // Furniture: click-to-open lightbox gallery, scoped per product (.fp-grid)
  const grids=[...document.querySelectorAll('.fp-grid')];
  if(grids.length){
    const mk=(t,cls,txt,label)=>{const e=document.createElement(t);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;if(label)e.setAttribute('aria-label',label);return e;};
    const lb=mk('div','lbox');lb.setAttribute('aria-hidden','true');
    const bClose=mk('button','lb-btn lb-close','×','Close');
    const bPrev=mk('button','lb-btn lb-prev','←','Previous');
    const bNext=mk('button','lb-btn lb-next','→','Next');
    const lbImg=mk('img','lb-img');lbImg.alt='';
    const meta=mk('div','lb-meta'),lbTitle=mk('span','lb-title'),lbCount=mk('span','lb-count');
    meta.append(lbTitle,lbCount);
    lb.append(bClose,bPrev,lbImg,bNext,meta);
    document.body.appendChild(lb);
    let set=[],idx=0,title='';
    const show=()=>{lbImg.src=set[idx].src;lbImg.alt=set[idx].alt||'';lbCount.textContent=(idx+1)+' / '+set.length;lbTitle.textContent=title;};
    const open=(grid,i)=>{set=[...grid.querySelectorAll('img')];idx=i;
      const fp=grid.closest('.fp'),h=fp&&fp.querySelector('h2');title=h?h.textContent:'';
      show();lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
    const close=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    const go=d=>{idx=(idx+d+set.length)%set.length;show();};
    grids.forEach(g=>{
      g.querySelectorAll('img').forEach((im,i)=>im.addEventListener('click',()=>open(g,i)));
      const fp=g.closest('.fp'),head=fp&&fp.querySelector('.fp-head');
      if(head){const b=mk('button','fp-view','View gallery →');b.type='button';
        b.addEventListener('click',()=>open(g,0));head.insertBefore(b,head.querySelector('.fp-meta'));}
    });
    bClose.addEventListener('click',close);
    bPrev.addEventListener('click',e=>{e.stopPropagation();go(-1);});
    bNext.addEventListener('click',e=>{e.stopPropagation();go(1);});
    lb.addEventListener('click',e=>{if(e.target===lb)close();});
    addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;
      if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);});
  }
})();
