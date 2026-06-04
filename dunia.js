/* ============================================================
   DUNIA VENTURES — shared behaviour
   ============================================================ */

/* ---- Palettes (single source of truth) ---------------------------------- */
window.DUNIA_PALETTES = {
  plum:       { accent:'#6C3FB6', on:'#F4EEFF', deep:'#1C0E36', swatch:['#6C3FB6','#17120C','#F3ECDD'] },
  vermillion: { accent:'#E8431F', on:'#FCF3EC', deep:'#2A0C05', swatch:['#E8431F','#17120C','#F3ECDD'] },
  marigold:   { accent:'#E59000', on:'#1B1304', deep:'#33240A', swatch:['#E59000','#17120C','#F3ECDD'] },
  jade:       { accent:'#0F8A5E', on:'#EAFBF1', deep:'#062418', swatch:['#0F8A5E','#17120C','#F3ECDD'] },
};
window.DUNIA_FONTS = {
  'Bricolage Grotesque': "'Bricolage Grotesque','Hanken Grotesk',sans-serif",
  'Syne':                "'Syne','Hanken Grotesk',sans-serif",
  'Archivo':             "'Archivo','Hanken Grotesk',sans-serif",
};

function duniaApplyTheme(name){
  const p = window.DUNIA_PALETTES[name] || window.DUNIA_PALETTES.vermillion;
  const r = document.documentElement.style;
  r.setProperty('--accent', p.accent);
  r.setProperty('--on-accent', p.on);
  r.setProperty('--accent-deep', p.deep);
  try{ localStorage.setItem('dunia.theme', name); }catch(e){}
}
function duniaApplyFont(name){
  const f = window.DUNIA_FONTS[name];
  if(!f) return;
  document.documentElement.style.setProperty('--font-display', f);
  try{ localStorage.setItem('dunia.font', name); }catch(e){}
}
function duniaApplyGrain(on){
  document.body.classList.toggle('no-grain', !on);
  try{ localStorage.setItem('dunia.grain', on ? '1':'0'); }catch(e){}
}

/* restore persisted prefs ASAP */
(function restore(){
  try{
    const t = localStorage.getItem('dunia.theme'); if(t) duniaApplyTheme(t);
    const f = localStorage.getItem('dunia.font');  if(f) duniaApplyFont(f);
    const g = localStorage.getItem('dunia.grain'); if(g==='0') document.body.classList.add('no-grain');
  }catch(e){}
})();

document.addEventListener('DOMContentLoaded', function(){

  /* ---- mobile nav ---- */
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  if(burger){ burger.addEventListener('click', ()=> nav.classList.toggle('open')); }
  document.querySelectorAll('.nav__links a').forEach(a=> a.addEventListener('click', ()=> nav && nav.classList.remove('open')));

  /* ---- scroll reveal (rect-based: reliable in all render contexts) ---- */
  const reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function checkReveals(){
    const vh = window.innerHeight || document.documentElement.clientHeight;
    for(let i=reveals.length-1; i>=0; i--){
      const el = reveals[i];
      const top = el.getBoundingClientRect().top;
      if(top < vh*0.92){ el.classList.add('in'); reveals.splice(i,1); }
    }
  }
  checkReveals();
  window.addEventListener('scroll', checkReveals, { passive:true });
  window.addEventListener('resize', checkReveals);

  /* ---- marquee: duplicate track for seamless loop ---- */
  document.querySelectorAll('.marquee__track').forEach(tr=>{
    tr.innerHTML += tr.innerHTML;
  });

  /* ---- portfolio filter ---- */
  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-sector]');
  if(chips.length){
    chips.forEach(chip=>{
      chip.addEventListener('click', ()=>{
        chips.forEach(c=> c.classList.remove('is-active'));
        chip.classList.add('is-active');
        const f = chip.getAttribute('data-filter');
        cards.forEach(card=>{
          const match = f==='all' || card.getAttribute('data-sector').split(' ').includes(f);
          card.classList.toggle('hide', !match);
        });
      });
    });
  }

  /* ---- newsletter ---- */
  document.querySelectorAll('form[data-newsletter]').forEach(form=>{
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const done = form.querySelector('[data-done]');
      if(input && input.value){
        form.classList.add('sent');
        if(done) done.textContent = '✓ Thanks — you\u2019re on the list.';
        input.value='';
      }
    });
  });

});

/* ---- live updates from Tweaks panel ---- */
window.addEventListener('tweakchange', (e)=>{
  const d = e.detail || {};
  if(d.theme) duniaApplyTheme(d.theme);
  if(d.headingFont) duniaApplyFont(d.headingFont);
  if(typeof d.grain === 'boolean') duniaApplyGrain(d.grain);
});
