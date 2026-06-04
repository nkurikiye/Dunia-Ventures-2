// DUNIA — Tweaks panel app (mounts on every page)
// Drives palette / heading font / grain; persists across pages via localStorage.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "plum",
  "headingFont": "Bricolage Grotesque",
  "grain": true
}/*EDITMODE-END*/;

function DuniaTweaks(){
  // hydrate from any persisted choice so the panel matches the live page
  const init = { ...TWEAK_DEFAULTS };
  try{
    const t = localStorage.getItem('dunia.theme'); if(t) init.theme = t;
    const f = localStorage.getItem('dunia.font');  if(f) init.headingFont = f;
    const g = localStorage.getItem('dunia.grain'); if(g!=null) init.grain = g==='1';
  }catch(e){}

  const [t, setTweak] = useTweaks(init);

  React.useEffect(()=>{ duniaApplyTheme(t.theme); }, [t.theme]);
  React.useEffect(()=>{ duniaApplyFont(t.headingFont); }, [t.headingFont]);
  React.useEffect(()=>{ duniaApplyGrain(t.grain); }, [t.grain]);

  const P = window.DUNIA_PALETTES;
  const swatchByName = {
    plum:       P.plum.swatch,
    vermillion: P.vermillion.swatch,
    marigold:   P.marigold.swatch,
    jade:       P.jade.swatch,
  };
  const nameBySwatch = (arr)=>{
    const k = JSON.stringify(arr).toLowerCase();
    return Object.keys(swatchByName).find(n=> JSON.stringify(swatchByName[n]).toLowerCase()===k) || 'plum';
  };

  return (
    <TweaksPanel title="Dunia — Tweaks">
      <TweakSection label="Color palette" />
      <TweakColor
        label="Accent"
        value={swatchByName[t.theme]}
        options={[ swatchByName.plum, swatchByName.vermillion, swatchByName.marigold, swatchByName.jade ]}
        onChange={(v)=> setTweak('theme', nameBySwatch(v))}
      />
      <TweakSection label="Typography" />
      <TweakSelect
        label="Display font"
        value={t.headingFont}
        options={['Bricolage Grotesque','Syne','Archivo']}
        onChange={(v)=> setTweak('headingFont', v)}
      />
      <TweakSection label="Texture" />
      <TweakToggle label="Paper grain" value={t.grain} onChange={(v)=> setTweak('grain', v)} />
    </TweaksPanel>
  );
}

(function mount(){
  let host = document.getElementById('tweaks-root');
  if(!host){ host = document.createElement('div'); host.id='tweaks-root'; document.body.appendChild(host); }
  ReactDOM.createRoot(host).render(<DuniaTweaks />);
})();
